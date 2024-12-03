import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import { auth } from '../utils/firebaseConfig'; // Adjust the import path if necessary
import { signInWithEmailAndPassword } from 'firebase/auth';
import Appbar from '../components/appbar'; // Import the Appbar component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in successfully:', user);
      
      // Redirect to home page after successful login
      router.push('/'); // Redirect to home page
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Appbar /> {/* Include the Appbar component */}
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-purple-700 shadow-md rounded-lg p-8 w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;