import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SigninSchema, SigninSchemaType } from '@/lib/validation';
import { useState } from 'react';
import { CircleCheck, CircleMinus, Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth } from '@/redux/slice/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectIsAuth } from '@/redux/selectors/userSelectors';

export default function Signin() {
  const isAuth = useSelector(selectIsAuth);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(SigninSchema),
  });

  const onSubmit = (data: SigninSchemaType) => {
    if (
      data.email !== 'admin@nuttanan.com' ||
      data.password !== 'adminpassword'
    ) {
      setError('Invalid credentials');
      return;
    }
    setError('');
    console.log(data);
    setSuccess('Successfully signed in, redirecting...');
    dispatch(setIsAuth(true));
    setTimeout(() => {
      navigate('/dashboard');
    }, 4000);
  };

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Sign in to your account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your password"
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                        />
                        <div
                          className="absolute bottom-2 right-3 text-gray-700 cursor-pointer"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <div className="bg-destructive/25 flex items-center my-2 gap-2 text-sm text-secondary-foreground p-3 rounded-md">
                  <CircleMinus className="w-4 h-4" />
                  <p>{error}</p>
                </div>
              )}
              {success && (
                <div className="bg-teal-400/25 flex items-center my-2 gap-2 text-sm text-secondary-foreground p-3 rounded-md">
                  <CircleCheck className="w-4 h-4" />
                  <p>{success}</p>
                </div>
              )}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
