import React, { useState } from 'react';
import { X, Calendar, Phone, User } from 'lucide-react';
import { Doctor } from '../config/clinicConfig';
import { useLanguage } from '../contexts/LanguageContext';
import { clinicConfig } from '../config/clinicConfig';

interface BookingModalProps {
	isOpen: boolean;
	selectedDoctor?: Doctor;
	onClose: () => void;
}

interface BookingFormData {
	patientName: string;
	phone: string;
	email: string;
	preferredDate: string;
	preferredTime: string;
	notes: string;
	whatsappConsent: boolean;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, selectedDoctor, onClose }) => {
	const { t } = useLanguage();
	const [doctor, setDoctor] = useState<Doctor | null>(selectedDoctor || null);
	const [selectedTreatment, setSelectedTreatment] = useState<string>('');
	const [formData, setFormData] = useState<BookingFormData>({
		patientName: '',
		phone: '',
		email: '',
		preferredDate: '',
		preferredTime: '',
		notes: '',
		whatsappConsent: false
	});

	const branch = clinicConfig.branches[0];
	const doctors = branch.doctors;

	if (!isOpen) return null;

	const handleInputChange = (field: keyof BookingFormData, value: string) => {
		if (field === 'whatsappConsent') {
			setFormData(prev => ({ ...prev, [field]: value === 'true' }));
		} else {
			setFormData(prev => ({ ...prev, [field]: value }));
		}
	};

	const handleWhatsAppBooking = () => {
		const phone = branch.phones[0].replace(/[^0-9]/g, '');
		const message = `Hello! I would like to book an appointment.

*Patient Details:*
Name: ${formData.patientName}
Phone: ${formData.phone}
Email: ${formData.email}

*Appointment Details:*
Doctor: ${doctor?.name || 'Any available doctor'}
Treatment: ${selectedTreatment || 'General consultation'}
Preferred Date: ${formData.preferredDate}
Preferred Time: ${formData.preferredTime}

${formData.notes ? `*Additional Notes:*\n${formData.notes}` : ''}

Please confirm the appointment slot. Thank you!`;
		
		const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
		window.open(whatsappUrl, '_blank');
	};

	const handleSubmit = async () => {
		if (!isFormValid) return;

		try {
			// Prepare data for Google Sheets
			const submissionData = {
				timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
				patientName: formData.patientName,
				phone: formData.phone,
				email: formData.email || 'Not provided',
				doctor: doctor?.name || 'Any available doctor',
				treatment: selectedTreatment || 'General consultation',
				preferredDate: formData.preferredDate || 'Not specified',
				preferredTime: formData.preferredTime || 'Any time',
				notes: formData.notes || 'None',
				whatsappConsent: formData.whatsappConsent ? 'Yes' : 'No'
			};

			// Submit to Google Sheets
			// Replace 'YOUR_SCRIPT_ID' with your actual Google Apps Script deployment ID
			const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
				method: 'POST',
				mode: 'no-cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(submissionData)
			});

			// Show success message
			alert('Appointment request submitted successfully! We will contact you soon to confirm your appointment.');

			// If WhatsApp consent is given, open WhatsApp
			if (formData.whatsappConsent) {
				const phone = branch.phones[0].replace(/[^0-9]/g, '');
				const message = `Hello! Thank you for choosing Advaith Clinic. Your appointment request has been successfully submitted.

*Patient Details:*
Name: ${formData.patientName}
Phone: ${formData.phone}
${formData.email ? `Email: ${formData.email}` : ''}

*Appointment Details:*
Doctor: ${doctor?.name || 'Any available doctor'}
Treatment: ${selectedTreatment || 'General consultation'}
${formData.preferredDate ? `Preferred Date: ${formData.preferredDate}` : ''}
${formData.preferredTime ? `Preferred Time: ${formData.preferredTime}` : ''}

${formData.notes ? `*Additional Notes:*\n${formData.notes}` : ''}

Please confirm my appointment slot. Thank you!`;
				
				const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
				
				setTimeout(() => {
					window.open(whatsappUrl, '_blank');
				}, 1000);
			}

			// Reset form and close modal
			setFormData({
				patientName: '',
				phone: '',
				email: '',
				preferredDate: '',
				preferredTime: '',
				notes: '',
				whatsappConsent: false
			});
			setSelectedTreatment('');
			onClose();

		} catch (error) {
			console.error('Error submitting appointment:', error);
			alert('There was an error submitting your appointment. Please try calling us directly.');
		}
	};

	const handleDirectCall = () => {
		window.location.href = `tel:${branch.phones[0]}`;
	};

	const isFormValid = formData.patientName && formData.phone && doctor;

	const allTreatments = doctor?.treatments.flatMap(category => 
		category.items.map(item => ({ category: category.category, name: item }))
	) || [];

	// Get today's date for min date attribute
	const today = new Date().toISOString().split('T')[0];

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div 
				className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
				onClick={onClose}
			></div>

			{/* Modal */}
			<div className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col">
				{/* Header */}
				<div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-xl">
					<div className="flex items-center space-x-3">
						<Calendar className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
						<h3 className="text-xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-family)' }}>
							{t('booking.title')}
						</h3>
					</div>
					<button
						onClick={onClose}
						className="p-2 rounded-full hover:bg-gray-100 transition-colors"
					>
						<X className="h-5 w-5" style={{ color: 'var(--color-text)' }} />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 overflow-y-auto flex-1 space-y-6">
					{/* Patient Information */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold flex items-center" style={{ color: 'var(--color-text)' }}>
							<User className="h-5 w-5 mr-2" style={{ color: 'var(--color-primary)' }} />
							Patient Information
						</h4>
						
						<div>
							<label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
								Full Name *
							</label>
							<input
								type="text"
								value={formData.patientName}
								onChange={(e) => handleInputChange('patientName', e.target.value)}
								placeholder="Enter patient's full name"
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
								style={{ 
									focusRingColor: 'var(--color-primary)',
									fontFamily: 'var(--font-family)'
								}}
								required
							/>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
									Phone Number *
								</label>
								<input
									type="tel"
									value={formData.phone}
									onChange={(e) => handleInputChange('phone', e.target.value)}
									placeholder="+91 9876543210"
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
									style={{ 
										focusRingColor: 'var(--color-primary)',
										fontFamily: 'var(--font-family)'
									}}
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
									Email (Optional)
								</label>
								<input
									type="email"
									value={formData.email}
									onChange={(e) => handleInputChange('email', e.target.value)}
									placeholder="patient@email.com"
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
									style={{ 
										focusRingColor: 'var(--color-primary)',
										fontFamily: 'var(--font-family)'
									}}
								/>
							</div>
						</div>
					</div>

					{/* Appointment Details */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold flex items-center" style={{ color: 'var(--color-text)' }}>
							<Calendar className="h-5 w-5 mr-2" style={{ color: 'var(--color-primary)' }} />
							Appointment Details
						</h4>

						<div>
							<label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
								{t('booking.select_doctor')} *
							</label>
							<select
								value={doctor?.id || ''}
								onChange={(e) => {
									const selectedDoc = doctors.find(d => d.id === e.target.value);
									setDoctor(selectedDoc || null);
									setSelectedTreatment('');
								}}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
								style={{ 
									focusRingColor: 'var(--color-primary)',
									fontFamily: 'var(--font-family)'
								}}
								required
							>
								<option value="">{t('booking.select_doctor')}</option>
								{doctors.map((doc) => (
									<option key={doc.id} value={doc.id}>
										{doc.name} ({doc.qualifications.join(', ')})
									</option>
								))}
							</select>
						</div>

						{doctor && (
							<div>
								<label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
									{t('booking.select_treatment')}
								</label>
								<select
									value={selectedTreatment}
									onChange={(e) => setSelectedTreatment(e.target.value)}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
									style={{ 
										focusRingColor: 'var(--color-primary)',
										fontFamily: 'var(--font-family)'
									}}
								>
									<option value="">General Consultation</option>
									{allTreatments.map((treatment, index) => (
										<option key={index} value={treatment.name}>
											{treatment.name} ({treatment.category})
										</option>
									))}
								</select>
							</div>
						)}

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
									Preferred Date
								</label>
								<input
									type="date"
									value={formData.preferredDate}
									onChange={(e) => handleInputChange('preferredDate', e.target.value)}
									min={today}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
									style={{ 
										focusRingColor: 'var(--color-primary)',
										fontFamily: 'var(--font-family)'
									}}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
									Preferred Time
								</label>
								<select
									value={formData.preferredTime}
									onChange={(e) => handleInputChange('preferredTime', e.target.value)}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
									style={{ 
										focusRingColor: 'var(--color-primary)',
										fontFamily: 'var(--font-family)'
									}}
								>
									<option value="">Any time</option>
									<option value="9:00 AM - 12:00 PM">Morning (9:00 AM - 12:00 PM)</option>
									<option value="12:00 PM - 3:00 PM">Afternoon (12:00 PM - 3:00 PM)</option>
									<option value="3:00 PM - 6:00 PM">Evening (3:00 PM - 6:00 PM)</option>
									<option value="6:00 PM - 9:00 PM">Night (6:00 PM - 9:00 PM)</option>
								</select>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
								Additional Notes
							</label>
							<textarea
								value={formData.notes}
								onChange={(e) => handleInputChange('notes', e.target.value)}
								placeholder="Any specific symptoms, concerns, or requests..."
								rows={3}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all resize-none"
								style={{ 
									focusRingColor: 'var(--color-primary)',
									fontFamily: 'var(--font-family)'
								}}
							/>
						</div>
					</div>

					{/* WhatsApp Consent */}
					<div className="space-y-4">
						<div className="flex items-start space-x-3">
							<input
								type="checkbox"
								id="whatsappConsent"
								checked={formData.whatsappConsent}
								onChange={(e) => handleInputChange('whatsappConsent', e.target.checked.toString())}
								className="mt-1 h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-offset-2"
								style={{ 
									accentColor: 'var(--color-primary)',
									focusRingColor: 'var(--color-primary)'
								}}
							/>
							<label htmlFor="whatsappConsent" className="text-sm" style={{ color: 'var(--color-text)' }}>
								<span className="font-medium">WhatsApp Notifications (Optional)</span>
								<br />
								<span className="opacity-75">
									I consent to receive appointment confirmations and updates via WhatsApp
								</span>
							</label>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-xl">
					{isFormValid ? (
						<div className="space-y-3">
							<button
								onClick={handleSubmit}
								className="w-full flex items-center justify-center space-x-3 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-md"
								style={{ backgroundColor: 'var(--color-primary)' }}
							>
								<Calendar className="h-5 w-5" />
								<span>{t('booking.submit')}</span>
							</button>

							<a
								href={`tel:${branch.phones[0]}`}
								className="w-full flex items-center justify-center space-x-3 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-md"
								style={{ backgroundColor: 'var(--color-danger)' }}
							>
								<Phone className="h-5 w-5" />
								<span>{t('footer.call_now')}</span>
							</a>
						</div>
					) : (
						<div className="text-center">
							<p className="text-sm opacity-75 mb-4" style={{ color: 'var(--color-text)' }}>
								Please fill in the required fields to proceed
							</p>
							<button
								disabled
								className="w-full py-3 px-6 rounded-lg font-semibold text-white opacity-50 cursor-not-allowed"
								style={{ backgroundColor: 'var(--color-primary)' }}
							>
								Complete Form to Book
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default BookingModal;