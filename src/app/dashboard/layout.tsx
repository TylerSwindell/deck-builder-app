'use client';
import React, { useState } from 'react';
import Signout from '../components/signout';
import PageContainer from '../components/pageContainer';
import AppHeader from '../components/appHeader';
import Footer from '../components/footer';
import Link from 'next/link';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <PageContainer>
      <>
        <AppHeader>
          <div className="hidden lg:block">
            <ul className="flex space-x-4">
              <li>
                <Link
                  className="jaceNeonText"
                  href={'/dashboard/build'}
                >
                  Deck Builder
                </Link>
              </li>
              <li>
                <Signout variant="neon" />
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
                <li className="pl-2 pt-2 pb-2">
                  <Link
                    className="jaceNeonText"
                    href={'/dashboard/build'}
                  >
                    Deck Builder
                  </Link>
                </li>
                <li className="pl-2 pt-2 pb-2">
                  <Signout variant="blue" />
                </li>
              </ul>
            </div>
          )}
        </AppHeader>
        <div className="m-auto"> {children}</div>
        <Footer />
      </>
    </PageContainer>
  );
}
