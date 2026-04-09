import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface InstagramWidgetProps {
  widgetId?: string; // For services like LightWidget or Elfsight
  type?: 'lightwidget' | 'elfsight' | 'manual';
  className?: string;
}

export default function InstagramWidget({ widgetId, type = 'manual', className }: InstagramWidgetProps) {
  useEffect(() => {
    if (type === 'elfsight') {
      const scriptId = 'elfsight-platform-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = "https://elfsightcdn.com/platform.js";
        script.async = true;
        document.head.appendChild(script);
      }
    }
  }, [type]);

  if (type === 'lightwidget' && widgetId) {
    return (
      <div className={className}>
        <iframe
          src={`https://lightwidget.com/widgets/${widgetId}.html`}
          scrolling="no"
          allowTransparency={true}
          className="w-full border-0 overflow-hidden rounded-2xl"
          style={{ height: '600px' }}
          title="Instagram Feed"
        />
      </div>
    );
  }

  if (type === 'elfsight' && widgetId) {
    return (
      <div className={cn("neumo-card p-4 overflow-hidden", className)}>
        <div className={`elfsight-app-${widgetId}`} data-elfsight-app-lazy></div>
      </div>
    );
  }

  // Default placeholder with instructions
  return (
    <div className={`neumo-card p-8 flex flex-col items-center justify-center text-center min-h-[400px] ${className}`}>
      <div className="w-16 h-16 neumo-well text-[#E4405F] mb-6">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </div>
      <h3 className="text-xl font-display font-bold text-neumo-fg mb-4">Instagram Feed Widget</h3>
      <p className="text-neumo-muted font-medium mb-8 max-w-md">
        To show your live Instagram posts here, create a widget on 
        <a href="https://lightwidget.com/" target="_blank" rel="noopener noreferrer" className="text-neumo-accent hover:underline mx-1">LightWidget</a> 
        or 
        <a href="https://elfsight.com/" target="_blank" rel="noopener noreferrer" className="text-neumo-accent hover:underline mx-1">Elfsight</a> 
        and paste the Widget ID in the code.
      </p>
      <div className="w-full grid grid-cols-3 gap-4 opacity-20 pointer-events-none">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="aspect-square neumo-well rounded-xl" />
        ))}
      </div>
    </div>
  );
}
