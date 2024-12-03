import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth, database } from '../utils/firebaseConfig';
import { ref, get } from 'firebase/database';
import Page from '@/components/page'
import Section from '@/components/section'


const MyTeam = () => {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTeamData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = ref(database, `users/${user.uid}/teams`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const teamId = Object.keys(snapshot.val())[0];
          
          console.log(teamId); // Assuming one team per user
          try {
            const response = await fetch(`/api/entry/${teamId}`);
            const data = await response.json();
            setTeamData(data);
          } catch (error) {
            console.error('Error fetching team data:', error);
          }
        } else {
          console.error('No team linked for this user');
          router.push('/addteam');
        }
      } else {
        console.error('No user is logged in');
        router.push('/login');
      }
      setLoading(false);
    };

    fetchTeamData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!teamData) {
    return <div>No team data available</div>;
  }

  return (
    <Page>
		<Section>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Team</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">{teamData.player_first_name} {teamData.player_last_name}</h2>
        <p><strong>Team Name:</strong> {teamData.name}</p>
        <p><strong>Favourite Team:</strong> {teamData.favourite_team}</p>
        <p><strong>Gameweek Started:</strong> {teamData.started_event}</p>
        <p><strong>Points:</strong> {teamData.summary_overall_points}</p>
        <p><strong>Transfers:</strong> {teamData.last_deadline_total_transfers}</p>
        <p><strong>Overall Rank:</strong> {teamData.summary_overall_rank}</p>
        <p><strong>Last Gameweek Rank:</strong> {teamData.summary_event_rank}</p>
        <p><strong>Last Gameweek Points:</strong> {teamData.summary_event_points}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
    </Section>
    </Page>
  );
};

export default MyTeam;
