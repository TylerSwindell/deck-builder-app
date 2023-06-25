import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ErrorDisplay from '../components/errorDisplay';
import NoDecksFallback from '../components/noDecksFallback';
import { Deck } from '@/types/supabase';

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

  let decks: Deck[] = [];
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4 text-center text-white">
        Welcome, {profile?.username}!
      </h1>

      <div>
        {decks.length === 0 ? <NoDecksFallback /> : <div>Decks</div>}
      </div>
    </div>
  );
};

export default Dashboard;
