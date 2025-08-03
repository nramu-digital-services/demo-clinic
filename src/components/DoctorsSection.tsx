import React from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { useLanguage } from '../contexts/LanguageContext';
import DoctorCard from './DoctorCard';
import { Doctor } from '../config/clinicConfig';

interface DoctorsSectionProps {
	onBookingClick: (doctor: Doctor) => void;
	onTreatmentsClick: (doctor: Doctor) => void;
}

const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onBookingClick, onTreatmentsClick }) => {
	const { t } = useLanguage();
	const branch = clinicConfig.branches[0]; // Using first branch

	return (
		<section className="py-16 px-4" style={{ backgroundColor: 'var(--color-background)' }}>
			<div className="container mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4" 
						style={{ color: 'var(--color-text)', fontFamily: 'var(--font-family)' }}>
						{t('doctors.title')}
					</h2>
					<div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
					{branch.doctors.map((doctor) => (
						<DoctorCard
							key={doctor.id}
							doctor={doctor}
							onBookClick={onBookingClick}
							onTreatmentsClick={onTreatmentsClick}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default DoctorsSection;