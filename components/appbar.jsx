import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth, database } from '../utils/firebaseConfig'; // Import database
import { signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database'; // Import Firebase database functions

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
		// Fetch user data from the database
		const userRef = ref(database, 'users/' + user.uid);
		const snapshot = await get(userRef);
		if (snapshot.exists()) {
		  const data = snapshot.val();
		  setUserName({ firstName: data.firstName, lastName: data.lastName });
		  // Check if the user has a team linked
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
    <div className='fixed top-0 left-0 z-20 w-full bg-zinc-900 pt-safe'>
      <header className='border-b bg-zinc-100 px-safe dark:border-zinc-800 dark:bg-zinc-900'>
        <div className='mx-auto flex h-20 max-w-screen-md items-center justify-between px-6'>
          <Link href='/' legacyBehavior>
            <a className='font-medium'>FPL AI Assistant</a>
          </Link>

          <nav className='flex items-center space-x-6'>
            <div className='hidden sm:block'>
              <div className='flex items-center space-x-6'>
                <Link href={hasTeam ? '/myteam' : '/addteam'} legacyBehavior>
                  <a className='font-medium'>{hasTeam ? 'My Team' : 'Link Team'}</a>
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
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50'>
                  {isLoggedIn ? (
                    <>
                      <div className='px-4 py-2 text-sm text-gray-700'>
                        Logged in user: <br/> {userName.firstName} {userName.lastName}
                      </div>
                      <button
                        onClick={handleLogout}
                        className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href='/login' legacyBehavior>
                        <a className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                          Login
                        </a>
                      </Link>
                      <Link href='/signup' legacyBehavior>
                        <a className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                          Signup
                        </a>
                      </Link>
                    </>
                  )}
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