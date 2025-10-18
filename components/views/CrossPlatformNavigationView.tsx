import React from 'react';
import { AppTab } from '../../types.ts';
import { QrCodeIcon, UsersIcon, LifebuoyIcon } from '../icons/Icons.tsx';

interface CrossPlatformNavigationViewProps {
    onNavigateToCandidates: () => void;
    onQrScan: () => void;
}

const CrossPlatformNavigationView: React.FC<CrossPlatformNavigationViewProps> = ({ onNavigateToCandidates, onQrScan }) => {
  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-arabic text-white">التنقل بين المنصات</h1>
            <p className="text-slate-200 mt-1">
                Use these links to navigate to key areas of the platform or scan a QR code to discover candidates.
            </p>
        </div>

        <div className="platform-nav">
            <button onClick={onNavigateToCandidates} className="nav-link glass-card">
                <UsersIcon className="w-8 h-8 text-primary" />
                <span className="font-arabic">عرض المرشحين الرسميين</span>
            </button>
      
            <a href="/discover?party=sadrist&gov=basra" className="nav-link glass-card">
                <LifebuoyIcon className="w-8 h-8 text-secondary" />
                <span className="font-arabic">استكشاف التيار الصدري في البصرة</span>
            </a>
      
            <div className="qr-banner glass-card">
                <div className="flex-grow">
                    <h3 className="font-bold text-lg font-arabic">هل لديك رمز QR؟</h3>
                    <p className="text-sm text-theme-text-muted font-arabic">اسكن QR لرؤية مرشحي حزبك في محافظتك!</p>
                </div>
                <button onClick={onQrScan} className="qr-scan-btn">
                    <QrCodeIcon className="w-8 h-8" />
                    <span className="font-arabic">امسح الرمز</span>
                </button>
            </div>
        </div>
    </div>
  );
};

export default CrossPlatformNavigationView;
