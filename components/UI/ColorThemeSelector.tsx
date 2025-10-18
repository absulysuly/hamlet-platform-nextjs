import React from 'react';
// Fix: The 'Language' type is defined in 'types.ts', not 'colorThemes.ts'. This resolves the module export error.
import { colorThemes, ThemeName } from '../../utils/colorThemes.ts';
import { Language } from '../../types.ts';
import { UI_TEXT } from '../../translations.ts';

interface ColorThemeSelectorProps {
    currentTheme: ThemeName;
    onChangeTheme: (theme: ThemeName) => void;
    language: Language;
}

const themeNames: { id: ThemeName; name: string }[] = [
    { id: 'euphratesTeal', name: 'Euphrates Teal' },
    { id: 'desertRose', name: 'Desert Rose' },
    { id: 'tigrisBlue', name: 'Tigris Blue' },
    { id: 'iraqiFlag', name: 'Iraqi Flag' },
    { id: 'oliveUnity', name: 'Olive Unity' },
    { id: 'sandstoneNeutral', name: 'Sandstone' },
];

const ColorThemeSelector: React.FC<ColorThemeSelectorProps> = ({ currentTheme, onChangeTheme, language }) => {
    const texts = UI_TEXT[language];
    return (
        <div>
            <h4 className="font-semibold mb-3">{texts.colorTheme}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {themeNames.map(({ id, name }) => (
                    <button
                        key={id}
                        onClick={() => onChangeTheme(id)}
                        className={`p-2 rounded-lg border-2 transition-all ${
                            currentTheme === id ? 'border-primary' : 'border-transparent hover:border-primary/50'
                        }`}
                        aria-pressed={currentTheme === id}
                    >
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-6 rounded flex overflow-hidden">
                                <div style={{ backgroundColor: colorThemes[id]['--color-primary'] }} className="w-1/2 h-full"></div>
                                <div style={{ backgroundColor: colorThemes[id]['--color-secondary'] }} className="w-1/2 h-full"></div>
                            </div>
                            <span className="text-sm font-medium">{name}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ColorThemeSelector;