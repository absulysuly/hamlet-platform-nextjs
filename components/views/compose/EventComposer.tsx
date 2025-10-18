import React, { useState } from 'react';
import { User } from '../../../types.ts';
import { CalendarIcon } from '../../icons/Icons.tsx';

interface EventComposerProps {
    user: User;
    onCreateEvent: (eventDetails: { title: string; date: string; location: string }) => void;
}

const EventComposer: React.FC<EventComposerProps> = ({ user, onCreateEvent }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = () => {
        if (title.trim() && date && location.trim()) {
            onCreateEvent({ title, date, location });
            setTitle('');
            setDate('');
            setLocation('');
        }
    };

    const inputClasses = "w-full p-2 text-sm border border-[var(--color-glass-border)] rounded-md bg-white/10 text-theme-text-base placeholder-theme-text-muted focus:outline-none focus:ring-1 focus:ring-primary";

    return (
        <div className="glass-card rounded-lg p-4">
            <div className="flex space-x-4">
                <img className="w-12 h-12 rounded-full ring-2 ring-white/50" src={user.avatarUrl} alt={user.name} />
                <div className="w-full space-y-3">
                    <h3 className="font-semibold text-theme-text-base">Create a New Event</h3>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Event Title"
                        className={inputClasses}
                    />
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Event Date and Time"
                        className={inputClasses}
                    />
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location (e.g., Baghdad Community Hall)"
                        className={inputClasses}
                    />
                </div>
            </div>
            <div className="flex justify-end items-center mt-4">
                <button
                    onClick={handleSubmit}
                    disabled={!title.trim() || !date || !location.trim()}
                    className="flex items-center space-x-2 px-6 py-2 font-bold bg-primary text-on-primary rounded-full transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <CalendarIcon className="w-5 h-5" />
                    <span>Create Event</span>
                </button>
            </div>
        </div>
    );
};

export default EventComposer;