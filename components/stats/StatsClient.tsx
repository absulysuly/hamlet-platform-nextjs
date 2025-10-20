'use client'
import { Stats } from "@/lib/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type StatsClientProps = {
    stats: Stats;
    dictionary: any;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function StatsClient({ stats, dictionary }: StatsClientProps) {

    const genderData = [
        { name: dictionary.candidate.male, value: stats.gender_distribution.Male },
        { name: dictionary.candidate.female, value: stats.gender_distribution.Female }
    ];

    const governorateData = stats.candidates_per_governorate
        .slice() // Create a copy to avoid mutating the original prop
        .sort((a, b) => (b.candidate_count || b.count || 0) - (a.candidate_count || a.count || 0));

    return (
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{dictionary.page.stats.candidatesPerGov}</h3>
                <div className="mt-6 h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={governorateData} layout="vertical" margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="governorate_name" width={80} tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="candidate_count" fill="#007A3D" name={dictionary.page.stats.numCandidates} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{dictionary.page.stats.genderDistribution}</h3>
                 <div className="mt-6 h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={genderData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {genderData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                             <Tooltip />
                             <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
