
import { useMemo } from 'react';
import { PRICING_DATA, APARTMENT_PRICING } from '../constants';
import type { CostCalculationResult, HouseType, PricingLevel } from '../types';

export const useCostCalculator = (
  totalArea: number,
  houseType: HouseType,
  pricingLevel: PricingLevel,
  options?: { 
    apartmentType?: keyof typeof APARTMENT_PRICING;
    customPricePerSqm?: number;
  }
): CostCalculationResult => {
  return useMemo(() => {
    // 1. Handle Apartment type per 2026 tiers
    if (houseType === 'apartment') {
      if (!options?.apartmentType) {
        return { totalArea: 0, pricePerSqm: 0, totalCost: 0, tierDescription: '' };
      }
      const type = options.apartmentType;
      
      if (type === 'large_area') {
        if (isNaN(totalArea) || totalArea < 100) {
          return { totalArea: totalArea || 0, pricePerSqm: 0, totalCost: 0, tierDescription: 'Yêu cầu DT ≥ 100m²' };
        }
        let pricePerSqm = APARTMENT_PRICING.large_area.price;
        const totalCost = totalArea * pricePerSqm;
        return { totalArea, pricePerSqm, totalCost, tierDescription: `(DT ≥ 100m²)` };
      } else {
        let totalCost = APARTMENT_PRICING[type].price;
        return { totalArea: 0, pricePerSqm: 0, totalCost, tierDescription: APARTMENT_PRICING[type].label };
      }
    }

    // 2. Handle Commercial with custom price
    if (houseType === 'commercial' && options?.customPricePerSqm && options.customPricePerSqm > 0) {
      if (isNaN(totalArea) || totalArea <= 0) {
          return { totalArea: 0, pricePerSqm: 0, totalCost: 0, tierDescription: 'Cần nhập diện tích' };
      }
      let pricePerSqm = options.customPricePerSqm;
      const totalCost = totalArea * pricePerSqm;
      return { totalArea, pricePerSqm, totalCost, tierDescription: 'Theo yêu cầu' };
    }


    // 3. Handle Townhouse & Villa per 2026 document
    if (isNaN(totalArea) || totalArea <= 0) {
      return { totalArea: 0, pricePerSqm: 0, totalCost: 0, tierDescription: '' };
    }

    const pricingHouseType = houseType === 'commercial' ? 'villa' : houseType;
    const applicableTiers = PRICING_DATA[pricingHouseType][pricingLevel];

     if (!applicableTiers) {
      return { totalArea, pricePerSqm: 0, totalCost: 0, tierDescription: 'Gói không áp dụng' };
    }
    
    // Find matching tier
    const applicableTier = applicableTiers.find(tier => totalArea >= tier.minArea);
    
    if (!applicableTier) {
      return { totalArea, pricePerSqm: 0, totalCost: 0, tierDescription: '' };
    }
    
    let pricePerSqm = applicableTier.price;
    const totalCost = totalArea * pricePerSqm;
    
    const tierDescription = `(Diện tích ≥ ${applicableTier.minArea}m²)`;

    return { totalArea, pricePerSqm, totalCost, tierDescription };
  }, [totalArea, houseType, pricingLevel, options]);
};
