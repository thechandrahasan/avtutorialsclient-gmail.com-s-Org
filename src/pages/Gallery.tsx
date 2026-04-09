import { Instagram, Youtube } from 'lucide-react';
import { SOCIAL_LINKS } from '@/constants';
import InstagramWidget from '@/components/InstagramWidget';
import YouTubeWidget from '@/components/YouTubeWidget';

export default function Gallery() {
  return (
    <div className="min-h-screen pt-32 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-flex w-20 h-20 neumo-well text-[#E4405F] mb-8 items-center justify-center">
          <Instagram size={32} />
        </div>
        <h1 className="text-5xl font-display font-extrabold text-neumo-fg mb-6 tracking-tight">Our Gallery</h1>
        <p className="text-neumo-muted font-medium text-lg max-w-2xl mx-auto">
          Explore our vibrant learning environment and student activities through our Instagram feed.
        </p>
      </div>

      <InstagramWidget 
        type="elfsight" 
        widgetId="a5a8c8a4-8384-4a8d-8c74-fae1dd5d3861" 
        className="min-h-[600px] mb-24" 
      />

      <div className="text-center mb-20">
        <div className="inline-flex w-20 h-20 neumo-well text-[#FF0000] mb-8 items-center justify-center">
          <Youtube size={32} />
        </div>
        <h2 className="text-4xl font-display font-extrabold text-neumo-fg mb-6 tracking-tight">Video Gallery</h2>
        <p className="text-neumo-muted font-medium text-lg max-w-2xl mx-auto">
          Watch our latest educational content and classroom highlights on YouTube.
        </p>
      </div>

      <YouTubeWidget 
        widgetId="4621fb7e-97f1-4e38-8ee2-f3591719af0e" 
        className="min-h-[600px]" 
      />

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="p-10 neumo-card group">
          <h3 className="text-2xl font-display font-bold text-neumo-fg mb-6 group-hover:text-neumo-accent transition-colors">Latest Updates</h3>
          <p className="text-neumo-muted font-medium text-sm leading-relaxed">
            We regularly post about our classroom sessions, student achievements, and special events on our social media handles.
          </p>
        </div>
        <div className="p-10 neumo-card group">
          <h3 className="text-2xl font-display font-bold text-neumo-fg mb-6 group-hover:text-neumo-accent transition-colors">Student Life</h3>
          <p className="text-neumo-muted font-medium text-sm leading-relaxed">
            See how our students engage in collaborative learning and develop critical thinking skills through various activities.
          </p>
        </div>
        <div className="p-10 neumo-card group">
          <h3 className="text-2xl font-display font-bold text-neumo-fg mb-6 group-hover:text-neumo-accent transition-colors">Workshops</h3>
          <p className="text-neumo-muted font-medium text-sm leading-relaxed">
            Our gallery showcases the hands-on workshops and seminars we conduct to provide practical knowledge to our students.
          </p>
        </div>
      </div>
    </div>
  );
}
