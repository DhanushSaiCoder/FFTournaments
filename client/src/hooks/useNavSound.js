// src/hooks/useNavSound.js
import { useRef } from 'react';

export default function useNavSound(src = '/sounds/click.wav', volume = 0.5) {
    const audioRef = useRef(null);

    // lazy-create the Audio object
    if (!audioRef.current) {
        const audio = new Audio(src);
        audio.preload = 'auto';
        audio.volume = volume;
        audioRef.current = audio;
    }

    const play = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = 0;
        audio.play().catch(() => {
            /* ignore play errors if user hasn’t interacted yet */
        });
    };

    return play;
}
