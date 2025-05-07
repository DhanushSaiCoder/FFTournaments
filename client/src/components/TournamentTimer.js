import React, { useState, useEffect } from 'react';
import '../styles/TournamentTimer.css';

const TournamentTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    useEffect(() => {
        const targetDate = new Date('2025-05-07T19:00:00'); // Replace with your actual tournament date/time

        const updateTimer = () => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference <= 0) {
                setTimeLeft({
                    days: '00',
                    hours: '00',
                    minutes: '00',
                    seconds: '00',
                });
                return;
            }

            const days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0');
            const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0');
            const minutes = String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, '0');
            const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, '0');

            setTimeLeft({ days, hours, minutes, seconds });
        };

        const timerInterval = setInterval(updateTimer, 1000);

        // Call immediately to avoid 1s delay
        updateTimer();

        return () => clearInterval(timerInterval);
    }, []);

    return (
        <div className='tournamentTimerContainer'>
            <h2>TOURNAMENT STARTS IN:</h2>
            <div className='timerDiv'>
                <div className='timerBox'>
                    <p className='timerValue dayValue'>{timeLeft.days}</p>
                    <p className='timerLabel'>DAYS</p>
                </div>
                <h2>:</h2>
                <div className='timerBox'>
                    <p className='timerValue hourValue'>{timeLeft.hours}</p>
                    <p className='timerLabel'>HOURS</p>
                </div>
                <h2>:</h2>
                <div className='timerBox'>
                    <p className='timerValue minuteValue'>{timeLeft.minutes}</p>
                    <p className='timerLabel'>MINUTES</p>
                </div>
                <h2>:</h2>
                <div className='timerBox'>
                    <p className='timerValue secondValue'>{timeLeft.seconds}</p>
                    <p className='timerLabel'>SECONDS</p>
                </div>
            </div>
        </div>
    );
};

export default TournamentTimer;
