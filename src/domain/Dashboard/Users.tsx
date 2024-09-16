import { UserTable } from './Table/UserTable';
import { columns } from './Table/Column';
import users from '../../data/data';

export default function Users() {
  console.log('users', users);
  const dataTable = users.map((user) => {
    return {
      id: user.id,
      memberInfo: user.memberInfo,
      role: user.role,
      type: user.workerType,
      status: user.status,
      startDate: user.startDate,
    };
  });
  if (!dataTable) return null;
  return (
    <div className="mx-auto w-full">
      <UserTable columns={columns} data={dataTable} />
    </div>
  );
}
