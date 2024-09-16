import { Briefcase, Network, UserRoundPlus, UsersRound } from 'lucide-react';
import userData, { Users } from '../../data/data';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const roleCount = userData.reduce((acc: { [key: string]: number }, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const topRoles = Object.entries(roleCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const newComersThisWeek = userData.filter((user) => {
    const date = new Date();
    const today = date.getDay();
    const firstDay = date.getDate() - today;
    const lastDay = firstDay + 6;
    const firstDayOfWeek = new Date(date.setDate(firstDay));
    const lastDayOfWeek = new Date(date.setDate(lastDay));
    return (
      new Date(user.startDate) >= firstDayOfWeek &&
      new Date(user.startDate) <= lastDayOfWeek
    );
  });

  return (
    <div>
      <div>
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
          Welcome to Your Team Dashboard!
        </h2>
        <p className="mt-4 text-gray-500">
          We’re excited to have you on board. Here’s an overview of your team’s
          key insights:
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows mt-4">
        <StatCard
          title="Team Member Overview"
          primaryIcon={
            <UsersRound size={24} className="w-6 h-6 text-blue-500" />
          }
          details={[
            {
              title: 'Total',
              amount: userData.length,
            },
            {
              title: 'Active',
              amount: userData.filter((user) => user.status === 'Active')
                .length,
            },
            {
              title: 'Inactive',
              amount: userData.filter((user) => user.status === 'Inactive')
                .length,
            },
            {
              title: 'Paused',
              amount: userData.filter((user) => user.status === 'Paused')
                .length,
            },
            {
              title: 'On Vacation',
              amount: userData.filter((user) => user.status === 'Vacation')
                .length,
            },
          ]}
        />

        <StatCard
          title="Top 5 Roles"
          primaryIcon={<Network size={24} className="w-6 h-6 text-blue-500" />}
          details={topRoles.map(([role, count]) => ({
            title: role,
            amount: count,
          }))}
        />
        <NewComerCard
          title="New Comers This Week"
          primaryIcon={
            <UserRoundPlus size={24} className="w-6 h-6 text-blue-500" />
          }
          users={newComersThisWeek}
        />
        <StatCard
          title="Member Type"
          primaryIcon={
            <Briefcase size={24} className="w-6 h-6 text-blue-500" />
          }
          details={[
            {
              title: 'Employee',
              amount: userData.filter((user) => user.workerType === 'Employee')
                .length,
            },
            {
              title: 'Contractor',
              amount: userData.filter(
                (user) => user.workerType === 'Contractor'
              ).length,
            },
          ]}
        />
      </div>
    </div>
  );
}

type StatCardProps = {
  title: string;
  primaryIcon: React.ReactNode;
  details: {
    title: string;
    amount: number;
  }[];
};

function StatCard({ title, primaryIcon, details }: StatCardProps) {
  return (
    <div className="md:row-span-1 xl:row-span-2 bg-white col-span-1 shadow-md rounded-2xl flex flex-col">
      <div>
        <div className="flex gap-4 items-center mb-2 px-5 pt-4">
          <div className="rounded-full p-5 bg-blue-50 border-sky-300 border-[1px]">
            {primaryIcon}
          </div>
          <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
        </div>
        <hr />
      </div>

      <div className="flex mb-6 items-center  gap-4 px-5">
        <div className="flex-1">
          {details.map((detail, index) => (
            <div key={index}>
              <div className="flex items-center justify-between my-4">
                <span className="text-gray-500 flex-1">{detail.title}</span>
                <span className="font-bold text-gray-800">{detail.amount}</span>
              </div>
              {index < details.length - 1 && <hr />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type NewComerCardProps = {
  title: string;
  primaryIcon: React.ReactNode;
  users: Users[];
};

function NewComerCard({ title, primaryIcon, users }: NewComerCardProps) {
  return (
    <div className="md:row-span-1 xl:row-span-2 bg-white col-span-1 shadow-md rounded-2xl flex flex-col">
      <div>
        <div className="flex gap-4 items-center mb-2 px-5 pt-4">
          <div className="rounded-full p-5 bg-blue-50 border-sky-300 border-[1px]">
            {primaryIcon}
          </div>
          <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
        </div>
        <hr />
      </div>

      <div className="flex mb-6 items-center  gap-4 px-5">
        <div className="flex-1">
          {users.length > 0 ? (
            users.map((user, index) => (
              <Link to={`/user/${user.id}`} key={user.id}>
                <div
                  className="flex items-center gap-2 my-4
              hover:bg-gray-100 p-2 rounded-md cursor-pointer
              "
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.memberInfo.avatar}
                    alt={user.memberInfo.name}
                  />
                  <div>
                    <p>{user.memberInfo.name}</p>
                    <span className="text-secondary-foreground flex-1 text-xs">
                      {user.role}&nbsp;({user.workerType})
                    </span>
                  </div>
                </div>

                {index < users.length - 1 && <hr />}
              </Link>
            ))
          ) : (
            <div className="flex items-center gap-2 my-4">
              <p>No new comers this week</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
