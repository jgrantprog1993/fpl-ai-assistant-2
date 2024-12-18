import React, { useEffect, useState } from 'react';
import Appbar from '../components/appbar'; // Import your Appbar component
import LiveScores from '../components/liveScores'; // Import the LiveScores component
import teamLogos from '../utils/teamLogos'; // Adjust the path as necessary
import { sanitizeTeamName } from '../utils/teamLogos'; 
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import MatchStats from './matchStats';

const FixturesLiveScores = () => {
  const [fixtures, setFixtures] = useState([]);
  const [teams, setTeams] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentGameweek, setCurrentGameweek] = useState(0); // Current gameweek
  const [allFixtures, setAllFixtures] = useState([]); // All fixtures
  const [dropdownOpen, setDropdownOpen] = useState([]);

  useEffect(() => {
    const fetchCurrentGameweek = async () => {
      try {
        const response = await fetch('/api/bootstrap-static');
        const data = await response.json();
        const currentEvent = data.events.find(event => event.is_current);
        return currentEvent ? currentEvent.id : 0; // Get the current gameweek ID
      } catch (error) {
        console.error('Error fetching current gameweek:', error);
        return 0; // Fallback to 0 if there's an error
      }
    };

    const fetchFixtures = async () => {
      try {
        const response = await fetch('/api/fixtures');
        const data = await response.json();
        setAllFixtures(data); // Store all fixtures
        const currentGW = await fetchCurrentGameweek(); // Fetch current gameweek
        setCurrentGameweek(currentGW); // Set current gameweek
        setFixtures(data.filter(fixture => fixture.event === currentGW)); // Filter for current gameweek
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
        const teamsMap = {};
        teams.forEach(team => {
          teamsMap[team.id] = team.name; // Map team ID to team name
        });
        setTeams(teamsMap);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchFixtures();
    fetchTeams();
  }, []);

  const handlePreviousGameweek = () => {
    if (currentGameweek > 1) {
      setCurrentGameweek(currentGameweek - 1);
      setFixtures(allFixtures.filter(fixture => fixture.event === currentGameweek - 1));
    }
  };

  const handleNextGameweek = () => {
    if (currentGameweek < 38) {
      setCurrentGameweek(currentGameweek + 1);
      setFixtures(allFixtures.filter(fixture => fixture.event === currentGameweek + 1));
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  if (loading) {
    return <div>Loading fixtures...</div>;
  }

  return (
    <div className="min-h-screen bg-cover bg-center" >
      <Appbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Gameweek {currentGameweek} Fixtures</h1>
        <div className="flex justify-between mb-4">
          <button onClick={handlePreviousGameweek} disabled={currentGameweek <= 1} className="p-2 bg-blue-500 text-white rounded">
            Previous Gameweek
          </button>
          {currentGameweek < 38 && (
            <button onClick={handleNextGameweek} className="p-2 bg-blue-500 text-white rounded">
              Next Gameweek
            </button>
          )}
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          {fixtures.length === 0 ? (
            <p>No fixtures available for this gameweek.</p>
          ) : (
            <ul className="space-y-4">
              {fixtures.map((fixture) => {
                const homeTeam = sanitizeTeamName(teams[fixture.team_h]) || sanitizeTeamName(fixture.team_h);
                const awayTeam = sanitizeTeamName(teams[fixture.team_a]) || sanitizeTeamName(fixture.team_a);
                const homeScore = fixture.team_h_score;
                const awayScore = fixture.team_a_score;
                const isFinished = fixture.finished_provisional;
                const matchDateTime = new Date(fixture.kickoff_time);
                const fixtureStats = fixture.stats;
                // console.log(fixture.finished_provisional, fixture.minutes);
                // console.log(fixture.finished);
                
                if (!fixture.finished_provisional && fixture.minutes > 0) {
                  return <LiveScores key={fixture.id} />;
                } else {
                return (
                  <li key={fixture.id} className="grid grid-cols-9 border-b py-2" onClick={() => toggleDropdown(fixture.id)}>
                  <div className="col-span-2 flex items-center">
                    <img src={teamLogos[homeTeam]} alt={`${homeTeam} logo`} className="w-6 h-6 mr-2" />
                    <span className="font-bold whitespace-nowrap">{homeTeam}</span>
                  </div>
                  <div className="col-span-4 justify-center text-center">
                    {isFinished ? (
                      <span className="text-green-600 font-bold">
                        {homeScore} - {awayScore}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        <p className='block'>{matchDateTime.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} </p>
                        <p className='block'>{matchDateTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 flex items-center">
                    <img src={teamLogos[awayTeam]} alt={`${awayTeam} logo`} className="w-6 h-6 mr-2" />
                    <span className="font-bold whitespace-nowrap">{awayTeam}</span>
                  </div>
                  <div className="col-span-1 flex justify-end items-center">
                    {dropdownOpen[fixture.id] ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                  </div>
                  {dropdownOpen[fixture.id] && (
                    // <MatchStats key={fixture.id}></MatchStats>
                    <div className="overflow-hidden col-span-8 grid grid-cols-2 divide-x divide-gray-200">
                     <div className="p-4">
                     <MatchStats fixtureId={fixture.id} stats={fixture.stats} />
                     </div>
                    </div>
                  )}
                </li>
                );
              }
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FixturesLiveScores;