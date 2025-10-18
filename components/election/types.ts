// Fix: Defining types for the election portal part of the application.
export interface Candidate {
    id: string;
    name: string;
    party: string;
    imageUrl: string;
    verified: boolean;
}

export interface NewsArticle {
    id: string;
    title: string;
    summary: string;
    date: string;
}

export interface PoliticalParty {
    id: string;
    name: string;
    description: string;
    leader: string;
    founded: number;
    logoUrl: string;
}
