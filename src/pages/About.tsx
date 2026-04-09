import { motion } from 'motion/react';
import { BookOpen, Users, Target, Award, CheckCircle2 } from 'lucide-react';
import { BRAND } from '@/constants';

export default function About() {
  const values = [
    {
      icon: BookOpen,
      title: 'Quality Education',
      description: 'We follow a rigorous curriculum designed to build strong foundations in every subject.'
    },
    {
      icon: Users,
      title: 'Personalized Attention',
      description: 'Small batch sizes ensure every student gets the individual attention they deserve.'
    },
    {
      icon: Target,
      title: 'Result Oriented',
      description: 'Our teaching methodology is focused on achieving academic excellence and conceptual clarity.'
    },
    {
      icon: Award,
      title: 'Expert Tutors',
      description: 'Learn from highly qualified and experienced educators dedicated to student success.'
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-32">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl font-display font-extrabold text-neumo-fg mb-8 leading-tight tracking-tight">
              About <span className="text-neumo-accent">{BRAND.name}</span>
            </h1>
            <p className="text-lg text-neumo-muted mb-8 leading-relaxed font-medium">
              AV Tutorial has been a beacon of academic excellence since its inception. We believe that every student has the potential to achieve greatness given the right guidance and environment.
            </p>
            <p className="text-lg text-neumo-muted mb-12 leading-relaxed font-medium">
              Our mission is to empower students with knowledge, critical thinking skills, and the confidence to navigate their academic journey successfully. We don't just teach; we inspire.
            </p>
            <div className="flex items-center space-x-6 p-6 neumo-card">
              <div className="w-16 h-16 neumo-well text-neumo-accent">
                <Award size={28} />
              </div>
              <div>
                <p className="text-neumo-fg font-display font-bold text-lg">10+ Years of Excellence</p>
                <p className="text-neumo-muted text-sm font-medium">Helping students achieve their dreams</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square neumo-card p-4 sm:p-8 rotate-3">
              <div className="w-full h-full rounded-[32px] overflow-hidden shadow-neumo-inset">
                <img 
                  src="https://picsum.photos/seed/classroom/1000/1000" 
                  alt="Classroom" 
                  className="w-full h-full object-cover transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 neumo-card p-4 sm:p-8 -rotate-6 animate-float">
              <p className="text-2xl sm:text-4xl font-display font-extrabold text-neumo-accent mb-1 sm:mb-2">500+</p>
              <p className="text-[10px] sm:text-sm font-bold text-neumo-muted uppercase tracking-wider">Successful Students</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Teaching Approach */}
      <section className="bg-neumo-bg py-32 shadow-neumo-inset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-extrabold text-neumo-fg mb-6">Our Teaching Approach</h2>
            <p className="text-neumo-muted font-medium text-lg max-w-2xl mx-auto">
              We combine traditional values with modern technology to provide a comprehensive learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="neumo-card p-10 group"
              >
                <div className="w-16 h-16 neumo-well text-neumo-accent mb-8 group-hover:shadow-neumo-inset transition-all">
                  <value.icon size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold text-neumo-fg mb-4 group-hover:text-neumo-accent transition-colors">{value.title}</h3>
                <p className="text-neumo-muted text-sm font-medium leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="neumo-card p-10 sm:p-20 overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-display font-extrabold text-neumo-fg mb-12">Why AV Tutorial?</h2>
              <ul className="space-y-8">
                {[
                  'Comprehensive study material for all subjects',
                  'Regular mock tests and performance analysis',
                  'Doubt clearing sessions after every class',
                  'Career counseling and guidance for higher education',
                  'Safe and conducive learning environment',
                  'Regular parent-teacher meetings'
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-4 group">
                    <div className="w-10 h-10 neumo-well text-neumo-accent shrink-0 group-hover:shadow-neumo-inset transition-all">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="text-lg font-medium text-neumo-fg pt-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="block lg:block">
              <div className="grid grid-cols-2 gap-4 sm:gap-8">
                <div className="aspect-square neumo-well flex flex-col items-center justify-center text-center p-4 sm:p-8">
                  <p className="text-3xl sm:text-5xl font-display font-extrabold text-neumo-accent mb-1 sm:mb-3">98%</p>
                  <p className="text-[10px] sm:text-sm font-black text-neumo-muted uppercase tracking-widest">Success Rate</p>
                </div>
                <div className="aspect-square neumo-well flex flex-col items-center justify-center text-center p-4 sm:p-8 mt-6 sm:mt-12">
                  <p className="text-3xl sm:text-5xl font-display font-extrabold text-neumo-accent mb-1 sm:mb-3">24/7</p>
                  <p className="text-[10px] sm:text-sm font-black text-neumo-muted uppercase tracking-widest">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
