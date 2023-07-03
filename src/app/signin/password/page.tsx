import React from 'react';
import PasswordResetForm from './passwordResetForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const PasswordRecoveryPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) redirect('/dashboard');

  return (
    <div className="m-auto">
      <PasswordResetForm />
    </div>
  );
};

export default PasswordRecoveryPage;
