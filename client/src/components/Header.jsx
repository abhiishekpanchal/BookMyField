import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Squeeze as Hamburger } from 'hamburger-react';
import { scroller } from 'react-scroll';

export const navLinks = [
  {
    id: 'home',
    title: 'Home',
  },
  {
    id: 'location',
    title: 'Location',
  },
  {
    id: 'gallery',
    title: 'Gallery',
  },
  {
    id: 'book',
    title: 'Book',
  },
];

function Header() {
  const [toggle, setToggle] = useState(false);

  const handleLinkClick = (id) => {
    scroller.scrollTo(id, {
      duration: 1500,
      delay: 0,
      smooth: true,
    });

    setToggle(!toggle);
  };

  return (
    <header className="w-full z-99">
      <nav className="flex justify-between items-center p-5 text-md sm:text-xl bg-primary text-white">
        <div className="font-bold inline-block">
          <h1 className="inline-block text-tertiary text-2xl md:text-3xl">Book</h1>
          <h1 className="inline-block text-2xl md:text-3xl">My</h1>
          <h1 className="inline-block text-tertiary text-2xl md:text-3xl">Field</h1>
        </div>

        {/* Desktop view */}
        <div className="justify-evenly gap-6 pr-6 hidden sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="font-header hover:text-tertiary"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Mobile view */}
        <div className="sm:hidden flex justify-end">
          <Hamburger toggled={toggle} toggle={setToggle} />
          {toggle && (
            <div className="absolute top-16 right-5 bg-primary text-white p-5 z-100">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="block py-2 font-header text-white"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
