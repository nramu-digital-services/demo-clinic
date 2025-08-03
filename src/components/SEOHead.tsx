import React from 'react';
import { clinicConfig } from '../config/clinicConfig';

const SEOHead: React.FC = () => {
	const branch = clinicConfig.branches[0];

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "MedicalClinic",
		"name": branch.name,
		"address": {
			"@type": "PostalAddress",
			"streetAddress": branch.address,
			"addressLocality": "Hyderabad",
			"addressRegion": "Telangana",
			"addressCountry": "IN"
		},
		"telephone": branch.phones,
		"openingHours": "Mo-Sa 09:00-21:00, Su 09:00-12:00",
		"medicalSpecialty": [
			"General Medicine",
			"Women's Health",
			"Surgery",
			"Preventive Care"
		],
		"physician": branch.doctors.map(doctor => ({
			"@type": "Physician",
			"name": doctor.name,
			"medicalSpecialty": doctor.treatments.map(t => t.category)
		}))
	};

	React.useEffect(() => {
		// Set page title
		document.title = `${branch.name} - Expert Medical Care in Hyderabad`;

		// Add meta tags
		const metaDescription = document.querySelector('meta[name="description"]');
		if (metaDescription) {
			metaDescription.setAttribute('content', 
				'Expert medical care at Advaith Clinic, Pragathi Nagar. Specialists in General Medicine, Women\'s Health & Surgery. Book your appointment today.'
			);
		} else {
			const meta = document.createElement('meta');
			meta.name = 'description';
			meta.content = 'Expert medical care at Advaith Clinic, Pragathi Nagar. Specialists in General Medicine, Women\'s Health & Surgery. Book your appointment today.';
			document.head.appendChild(meta);
		}

		// Add structured data
		const script = document.createElement('script');
		script.type = 'application/ld+json';
		script.textContent = JSON.stringify(structuredData);
		document.head.appendChild(script);

		// Add Google verification (if provided)
		if (clinicConfig.seo.gsc_meta_tag && clinicConfig.seo.gsc_meta_tag !== 'google-site-verification=XYZ...') {
			const gscMeta = document.createElement('meta');
			gscMeta.name = 'google-site-verification';
			gscMeta.content = clinicConfig.seo.gsc_meta_tag.replace('google-site-verification=', '');
			document.head.appendChild(gscMeta);
		}

		return () => {
			// Cleanup
			const existingScript = document.querySelector('script[type="application/ld+json"]');
			if (existingScript) {
				document.head.removeChild(existingScript);
			}
		};
	}, []);

	return null;
};

export default SEOHead;