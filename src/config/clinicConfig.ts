export interface Doctor {
	id: string;
	name: string;
	qualifications: string[];
	reg_no: string;
	profile: string;
	timings: {
		day: string;
		slots: string[];
	}[];
	treatments: {
		category: string;
		items: string[];
	}[];
}

export interface Branch {
	id: string;
	name: string;
	address: string;
	phones: string[];
	map_url: string;
	timings: string;
	doctors: Doctor[];
}

export interface Theme {
	primary: string;
	secondary: string;
	background: string;
	text: string;
	danger: string;
	font: string;
}

export interface ClinicConfig {
	seo: {
		gsc_meta_tag: string;
		ga4_id: string;
	};
	languages_supported: string[];
	default_language: string;
	color_theme: string;
	color_themes_demo: string[];
	themes: Record<string, Theme>;
	branches: Branch[];
}

export const clinicConfig: ClinicConfig = {
	seo: {
		gsc_meta_tag: "google-site-verification=XYZ...",
		ga4_id: "G-XXXXXXXXXX"
	},
	languages_supported: ["en", "te", "hi"],
	default_language: "en",
	color_theme: "trust-light",
	color_themes_demo: ["trust-light", "healing-green", "royal-care"],
	themes: {
		"trust-light": {
			primary: "#007BFF",
			secondary: "#F0F4F8",
			background: "#FFFFFF",
			text: "#1C1C1C",
			danger: "#DC3545",
			font: "Inter, sans-serif"
		},
		"healing-green": {
			primary: "#43A047",
			secondary: "#E0F2F1",
			background: "#FFFFFF",
			text: "#2E7D32",
			danger: "#D32F2F",
			font: "Lato, sans-serif"
		},
		"royal-care": {
			primary: "#1B1B3A",
			secondary: "#FFD700",
			background: "#FDFDFD",
			text: "#333333",
			danger: "#C0392B",
			font: "Playfair Display, serif"
		}
	},
	branches: [
		{
			id: "pragathi-nagar",
			name: "Advaith Clinic – Pragathi Nagar",
			address: "Plot No. 389, Pragathi Nagar, Hyderabad",
			phones: ["+91 9705809090", "+91 9640310581"],
			map_url: "https://maps.app.goo.gl/qZyn6nEBRKr5gxsZA",
			timings: "9 AM – 9 PM",
			doctors: [
				{
					id: "dr-jeevitha",
					name: "Dr. Jeevitha",
					qualifications: ["MBBS", "MD"],
					reg_no: "92792",
					profile: "Specialist in General Medicine, Women's Health & Preventive Care",
					timings: [
						{
							day: "Monday to Saturday",
							slots: ["9:00 AM – 1:00 PM", "5:00 PM – 8:00 PM"]
						},
						{
							day: "Sunday",
							slots: ["9:00 AM – 12:00 PM"]
						}
					],
					treatments: [
						{
							category: "General Medicine",
							items: [
								"All Types Of Fever",
								"HyperTension",
								"Diabetes Mellitus",
								"Cardiac Disorder",
								"Stroke",
								"Thyroid Disorders",
								"Asthma: C.O.P.D",
								"URTI: LRTI",
								"Liver Disorders",
								"Pneumonia",
								"Renal Disorders"
							]
						},
						{
							category: "Women's Health",
							items: ["PCOD", "Anaemia", "Menstrual Disorders", "Pregnancy Care etc."]
						}
					]
				},
				{
					id: "dr-raj",
					name: "Dr. P.M. Raj",
					qualifications: ["MBBS", "MS"],
					reg_no: "071322",
					profile: "Consultant Surgeon specializing in Laparoscopic & General Surgery",
					timings: [
						{
							day: "Monday to Saturday",
							slots: ["10:00 AM – 2:00 PM", "6:00 PM – 9:00 PM"]
						},
						{
							day: "Sunday",
							slots: ["10:00 AM – 1:00 PM"]
						}
					],
					treatments: [
						{
							category: "Surgical Treatments",
							items: [
								"All Laparoscopic Procedures",
								"Hernia Hydrocele",
								"Fistula",
								"Family Planning Procedures",
								"Hemorrhoids Fissure",
								"Swellings",
								"Ulcer Dressings",
								"First Aid",
								"IV/IM injection",
								"Wound Dressing",
								"Nebulization",
								"X-Ray",
								"ECD",
								"Breast Disorders",
								"Suturing"
							]
						}
					]
				}
			]
		}
	]
};