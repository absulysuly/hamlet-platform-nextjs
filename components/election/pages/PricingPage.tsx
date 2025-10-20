import React from 'react';
import Card from '../components/ui/Card.tsx';

const PricingPage: React.FC<{ onNavigate?: (path: string) => void; language?: any }> = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-white">الأسعار والخطط</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300">
                        حلول مصممة خصيصاً لتلبية احتياجات حملتك.
                    </p>
                </div>
                <Card>
                    <p className="text-center text-slate-200 py-16">
                        هذه الصفحة قيد الإنشاء. سيتم عرض تفاصيل خطط الأسعار هنا قريباً.
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default PricingPage;
