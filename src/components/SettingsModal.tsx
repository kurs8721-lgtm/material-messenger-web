import React from 'react';
import { X, Palette, Check, Sparkles, Moon, Sun, Bell, Shield, Smartphone } from 'lucide-react';
import { ThemePalette, User } from '../types';
import { THEME_PALETTES } from '../data/mockData';

interface SettingsModalProps {
  onClose: () => void;
  currentUser: User;
  activeTheme: ThemePalette;
  onSelectTheme: (theme: ThemePalette) => void;
  density: 'comfortable' | 'compact';
  onToggleDensity: (d: 'comfortable' | 'compact') => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  currentUser,
  activeTheme,
  onSelectTheme,
  density,
  onToggleDensity,
  onResetData,
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-m3-surface-container-high rounded-[28px] m3-elevation-5 overflow-hidden flex flex-col border border-m3-outline-variant/30">
        {/* Header */}
        <div className="p-5 pb-3 flex items-center justify-between border-b border-m3-outline-variant/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-m3-primary-container text-m3-on-primary-container flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-medium text-m3-on-surface">Settings & Material You</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-m3-on-surface-variant hover:bg-m3-surface-container-highest"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* User profile card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-m3-surface border border-m3-outline-variant/30">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-m3-primary/40 shadow-xs"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-m3-on-surface truncate">
                {currentUser.name}
              </h3>
              <p className="text-xs text-m3-on-surface-variant truncate">{currentUser.email}</p>
              <p className="text-xs text-m3-primary mt-1 font-medium">{currentUser.statusText}</p>
            </div>
          </div>

          {/* Material You Dynamic Color Palettes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-m3-on-surface flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-m3-primary" /> Dynamic Color Theme (Material You)
                </h4>
                <p className="text-xs text-m3-on-surface-variant">
                  Derived from tonal elevation & primary hue algorithms
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {Object.values(THEME_PALETTES).map((thm) => {
                const isSelected = activeTheme === thm.id;
                return (
                  <button
                    key={thm.id}
                    onClick={() => onSelectTheme(thm.id as ThemePalette)}
                    className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-2 border-m3-primary bg-m3-surface shadow-xs'
                        : 'border-m3-outline-variant/40 bg-m3-surface-container hover:bg-m3-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-m3-on-surface">{thm.name}</span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-m3-primary text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    {/* Color Swatches preview */}
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-5 h-5 rounded-full shadow-xs"
                        style={{ backgroundColor: thm.primary }}
                        title="Primary"
                      />
                      <span
                        className="w-5 h-5 rounded-full shadow-xs"
                        style={{ backgroundColor: thm.primaryContainer }}
                        title="Primary Container"
                      />
                      <span
                        className="w-5 h-5 rounded-full shadow-xs"
                        style={{ backgroundColor: thm.secondary }}
                        title="Secondary"
                      />
                      <span
                        className="w-5 h-5 rounded-full shadow-xs"
                        style={{ backgroundColor: thm.surfaceContainer }}
                        title="Surface Container"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Density Configuration */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-m3-on-surface">Chat Density</h4>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleDensity('comfortable')}
                className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                  density === 'comfortable'
                    ? 'bg-m3-secondary-container text-m3-on-secondary-container font-semibold'
                    : 'bg-m3-surface border border-m3-outline-variant text-m3-on-surface-variant'
                }`}
              >
                Comfortable (M3 Standard)
              </button>
              <button
                onClick={() => onToggleDensity('compact')}
                className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                  density === 'compact'
                    ? 'bg-m3-secondary-container text-m3-on-secondary-container font-semibold'
                    : 'bg-m3-surface border border-m3-outline-variant text-m3-on-surface-variant'
                }`}
              >
                Compact (High Density)
              </button>
            </div>
          </div>

          {/* Reset Demo State */}
          <div className="pt-2 border-t border-m3-outline-variant/30 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-m3-on-surface">Reset Mock Data</p>
              <p className="text-[11px] text-m3-on-surface-variant">Restore initial messages and threads</p>
            </div>
            <button
              onClick={() => {
                onResetData();
                onClose();
              }}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-m3-surface border border-m3-outline-variant text-m3-on-surface hover:bg-m3-surface-container transition-colors"
            >
              Reset Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
