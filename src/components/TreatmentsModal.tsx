import React from 'react';
import { X, Pill } from 'lucide-react';
import { Doctor } from '../config/clinicConfig';
import { clinicConfig } from '../config/clinicConfig';
import { useLanguage } from '../contexts/LanguageContext';

interface TreatmentsModalProps {
	isOpen: boolean;
	doctor: Doctor | null;
	onClose: () => void;
}

const TreatmentsModal: React.FC<TreatmentsModalProps> = ({ isOpen, doctor, onClose }) => {
	const { t } = useLanguage();
	const branch = clinicConfig.branches[0];

	if (!isOpen) return null;

	// If no specific doctor is selected, show all treatments from all doctors
	const treatmentsToShow = doctor ? doctor.treatments : 
		branch.doctors.flatMap(doc => 
			doc.treatments.map(treatment => ({
				...treatment,
				doctorName: doc.name
			}))
		);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div 
				className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
				onClick={onClose}
			></div>

			{/* Modal */}
			<div className="relative w-full max-w-2xl max-h-[80vh] bg-white rounded-xl shadow-2xl flex flex-col">
				{/* Header */}
				<div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
					<div>
						<h3 className="text-2xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-family)' }}>
							{t('treatments.title')}
						</h3>
						{doctor && (
							<p className="text-sm opacity-75 mt-1" style={{ color: 'var(--color-text)' }}>
								{doctor.name}
							</p>
						)}
					</div>
					<button
						onClick={onClose}
						className="p-2 rounded-full hover:bg-gray-100 transition-colors"
					>
						<X className="h-6 w-6" style={{ color: 'var(--color-text)' }} />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 pt-0 overflow-y-auto flex-1">
					{treatmentsToShow.map((category, categoryIndex) => (
						<div key={categoryIndex} className="mb-8 first:mt-6">
							<h4 className="text-lg font-semibold mb-4 flex items-center" 
								style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-family)' }}>
								<Pill className="h-5 w-5 mr-2" />
								{category.category}
								{!doctor && category.doctorName && (
									<span className="text-sm font-normal ml-2 opacity-75" style={{ color: 'var(--color-text)' }}>
										- {category.doctorName}
									</span>
								)}
							</h4>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								{category.items.map((treatment, treatmentIndex) => (
									<div
										key={treatmentIndex}
										className="p-4 rounded-lg border border-gray-200 hover:border-opacity-50 transition-all duration-300 hover:shadow-md"
										style={{ backgroundColor: 'var(--color-secondary)', opacity: 0.8 }}
									>
										<span className="font-medium" style={{ color: 'var(--color-text)' }}>
											{treatment}
										</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Footer */}
				<div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
					<button
						onClick={onClose}
						className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:shadow-md"
						style={{ 
							backgroundColor: 'var(--color-primary)', 
							color: 'white'
						}}
					>
						{t('treatments.close')}
					</button>
				</div>
			</div>
		</div>
	);
};

export default TreatmentsModal;