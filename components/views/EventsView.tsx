import React, { useState, useEffect } from 'react';
import { Governorate, Event, Language } from '../../types.ts';
import { CalendarIcon, LocationIcon } from '../icons/Icons.tsx';
import * as api from '../../services/apiService.ts';
import { UI_TEXT } from '../../translations.ts';
import Spinner from '../Spinner.tsx';

interface EventsViewProps {
    selectedGovernorate: Governorate | 'All';
    selectedParty: string | 'All';
    language: Language;
}

const EventCard: React.FC<{ event: Event, language: Language }> = ({ event, language }) => {
    const texts = UI_TEXT[language];
    const eventDate = new Date(event.date);
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

    return (
        <div className="glass-card rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row">
            <div className="p-5 flex-grow">
                <p className="text-sm font-bold text-primary">{eventDate.toLocaleDateString(language, dateOptions)}</p>
                <h3 className="text-xl font-bold text-theme-text-base mt-1">{event.title}</h3>

                <div className="mt-3 space-y-2 text-sm text-theme-text-muted">
                    <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-5 h-5 flex-shrink-0" />
                        <span>{eventDate.toLocaleTimeString(language, timeOptions)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <LocationIcon className="w-5 h-5 flex-shrink-0" />
                        <span>{event.location}</span>
                    </div>
                </div>
                
                 <div className="mt-4 flex items-center space-x-3">
                    <img src={event.organizer.avatarUrl} alt={event.organizer.name} className="w-8 h-8 rounded-full" />
                    <span className="text-xs font-semibold text-theme-text-muted">{event.organizer.name}</span>
                </div>
            </div>
            <div className="bg-black/20 px-5 py-4 flex items-center justify-center">
                 <button className="w-full sm:w-auto px-6 py-2 text-sm font-bold text-on-primary bg-primary rounded-full transition-all hover:brightness-110">
                    {texts.rsvp}
                </button>
            </div>
        </div>
    );
};

const EventsView: React.FC<EventsViewProps> = ({ selectedGovernorate, selectedParty, language }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const texts = UI_TEXT[language];

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const data = await api.getEvents({ governorate: selectedGovernorate, party: selectedParty });
                setEvents(data);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, [selectedGovernorate, selectedParty]);

    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold text-white mb-4">{texts.upcomingEvents}</h2>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="space-y-6">
                    {events.length > 0 ? (
                        events.map(event => <EventCard key={event.id} event={event} language={language} />)
                    ) : (
                        <p className="text-theme-text-muted text-center mt-8">
                            {texts.noEventsScheduled}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default EventsView;
