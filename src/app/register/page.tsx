import RegisterForm from '@/app/components/registerForm';
import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Register = async () => {
  return (
    <div className="m-auto">
      <RegisterForm />
    </div>
  );
};

export default Register;
