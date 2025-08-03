import React from 'react';
import { Heart, Globe, Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
	const { currentTheme, setTheme, availableThemes } = useTheme();
	const { currentLanguage, setLanguage, availableLanguages, t } = useLanguage();

	const languageNames = {
		en: 'English',
		te: 'తెలుగు',
		hi: 'हिंदी'
	};

	const themeNames = {
		'trust-light': 'Trust Light',
		'healing-green': 'Healing Green',
		'royal-care': 'Royal Care'
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<header className="sticky top-0 z-50 backdrop-blur-md border-b border-gray-200/20" 
				style={{ backgroundColor: 'var(--color-background)99' }}>
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					{/* Logo and Title */}
					<div 
						className="flex items-center space-x-3 cursor-pointer transition-transform hover:scale-105"
						onClick={scrollToTop}
					>
						<div className="p-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}>
							<Heart className="h-6 w-6 text-white" />
						</div>
						<div>
							<h1 className="text-xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-family)' }}>
								{t('clinic.name')}
							</h1>
							<p className="text-sm opacity-75" style={{ color: 'var(--color-text)' }}>
								{t('clinic.tagline')}
							</p>
						</div>
					</div>

					{/* Controls */}
					<div className="flex items-center space-x-4">
						{/* Language Selector */}
						<div className="relative group">
							<button className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors hover:bg-gray-100">
								<Globe className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
								<span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
									{languageNames[currentLanguage as keyof typeof languageNames]}
								</span>
							</button>
							<div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
								{availableLanguages.map((lang) => (
									<button
										key={lang}
										onClick={() => setLanguage(lang)}
										className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
											currentLanguage === lang ? 'font-semibold' : ''
										}`}
										style={{ 
											color: currentLanguage === lang ? 'var(--color-primary)' : 'var(--color-text)'
										}}
									>
										{languageNames[lang as keyof typeof languageNames]}
									</button>
								))}
							</div>
						</div>

						{/* Theme Selector (Demo Only) */}
						<div className="relative group">
							<button className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors hover:bg-gray-100">
								<Palette className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
								<span className="text-sm font-medium hidden sm:block" style={{ color: 'var(--color-text)' }}>
									{themeNames[currentTheme as keyof typeof themeNames]}
								</span>
							</button>
							<div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
								{availableThemes.map((theme) => (
									<button
										key={theme}
										onClick={() => setTheme(theme)}
										className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
											currentTheme === theme ? 'font-semibold' : ''
										}`}
										style={{ 
											color: currentTheme === theme ? 'var(--color-primary)' : 'var(--color-text)'
										}}
									>
										{themeNames[theme as keyof typeof themeNames]}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;