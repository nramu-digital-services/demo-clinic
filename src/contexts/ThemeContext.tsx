import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { clinicConfig, Theme } from '../config/clinicConfig';

interface ThemeContextType {
	currentTheme: string;
	theme: Theme;
	setTheme: (themeName: string) => void;
	availableThemes: string[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [currentTheme, setCurrentTheme] = useState(clinicConfig.color_theme);

	const setTheme = (themeName: string) => {
		if (clinicConfig.themes[themeName]) {
			setCurrentTheme(themeName);
			localStorage.setItem('clinic-theme', themeName);
		}
	};

	useEffect(() => {
		const savedTheme = localStorage.getItem('clinic-theme');
		if (savedTheme && clinicConfig.themes[savedTheme]) {
			setCurrentTheme(savedTheme);
		}
	}, []);

	useEffect(() => {
		const theme = clinicConfig.themes[currentTheme];
		const root = document.documentElement;
		
		root.style.setProperty('--color-primary', theme.primary);
		root.style.setProperty('--color-secondary', theme.secondary);
		root.style.setProperty('--color-background', theme.background);
		root.style.setProperty('--color-text', theme.text);
		root.style.setProperty('--color-danger', theme.danger);
		root.style.setProperty('--font-family', theme.font);
	}, [currentTheme]);

	const value: ThemeContextType = {
		currentTheme,
		theme: clinicConfig.themes[currentTheme],
		setTheme,
		availableThemes: clinicConfig.color_themes_demo
	};

	return (
		<ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
	);
};