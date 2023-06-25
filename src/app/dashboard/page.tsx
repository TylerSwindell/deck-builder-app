import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ErrorDisplay from '../components/errorDisplay';

const Dashboard = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect('/');
  const user = session?.user;
  let { data: profile, error } = await supabase
    .from('profiles')
    .select(`username, avatar_url`)
    .eq('id', user?.id)
    .single();

  let decks = [{ id: 0, name: 'test', format: 'edh' }];
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4 text-center text-white">
        Welcome, {profile?.username}!
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {decks.map((deck) => (
          <Link
            key={deck.id}
            href={`/decks/${deck.id}`}
            className="bg-white rounded shadow p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold mb-2">{deck.name}</h3>
              <p className="text-gray-600">Format: {deck.format}</p>
            </div>
            <p className="text-gray-500 text-right">ID: {deck.id}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
