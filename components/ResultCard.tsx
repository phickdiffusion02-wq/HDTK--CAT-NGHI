
import React from 'react';
import { HOUSE_TYPE_LABELS, PRICING_LEVEL_LABELS, MISC_SERVICES_DATA, PACKAGE_PROPORTIONS } from '../constants';
import type { HouseType, PricingLevel, FloorData } from '../types';

interface ResultCardProps {
  totalArea: number;
  pricePerSqm: number;
  totalCost: number;
  tierDescription: string;
  houseType: HouseType;
  pricingLevel: PricingLevel;
  clientName: string;
  gardenCost: number;
  supervisorCost: number;
  renovationFee: number;
  luxuryFee: number;
  facadeFee: number;
  boqCost: number;
  greenBuildingCost: number; 
  redrawFacadeFee?: number;
  totalBeforeDiscount: number;
  discountAmount: number;
  discountPercentage: number;
  discountReason: string;
  finalTotalCost: number;
  qrCodeBase64?: string;
  floors: FloorData[];
  areaInputMode: 'simple' | 'detailed';
  selectedMiscServices: string[];
  selectedProportions: string[];
  isIndividual?: boolean;
  apartmentType?: string;
}

const formatCurrency = (value: number) => {
  if (value === 0) return '0 ₫';
  return new Intl.NumberFormat('vi-VN').format(value) + ' ₫';
};

const InfoBar: React.FC<{ label: string; value: React.ReactNode; subValue?: string }> = ({ label, value, subValue }) => (
  <div className="p-3 flex justify-between items-center border-b border-teal-50 last:border-0">
    <span className="text-gray-500 text-sm font-medium">{label}</span>
    <div className="text-right">
      <span className="font-bold text-gray-900 text-base">{value}</span>
      {subValue && <p className="text-[10px] text-teal-600 font-bold uppercase mt-0.5">{subValue}</p>}
    </div>
  </div>
);

