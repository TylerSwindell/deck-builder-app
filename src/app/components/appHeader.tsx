import Link from 'next/link';
import React from 'react';

const AppHeader = ({
  spellbookLink,
  children,
}: {
  spellbookLink: 'dashboard' | '';
  children: React.ReactNode;
}) => {
  return (
    <header className=" py-4 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 bg-sky-400">
      <div className="flex justify-between items-center">
        <Link href={`/${spellbookLink}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold jaceNeonText">
            SpellBook
          </h1>
        </Link>

        <nav>{children}</nav>
      </div>
    </header>
  );
};

export default AppHeader;
