export interface Candidate {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  governorate: string;
  party: string;
  nomination_type: string;
  ballot_number: number;
}

export interface PaginatedCandidates {
    data: Candidate[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface Governorate {
  name: string;
  nameArabic: string;
  candidates_count: number;
}

export interface Stats {
    total_candidates: number;
    gender_distribution: {
        Male: number;
        Female: number;
    };
    candidates_per_governorate: {
        governorate: string;
        count: number;
    }[];
}
