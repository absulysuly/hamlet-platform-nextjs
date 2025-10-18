import { colorThemes } from './utils/colorThemes.ts';

// --- ENUMS & LITERAL TYPES ---

export enum UserRole {
    Voter = 'Voter',
    Candidate = 'Candidate',
}

export enum AppTab {
    Home = 'Home',
    Discover = 'Discover',
    Settings = 'Settings',
    UserProfile = 'My Profile',
    CandidateProfile = 'Candidate Profile',
    Dashboard = 'Dashboard',

    // For HomeView tabs
    Feed = 'Feed',
    Real = 'Real',
    Candidates = 'Candidates',
    Whisper = 'Whisper',
    Women = 'Women',
    Minorities = 'Minorities',
    Components = 'Components',
}

export interface GovernorateInfo {
    id: number;
    name: string; // Arabic name
    enName: Governorate;
    slug: string;
    region: 'north' | 'south' | 'central' | 'west';
}

export type Language = 'en' | 'ar' | 'ku';

// Hardcode the type to remove dependency on a constant array, making it the source of truth for the type.
export type Governorate = 'Baghdad' | 'Basra' | 'Nineveh' | 'Erbil' | 'Anbar' | 'Dhi Qar' | 'Salah al-Din' | 'Diyala' | 'Kirkuk' | 'Sulaymaniyah' | 'Babil' | 'Wasit' | 'Maysan' | 'Muthanna' | 'Qadisiyyah' | 'Najaf' | 'Karbala' | 'Dohuk';


export type MainContentTab = AppTab.Feed | AppTab.Real | AppTab.Candidates | AppTab.Whisper | AppTab.Women | AppTab.Minorities | AppTab.Components;

export type HomeViewMode = 'Social' | 'Election';

export type ThemeName = keyof typeof colorThemes;

export enum PostPrivacy {
    Public = 'Public',
    Friends = 'Friends',
    Private = 'Private',
}


// --- INTERFACES ---

export interface User {
    id: string;
    name: string;
    role: UserRole;
    avatarUrl: string;
    verified: boolean;
    party: string;
    governorate: Governorate;
    isElected?: boolean;
    bio?: string;
    partySlug?: string;
    governorateSlug?: string;
    email?: string;
    emailVerified?: boolean;
    gender?: 'Male' | 'Female';
}

export interface Post {
    id: string;
    author: User;
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
    shares: number;
    type: 'Post' | 'Reel';
    mediaUrl?: string;
    isSponsored?: boolean;
    privacy?: PostPrivacy;
}

export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    organizer: User;
}

export interface Article {
    id: string;
    title: string;
    source: string;
    timestamp: string;
    authorName: string;
    contentSnippet: string;
    url: string;
}

export interface Debate {
    id: string;
    title: string;
    topic: string;
    scheduledTime: string;
    isLive: boolean;
    participants: User[];
    reactions: {
        justice: number;
        idea: number;
        warning: number;
    };
}

export interface TeaHouseTopic {
    id: string;
    title: string;
    lastMessage: string;
    participants: number;
    lastActivity: string;
    category?: string;
    language?: Language;
}

export type MessageType = 'text' | 'image' | 'video' | 'document';

export interface TeaHouseMessage {
    id: string;
    author: User;
    type: MessageType;
    content: string; // Text content or file name
    mediaUrl?: string; // URL for voice, image, video, doc
    timestamp: string;
}