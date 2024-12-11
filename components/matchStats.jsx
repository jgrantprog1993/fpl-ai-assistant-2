import React from 'react';

const MatchStats = ({ fixtureId, stats }) => {
    const renderStatDetails = (statDetails) => {
        return (
            <ul>
                {statDetails.map(stat => (
                    <li key={stat.identifier}>
                        <h3>{stat.identifier}</h3>
                        <p>Home:</p>
                        <ul>
                            {stat.h.map(item => (
                                <li key={item.element}>{`Player ${item.element}: ${item.value} ${stat.identifier}`}</li>
                            ))}
                        </ul>
                        <p>Away:</p>
                        <ul>
                            {stat.a.map(item => (
                                <li key={item.element}>{`Player ${item.element}: ${item.value} ${stat.identifier}`}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            <h2>Match Stats for Fixture ID: {fixtureId}</h2>
            {renderStatDetails(stats)}
        </div>
    );
};

export default MatchStats;