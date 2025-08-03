import React from 'react';
import { User, Calendar, Award, Clock } from 'lucide-react';
import { Doctor } from '../config/clinicConfig';
import { useLanguage } from '../contexts/LanguageContext';

interface DoctorCardProps {
  doctor: Doctor;
  onBookClick: (doctor: Doctor) => void;
  onTreatmentsClick: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookClick, onTreatmentsClick }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="p-6">
        {/* Doctor Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" 
               style={{ backgroundColor: 'var(--color-secondary)' }}>
            <User className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-family)' }}>
              {doctor.name}
            </h3>
            <div className="flex items-center space-x-2 mb-2">
              <Award className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                {doctor.qualifications.join(', ')}
              </span>
            </div>
            <p className="text-xs opacity-75" style={{ color: 'var(--color-text)' }}>
              {t('doctors.reg_no')}: {doctor.reg_no}
            </p>
          </div>
        </div>

        {/* Profile */}
        <p className="text-sm mb-4 opacity-90" style={{ color: 'var(--color-text)' }}>
          {doctor.profile}
        </p>

        {/* Timings */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2 flex items-center" style={{ color: 'var(--color-text)' }}>
            <Clock className="h-4 w-4 mr-2" style={{ color: 'var(--color-primary)' }} />
            {t('doctors.timings')}
          </h4>
          {doctor.timings.map((timing, index) => (
            <div key={index} className="text-sm mb-1" style={{ color: 'var(--color-text)' }}>
              <span className="font-medium">{timing.day}:</span>
              <span className="ml-2">{timing.slots.join(', ')}</span>
            </div>
          ))}
        </div>

        {/* Treatment Categories */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
            {t('doctors.treatments')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {doctor.treatments.map((treatment, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'white',
                  opacity: 0.9
                }}
              >
                {treatment.category}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={() => onBookClick(doctor)}
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-md"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <Calendar className="h-4 w-4" />
            <span>{t('doctor.book_now')}</span>
          </button>
          <button
            onClick={() => onTreatmentsClick(doctor)}
            className="px-4 py-3 rounded-lg font-semibold border-2 transition-all duration-300 hover:shadow-md"
            style={{ 
              borderColor: 'var(--color-primary)', 
              color: 'var(--color-primary)',
              backgroundColor: 'transparent'
            }}
          >
            {t('doctors.treatments')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;