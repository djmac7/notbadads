import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AdsGrid } from '@/components/AdsGrid';
import { sampleAds } from '@/data/ads';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AdsGrid ads={sampleAds} />
    </div>
  );
}
