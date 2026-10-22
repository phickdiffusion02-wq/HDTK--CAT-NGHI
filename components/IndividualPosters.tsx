import { PosterDeliverablesGrid } from "./PosterDeliverablesGrid";
import React, { useMemo } from 'react';
import { HOUSE_TYPE_LABELS, PACKAGE_PROPORTIONS, PAYMENT_SCHEDULE_DATA, ARCH_COMPONENTS, DELIVERABLES_DATA, MISC_SERVICES_DATA } from '../constants';
import type { HouseType, PricingLevel, FloorData } from '../types';

export interface IndividualPosterProps {
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
  floors: FloorData[];
  areaInputMode: 'simple' | 'detailed';
  selectedMiscServices: string[];
  selectedProportions: string[];
  isIndividual?: boolean;
  apartmentType?: string;
  isLuxury: boolean;
  isRenovation: boolean;
  facadeCount: number;
  isBOQ: boolean;
  supervisionPackage: 'none' | '1' | '2' | '4';
  gardenArea: string;
  isGreenBuilding: boolean;
  isRedrawFacade?: boolean;
}

const formatCurrency = (value: number) => {
  if (value === 0) return '0 ₫';
  return new Intl.NumberFormat('vi-VN').format(value) + ' ₫';
};

// ================= MODERN VECTOR ILLUSTRATIVE ICONS =================
const IconHouseModern = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#0e756c]">
    <path d="M3 10.5L12 3l9 7.5v10a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 20.5v-10z" />
    <path d="M9 22V12h6v10" />
    <path d="M12 7h.01" />
  </svg>
);

const IconBlueprint = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#0e756c]">
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
    <path d="M14 13h3" />
    <path d="M14 17h3" />
  </svg>
);

const IconInterior3D = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-amber-600">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const IconProcessStep = ({ step }: { step: number }) => {
  switch (step) {
    case 1: // Survey
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case 2: // Floorplan
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 12h18" />
          <path d="M12 3v18" />
          <path d="M8 7h.01" />
          <path d="M16 17h.01" />
        </svg>
      );
    case 3: // 3D Exterior
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case 4: // 3D Interior
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M20 7v10" />
          <path d="M4 7v10" />
          <path d="M4 12h16" />
          <path d="M7 7h10" />
          <path d="M9 17v2" />
          <path d="M15 17v2" />
        </svg>
      );
    case 5: // Technical drawings
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="14" y2="17" />
        </svg>
      );
    case 6: // Handover
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    default:
      return null;
  }
};

