import React from 'react';
import PageContainer from '../components/pageContainer';
import AppHeader from '../components/appHeader';
import Link from 'next/link';
import Footer from '../components/footer';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer>
      <>
        <AppHeader spellbookLink="">
          <div className="hidden lg:block">
            <ul className="flex space-x-4">
              <li>
                <Link className="jaceNeonText" href="/decks">
                  Decks
                </Link>
              </li>
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
        </AppHeader>
        <div className="m-auto"> {children}</div>
        <Footer />
      </>
    </PageContainer>
  );
}
