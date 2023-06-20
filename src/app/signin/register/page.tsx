import RegisterForm from '@/app/components/registerForm';
import React from 'react';
import Link from 'next/link'; //import this
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Register = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) redirect('/dashboard');
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default Register;
