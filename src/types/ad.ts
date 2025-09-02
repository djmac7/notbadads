export interface Ad {
  id: string;
  image: string;
  companyName: string;
  companyLink: string;
  companyLogo?: string; // URL to company logo
  industry: string;
  platform: 'LinkedIn' | 'Meta' | 'Facebook' | 'Instagram' | 'Twitter';
  offer: string;
  angle: string;
  isTopPerforming?: boolean;
  isMadeByStudio?: boolean;
  tags?: string[];
  bodyText?: string; // Configurable body text for breakdown cards
}

export type FilterType = 'all' | 'industry' | 'platform' | 'offer' | 'angle';

export interface FilterState {
  industry: string[];
  platform: string[];
  offer: string[];
  angle: string[];
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}
