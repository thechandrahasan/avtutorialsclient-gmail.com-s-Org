import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface InstagramWidgetProps {
  widgetId?: string; // For services like LightWidget or Elfsight
  type?: 'lightwidget' | 'elfsight' | 'manual' | 'profile';
  className?: string;
  instagramId?: string;
}

export default function InstagramWidget({ widgetId, type = 'manual', className, instagramId = 'avtutorial2022' }: InstagramWidgetProps) {
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
      <div className={cn("w-full min-h-[400px]", className)}>
        <div className={`elfsight-app-${widgetId}`}></div>
      </div>
    );
  }

  if (type === 'profile') {
    return (
      <div className={cn("neumo-card p-8 flex flex-col items-center justify-center text-center min-h-[400px]", className)}>
        <div className="w-24 h-24 neumo-well text-[#E4405F] mb-6 rounded-full overflow-hidden p-2">
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-display font-bold text-neumo-fg mb-2">@{instagramId}</h3>
        <p className="text-neumo-muted font-medium mb-8 max-w-md">
          Follow us on Instagram for the latest updates, event highlights, and classroom activities!
        </p>
        <a 
          href={`https://www.instagram.com/${instagramId}/`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="neumo-button-primary px-8 py-3 flex items-center space-x-2"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <span>View Profile</span>
        </a>
      </div>
    );
  }

  // Manual grid preview with realistic placeholders
  if (type === 'manual') {
    const placeholders = [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523240715639-9938dd40294c?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500&auto=format&fit=crop",
    ];

    return (
      <div className={cn("neumo-card p-6", className)}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 neumo-well p-1 rounded-full">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white p-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-neumo-fg">@{instagramId}</h3>
              <p className="text-xs text-neumo-muted font-medium">Latest Posts</p>
            </div>
          </div>
          <a 
            href={`https://www.instagram.com/${instagramId}/`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="neumo-button px-4 py-2 text-xs font-bold text-neumo-accent"
          >
            Follow
          </a>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {placeholders.map((url, i) => (
            <a 
              key={i} 
              href={`https://www.instagram.com/${instagramId}/`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="aspect-square neumo-well rounded-xl overflow-hidden group relative"
            >
              <img 
                src={url} 
                alt={`Post ${i + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-1">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    <span className="text-xs font-bold">128</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-neumo-muted font-medium italic">
          * This is a preview. To enable a live feed, please provide a valid Widget ID.
        </p>
      </div>
    );
  }

  // Default fallback
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
