import React from 'react';

const Options = (props: any) => {
    const handleDifficultyChange = (e: any) => {
        props.onDifficultyChange(e.target.value);
    };

    return (
        <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">Choisissez la difficulté :</h2>
            <div className="relative inline-flex rounded-md">
                <select
                    className="border-gray-400 bg-white px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleDifficultyChange}
                >
                    <option value="beginner">Débutant</option>
                    <option value="intermediate">Intermédiaire</option>
                    <option value="expert">Expert</option>
                    <option value="master">Maître</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fillRule="evenodd"
                              d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                              clipRule="evenodd"/>
                    </svg>
                </div>
            </div>
        </div>
    );

};

export default Options;
