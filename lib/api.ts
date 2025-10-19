import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4001',
});

export const fetchCandidates = async (params?: any) => {
  const response = await api.get('/api/candidates', { params });
  const data = response.data;
  
  console.log('API Response:', data);
  
  // Handle {success: true, data: [...]} format from backend
  if (data && data.success && Array.isArray(data.data)) {
    return { data: data.data, total: data.total };
  }
  
  // Handle other formats as fallback
  return { 
    data: Array.isArray(data) ? data : data?.data || [], 
    total: data?.total || data?.length || 0 
  };
};

export const fetchTrendingCandidates = async () => {
  const response = await api.get('/api/candidates/trending');
  const data = response.data;
  return Array.isArray(data) ? data : data?.data || [];
};

export const fetchStats = async () => {
  const response = await api.get('/api/stats');
  const data = response.data;
  return data?.data || data || {};
};

export const fetchGovernorates = async () => {
  const response = await api.get('/api/governorates');
  const data = response.data;
  return Array.isArray(data) ? data : data?.data || [];
};

export const fetchCandidateById = async (id: string) => {
  const response = await api.get(`/api/candidates/${id}`);
  const data = response.data;
  return data?.data || data;
};
