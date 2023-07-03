'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`>>>`);
      console.log(session);
      if (session) router.refresh();
    });
  }, []);
  return (
    <>
      <div className="m-auto"> {children}</div>
    </>
  );
}
