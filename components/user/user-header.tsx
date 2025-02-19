import { User } from '@/types/user';

type Props = {
  user: User;
};

export const UserHeader = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-x-2.5 p-6 border-b">
      <div className="size-14 flex justify-center items-center bg-muted text-muted-foreground text-2xl tracking-wide font-medium rounded-full border">
        {user.firstName[0]}
        {user.lastName[0]}
      </div>
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-muted-foreground text-sm">
          #{user.id.toString().padStart(6, '0')}
        </p>
      </div>
    </div>
  );
};
