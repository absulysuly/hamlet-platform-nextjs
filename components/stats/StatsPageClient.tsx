"use client";
import React, { useEffect, useState } from 'react';
import { fetchStats } from '@/lib/api';
import { FaUsers, FaUserCheck, FaMapMarkedAlt } from 'react-icons/fa';
import StatsClient from '@/components/stats/StatsClient';

type Props = {
  dictionary: any;
};

const StatCard: React.FC<{ icon: React.ElementType; title: string; value: string | number }> = ({ icon: Icon, title, value }) => (
  <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
    <div className="flex items-center space-x-4 rtl:space-x-reverse">
      <div className="rounded-full bg-green-100 p-3 dark:bg-green-800/50">
        <Icon className="h-6 w-6 text-green-600 dark:text-green-300" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{typeof value === 'number' ? value.toLocaleString(undefined) : value}</p>
      </div>
    </div>
  </div>
);

export default function StatsPageClient({ dictionary }: Props) {
  const [stats, setStats] = useState<any>({ total_candidates: 0, gender_distribution: { Male: 0, Female: 0 }, candidates_per_governorate: [] });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const s = await fetchStats();
        if (mounted) setStats(s || {});
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    })();
    return () => { mounted = false };
  }, []);

  const mainStats = [
    { icon: FaUsers, title: dictionary.page.stats.totalCandidates, value: stats?.total_candidates || 0 },
    { icon: FaUserCheck, title: dictionary.page.stats.maleCandidates, value: stats?.gender_distribution?.Male || 0 },
    { icon: FaUserCheck, title: dictionary.page.stats.femaleCandidates, value: stats?.gender_distribution?.Female || 0 },
    { icon: FaMapMarkedAlt, title: dictionary.page.stats.governorates, value: stats?.candidates_per_governorate?.length || 0 },
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{dictionary.page.stats.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">{dictionary.page.stats.description}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mainStats.map((stat) => (
          <StatCard key={stat.title} icon={stat.icon} title={stat.title} value={stat.value} />
        ))}
      </div>

      <StatsClient stats={stats} dictionary={dictionary} />
    </div>
  );
}

