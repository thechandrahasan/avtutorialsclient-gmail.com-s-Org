import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface YouTubeWidgetProps {
  widgetId: string;
  className?: string;
}

export default function YouTubeWidget({ widgetId, className }: YouTubeWidgetProps) {
  useEffect(() => {
    const scriptId = 'elfsight-platform-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className={cn("neumo-card p-4 overflow-hidden", className)}>
      <div className={`elfsight-app-${widgetId}`} data-elfsight-app-lazy></div>
    </div>
  );
}
