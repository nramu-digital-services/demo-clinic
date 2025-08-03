import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Component as AnimatedTestimonials } from './ui/testimonial';

const TestimonialsSection: React.FC = () => {
	const { t } = useLanguage();

	return (
		<section className="py-16 px-4" style={{ backgroundColor: 'var(--color-background)' }}>
			<div className="container mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4" 
						style={{ color: 'var(--color-text)', fontFamily: 'var(--font-family)' }}>
						What Our Patients Say
					</h2>
					<p className="text-lg opacity-75 max-w-2xl mx-auto" style={{ color: 'var(--color-text)' }}>
						Real experiences from our valued patients who trust us with their healthcare needs
					</p>
					<div className="w-20 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
				</div>

				<AnimatedTestimonials />
			</div>
		</section>
	);
};

export default TestimonialsSection;