export const ResultCard: React.FC<ResultCardProps> = ({ 
  totalArea, pricePerSqm, totalCost, tierDescription, houseType, pricingLevel, clientName, 
  gardenCost, supervisorCost, finalTotalCost,
  renovationFee, luxuryFee, facadeFee, boqCost, 
  greenBuildingCost, redrawFacadeFee,
  totalBeforeDiscount, discountAmount, discountPercentage, discountReason,
  qrCodeBase64, floors, areaInputMode, selectedMiscServices, selectedProportions,
  isIndividual, apartmentType
}) => {
  const currentProportions = PACKAGE_PROPORTIONS[pricingLevel];
  const totalPercentage = currentProportions
    .filter(p => selectedProportions.includes(p.id))
    .reduce((sum, p) => sum + p.percentage, 0);

  const excludedLabels = currentProportions
    .filter(p => !selectedProportions.includes(p.id))
    .map(p => p.label);

  return (
    <div className="bg-white border-2 border-teal-100 rounded-3xl shadow-xl text-gray-900 font-sans p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-3xl font-black text-teal-600 uppercase tracking-tighter">BÁO GIÁ THIẾT KẾ</h2>
        <div className="text-teal-300">
           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 mb-6">
        <InfoBar label="Loại / Gói:" value={`${HOUSE_TYPE_LABELS[houseType]} / ${PRICING_LEVEL_LABELS[pricingLevel]}`} />
        <InfoBar label="CĐT:" value={clientName || '---'} />
        
        {!(houseType === 'apartment' && apartmentType !== 'large_area') && (
          <div className="p-3 bg-white border-b border-gray-50">
              <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-500 text-sm font-medium">Tổng diện tích sàn:</span>
                  <span className="font-black text-gray-900 text-lg">{totalArea.toLocaleString()} m²</span>
              </div>
              
              {areaInputMode === 'detailed' && floors.length > 0 && (
                  <div className="overflow-hidden rounded-xl border border-gray-100">
                      <table className="w-full text-xs text-left">
                          <thead className="bg-gray-100/50 text-gray-400 font-bold uppercase text-[9px]">
                              <tr>
                                  <th className="px-3 py-2">Hạng mục</th>
                                  <th className="px-3 py-2 text-center">Diện tích</th>
                                  <th className="px-3 py-2 text-center">Hệ số</th>
                                  <th className="px-3 py-2 text-right">Cộng</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50 bg-white">
                              {floors.map((floor) => {
                                  const areaValue = parseFloat(floor.area) || 0;
                                  const coefValue = parseFloat(floor.coefficient) || 0;
                                  const subTotal = areaValue * (coefValue / 100);
                                  return (
                                      <tr key={floor.id}>
                                          <td className="px-3 py-1.5 text-gray-600 font-medium">{floor.name}</td>
                                          <td className="px-3 py-1.5 text-center text-gray-400">{areaValue}</td>
                                          <td className="px-3 py-1.5 text-center text-gray-400">{coefValue}%</td>
                                          <td className="px-3 py-1.5 text-right font-bold text-gray-900">{parseFloat(subTotal.toFixed(1))}</td>
                                      </tr>
                                  );
                              })}
                          </tbody>
                      </table>
                  </div>
              )}
          </div>
        )}

        {pricePerSqm > 0 && (
            <div className="p-3 flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">Đơn giá thiết kế:</span>
                <div className="text-right">
                    <span className="font-black text-gray-900 text-lg">{formatCurrency(pricePerSqm).replace('₫', 'đ')} / m²</span>
                    <p className="text-[10px] text-teal-600 font-bold uppercase">{tierDescription}</p>
                    {totalPercentage < 100 && (
                      <p className="text-[9px] text-red-500 font-black italic">(-{100 - totalPercentage}% thành phần hồ sơ)</p>
                    )}
                </div>
            </div>
        )}
      </div>
      
      <div className="space-y-2 text-sm px-1 mb-6">
        <div className="flex justify-between items-center text-gray-500">
            <span className="font-bold">Chi phí thiết kế chuẩn:</span>
            <span className="font-black text-gray-900">{formatCurrency(totalCost)}</span>
        </div>

        {excludedLabels.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2 px-1">
                <span className="text-[9px] text-red-400 font-bold italic uppercase">Không bao gồm: </span>
                {excludedLabels.map((l, idx) => (
                    <span key={idx} className="text-[9px] text-red-400 font-bold italic">{l}{idx < excludedLabels.length - 1 ? ',' : ''}</span>
                ))}
            </div>
        )}

        {luxuryFee > 0 && (
            <div className="flex justify-between items-center text-gray-500">
                <span className="font-bold">Phí thiết kế phong cách phức tạp (+15%):</span>
                <span className="font-black text-gray-900">{formatCurrency(luxuryFee)}</span>
            </div>
        )}
        {facadeFee > 0 && (
            <div className="flex justify-between items-center text-gray-500">
                <span className="font-bold">Hạng mục 2 mặt tiền (+10%):</span>
                <span className="font-black text-gray-900">{formatCurrency(facadeFee)}</span>
            </div>
        )}
        {renovationFee > 0 && (
            <div className="flex justify-between items-center text-gray-500">
                <span className="font-bold">Hạng mục cải tạo sửa chữa (+20%):</span>
                <span className="font-black text-gray-900">{formatCurrency(renovationFee)}</span>
            </div>
        )}
        {gardenCost > 0 && (
            <div className="flex justify-between items-center text-gray-500">
                <span className="font-bold">Thiết kế sân vườn (hệ số 0.5):</span>
                <span className="font-black text-gray-900">{formatCurrency(gardenCost)}</span>
            </div>
        )}
        {boqCost > 0 && (
            <div className="flex justify-between items-center text-gray-500">
                <span className="font-bold">Lập dự toán thi công (BOQ):</span>
                <span className="font-black text-gray-900">{formatCurrency(boqCost)}</span>
            </div>
        )}
        {supervisorCost > 0 && (
            <div className="flex justify-between items-center text-gray-500">
                <span className="font-bold">Giám sát tác giả:</span>
                <span className="font-black text-gray-900">{formatCurrency(supervisorCost)}</span>
            </div>
        )}

        {selectedMiscServices.length > 0 && (
            <div className="border-t border-dashed border-gray-200 pt-2 mt-2 space-y-2">
                {selectedMiscServices.map(id => {
                    const service = MISC_SERVICES_DATA.find(s => s.id === id);
                    return (
                        <div key={id} className="flex justify-between items-center text-indigo-600 italic">
                            <span className="font-bold">{service?.label}:</span>
                            <span className="font-black">{formatCurrency(service?.price || 0)}</span>
                        </div>
                    );
                })}
            </div>
        )}
        
        <div className="border-t border-gray-100 my-3 pt-3">
            <div className="flex justify-between items-center font-black text-lg text-gray-900">
                <span>Tổng cộng:</span>
                <span>{formatCurrency(totalBeforeDiscount)}</span>
            </div>
            {discountAmount > 0 && (
                <div className="mt-1">
                    <div className="flex justify-between items-center text-red-500 font-bold">
                        <span>Giảm trừ ({Math.round(discountPercentage)}%):</span>
                        <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                    {discountReason && <p className="text-right text-[10px] text-red-400 italic font-medium">Lý do: {discountReason}</p>}
                </div>
            )}
        </div>
      </div>

      <div className="text-center mb-6 py-4 bg-gray-50/50 rounded-2xl">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">TỔNG CHI PHÍ ƯỚC TÍNH</p>
        <p className="text-4xl font-black text-teal-500 drop-shadow-sm leading-none">
            {formatCurrency(finalTotalCost)}
        </p>
      </div>

      <div className="flex justify-between items-end border-t border-gray-100 pt-6">
        <div className="basis-1/2">
            <p className="text-[10px] text-gray-400 italic leading-tight">
                *Báo giá này chỉ là ước tính và có thể thay đổi<br/>tùy thuộc vào yêu cầu chi tiết.
            </p>
        </div>
        <div className="flex items-center gap-3">
            <div className="text-right">
                <p className="text-lg font-bold text-teal-700 leading-none mb-1" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  {isIndividual ? 'KTS Hoàng Phi' : 'Cát Nghi Interior'}
                </p>
                <p className="text-[10px] text-gray-500 font-bold">{isIndividual ? 'SĐT: 0934 888 040' : 'Catnghi.vn'}</p>
            </div>
            <div className="bg-white p-1 rounded-md border border-gray-100 shadow-sm">
                 <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-[8px] text-gray-400 font-bold uppercase">QR Code</div>
            </div>
        </div>
      </div>
    </div>
  );
};
