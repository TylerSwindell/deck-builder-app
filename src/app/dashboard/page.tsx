'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div>
      {' '}
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default Dashboard;