// ================= STANDARDIZED POSTER HEADER =================
const PosterHeader: React.FC<{
  posterNumber: string;
  title: string;
  badge: string;
  clientName: string;
  houseType: HouseType;
  pricingLevel: PricingLevel;
  totalArea: number;
  isIndividual?: boolean;
}> = ({ posterNumber, title, badge, clientName, houseType, pricingLevel, totalArea, isIndividual }) => {
  const brandName = isIndividual ? 'KTS HOÀNG PHI' : 'CÁT NGHI INTERIOR';
  const pkgLabel = pricingLevel === 'standard' ? 'Gói Kiến Trúc' : pricingLevel === 'interior' ? 'Gói Nội Thất' : 'Combo Toàn Diện';

  return (
    <div className="bg-gradient-to-r from-[#084b45] via-[#0e756c] to-[#116960] text-white rounded-3xl p-6 shadow-xl border border-teal-500/30 relative overflow-hidden shrink-0">
      {/* Decorative accent orb */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />

      {/* Top Bar */}
      <div className="flex justify-between items-center border-b border-teal-400/30 pb-3 mb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ffd54f] text-[#084b45] flex items-center justify-center font-black text-xl shadow-md">
            {isIndividual ? 'HP' : 'CN'}
          </div>
          <div>
            <p className="text-[17px] font-black tracking-wider uppercase text-white leading-tight">
              {brandName}
            </p>
            <p className="text-[11px] font-bold text-teal-100 uppercase tracking-widest">
              KIẾN TRÚC &amp; NỘI THẤT CAO CẤP • 0934 888 040
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-[#ffd54f] text-[#084b45] text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {posterNumber}
          </span>
          <span className="bg-white/15 text-teal-50 text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
            {badge}
          </span>
        </div>
      </div>

      {/* Title & Customer Quick Meta */}
      <div className="flex justify-between items-end">
        <div>
          <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#ffd54f] bg-black/25 px-2.5 py-0.5 rounded-md inline-block mb-1">
            HỒ SƠ BÁO GIÁ &amp; QUY TRÌNH
          </span>
          <h1 className="text-[26px] font-black uppercase tracking-tight text-white leading-tight">
            {title}
          </h1>
        </div>

        <div className="bg-black/25 backdrop-blur-sm border border-teal-400/30 px-4 py-2 rounded-2xl text-right">
          <p className="text-[13px] font-black text-[#ffd54f] uppercase truncate max-w-[280px]">
            CĐT: {clientName || 'Quý Khách Hàng'}
          </p>
          <p className="text-[11px] font-semibold text-teal-100 mt-0.5">
            {HOUSE_TYPE_LABELS[houseType]} • {pkgLabel} • <strong className="text-white">{totalArea.toLocaleString()} m²</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

// ================= STANDARDIZED POSTER FOOTER =================
const PosterFooter: React.FC<{ isIndividual?: boolean }> = ({ isIndividual }) => {
  const brandName = isIndividual ? 'KTS HOÀNG PHI' : 'CÁT NGHI INTERIOR';
  const qrCodeUrl = isIndividual
    ? 'https://qr.zalo.me/s/2301985392078652395'
    : 'https://zalo.me/0934888040';
  const qrCodeImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrCodeUrl)}`;

  return (
    <div className="bg-white rounded-2xl p-4 border border-teal-200 shadow-lg flex justify-between items-center shrink-0">
      <div>
        <p className="text-[12px] text-gray-500 font-medium italic leading-relaxed">
          * Đơn vị tư vấn kỹ thuật kiến trúc &amp; nội thất chuyên nghiệp.<br />
          * Báo giá có hiệu lực trong 30 ngày kể từ ngày lập phương án.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-[18px] font-black text-[#0e756c] leading-tight">
            {brandName}
          </p>
          <p className="text-[12px] text-amber-700 font-bold uppercase tracking-wider">
            HOTLINE: 0934 888 040
          </p>
        </div>
        <div className="bg-teal-50 p-1 rounded-xl border border-teal-200">
          <img
            src={qrCodeImgSrc}
            alt="Zalo QR Code"
            className="w-12 h-12 rounded-lg object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};


// =========================================================================
// POSTER 1: BÁO GIÁ & THANH TOÁN (Clean, high visual hierarchy, no overflow)
// =========================================================================
export const PosterQuote: React.FC<IndividualPosterProps> = (props) => {
  const baseSchedule = PAYMENT_SCHEDULE_DATA[props.pricingLevel] || [];
  const scheduleData = useMemo(() => {
    if (props.pricingLevel === 'interior') {
      return baseSchedule.map((item) => ({
        ...item,
        content: props.isIndividual
          ? item.content.replace(/Công ty /g, '').replace(/CÁT NGHI /g, '')
          : item.content
      }));
    }
    if (props.isIndividual && baseSchedule.length > 0) {
      const firstPhase = baseSchedule[0];
      const halfPct = firstPhase.percentage / 2;
      return [
        { phase: 1, content: 'Tạm ứng ký hợp đồng', percentage: halfPct },
        { phase: 2, content: 'Duyệt phương án cơ sở', percentage: halfPct },
        ...baseSchedule.slice(1).map((item, idx) => ({
          ...item,
          content: item.content.replace(/Công ty /g, '').replace(/CÁT NGHI /g, ''),
          phase: idx + 3
        }))
      ];
    }
    return baseSchedule;
  }, [baseSchedule, props.isIndividual, props.pricingLevel]);

  return (
    <div
      style={{ width: '900px', height: '1600px', boxSizing: 'border-box' }}
      className="bg-[#f0f5f4] text-slate-900 font-sans p-8 border-[16px] border-[#0e756c] relative overflow-hidden flex flex-col justify-between shadow-2xl"
    >
      {/* 1. Header */}
      <PosterHeader
        posterNumber="ẢNH 01 / 03"
        badge="DỰ TOÁN CHI PHÍ"
        title="BẢNG TỔNG HỢP BÁO GIÁ &amp; TIẾN ĐỘ THANH TOÁN"
        clientName={props.clientName}
        houseType={props.houseType}
        pricingLevel={props.pricingLevel}
        totalArea={props.totalArea}
        isIndividual={props.isIndividual}
      />

      {/* 2. Hero Total Card */}
      <div className="bg-gradient-to-br from-[#084b45] via-[#0e756c] to-[#0f6058] text-white rounded-3xl p-6 shadow-xl border-2 border-amber-300/40 relative overflow-hidden text-center my-3 shrink-0">
        <span className="text-[12px] font-black text-amber-300 tracking-widest uppercase bg-black/30 px-3.5 py-1 rounded-full border border-amber-400/30 inline-block mb-1.5">
          TỔNG CHI PHÍ THIẾT KẾ TRỌN GÓI
        </span>
        <div className="flex items-baseline justify-center gap-1.5">
          <span className="text-[52px] font-black text-[#ffd54f] tracking-tight leading-none">
            {formatCurrency(props.finalTotalCost).replace(' ₫', '')}
          </span>
          <span className="text-[28px] font-black text-amber-200">VNĐ</span>
        </div>

        <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t border-teal-500/40 text-[13px] font-bold text-teal-100">
          <div>
            Đơn giá: <strong className="text-white text-[15px]">{formatCurrency(props.pricePerSqm).replace('₫', 'đ')}/m²</strong>
          </div>
          <div>•</div>
          <div>
            Quy mô sàn: <strong className="text-white text-[15px]">{props.totalArea.toLocaleString()} m²</strong>
          </div>
          {props.discountAmount > 0 && (
            <>
              <div>•</div>
              <div className="text-amber-200 bg-red-900/40 px-3 py-0.5 rounded-full border border-red-400/30">
                Đã ưu đãi: -{formatCurrency(props.discountAmount)} (-{Math.round(props.discountPercentage)}%)
              </div>
            </>
          )}
        </div>
      </div>

      {/* 3. Middle Visual Block: Phân Bổ Diện Tích Sàn & Sơ Bộ Nội Dung Thực Hiện */}
      <div className="bg-white rounded-3xl p-5 border border-teal-200 shadow-lg flex-1 my-2 flex flex-col justify-between">
        <div>
          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-50 text-amber-700 rounded-xl border border-amber-100 shadow-xs">
                <IconBlueprint />
              </div>
              <div>
                <h3 className="text-[17px] font-black text-[#0e756c] uppercase tracking-tight">
                  Bảng Phân Bổ Diện Tích &amp; Quy Mô Công Trình
                </h3>
                <p className="text-[11px] text-gray-500 font-semibold">
                  Chi tiết đo đạc diện tích sàn theo hệ số tính chuẩn quy hoạch xây dựng
                </p>
              </div>
            </div>
            <span className="bg-teal-50 text-teal-800 text-[11px] font-extrabold px-3 py-1 rounded-full border border-teal-200">
              Quy Chuẩn Xây Dựng
            </span>
          </div>

          {/* Area table or simple display */}
          {props.areaInputMode === 'detailed' && props.floors.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-teal-100 shadow-2xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#0e756c] text-white font-bold text-[12px] uppercase tracking-wider">
                    <th className="py-2 px-4">Hạng Mục Sàn / Tầng</th>
                    <th className="py-2 px-3 text-center">DT Thô</th>
                    <th className="py-2 px-3 text-center">Hệ Số</th>
                    <th className="py-2 px-4 text-right">DT Quy Đổi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[12.5px]">
                  {props.floors.map((floor, i) => {
                    const a = parseFloat(floor.area) || 0;
                    const c = parseFloat(floor.coefficient) || 0;
                    const converted = a * (c / 100);
                    return (
                      <tr key={floor.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'}>
                        <td className="py-1.5 px-4 font-bold text-gray-800 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0e756c]" />
                          <span>{floor.name}</span>
                        </td>
                        <td className="py-1.5 px-3 text-center font-semibold text-gray-600">
                          {a.toLocaleString()} m²
                        </td>
                        <td className="py-1.5 px-3 text-center font-black text-teal-700">
                          <span className="bg-teal-50 px-2 py-0.5 rounded border border-teal-100 text-[11px]">
                            {c}%
                          </span>
                        </td>
                        <td className="py-1.5 px-4 text-right font-black text-gray-900">
                          {converted.toFixed(1)} m²
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-teal-50/70 to-white border border-teal-100 p-4 rounded-2xl text-center flex items-center justify-around shadow-2xs">
              <div>
                <span className="text-[11px] font-black text-teal-800 uppercase tracking-widest bg-white px-3 py-0.5 rounded-full border border-teal-200">
                  DIỆN TÍCH SÀN XÂY DỰNG
                </span>
                <p className="text-[38px] font-black text-[#0e756c] leading-tight my-0.5">
                  {props.totalArea.toLocaleString()} <span className="text-[20px] font-bold text-teal-700">m²</span>
                </p>
              </div>
              <p className="text-[12px] text-gray-600 font-medium max-w-[340px] text-left">
                Áp dụng quy chuẩn tính phí theo tổng diện tích sàn sử dụng thực tế của công trình {HOUSE_TYPE_LABELS[props.houseType]}.
              </p>
            </div>
          )}

          {/* Summary Scope Highlights in Quote Poster - Dynamically customized per package */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-black uppercase text-[#0e756c] tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0e756c]" />
                Sơ Bộ Nội Dung Thực Hiện: {
                  props.pricingLevel === 'standard'
                    ? 'Gói Kiến Trúc & Kỹ Thuật Xây Dựng'
                    : props.pricingLevel === 'interior'
                    ? 'Gói Thiết Kế Nội Thất Fit-Out'
                    : 'Gói Combo Toàn Diện (Kiến Trúc + Nội Thất)'
                }
              </span>
              <span className="text-[10.5px] font-bold text-gray-500">
                In 02 bộ A3 + File gốc AutoCAD/PDF
              </span>
            </div>

            {/* Case 1: Gói Kiến Trúc (Standard) - Thuần Kiến Trúc & Kết Cấu MEP, KHÔNG có Nội Thất */}
            {props.pricingLevel === 'standard' && (
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-teal-50/70 rounded-xl p-2.5 border border-teal-200">
                  <p className="text-[11.5px] font-black text-[#0e756c] uppercase mb-1 flex items-center gap-1">
                    <span>🏛️</span> Hồ Sơ Kiến Trúc &amp; 3D Ngoại Thất
                  </p>
                  <ul className="text-[11px] text-gray-700 font-medium space-y-1">
                    <li className="flex items-center gap-1">
                      <span className="text-teal-700 font-black text-[10px]">✓</span>
                      <span>Mặt bằng bố trí công năng từng tầng chuẩn phong thủy</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-teal-700 font-black text-[10px]">✓</span>
                      <span>Phối cảnh 3D ngoại thất đa góc nhìn ngày &amp; đêm chân thực</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-teal-700 font-black text-[10px]">✓</span>
                      <span>Mặt đứng, mặt cắt, chi tiết sảnh, ban công &amp; bảng cửa</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-teal-50/70 rounded-xl p-2.5 border border-teal-200">
                  <p className="text-[11.5px] font-black text-[#0e756c] uppercase mb-1 flex items-center gap-1">
                    <span>🏗️</span> Kết Cấu Chịu Lực &amp; Cơ Điện (MEP)
                  </p>
                  <ul className="text-[11px] text-gray-700 font-medium space-y-1">
                    <li className="flex items-center gap-1">
                      <span className="text-teal-700 font-black text-[10px]">✓</span>
                      <span>Bản vẽ móng, giằng, dầm sàn, cột bê tông cốt thép</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-teal-700 font-black text-[10px]">✓</span>
                      <span>Bảng tổng hợp &amp; thống kê khối lượng thép chi tiết</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-teal-700 font-black text-[10px]">✓</span>
                      <span>Sơ đồ điện chiếu sáng, cấp thoát nước &amp; hầm tự hoại</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Case 2: Gói Nội Thất (Interior) - Thuần 3D Không Gian & Sản Xuất Đồ Gỗ Fit-Out */}
            {props.pricingLevel === 'interior' && (
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-amber-50/70 rounded-xl p-2.5 border border-amber-200">
                  <p className="text-[11.5px] font-black text-amber-900 uppercase mb-1 flex items-center gap-1">
                    <span>🛋️</span> Phối Cảnh 3D Không Gian Nội Thất
                  </p>
                  <ul className="text-[11px] text-gray-700 font-medium space-y-1">
                    <li className="flex items-center gap-1">
                      <span className="text-amber-700 font-black text-[10px]">✓</span>
                      <span>Render 3D không gian phòng khách, bếp ăn, các phòng ngủ</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-amber-700 font-black text-[10px]">✓</span>
                      <span>Định hình phong cách thiết kế, moodboard màu sắc &amp; ánh sáng</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-amber-700 font-black text-[10px]">✓</span>
                      <span>Thiết kế vách tivi, tủ giày, tủ rượu &amp; trần thạch cao decor</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50/70 rounded-xl p-2.5 border border-amber-200">
                  <p className="text-[11.5px] font-black text-amber-900 uppercase mb-1 flex items-center gap-1">
                    <span>📐</span> Khai Triển Kỹ Thuật Đồ Gỗ Fit-Out
                  </p>
                  <ul className="text-[11px] text-gray-700 font-medium space-y-1">
                    <li className="flex items-center gap-1">
                      <span className="text-amber-700 font-black text-[10px]">✓</span>
                      <span>Bản vẽ kỹ thuật chi tiết tủ bếp, tủ áo kịch trần, giường kệ</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-amber-700 font-black text-[10px]">✓</span>
                      <span>Chỉ định mã ván gỗ MDF chống ẩm An Cường (Melamine/Acrylic)</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-amber-700 font-black text-[10px]">✓</span>
                      <span>Chỉ định phụ kiện ray trượt, bản lề giảm chấn Hafele/Blum</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Case 3: Gói Combo (Premium) - Đầy Đủ Cả Kiến Trúc & Nội Thất */}
            {props.pricingLevel === 'premium' && (
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-teal-50/70 rounded-xl p-2.5 border border-teal-200">
                  <p className="text-[11.5px] font-black text-[#0e756c] uppercase mb-1 flex items-center gap-1">
                    <span>🏛️</span> Hồ Sơ Kiến Trúc &amp; Kỹ Thuật
                  </p>
                  <ul className="text-[11px] text-gray-700 font-medium space-y-1">
                    <li className="flex items-center gap-1">
                      <span className="text-teal-700 font-black text-[10px]">✓</span>
                      <span>Mặt bằng công năng chuẩn phong thủy &amp; 3D ngoại thất</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-teal-700 font-black text-[10px]">✓</span>
                      <span>Bản vẽ kết cấu móng dầm sàn &amp; thống kê thép chịu lực</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-teal-700 font-black text-[10px]">✓</span>
                      <span>Sơ đồ hệ thống cơ điện lạnh, chiếu sáng &amp; cấp thoát nước MEP</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50/70 rounded-xl p-2.5 border border-amber-200">
                  <p className="text-[11.5px] font-black text-amber-900 uppercase mb-1 flex items-center gap-1">
                    <span>🛋️</span> Phối Cảnh 3D &amp; Fit-Out Nội Thất
                  </p>
                  <ul className="text-[11px] text-gray-700 font-medium space-y-1">
                    <li className="flex items-center gap-1">
                      <span className="text-amber-700 font-black text-[10px]">✓</span>
                      <span>Render 3D không gian các phòng khách, bếp, ngủ, phòng thờ</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-amber-700 font-black text-[10px]">✓</span>
                      <span>Bản vẽ kỹ thuật chi tiết sản xuất đồ gỗ (tủ áo, bếp, giường)</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-amber-700 font-black text-[10px]">✓</span>
                      <span>Chỉ định vật liệu gỗ An Cường, phụ kiện Hafele &amp; trần sàn</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Total Area Banner */}
        <div className="bg-gradient-to-r from-teal-50 via-teal-100/60 to-teal-50 p-3 rounded-2xl border border-teal-200 flex justify-between items-center mt-2 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-[16px]">📐</span>
            <span className="text-[12px] font-bold text-gray-700">
              Tổng diện tích sàn quy đổi tính phí:
            </span>
          </div>
          <div className="text-[16px] font-black text-[#0e756c]">
            {props.totalArea.toLocaleString()} m²
          </div>
        </div>
      </div>

      {/* 4. Bottom Payment Stages Row */}
      <div className="bg-white rounded-3xl p-5 border border-teal-200 shadow-md my-2 shrink-0">
        <div className="flex justify-between items-center border-b border-gray-100 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0e756c]" />
            <h3 className="text-[15px] font-black text-[#0e756c] uppercase">Tiến Độ Thanh Toán Theo Giai Đoạn</h3>
          </div>
          <span className="text-[11px] font-bold bg-amber-50 text-amber-800 px-3 py-0.5 rounded-full border border-amber-200">
            {scheduleData.length} Đợt Thanh Toán
          </span>
        </div>

        <div className={`grid gap-3 ${scheduleData.length === 3 ? 'grid-cols-3' : scheduleData.length === 5 ? 'grid-cols-5' : 'grid-cols-4'}`}>
          {scheduleData.map((item) => (
            <div key={`${item.phase}-${item.content}`} className="bg-gray-50/80 border border-gray-200 rounded-2xl p-3 flex flex-col justify-between text-center relative hover:border-teal-400 transition-colors">
              <span className="text-[10px] font-black text-white bg-[#0e756c] px-2.5 py-0.5 rounded-full uppercase self-center -mt-5 shadow-sm">
                ĐỢT {item.phase}
              </span>
              <div className="my-2">
                <span className="text-[26px] font-black text-teal-800 block leading-none">{item.percentage}%</span>
                <p className="text-[11.5px] font-bold text-gray-600 mt-1 line-clamp-2 leading-tight">
                  {item.content}
                </p>
              </div>
              <div className="bg-teal-50 border border-teal-200 text-[#0e756c] font-black text-[13px] py-1 px-1 rounded-xl">
                {formatCurrency((props.finalTotalCost * item.percentage) / 100)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Footer */}
      <PosterFooter isIndividual={props.isIndividual} />
    </div>
  );
};


// =========================================================================
// POSTER 2: NỘI DUNG HỒ SƠ BÀN GIAO (Comprehensive, exhaustive detail)
// =========================================================================
export const PosterDeliverables: React.FC<IndividualPosterProps> = (props) => {
  return (
    <div
      style={{ width: '900px', height: '1600px', boxSizing: 'border-box' }}
      className="bg-[#f0f5f4] text-slate-900 font-sans p-7 border-[16px] border-[#0e756c] relative overflow-hidden flex flex-col justify-between shadow-2xl"
    >
      {/* 1. Header */}
      <PosterHeader
        posterNumber="ẢNH 02 / 03"
        badge="DANH MỤC HỒ SƠ ĐẦY ĐỦ"
        title="CHI TIẾT ĐẦY ĐỦ THÀNH PHẦN HỒ SƠ THIẾT KẾ BÀN GIAO"
        clientName={props.clientName}
        houseType={props.houseType}
        pricingLevel={props.pricingLevel}
        totalArea={props.totalArea}
        isIndividual={props.isIndividual}
      />

      {/* 2. Main Content Grid (Dynamically adapted to package type) */}
      <PosterDeliverablesGrid pricingLevel={props.pricingLevel} />

      {/* 3. Deliverables Format & Quality Guarantee Bar */}
      <div className="bg-white rounded-2xl p-3 border border-teal-200 shadow-sm flex items-center justify-between my-1 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="text-[20px]">📦</span>
          <div>
            <p className="text-[12.5px] font-black text-[#0e756c] uppercase leading-tight">Quy Cách Đóng Quyển &amp; Bàn Giao Hồ Sơ</p>
            <p className="text-[11px] text-gray-600 font-medium">In màu đóng quyển 02 bộ bản vẽ A3 có dấu pháp nhân + Bàn giao trọn bộ File gốc AutoCAD, 3D Render &amp; PDF</p>
          </div>
        </div>
        <div className="bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200 text-teal-800 text-[11px] font-black uppercase text-center shrink-0">
          Chuẩn ISO Xây Dựng
        </div>
      </div>

      {/* 4. Footer */}
      <PosterFooter isIndividual={props.isIndividual} />
    </div>
  );
};


// =========================================================================
// POSTER 3: QUY TRÌNH THỰC HIỆN 6 BƯỚC (Visual sequential cards with custom icons)
// =========================================================================
export const PosterProcess: React.FC<IndividualPosterProps> = (props) => {
  const steps = [
    {
      step: 1,
      title: 'Khảo Sát & Đo Đạc Hiện Trạng',
      desc: 'Tiếp xúc trực tiếp, lắng nghe nhu cầu CĐT, đo đạc cao độ ranh đất và phân tích hướng nắng gió.',
      badge: 'Giai đoạn 01'
    },
    {
      step: 2,
      title: 'Thiết Lập Mặt Bằng Công Năng',
      desc: 'Sắp xếp không gian các tầng tối ưu diện tích sử dụng, chuẩn phong thủy và luồng giao thông tiện nghi.',
      badge: 'Giai đoạn 02'
    },
    {
      step: 3,
      title: 'Dựng Phối Cảnh 3D Ngoại Thất',
      desc: 'Thiết kế chi tiết mặt tiền ngôi nhà, lựa chọn phong cách kiến trúc và chỉ định vật liệu hoàn thiện.',
      badge: 'Giai đoạn 03'
    },
    {
      step: 4,
      title: 'Dựng Phối Cảnh 3D Nội Thất',
      desc: 'Render không gian phòng khách, bếp, phòng ngủ với kịch bản ánh sáng và vật liệu thực tế sang trọng.',
      badge: 'Giai đoạn 04'
    },
    {
      step: 5,
      title: 'Khai Triển Bản Vẽ Kỹ Thuật',
      desc: 'Triển khai chi tiết bản vẽ thi công kết cấu dầm sàn móng, sơ đồ điện nước MEP và hồ sơ xin phép.',
      badge: 'Giai đoạn 05'
    },
    {
      step: 6,
      title: 'Nghiệm Thu & Bàn Giao Hồ Sơ',
      desc: 'In ấn đóng tập 02 bộ A3 có dấu pháp nhân, bàn giao file mềm AutoCAD/PDF và hướng dẫn kỹ thuật.',
      badge: 'Bàn giao'
    }
  ];

  return (
    <div
      style={{ width: '900px', height: '1600px', boxSizing: 'border-box' }}
      className="bg-[#f0f5f4] text-slate-900 font-sans p-8 border-[16px] border-[#0e756c] relative overflow-hidden flex flex-col justify-between shadow-2xl"
    >
      {/* 1. Header */}
      <PosterHeader
        posterNumber="ẢNH 03 / 03"
        badge="QUY TRÌNH CHUẨN"
        title="QUY TRÌNH 6 BƯỚC TƯ VẤN THIẾT KẾ CHUYÊN NGHIỆP"
        clientName={props.clientName}
        houseType={props.houseType}
        pricingLevel={props.pricingLevel}
        totalArea={props.totalArea}
        isIndividual={props.isIndividual}
      />

      {/* 2. Sequential 6-Step Visual Cards */}
      <div className="space-y-3 flex-1 my-3 flex flex-col justify-between">
        {steps.map((st) => (
          <div
            key={st.step}
            className="bg-white rounded-2xl p-4 border border-teal-200/80 shadow-md flex items-center gap-4 hover:border-teal-500 transition-colors relative"
          >
            {/* Step Number & Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#084b45] to-[#0e756c] text-[#ffd54f] flex flex-col items-center justify-center shrink-0 shadow-md">
              <span className="text-[9px] uppercase tracking-tighter opacity-80 leading-none">BƯỚC</span>
              <span className="text-[20px] font-black leading-none mt-0.5">0{st.step}</span>
            </div>

            {/* Icon Illustration */}
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0e756c] flex items-center justify-center shrink-0 border border-teal-100">
              <IconProcessStep step={st.step} />
            </div>

            {/* Step Description */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-[16px] font-black text-[#0e756c] uppercase tracking-tight">
                  {st.title}
                </h4>
                <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 uppercase">
                  {st.badge}
                </span>
              </div>
              <p className="text-[13px] text-gray-600 font-medium leading-relaxed">
                {st.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Assurance Banner */}
      <div className="bg-[#0e756c] text-white p-3.5 rounded-2xl border-2 border-amber-300/30 text-center my-2 shadow-lg shrink-0">
        <p className="text-[#ffd54f] font-black text-[13px] uppercase tracking-wider flex items-center justify-center gap-2">
          <span>✦</span>
          <span>CAM KẾT ĐỒNG HÀNH GIẢI ĐÁP KỸ THUẬT TRONG SUỐT QUÁ TRÌNH THI CÔNG XÂY DỰNG</span>
          <span>✦</span>
        </p>
      </div>

      {/* 4. Footer */}
      <PosterFooter isIndividual={props.isIndividual} />
    </div>
  );
};
