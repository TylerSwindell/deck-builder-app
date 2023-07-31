import RegisterForm from '@/app/components/registerForm';
import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Registered = async () => {
  return (
    <div className="m-auto">
      <p>
        You&apos;re signed up, you just need to check your email and
        confirm it&apos;s correct
      </p>
    </div>
  );
};

export default Registered;
