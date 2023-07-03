import React from 'react';
import ResetPwForm from './resetPwForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const PasswordResetPage = async () => {
  return <ResetPwForm />;
};

export default PasswordResetPage;
