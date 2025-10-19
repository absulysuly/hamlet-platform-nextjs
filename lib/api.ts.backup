import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4001',
});

// Tolerant response unwrapper that handles multiple response formats
const unwrap = (response: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.debug('API response:', response.data);
  }
  
  // Handle different response formats:
  // 1. { success: true, data: ... }
  // 2. { data: ... }
  // 3. Raw arrays or objects
  const data = response.data?.data || response.data;
  return data;
};

// Safe array normalizer with fallbacks
const normalizeArray = (data: any, fallback: any[] = []): any[] => {
  if (Array.isArray(data)) return data;
  if (data?.candidates && Array.isArray(data.candidates)) return data.candidates;
  if (data?.data && Array.isArray(data.data)) return data.data;
  return fallback;
};

// Safe object normalizer with fallbacks
const normalizeObject = (data: any, fallback: any = {}): any => {
  if (data && typeof data === 'object' && !Array.isArray(data)) return data;
  return fallback;
};

export const fetchCandidates = async (params?: any) => {
  try {
    const response = await api.get('/api/candidates', { params });
    const data = unwrap(response);
    return normalizeArray(data, []);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to fetch candidates:', error);
    }
    return [];
  }
};

export const fetchTrendingCandidates = async () => {
  try {
    const response = await api.get('/api/trending');
    const data = unwrap(response);
    return normalizeArray(data, []);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to fetch trending candidates:', error);
    }
    return [];
  }
};

export const fetchStats = async () => {
  try {
    const response = await api.get('/api/stats');
    const data = unwrap(response);
    return normalizeObject(data, {
      total: 0,
      byGender: { male: 0, female: 0 },
      byGovernorate: []
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to fetch stats:', error);
    }
    return {
      total: 0,
      byGender: { male: 0, female: 0 },
      byGovernorate: []
    };
  }
};

export const fetchGovernorates = async () => {
  try {
    const response = await api.get('/api/governorates');
    const data = unwrap(response);
    return normalizeArray(data, []);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to fetch governorates:', error);
    }
    return [];
  }
};

export const fetchCandidateById = async (id: string) => {
  try {
    const response = await api.get(`/api/candidates/${id}`);
    const data = unwrap(response);
    return normalizeObject(data, null);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to fetch candidate by ID:', error);
    }
    return null;
  }
};
