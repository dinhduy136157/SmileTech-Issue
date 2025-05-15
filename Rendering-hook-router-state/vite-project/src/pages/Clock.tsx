import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Timer: React.FC = () => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [stamps, setStamps] = useState<string[]>([]);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/home');
    };
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (sec: number): string => {
        const minutes = Math.floor(sec / 60);
        const seconds = sec % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleStop = () => {
        setIsRunning(false);
        const currentTime = formatTime(seconds);
        setStamps(prev => [...prev, currentTime]);
    };

    const handleReset = () => {
        setIsRunning(false);
        setSeconds(0);
        setStamps([]);
    };

    return (
        <div>
            <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 text-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">
                    Timer: {formatTime(seconds)}
                </h1>

                <div className="space-x-2 mb-6">
                    <button
                        onClick={() => setIsRunning(!isRunning)}
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                        {isRunning ? 'Pause' : 'Resume'}
                    </button>

                    <button
                        onClick={handleStop}
                        className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
                    >
                        Stop & Save
                    </button>

                    <button
                        onClick={handleReset}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    >
                        Reset
                    </button>
                </div>

                <div className="text-left">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Saved Timestamps:</h2>
                    <ul className="list-disc pl-5 text-gray-600">
                        {stamps.map((stamp, index) => (
                            <li key={index}>
                                STT {index + 1}: {stamp}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            <button
                onClick={handleClick}
                className="mt-50 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
            >
                Đi đến Bài 3
            </button>
        </div>

    );

};

export default Timer;
