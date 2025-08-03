import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Medical-themed testimonials for Advaith Clinic
const testimonials = [
  {
    quote:
      "Dr. Jeevitha's compassionate care and thorough diagnosis helped me manage my diabetes effectively. The clinic's modern facilities and caring staff make every visit comfortable.",
    name: "Rajesh Kumar",
    designation: "Software Engineer, Hyderabad",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The laparoscopic surgery performed by Dr. P.M. Raj was seamless. His expertise and the clinic's advanced equipment gave me confidence throughout the treatment process.",
    name: "Priya Sharma",
    designation: "Teacher, Pragathi Nagar",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Excellent women's health care services. Dr. Jeevitha's personalized approach to treating PCOD has significantly improved my quality of life. Highly recommended!",
    name: "Anitha Reddy",
    designation: "Marketing Manager, Hyderabad",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The clinic's convenient timings and professional staff make healthcare accessible. Dr. Raj's surgical expertise is outstanding, and the recovery was faster than expected.",
    name: "Vikram Singh",
    designation: "Business Owner, Kukatpally",
    src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "From preventive care to treatment, Advaith Clinic provides comprehensive healthcare. The doctors are knowledgeable, and the booking process is very convenient.",
    name: "Meera Patel",
    designation: "Homemaker, Pragathi Nagar",
    src: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

// Main Animated Testimonials Component
const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = React.useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  const isActive = (index: number) => index === active;

  const randomRotate = () => `${Math.floor(Math.random() * 16) - 8}deg`;

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-20">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <div className="relative h-80 w-full max-w-xs">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{ opacity: 0, scale: 0.9, y: 50, rotate: randomRotate() }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.5,
                    scale: isActive(index) ? 1 : 0.9,
                    y: isActive(index) ? 0 : 20,
                    zIndex: isActive(index) ? testimonials.length : testimonials.length - Math.abs(index - active),
                    rotate: isActive(index) ? '0deg' : randomRotate(),
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                  style={{ perspective: '1000px' }}
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover shadow-2xl"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/500x500/e2e8f0/64748b?text=${testimonial.name.charAt(0)}`;
                      e.currentTarget.onerror = null;
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Text and Controls Section */}
        <div className="flex flex-col justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-family)' }}>
                  {testimonials[active].name}
                </h3>
                <p className="text-sm opacity-75" style={{ color: 'var(--color-text)' }}>
                  {testimonials[active].designation}
                </p>
                <motion.p className="mt-8 text-lg" style={{ color: 'var(--color-text)', opacity: 0.9 }}>
                  "{testimonials[active].quote}"
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-4 pt-12">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="group flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: 'var(--color-secondary)', 
                focusRingColor: 'var(--color-primary)'
              }}
            >
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" 
                         style={{ color: 'var(--color-primary)' }} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="group flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: 'var(--color-secondary)', 
                focusRingColor: 'var(--color-primary)'
              }}
            >
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" 
                          style={{ color: 'var(--color-primary)' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo Component for Advaith Clinic
function AnimatedTestimonialsDemo() {
  return <AnimatedTestimonials testimonials={testimonials} />;
}

// Main Component Export
export function Component() {
  return (
    <div className="relative w-full overflow-hidden" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Subtle animated background pattern */}
      <style>
        {`
          @keyframes animate-grid {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          .animated-grid {
            width: 200%;
            height: 200%;
            background-image: 
              linear-gradient(to right, var(--color-primary) 1px, transparent 1px), 
              linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px);
            background-size: 3rem 3rem;
            animation: animate-grid 40s linear infinite alternate;
            opacity: 0.03;
          }
        `}
      </style>
      <div className="animated-grid absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      {/* Content */}
      <div className="relative z-10">
        <AnimatedTestimonialsDemo />
      </div>
    </div>
  );
}