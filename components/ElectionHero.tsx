import React from 'react';
import IraqFlagIcon from './election/icons/IraqFlagIcon.tsx';
import { Language } from '../types.ts';
import { UI_TEXT } from '../translations.ts';

const ElectionHero: React.FC<{ language: Language }> = ({ language }) => {
    const texts = UI_TEXT[language];
    return (
        <div className="w-full hero-election-bg text-white text-center rounded-lg shadow-lg flex flex-col justify-center items-center aspect-square md:aspect-[2/1] lg:aspect-[3/1] p-4 sm:p-6">
             {/* The layout is reversed for RTL, but the visual order from the screenshot should be preserved */}
            <div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-6" dir="rtl">
                 {/* Text block */}
                 <div className="text-center sm:text-right">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">{texts.iraqiElections} {texts.electionYear}</h1>
                    <p className="mt-2 text-lg text-slate-200 max-w-lg">{texts.dashboardSubtitle}</p>
                 </div>
                 {/* Flag block */}
                 <div className="flex-shrink-0">
                    <div className="w-40 h-auto shadow-md rounded border-2 border-white/50 overflow-hidden">
                        <IraqFlagIcon />
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default ElectionHero;