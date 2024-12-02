import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, database } from '../utils/firebaseConfig'; // Import Firebase config
import { ref, set } from 'firebase/database'; // Import Firebase database functions

const AddTeam = () => {
  const [teamId, setTeamId] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser; // Get the current user

    if (user) {
      try {
        // Add the team ID to the database for the current user
        const userTeamRef = ref(database, `users/${user.uid}/teams/${teamId}`);
        await set(userTeamRef, { teamId });

        console.log('Team added successfully:', teamId);

        // Redirect to the team page
        router.push('/myteam');
      } catch (error) {
        console.error('Error adding team:', error);
      }
    } else {
      console.error('No user is logged in');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Your Team</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          placeholder="Enter Team ID"
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Add Team
        </button>
      </form>
    </div>
  );
};

export default AddTeam;