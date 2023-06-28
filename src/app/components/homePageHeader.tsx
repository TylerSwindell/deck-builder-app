'use client';

import React, { useState } from 'react';
import AppHeader from './appHeader';
import Link from 'next/link';

const HomePageHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <AppHeader spellbookLink="">
      <div className="hidden lg:block">
        <ul className="flex space-x-4">
          <li>
            <Link className="jaceNeonText" href="/register">
              Register
            </Link>
          </li>
          <li>
            <Link className="jaceNeonText" href="/signin">
              Sign In
            </Link>
          </li>
        </ul>
      </div>
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none border-2 border-white rounded-md px-4 py-2"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      {showMenu && (
        <div className="lg:hidden">
          <ul className="bg-white border rounded-md shadow-lg absolute right-0 mt-2  w-48 divide-y divide-blue-200">
            <li>
              <Link
                className="jaceNeonText pl-2 pt-2 pb-2"
                href="/register"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                className="jaceNeonText pl-2 pt-2 pb-2"
                href="/signin"
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      )}
    </AppHeader>
  );
};

export default HomePageHeader;
