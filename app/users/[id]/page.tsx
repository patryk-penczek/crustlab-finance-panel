import { User } from '@/components/user/user';
import { getUserById } from '@/utils/getUserById';
import { notFound } from 'next/navigation';

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  const user = await getUserById(id);
  if (!user) return notFound();

  return (
    <div>
      <User user={user} />
    </div>
  );
}
