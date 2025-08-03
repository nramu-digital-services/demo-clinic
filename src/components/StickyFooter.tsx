import React from 'react';
import { Phone, Pill, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { clinicConfig } from '../config/clinicConfig';

interface StickyFooterProps {
  onTreatmentsClick: () => void;
  onBookingClick: () => void;
}

const StickyFooter: React.FC<StickyFooterProps> = ({ onTreatmentsClick, onBookingClick }) => {
  const { t } = useLanguage();
  const branch = clinicConfig.branches[0];

  const handleCall = () => {
    window.location.href = `tel:${branch.phones[0]}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
      <div className="grid grid-cols-3 h-16">
        {/* Call Now */}
        <button
          onClick={handleCall}
          className="flex flex-col items-center justify-center space-y-1 transition-all duration-300 hover:bg-gray-50"
          style={{ color: 'var(--color-danger)' }}
        >
          <Phone className="h-5 w-5" />
          <span className="text-xs font-medium">{t('footer.call_now')}</span>
        </button>

        {/* Treatments */}
        <button
          onClick={onTreatmentsClick}
          className="flex flex-col items-center justify-center space-y-1 transition-all duration-300 hover:bg-gray-50"
          style={{ color: 'var(--color-primary)' }}
        >
          <Pill className="h-5 w-5" />
          <span className="text-xs font-medium">{t('footer.treatments')}</span>
        </button>

        {/* Book Now */}
        <button
          onClick={onBookingClick}
          className="flex flex-col items-center justify-center space-y-1 transition-all duration-300 hover:bg-gray-50"
          style={{ color: 'var(--color-primary)' }}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs font-medium">{t('footer.book_now')}</span>
        </button>
      </div>
    </div>
  );
};

export default StickyFooter;