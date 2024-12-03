import React, { useEffect, useState } from 'react';
import Appbar from '../components/appbar'; // Import your Appbar component

const FixturesLiveScores = () => {
  const [fixtures, setFixtures] = useState([]);
  const [teams, setTeams] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await fetch('/api/fixtures');
        const data = await response.json();
        setFixtures(data);
      } catch (error) {
        console.error('Error fetching fixtures:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await fetch('/api/teams');
        const data = await response.json();
        const teams = data.teams;
        console.log(teams);
        const teamsMap = {};
        teams.forEach(team => {

          teamsMap[team.id] = team.name; // Map team ID to team name
        });
        console.log(teamsMap);
        setTeams(teamsMap);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchFixtures();
    fetchTeams();
  }, []);

  if (loading) {
    return <div>Loading fixtures...</div>;
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/background.jpg')" }}>
      <Appbar /> {/* Header */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Current Gameweek Fixtures</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {fixtures.length === 0 ? (
            <p>No fixtures available.</p>
          ) : (
            <ul className="space-y-4">
              {fixtures.map((fixture) => {
                const homeTeam = teams[fixture.team_h] || fixture.team_h; // Get home team name
                const awayTeam = teams[fixture.team_a] || fixture.team_a; // Get away team name
                const homeScore = fixture.team_h_score;
                const awayScore = fixture.team_a_score;
                const isFinished = fixture.finished;

                return (
                  <li key={fixture.id} className="flex justify-between items-center border-b py-2">
                    <div>
                      <span className="font-bold">{homeTeam}</span> vs <span className="font-bold">{awayTeam}</span>
                    </div>
                    <div>
                      {isFinished ? (
                        <span className="text-green-600">
                          {homeScore} - {awayScore}
                        </span>
                      ) : (
                        <span className="text-gray-500">Upcoming</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FixturesLiveScores;