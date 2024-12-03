import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import { auth, database } from '../utils/firebaseConfig'; // Adjust the import path if necessary
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { set, ref } from 'firebase/database';
import Appbar from '../components/appbar'; // Import the Appbar component

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    favoriteTeam: '',
  });

  const router = useRouter(); // Initialize useRouter

  const premierLeagueTeams = [
    'Arsenal',
    'Aston Villa',
    'Bournemouth',
    'Brentford',
    'Brighton & Hove Albion',
    'Burnley',
    'Chelsea',
    'Crystal Palace',
    'Everton',
    'Fulham',
    'Liverpool',
    'Luton Town',
    'Manchester City',
    'Manchester United',
    'Newcastle United',
    'Nottingham Forest',
    'Sheffield United',
    'Tottenham Hotspur',
    'West Ham United',
    'Wolverhampton Wanderers',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Store additional user information in the database
      await set(ref(database, 'users/' + user.uid), {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        favoriteTeam: formData.favoriteTeam,
      });

      console.log('User registered successfully:', user);
      
      // Redirect to home page after successful signup
      router.push('/'); // Redirect to home page
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Appbar /> {/* Include the Appbar component */}
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-purple-700 shadow-md rounded-lg p-8 w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <select
              name="favoriteTeam"
              value={formData.favoriteTeam}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="">Select your favorite team</option>
              {premierLeagueTeams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;