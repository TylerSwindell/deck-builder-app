import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import LoginForm from '../components/loginForm';
import Link from 'next/link';

const Signin = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) redirect('/dashboard');
  return (
    <>
      {' '}
      <LoginForm />
      <Link href="/signin/register">Register</Link>
    </>
  );
};

export default Signin;
