import { fetchStats } from '@/lib/api';
import { FaUsers, FaUserCheck, FaMapMarkedAlt } from 'react-icons/fa';

type HomeStatsProps = {
  dictionary: any;
};

// Safe number formatter with fallbacks
const safeFormatNumber = (value: any): string => {
  if (typeof value === 'number' && !isNaN(value)) {
    return value.toLocaleString();
  }
  if (typeof value === 'string' && !isNaN(Number(value))) {
    return Number(value).toLocaleString();
  }
  return '0';
};

// Safe array length getter
const safeArrayLength = (arr: any): number => {
  return Array.isArray(arr) ? arr.length : 0;
};

export default async function HomeStats({ dictionary }: HomeStatsProps) {
  // Fetch stats with defensive error handling
  let stats: any = {};
  try {
    stats = await fetchStats();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to fetch stats:', error);
    }
    stats = {};
  }
  
  // Normalize stats object to handle different response formats with safe defaults
  const s = stats || {};
  const totalCandidates = s.total || s.total_candidates || 0;
  const maleCandidates = s.byGender?.male || s.gender_distribution?.Male || 0;
  const femaleCandidates = s.byGender?.female || s.gender_distribution?.Female || 0;
  const governoratesCount = safeArrayLength(s.byGovernorate || s.candidates_per_governorate);
  
  const statsData = [
    { 
      name: dictionary?.totalCandidates || 'Total Candidates', 
      value: safeFormatNumber(totalCandidates), 
      icon: FaUsers 
    },
    { 
      name: dictionary?.maleCandidates || 'Male Candidates', 
      value: safeFormatNumber(maleCandidates), 
      icon: FaUserCheck 
    },
    { 
      name: dictionary?.femaleCandidates || 'Female Candidates', 
      value: safeFormatNumber(femaleCandidates), 
      icon: FaUserCheck 
    },
    { 
      name: dictionary?.participatingGovernorates || 'Participating Governorates', 
      value: String(governoratesCount), 
      icon: FaMapMarkedAlt 
    },
  ];

  return (
    <div className="bg-gray-50 py-16 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat) => (
            <div key={stat.name}>
              <stat.icon className="mx-auto h-12 w-12 text-green-600 dark:text-green-400" />
              <p className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="mt-2 text-lg font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



