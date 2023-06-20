import Image from 'next/image';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

import logo from '../../assets/images/whitelogo.png';

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <nav>
      <div>
        <div className='flex justify-between p-3 xl:hidden bg-black '>
          <div>
            <a className='flex items-center'>
              <Image className='w-100 h-90 object-cover' src={logo} alt='' />
            </a>
          </div>

          <button
            data-collapse-toggle='navbar-default'
            type='button'
            className='border inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-md md:hidden text-white  '
            aria-controls='navbar-default'
            aria-expanded='true'
            onClick={() => setNavbar(!navbar)}
          >
            <span className='sr-only'>Open main menu</span>
            {navbar == false ? (
              <FontAwesomeIcon icon={faBars} aria-hidden='true' />
            ) : (
              <FontAwesomeIcon icon={faXmark} aria-hidden='true' />
            )}
          </button>
        </div>
        <div>
          <div>
            <div>
              <ul
                className={`fixed xs:fixed xs:top-12 xl:top-0 xs:mt-2.5 xl:mt-0 xs:right-0 z-50 xs:w-5/6 xl:w-full  xl:h-14 xs:h-screen p-4  bg-black  xl:block text-white  ease-in-out duration-500 xl:justify-end header-index ${
                  navbar
                    ? 'xs:translate-x-0 xl:translate-x-0  '
                    : 'xs:translate-x-full xl:translate-x-0'
                }`}
                id='navbar-default'
              >
                <div className='flex justify-between xl:w-5/6 xl:m-auto'>
                  <li className='xs:hidden xl:block'>
                    <a className='flex items-center'>
                      <Image
                        className='w-100 h-90 object-cover'
                        src={logo}
                        alt=''
                      />
                    </a>
                  </li>
                  <div className='xl:flex xl:gap-10 xs:block '>
                    <li>
                      <a
                        href='#'
                        className='block py-2 pl-3 pr-4 text-black bg-aqua px-2 rounded md:bg-transparent md:text-black-700 md:p-0 dark:text-white md:dark:text-black-500 text-xs transition duration-75'
                        aria-current='page'
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block py-2 pl-3 pr-4 text-gray-900 px-2 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black-700 md:p-0 dark:text-white md:dark:hover:text-black-500 dark:hover:bg-gray-700 dark:hover:text-white transition duration-75 md:dark:hover:bg-transparent  text-xs'
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block py-2 pl-3 pr-4 text-gray-900 px-2 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black-700 md:p-0 dark:text-white md:dark:hover:text-black-500 dark:hover:bg-gray-700 dark:hover:text-white  transition duration-75 md:dark:hover:bg-transparent  text-xs'
                      >
                        Services
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block py-2 pl-3 pr-4 text-gray-900 px-2 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black-700 md:p-0 dark:text-white md:dark:hover:text-black-500 dark:hover:bg-gray-700 dark:hover:text-white  transition duration-75 md:dark:hover:bg-transparent  text-xs'
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block py-2 pl-3 pr-4 text-gray-900 px-2 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black-700 md:p-0 dark:text-white md:dark:hover:text-black-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent  text-xs transition duration-75'
                      >
                        Contact
                      </a>
                    </li>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
