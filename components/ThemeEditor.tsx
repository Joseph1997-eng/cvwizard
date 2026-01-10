import React from 'react';
import { Theme } from '../types';
import { Palette, Type, LayoutTemplate } from 'lucide-react';

interface ThemeEditorProps {
  theme: Theme;
  onChange: (field: keyof Theme, value: string) => void;
}

const ACCENT_COLORS = [
  '#2563eb', // Blue (Default)
  '#059669', // Emerald
  '#dc2626', // Red
  '#7c3aed', // Violet
  '#db2777', // Pink
  '#000000', // Black
  '#d97706', // Amber
];

const BG_COLORS = [
  '#ffffff', // White
  '#f8fafc', // Slate 50
  '#f0f9ff', // Sky 50
  '#fdf2f8', // Pink 50
  '#fffbeb', // Amber 50
  '#f0fdf4', // Green 50
];

const FONTS = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Merriweather'
];

export const ThemeEditor: React.FC<ThemeEditorProps> = ({ theme, onChange }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 mb-6">
      <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center uppercase tracking-wider border-b pb-2">
        <Palette size={14} className="mr-2" /> Resume Design
      </h3>
      
      {/* Accent Colors */}
      <div className="mb-4">
        <label className="text-xs font-bold text-gray-500 mb-2 block uppercase">Accent Color</label>
        <div className="flex flex-wrap gap-2">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => onChange('color', color)}
              className={`w-6 h-6 rounded-full border transition-transform hover:scale-110 ${
                theme.color === color ? 'border-gray-400 ring-2 ring-offset-1 ring-blue-500' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select accent color ${color}`}
            />
          ))}
          <input 
            type="color" 
            value={theme.color}
            onChange={(e) => onChange('color', e.target.value)}
            className="w-6 h-6 rounded-full border-0 p-0 overflow-hidden cursor-pointer"
            title="Custom Accent Color"
          />
        </div>
      </div>

      {/* Background Colors */}
      <div className="mb-4">
        <label className="text-xs font-bold text-gray-500 mb-2 block uppercase flex items-center">
          <LayoutTemplate size={12} className="mr-1" /> Paper Color
        </label>
        <div className="flex flex-wrap gap-2">
          {BG_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => onChange('backgroundColor', color)}
              className={`w-6 h-6 rounded-full border transition-transform hover:scale-110 shadow-sm ${
                theme.backgroundColor === color ? 'border-blue-500 ring-2 ring-offset-1 ring-blue-200' : 'border-gray-200'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select background color ${color}`}
            />
          ))}
          <input 
            type="color" 
            value={theme.backgroundColor}
            onChange={(e) => onChange('backgroundColor', e.target.value)}
            className="w-6 h-6 rounded-full border-0 p-0 overflow-hidden cursor-pointer shadow-sm"
            title="Custom Background Color"
          />
        </div>
      </div>

      {/* Fonts */}
      <div>
        <label className="text-xs font-bold text-gray-500 mb-2 block uppercase flex items-center">
          <Type size={12} className="mr-1" /> Font Family
        </label>
        <div className="grid grid-cols-2 gap-2">
          {FONTS.map((font) => (
            <button
              key={font}
              onClick={() => onChange('font', font)}
              className={`px-3 py-2 text-sm rounded-md border text-left transition-all ${
                theme.font === font 
                  ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-500' 
                  : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
              style={{ fontFamily: font }}
            >
              {font}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};