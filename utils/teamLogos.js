const teamLogos = {
    'Liverpool': '/images/logos/liverpool.png',
    'Arsenal': '/images/logos/arsenal.png',
    'Chelsea': '/images/logos/chelsea.png',
    'Man City': '/images/logos/man_city.png',
    'Man Utd': '/images/logos/man_utd.png',
    'Spurs': '/images/logos/spurs.png',
    'Aston Villa': '/images/logos/aston_villa.png',
    'Bournemouth': '/images/logos/bournemouth.png',
    'Brentford': '/images/logos/brentford.png',
    'Brighton': '/images/logos/brighton.png',
    'Leicester': '/images/logos/leicester.png',
    'Crystal Palace': '/images/logos/crystal_palace.png',
    'Everton': '/images/logos/everton.png',
    'Fulham': '/images/logos/fulham.png',
    'Southampton': '/images/logos/southampton.png',
    'Newcastle': '/images/logos/newcastle.png',
    'Nottm Forest': '/images/logos/nott_forest.png',
    'Ipswich': '/images/logos/ipswich.png',
    'West Ham': '/images/logos/west_ham.png',
    'Wolves': '/images/logos/wolves.png'
  };

export function sanitizeTeamName(teamName) {
    return teamName.replace(/'/g, ""); // Removes all apostrophes
  }
  
  export default teamLogos;