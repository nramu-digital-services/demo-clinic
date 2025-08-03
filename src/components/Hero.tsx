import React from 'react';
import { Calendar, Heart, Shield, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onBookingClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookingClick }) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden py-20 px-4" style={{ backgroundColor: 'var(--color-secondary)' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 animate-pulse" 
             style={{ backgroundColor: 'var(--color-primary)' }}></div>
        <div className="absolute top-20 -left-10 w-32 h-32 rounded-full opacity-10 animate-pulse delay-1000" 
             style={{ backgroundColor: 'var(--color-primary)' }}></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 rounded-full opacity-10 animate-pulse delay-2000" 
             style={{ backgroundColor: 'var(--color-primary)' }}></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" 
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-family)' }}>
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-80" 
             style={{ color: 'var(--color-text)' }}>
            {t('hero.subtitle')}
          </p>
          
          <button
            onClick={onBookingClick}
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <Calendar className="h-5 w-5" />
            <span>{t('hero.cta')}</span>
          </button>

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto lg:mx-0">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                   style={{ backgroundColor: 'var(--color-primary)', opacity: 0.1 }}>
                <Heart className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
              </div>
              <p className="font-medium" style={{ color: 'var(--color-text)' }}>Compassionate Care</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                   style={{ backgroundColor: 'var(--color-primary)', opacity: 0.1 }}>
                <Shield className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
              </div>
              <p className="font-medium" style={{ color: 'var(--color-text)' }}>Safe & Reliable</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                   style={{ backgroundColor: 'var(--color-primary)', opacity: 0.1 }}>
                <Clock className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
              </div>
              <p className="font-medium" style={{ color: 'var(--color-text)' }}>Quick Service</p>
            </div>
          </div>
          </div>

          {/* Right Medical Illustration */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="max-w-md w-full">
              <img
                src="/hand-drawn-national-doctor-s-day-illustration-with-medics-essentials.png"
                alt="Medical essentials illustration with doctor's day theme"
                className="w-full h-auto drop-shadow-lg rounded-2xl object-contain"
                style={{ filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.1))' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;