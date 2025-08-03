import React from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { clinicConfig } from '../config/clinicConfig';

const Footer: React.FC = () => {
	const { t } = useLanguage();
	const branch = clinicConfig.branches[0];

	return (
		<footer className="py-12 px-4 pb-20" style={{ backgroundColor: 'var(--color-secondary)' }}>
			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* Contact Info */}
					<div>
						<h4 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-family)' }}>
							{branch.name}
						</h4>
						
						<div className="space-y-3">
							<div className="flex items-start space-x-3">
								<MapPin className="h-5 w-5 mt-1 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
								<div>
									<p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
										{t('footer.address')}
									</p>
									<p className="text-sm opacity-75" style={{ color: 'var(--color-text)' }}>
										{branch.address}
									</p>
								</div>
							</div>

							<div className="flex items-center space-x-3">
								<Phone className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
								<div>
									<p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
										{t('footer.phone')}
									</p>
									<div className="text-sm opacity-75" style={{ color: 'var(--color-text)' }}>
										{branch.phones.map((phone, index) => (
											<a
												key={index}
												href={`tel:${phone}`}
												className="block hover:underline"
												style={{ color: 'var(--color-primary)' }}
											>
												{phone}
											</a>
										))}
									</div>
								</div>
							</div>

							<div className="flex items-center space-x-3">
								<Clock className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
								<div>
									<p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
										{t('footer.timings')}
									</p>
									<p className="text-sm opacity-75" style={{ color: 'var(--color-text)' }}>
										{branch.timings}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Map and Directions */}
					<div className="md:col-span-2 lg:col-span-2">
						<div className="bg-white rounded-lg p-4 shadow-md">
							<div className="flex items-center justify-between mb-4">
								<h4 className="text-lg font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-family)' }}>
									Location
								</h4>
								<a
									href={branch.map_url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center space-x-2 text-sm font-semibold hover:underline"
									style={{ color: 'var(--color-primary)' }}
								>
									<span>{t('footer.directions')}</span>
									<ExternalLink className="h-4 w-4" />
								</a>
							</div>
							
							{/* Placeholder for map */}
							<div className="aspect-video rounded-lg flex items-center justify-center" 
								 style={{ backgroundColor: 'var(--color-secondary)' }}>
								<div className="text-center">
									<MapPin className="h-12 w-12 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
									<p className="text-sm" style={{ color: 'var(--color-text)' }}>
										Click "Get Directions" to view on Google Maps
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-8 pt-8 border-t border-gray-300 text-center">
					<p className="text-sm opacity-75" style={{ color: 'var(--color-text)' }}>
						© 2025 {t('clinic.name')}. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;