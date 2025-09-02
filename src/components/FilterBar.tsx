'use client';

import { Button } from '@/components/ui/button';
import { FilterType, Ad } from '@/types/ad';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  selectedValue?: string;
  onValueChange: (value: string | undefined) => void;
  ads: Ad[];
}

export function FilterBar({
  activeFilter,
  onFilterChange,
  selectedValue,
  onValueChange,
  ads
}: FilterBarProps) {
  const filters: { label: string; value: FilterType }[] = [
    { label: 'All Ads', value: 'all' },
    { label: 'Industry', value: 'industry' },
    { label: 'Platform', value: 'platform' },
    { label: 'Offer', value: 'offer' },
    { label: 'Angle', value: 'angle' },
  ];

  // Get unique values for the active filter
  const getFilterValues = (filterType: FilterType): string[] => {
    switch (filterType) {
      case 'industry':
        return [...new Set(ads.map(ad => ad.industry))].sort();
      case 'platform':
        return [...new Set(ads.map(ad => ad.platform))].sort();
      case 'offer':
        return [...new Set(ads.map(ad => ad.offer))].sort();
      case 'angle':
        return [...new Set(ads.map(ad => ad.angle))].sort();
      default:
        return [];
    }
  };

  const filterValues = activeFilter !== 'all' ? getFilterValues(activeFilter) : [];

  // Get plural form for "All" button
  const getPluralFilterName = (filterType: FilterType): string => {
    switch (filterType) {
      case 'industry':
        return 'Industries';
      case 'platform':
        return 'Platforms';
      case 'offer':
        return 'Offers';
      case 'angle':
        return 'Angles';
      default:
        return filterType;
    }
  };

  const handleFilterChange = (filter: FilterType) => {
    onFilterChange(filter);
    onValueChange(undefined); // Reset selected value when changing filter type
  };

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main filter categories */}
        <div className="flex items-center space-x-1 py-4 overflow-x-auto">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "ghost"}
              onClick={() => handleFilterChange(filter.value)}
              className={`whitespace-nowrap text-sm font-medium px-4 py-2 rounded-full ${
                activeFilter === filter.value
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Sub-filter values */}
        {filterValues.length > 0 && (
          <div className="pb-4">
            <div className="flex items-center space-x-2 overflow-x-auto">
              <Button
                variant="ghost"
                onClick={() => onValueChange(undefined)}
                className={`whitespace-nowrap text-sm px-3 py-1 rounded-md ${
                  !selectedValue
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All {getPluralFilterName(activeFilter)}
              </Button>
              {filterValues.map((value) => (
                <Button
                  key={value}
                  variant="ghost"
                  onClick={() => onValueChange(value)}
                  className={`whitespace-nowrap text-sm px-3 py-1 rounded-md ${
                    selectedValue === value
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
