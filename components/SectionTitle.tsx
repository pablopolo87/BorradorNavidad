import React from 'react';
import { Snowflake } from 'lucide-react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, light = false }) => {
  const textColor = light ? 'text-white' : 'text-navidad-red';
  const subColor = light ? 'text-gray-200' : 'text-gray-600';

  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="h-px w-8 bg-navidad-gold"></span>
        <Snowflake className="text-navidad-gold w-5 h-5" />
        <span className="h-px w-8 bg-navidad-gold"></span>
      </div>
      <h2 className={`font-serif text-3xl md:text-4xl font-bold mb-3 ${textColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl font-light italic max-w-2xl mx-auto ${subColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};