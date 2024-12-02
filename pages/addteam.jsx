import React, { useState } from 'react';

const AddTeam = () => {
  const [teamId, setTeamId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to add the team using the FPL API
    console.log('Team ID:', teamId);
    // You can add API call logic here
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