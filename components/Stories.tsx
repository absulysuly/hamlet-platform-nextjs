import React from 'react';
import { User } from '../types.ts';

interface StoriesProps {
    users: User[];
    onSelectStory: (profile: User) => void;
}

const StoryItem: React.FC<{ user: User; onSelectStory: (profile: User) => void; }> = ({ user, onSelectStory }) => (
    <button
        onClick={() => onSelectStory(user)}
        className="flex flex-col items-center flex-shrink-0 w-24 p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
        aria-label={`View stories by ${user.name}`}
    >
        <div className="relative">
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-secondary via-primary to-accent">
                 <img 
                    loading="lazy"
                    className="w-full h-full rounded-full object-cover border-2 border-[var(--color-background)]"
                    src={user.avatarUrl} 
                    alt={user.name} 
                 />
            </div>
        </div>
        <p className="text-xs text-center text-theme-text-muted group-hover:text-theme-text-base truncate w-full mt-2">{user.name}</p>
    </button>
);


const Stories: React.FC<StoriesProps> = ({ users, onSelectStory }) => {
    if (!users || users.length === 0) {
        return null;
    }

    return (
        <div className="w-full overflow-x-auto relative stories-container no-scrollbar">
            <div className="flex">
                {users.map((user) => (
                    <StoryItem key={user.id} user={user} onSelectStory={onSelectStory} />
                ))}
            </div>
        </div>
    );
};

export default Stories;