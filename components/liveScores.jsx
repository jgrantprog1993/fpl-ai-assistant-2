import React, { useEffect, useState } from 'react';
import teamLogos from '../utils/teamLogos';
import { sanitizeTeamName } from '../utils/teamLogos'; 
const LiveScores = () => {
  const [currentGameweek, setCurrentGameweek] = useState(null);
  const [liveFixtures, setLiveFixtures] = useState([]);

  useEffect(() => {
    const fetchCurrentGameweek = async () => {
      try {
        const response = await fetch('/api/bootstrap-static');
        const data = await response.json();
        const currentEvent = data.events.find(event => event.is_current);
        setCurrentGameweek(currentEvent ? currentEvent.id : null);
      } catch (error) {
        console.error('Error fetching current gameweek:', error);
      }
    };

    fetchCurrentGameweek();
  }, []);

  useEffect(() => {
    const fetchLiveFixtures = async () => {
      try {
        const response = await fetch('/api/fixtures');
        const fixtures = await response.json();
        const liveGames = fixtures.filter(fixture => 
          fixture.event === currentGameweek && !fixture.finished && fixture.minutes > 0
        );
        
        setLiveFixtures(liveGames);
      } catch (error) {
        console.error('Error fetching live fixtures:', error);
      }
    };

    if (currentGameweek) {
      fetchLiveFixtures();
      const interval = setInterval(fetchLiveFixtures, 30000);
      return () => clearInterval(interval);
    }
  }, [currentGameweek]);

  return (
    <div>
      {liveFixtures.length > 0 ? (
        <ul>
          {liveFixtures.map(fixture => (
            <li key={fixture.id} className="grid grid-cols-3 border-b py-2">
              <div className="flex items-center">
                <img src={teamLogos[fixture.team_h]} alt={`${fixture.team_h} logo`} className="w-6 h-6 mr-2" />
                <span className="font-bold">{fixture.team_h}</span>
              </div>
              <div className="justify-center" style={{ width: '150px', textAlign: 'center' }}>
                <span className="text-green-600 font-bold">
                  {fixture.team_h_score} - {fixture.team_a_score}
                </span>
              </div>
              <div className="flex items-center">
                <img src={teamLogos[fixture.team_a]} alt={`${fixture.team_a} logo`} className="w-6 h-6 mr-2" />
                <span className="font-bold">{fixture.team_a}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No live matches currently.</p>
      )}
    </div>
  );
};

export default LiveScores;