import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { clinicConfig } from '../config/clinicConfig';

interface LanguageContextType {
	currentLanguage: string;
	setLanguage: (lang: string) => void;
	t: (key: string) => string;
	availableLanguages: string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error('useLanguage must be used within a LanguageProvider');
	}
	return context;
};

const translations = {
	en: {
		'clinic.name': 'Advaith Clinic',
		'clinic.tagline': 'Compassionate Care, Advanced Treatment',
		'nav.home': 'Home',
		'nav.doctors': 'Doctors',
		'nav.treatments': 'Treatments',
		'nav.contact': 'Contact',
		'hero.title': 'Your Health, Our Priority',
		'hero.subtitle': 'Expert medical care with personalized attention for you and your family',
		'hero.cta': 'Book Appointment',
		'doctors.title': 'Our Expert Doctors',
		'doctors.reg_no': 'Reg. No.',
		'doctors.timings': 'Timings',
		'doctors.treatments': 'Treatments',
		'doctor.book_now': 'Book Now',
		'treatments.title': 'Our Treatments',
		'treatments.close': 'Close',
		'booking.title': 'Book Appointment',
		'booking.select_doctor': 'Select Doctor',
		'booking.select_treatment': 'Select Treatment',
		'booking.whatsapp': 'Book via WhatsApp',
		'booking.submit': 'Submit',
		'booking.close': 'Close',
		'footer.call_now': 'Call Now',
		'footer.treatments': 'Treatments',
		'footer.book_now': 'Book Now',
		'footer.address': 'Address',
		'footer.phone': 'Phone',
		'footer.timings': 'Timings',
		'footer.directions': 'Get Directions',
		'testimonials.title': 'What Our Patients Say',
		'testimonials.subtitle': 'Real experiences from our valued patients who trust us with their healthcare needs'
	},
	te: {
		'clinic.name': 'అద్వైత్ క్లినిక్',
		'clinic.tagline': 'దయగల సంరక్షణ, అధునాతన చికిత్స',
		'nav.home': 'హోమ్',
		'nav.doctors': 'వైద్యులు',
		'nav.treatments': 'చికిత్సలు',
		'nav.contact': 'సంప్రదింపు',
		'hero.title': 'మీ ఆరోగ్యం, మా ప్రాధాన్యత',
		'hero.subtitle': 'మీకు మరియు మీ కుటుంబానికి వ్యక్తిగత శ్రద్ధతో నిపుణ వైద్య సంరక్షణ',
		'hero.cta': 'అపాయింట్మెంట్ బుక్ చేయండి',
		'doctors.title': 'మా నిపుణ వైద్యులు',
		'doctors.reg_no': 'రిజిస్ట్రేషన్ నం.',
		'doctors.timings': 'సమయాలు',
		'doctors.treatments': 'చికిత్సలు',
		'doctor.book_now': 'ఇప్పుడే బుక్ చేయండి',
		'treatments.title': 'మా చికిత్సలు',
		'treatments.close': 'మూసివేయండి',
		'booking.title': 'అపాయింట్మెంట్ బుక్ చేయండి',
		'booking.select_doctor': 'వైద్యుడిని ఎంచుకోండి',
		'booking.select_treatment': 'చికిత్సను ఎంచుకోండి',
		'booking.whatsapp': 'WhatsApp ద్వారా బుక్ చేయండి',
		'booking.submit': 'సమర్పించండి',
		'booking.close': 'మూసివేయండి',
		'footer.call_now': 'ఇప్పుడే కాల్ చేయండి',
		'footer.treatments': 'చికిత్సలు',
		'footer.book_now': 'ఇప్పుడే బుక్ చేయండి',
		'footer.address': 'చిరునామా',
		'footer.phone': 'ఫోన్',
		'footer.timings': 'సమయాలు',
		'footer.directions': 'దిశలు పొందండి',
		'testimonials.title': 'మా రోగులు ఏమి చెబుతున్నారు',
		'testimonials.subtitle': 'వారి ఆరోగ్య సంరక్షణ అవసరాలతో మమ్మల్ని విశ్వసించే మా విలువైన రోగుల నిజమైన అనుభవాలు'
	},
	hi: {
		'clinic.name': 'अद्वैत क्लिनिक',
		'clinic.tagline': 'दयालु देखभाल, उन्नत उपचार',
		'nav.home': 'होम',
		'nav.doctors': 'डॉक्टर',
		'nav.treatments': 'उपचार',
		'nav.contact': 'संपर्क',
		'hero.title': 'आपका स्वास्थ्य, हमारी प्राथमिकता',
		'hero.subtitle': 'आपके और आपके परिवार के लिए व्यक्तिगत ध्यान के साथ विशेषज्ञ चिकित्सा देखभाल',
		'hero.cta': 'अपॉइंटमेंट बुक करें',
		'doctors.title': 'हमारे विशेषज्ञ डॉक्टर',
		'doctors.reg_no': 'रजिस्ट्रेशन नं.',
		'doctors.timings': 'समय',
		'doctors.treatments': 'उपचार',
		'doctor.book_now': 'अभी बुक करें',
		'treatments.title': 'हमारे उपचार',
		'treatments.close': 'बंद करें',
		'booking.title': 'अपॉइंटमेंट बुक करें',
		'booking.select_doctor': 'डॉक्टर चुनें',
		'booking.select_treatment': 'उपचार चुनें',
		'booking.whatsapp': 'WhatsApp से बुक करें',
		'booking.submit': 'जमा करें',
		'booking.close': 'बंद करें',
		'footer.call_now': 'अभी कॉल करें',
		'footer.treatments': 'उपचार',
		'footer.book_now': 'अभी बुक करें',
		'footer.address': 'पता',
		'footer.phone': 'फोन',
		'footer.timings': 'समय',
		'footer.directions': 'दिशा पाएं',
		'testimonials.title': 'हमारे मरीज़ क्या कहते हैं',
		'testimonials.subtitle': 'हमारे मूल्यवान मरीज़ों के वास्तविक अनुभव जो अपनी स्वास्थ्य देखभाल की ज़रूरतों के लिए हम पर भरोसा करते हैं'
	}
};

interface LanguageProviderProps {
	children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
	const [currentLanguage, setCurrentLanguage] = useState(clinicConfig.default_language);

	const setLanguage = (lang: string) => {
		if (clinicConfig.languages_supported.includes(lang)) {
			setCurrentLanguage(lang);
			localStorage.setItem('clinic-language', lang);
		}
	};

	const t = (key: string): string => {
		return translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
	};

	useEffect(() => {
		const savedLanguage = localStorage.getItem('clinic-language');
		if (savedLanguage && clinicConfig.languages_supported.includes(savedLanguage)) {
			setCurrentLanguage(savedLanguage);
		}
	}, []);

	const value: LanguageContextType = {
		currentLanguage,
		setLanguage,
		t,
		availableLanguages: clinicConfig.languages_supported
	};

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
};