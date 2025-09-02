'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Ad } from '@/types/ad';

interface AdCardProps {
  ad: Ad;
}

// Platform icon components
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="rgb(41, 41, 41)" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MetaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="rgb(41, 41, 41)" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="rgb(41, 41, 41)" className="w-4 h-4">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="rgb(41, 41, 41)" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
  </svg>
);

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'LinkedIn':
      return <LinkedInIcon />;
    case 'Meta':
    case 'Facebook':
      return <MetaIcon />;
    case 'Twitter':
      return <TwitterIcon />;
    case 'Instagram':
      return <InstagramIcon />;
    default:
      return <LinkedInIcon />;
  }
};

// Company logo component
const CompanyLogo = ({ companyName, logoUrl }: { companyName: string; logoUrl?: string }) => {
  const [showFallback, setShowFallback] = useState(false);

  const getFallbackLogo = () => {
    const initials = companyName
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const colors = [
      'bg-black', 'bg-blue-600', 'bg-green-600', 'bg-purple-600',
      'bg-red-600', 'bg-orange-600', 'bg-indigo-600', 'bg-gray-800'
    ];
    const colorIndex = companyName.length % colors.length;
    const bgColor = colors[colorIndex];

    return (
      <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
        {initials}
      </div>
    );
  };

  if (!logoUrl || showFallback) {
    return getFallbackLogo();
  }

  return (
    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white relative">
      <Image
        src={logoUrl}
        alt={`${companyName} logo`}
        width={40}
        height={40}
        className="w-full h-full object-contain"
        onError={() => setShowFallback(true)}
      />
    </div>
  );
};

export function AdCard({ ad }: AdCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/breakdowns/${ad.id}`} className="block h-full">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group m-0 border-0 h-full flex flex-col">
        {/* Text content at top - following diagram dimensions */}
        <div style={{ padding: '20px' }} className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1" style={{ gap: '16px' }}>
              <CompanyLogo companyName={ad.companyName} logoUrl={ad.companyLogo} />
              <div className="flex-1 min-w-0" style={{ marginRight: '16px' }}>
                <h3 style={{ color: 'rgb(41, 41, 41)', fontSize: '14px', fontWeight: '600' }} className="mb-1 truncate">
                  {ad.companyName}
                </h3>
                <p style={{ color: 'rgba(41, 41, 41, 0.5)', fontSize: '12px', fontWeight: '600' }} className="truncate">
                  {ad.industry}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(ad.companyLink, '_blank');
              }}
              className="hover:opacity-70 transition-opacity flex-shrink-0"
              style={{ padding: '8px' }}
            >
              {getPlatformIcon(ad.platform)}
            </button>
          </div>

          {ad.tags && ad.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {ad.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Image section - using regular Next.js Image */}
        <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
          {!imageError ? (
            <Image
              src={ad.image}
              alt={`${ad.companyName} ad`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Image unavailable</span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
