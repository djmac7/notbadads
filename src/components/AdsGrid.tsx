'use client';

import { useState, useMemo } from 'react';
import { AdCard } from './AdCard';
import { FilterBar } from './FilterBar';
import { Ad, FilterType } from '@/types/ad';

interface AdsGridProps {
  ads: Ad[];
}

export function AdsGrid({ ads }: AdsGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

  const filteredAds = useMemo(() => {
    if (activeFilter === 'all') {
      return ads;
    }

    if (!selectedValue) {
      return ads;
    }

    return ads.filter((ad) => {
      switch (activeFilter) {
        case 'industry':
          return ad.industry === selectedValue;
        case 'platform':
          return ad.platform === selectedValue;
        case 'offer':
          return ad.offer === selectedValue;
        case 'angle':
          return ad.angle === selectedValue;
        default:
          return true;
      }
    });
  }, [ads, activeFilter, selectedValue]);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setSelectedValue(undefined);
  };

  const handleValueChange = (value: string | undefined) => {
    setSelectedValue(value);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        selectedValue={selectedValue}
        onValueChange={handleValueChange}
        ads={ads}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredAds.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No ads found for the selected filter.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Showing {filteredAds.length} of {ads.length} ads
                {selectedValue && (
                  <span className="font-medium"> • {activeFilter}: {selectedValue}</span>
                )}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
              {filteredAds.map((ad) => (
                <div key={ad.id} className="h-full">
                  <AdCard ad={ad} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
