import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import DoctorsSection from './components/DoctorsSection';
import TestimonialsSection from './components/TestimonialsSection';
import TreatmentsModal from './components/TreatmentsModal';
import BookingModal from './components/BookingModal';
import StickyFooter from './components/StickyFooter';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import { Doctor } from './config/clinicConfig';

function App() {
	const [isTreatmentsModalOpen, setIsTreatmentsModalOpen] = useState(false);
	const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
	const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

	const handleBookingClick = (doctor?: Doctor) => {
		setSelectedDoctor(doctor || null);
		setIsBookingModalOpen(true);
	};

	const handleTreatmentsClick = (doctor?: Doctor) => {
		if (doctor) {
			setSelectedDoctor(doctor);
			setIsTreatmentsModalOpen(true);
		} else {
			// Open general treatments modal (first doctor's treatments as default)
			setSelectedDoctor(null);
			setIsTreatmentsModalOpen(true);
		}
	};

	return (
		<ThemeProvider>
			<LanguageProvider>
				<div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', fontFamily: 'var(--font-family)' }}>
					<SEOHead />
					<Header />
					
					<main>
						<Hero onBookingClick={() => handleBookingClick()} />
						<DoctorsSection 
							onBookingClick={handleBookingClick}
							onTreatmentsClick={handleTreatmentsClick}
						/>
						<TestimonialsSection />
					</main>

					<Footer />
					
					<StickyFooter 
						onTreatmentsClick={() => handleTreatmentsClick()}
						onBookingClick={() => handleBookingClick()}
					/>

					<TreatmentsModal
						isOpen={isTreatmentsModalOpen}
						doctor={selectedDoctor}
						onClose={() => setIsTreatmentsModalOpen(false)}
					/>

					<BookingModal
						isOpen={isBookingModalOpen}
						selectedDoctor={selectedDoctor || undefined}
						onClose={() => setIsBookingModalOpen(false)}
					/>
				</div>
			</LanguageProvider>
		</ThemeProvider>
	);
}

export default App;