import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4001',
});

export const fetchCandidates = async (params?: any) => {
  try {
    const response = await api.get('/api/candidates', { params });
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    return { data: [], total: 0 };
  }
};

export const fetchStats = async () => {
  try {
    const response = await api.get('/api/stats');
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    return { total_candidates: 0, gender_distribution: { Male: 0, Female: 0 } };
  }
};

export const fetchCandidateById = async (id: string) => {
  try {
    const response = await api.get(`/api/candidates/${id}`);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    return { id, name: 'Unknown' };
  }
};

export const fetchGovernorates = async () => {
  try {
    const response = await api.get('/api/governorates');
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    return [];
  }
};

export const fetchTrendingCandidates = async () => {
  try {
    const response = await api.get('/api/candidates/trending');
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    return [];
  }
};



