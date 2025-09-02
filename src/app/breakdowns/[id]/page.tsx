import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { sampleAds } from '@/data/ads';
import { Header } from '@/components/Header';
import { LazyImage } from '@/components/LazyImage';

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
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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

interface BreakdownPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return sampleAds.map((ad) => ({
    id: ad.id,
  }));
}

export default async function BreakdownPage({ params }: BreakdownPageProps) {
  const { id } = await params;
  const ad = sampleAds.find(a => a.id === id);

  if (!ad) {
    notFound();
  }

  // Get other ads from the same company
  const relatedAds = sampleAds.filter(a =>
    a.companyName === ad.companyName && a.id !== ad.id
  ).slice(0, 2);

  // Get other ads from the same industry (excluding current ad and same company ads)
  const industryAds = sampleAds.filter(a =>
    a.industry === ad.industry && 
    a.id !== ad.id && 
    a.companyName !== ad.companyName
  ).slice(0, 4);

  // Get other ads from the same platform (excluding current ad and same company ads)
  const platformAds = sampleAds.filter(a =>
    a.platform === ad.platform && 
    a.id !== ad.id && 
    a.companyName !== ad.companyName
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <div className="max-w-2xl mx-auto">
          {/* Back button and badges */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="text-sm font-medium">Back to feed</span>
            </Link>

            <div className="flex items-center gap-2">
              {ad.isMadeByStudio && (
                <Badge className="bg-black text-white text-xs">
                  Made by Diligent Studios®
                </Badge>
              )}
              {ad.isTopPerforming && (
                <Badge variant="outline" className="text-xs">
                  Top Performing
                </Badge>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {ad.companyName}
            </h1>
          </div>

          {/* Ad Card */}
          <Card className="overflow-hidden shadow-lg mb-12">
            <div className="p-6">
              {/* Company Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {ad.companyLogo ? (
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white">
                      <LazyImage
                        src={ad.companyLogo}
                        alt={`${ad.companyName} logo`}
                        width={48}
                        height={48}
                        className="rounded-lg"
                        priority={true}
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {ad.companyName.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {ad.companyName}
                    </h3>
                    <p className="text-sm text-gray-600">{ad.industry}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  {getPlatformIcon(ad.platform)}
                  {ad.platform}
                </Badge>
              </div>

              {/* Ad Content */}
              <div className="mb-6">
                <div className="space-y-4 text-sm leading-relaxed">
                  {ad.bodyText ? (
                    ad.bodyText.split('\n').map((line, index) => {
                      if (line.trim() === '') {
                        return <br key={index} />;
                      }
                      return (
                        <p key={index}>
                          {line}
                        </p>
                      );
                    })
                  ) : (
                    <p>Ad content coming soon.</p>
                  )}
                </div>
              </div>


            </div>

            {/* Ad Image Display */}
            <div className="relative w-full aspect-square bg-gray-50">
              <LazyImage
                src={ad.image}
                alt={`${ad.companyName} ad`}
                fill={true}
                className="w-full h-full"
                objectFit="cover"
                priority={true}
              />

              {/* Performance badges overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {ad.isTopPerforming && (
                  <Badge className="bg-green-500 text-white text-xs font-medium">
                    TOP PERFORMING
                  </Badge>
                )}
                {ad.isMadeByStudio && (
                  <Badge variant="secondary" className="bg-gray-800 text-white text-xs">
                    Made by Diligent Studio
                  </Badge>
                )}
              </div>
            </div>
          </Card>

          {/* Related Ads */}
          {relatedAds.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Ads from this brand
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedAds.map((relatedAd) => (
                  <Link
                    key={relatedAd.id}
                    href={`/breakdowns/${relatedAd.id}`}
                    className="group"
                  >
                    <div className="space-y-3">
                      <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-50">
                        <LazyImage
                          src={relatedAd.image}
                          alt={`${relatedAd.companyName} ad`}
                          fill={true}
                          className="group-hover:scale-105 transition-transform duration-300"
                          objectFit="cover"
                        />
                      </div>
                      <h4 className="font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                        {relatedAd.companyName}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* More Industry Ads */}
          {industryAds.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                More {ad.industry} ads
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {industryAds.map((industryAd) => (
                  <Link
                    key={industryAd.id}
                    href={`/breakdowns/${industryAd.id}`}
                    className="group"
                  >
                    <div className="space-y-3">
                      <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-50">
                        <LazyImage
                          src={industryAd.image}
                          alt={`${industryAd.companyName} ad`}
                          fill={true}
                          className="group-hover:scale-105 transition-transform duration-300"
                          objectFit="cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                          {industryAd.companyName}
                        </h4>
                        <p className="text-sm text-gray-600">{industryAd.platform}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* More Platform Ads */}
          {platformAds.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                More {ad.platform} ads
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {platformAds.map((platformAd) => (
                  <Link
                    key={platformAd.id}
                    href={`/breakdowns/${platformAd.id}`}
                    className="group"
                  >
                    <div className="space-y-3">
                      <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-50">
                        <LazyImage
                          src={platformAd.image}
                          alt={`${platformAd.companyName} ad`}
                          fill={true}
                          className="group-hover:scale-105 transition-transform duration-300"
                          objectFit="cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                          {platformAd.companyName}
                        </h4>
                        <p className="text-sm text-gray-600">{platformAd.industry}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
