'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,

      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          username: username,
        },
      },
    });
    router.refresh();
  };

  return (
    <div className="bg-gray-100 rounded-lg p-8 shadow-md">
      <div className="flex flex-col space-y-4">
        <label
          htmlFor="username"
          className="text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          className="px-4 py-2 border rounded-md"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
        />

        <label
          htmlFor="email"
          className="text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          className="px-4 py-2 border rounded-md"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />

        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          className="px-4 py-2 border rounded-md"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />

        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md transition-colors hover:bg-blue-700"
          onClick={handleSignUp}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
