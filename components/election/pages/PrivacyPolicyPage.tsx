import React from 'react';
import Card from '../components/ui/Card.tsx';

const PrivacyPolicyPage: React.FC<{ onNavigate?: (path: string) => void; language?: any }> = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-white">سياسة الخصوصية</h1>
                </div>
                <Card>
                    <div className="space-y-4 text-slate-200">
                        <p>هذه الصفحة قيد الإنشاء.</p>
                        <p>نحن ملتزمون بحماية خصوصيتك. ستوضح سياستنا الكاملة كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك الشخصية.</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
