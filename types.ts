
export type HouseType = 'townhouse' | 'villa' | 'apartment' | 'commercial';
export type PricingLevel = 'standard' | 'interior' | 'premium';

export interface PriceTier {
  minArea: number;
  price: number;
}

export interface PricingData {
  townhouse: {
    standard: PriceTier[];
    interior: PriceTier[];
    premium: PriceTier[];
  };
  villa: {
    standard: PriceTier[];
    interior: PriceTier[];
    premium: PriceTier[];
  };
}

export interface CostCalculationResult {
  totalArea: number;
  pricePerSqm: number;
  totalCost: number;
  tierDescription: string;
}

export interface FloorData {
  id: string;
  name: string;
  area: string;
  coefficient: string; // New field for area coefficient
}

// Interface for saving/loading history
export interface SavedQuote {
  id: string;
  timestamp: number;
  clientName: string;
  finalTotalCost: number;
  houseType: HouseType;
  // State snapshot
  data: {
    areaPerFloor: string;
    numberOfFloors: string;
    houseType: HouseType;
    pricingLevel: PricingLevel;
    clientName: string;
    gardenArea: string;
    gardenPricePerSqm: string;
    isRenovation: boolean;
    isLuxury: boolean;
    facadeCount: number;
    isBOQ: boolean;
    supervisionPackage: 'none' | 'basic' | 'advanced';
    isGreenBuilding: boolean;
    isRedrawFacade?: boolean;
    manualRedrawFacadeFee?: string; // Added field
    includeArch: boolean;
    includePM: boolean;
    includeStruct: boolean;
    includeMEP: boolean;
    discountPercentage: string;
    discountReason: string;
    apartmentType: any;
    apartmentArea: string;
    isCustomCommercialPrice: boolean;
    customCommercialPrice: string;
    areaInputMode: 'simple' | 'detailed';
    floors: FloorData[];
  };
}
