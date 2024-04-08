import React from 'react';

function HandwritingViewer({ imageUrl, caption, goToPreviousLetter, goToNextLetter}) {
    return (
        <div>
            <img src={imageUrl} alt="Image" className="w-100 h-100" style={{ objectFit: 'cover' }} />
            <p>{caption}</p>
            <div className="m-4 flex justify-center">
                <button className="mr-4 px-4 py-2 bg-purple-300 text-white rounded" onClick={goToPreviousLetter}>Previous</button>
                <button className="ml-4 px-4 py-2 bg-purple-300 text-white rounded" onClick={goToNextLetter}>Next</button>
            </div>
        </div>
    );
}

export default HandwritingViewer;