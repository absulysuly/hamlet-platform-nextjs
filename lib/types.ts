export interface Candidate {
  id: string;
  name?: string;
  gender?: string;
  governorate?: string;
  party?: string;
  nomination_type?: string;
  ballot_number?: number;
}

export interface PaginatedCandidates {
    data: Candidate[];
    total: number;
    page?: number;
    limit?: number;
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
        count?: number;
        candidate_count?: number;
    }[];
}
