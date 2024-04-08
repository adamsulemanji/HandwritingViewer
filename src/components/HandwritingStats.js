import React from 'react';


function HandwritingStats({data}) {
    if (data.length === 0) {
        return <div>No data available</div>;
    }
    const object = data[0];
    return (
        <div>
            <h1>Handwriting Stats</h1>
            <p>Number of strokes: {object.number_of_strokes}</p>
            <p>Time taken: {object.time_taken}</p>
            <p>Teacher: {object.teacher}</p>
            <p>Date: {object.date}</p>
        </div>
    );
}

export default HandwritingStats;