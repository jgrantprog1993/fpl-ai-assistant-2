import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth, database } from '../utils/firebaseConfig';
import { ref, get } from 'firebase/database';
import { signOut } from 'firebase/auth';
import Link from 'next/link';

const Appbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState({ firstName: '', lastName: '' });
  const [hasTeam, setHasTeam] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const userRef = ref(database, 'users/' + user.uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserName({ firstName: data.firstName, lastName: data.lastName });
          if (data.teams && Object.keys(data.teams).length > 0) {
            setHasTeam(true);
          }
        }
      } else {
        setIsLoggedIn(false);
        setUserName({ firstName: '', lastName: '' });
        setHasTeam(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      setIsLoggedIn(false);
      setShowDropdown(false);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='fixed top-0 left-0 z-20 w-full bg-transparent backdrop-blur-md pt-safe'>
      <header className='border-b bg-black bg-opacity-30 px-safe dark:border-zinc-800'>
        <div className='mx-auto flex h-20 max-w-screen-md items-center justify-between px-6'>
			<Link href='/' passHref legacyBehavior>
				<img src='/images/pl-main-logo.png' alt='FPL AI Assistant' className='w-10 h-10' style={{ cursor: 'pointer' }} />
			</Link>
			<nav className='flex items-center space-x-6'>
			<div className='hidden sm:block'>
				<div className='flex items-center space-x-6'>
				<Link href={hasTeam ? '/myteam' : '/addteam'} legacyBehavior>
					<a className='font-medium text-white'>{hasTeam ? 'My Team' : 'Link Team'}</a>
				</Link>
				</div>
			</div>

            <div
              title='User Menu'
              className='relative h-10 w-10 rounded-full bg-zinc-200 bg-cover bg-center shadow-inner dark:bg-zinc-800 cursor-pointer'
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1612480797665-c96d261eae09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80)',
              }}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {showDropdown && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1'>
                  <a
                    href='#'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Appbar;