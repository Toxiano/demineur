import React from 'react';

interface TimerProps {
    time: number;
}

const TimerComponent = ({time}: TimerProps) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className="bg-gray-100 p-2 rounded-lg text-center">
            <p className="text-gray-800 font-bold text-lg mb-2">Temps: </p>
            <p className="text-gray-800 font-bold text-3xl">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
        </div>
    );
};

export default TimerComponent;
