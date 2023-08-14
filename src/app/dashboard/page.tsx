import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ErrorDisplay from '../components/errors/errorDisplay';
import NoDecksFallback from '../components/noDecksFallback';
import { Database, Deck } from '@/types/supabase';
import BlackContainer from '../components/utilities/BlackContainer';
import Tooltip from '../components/utilities/Tooltip';

const Dashboard = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect('/');

  const user = session?.user;
  let { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select(`username, avatar_url`)
    .eq('id', user?.id)
    .single();

  let { data: decks, error: decksError } = await supabase
    .from('decks')
    .select(`*`)
    .eq('user_id', user?.id);

  if (profileError) return <ErrorDisplay error={profileError} />;
  if (decksError) return <ErrorDisplay error={decksError} />;

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4 text-center text-white">
        Welcome, {profile?.username}!
      </h1>

      <div>
        {decks === null || decks.length === 0 ? (
          <NoDecksFallback />
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {decks.map((deck: Deck) => (
              <BlackContainer key={deck.id}>
                <div className="text-center">
                  <Tooltip text={`${deck.notes}`}>
                    <Link
                      className="text-lg text-white font-bold mb-2  hover:underline"
                      href={`/decks/${deck.id}`}
                    >
                      {deck.name || 'Untitled Deck'}{' '}
                    </Link>
                  </Tooltip>
                </div>
              </BlackContainer>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
