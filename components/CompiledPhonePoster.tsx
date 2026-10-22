import React, { useMemo } from 'react';
import { HOUSE_TYPE_LABELS, PAYMENT_SCHEDULE_DATA, MISC_SERVICES_DATA } from '../constants';
import type { HouseType, PricingLevel, FloorData } from '../types';

interface CompiledPhonePosterProps {
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

export const CompiledPhonePoster: React.FC<CompiledPhonePosterProps> = ({
  totalArea, pricePerSqm, totalCost, houseType, pricingLevel, clientName,
  gardenCost, supervisorCost, renovationFee, luxuryFee, facadeFee, boqCost,
  discountAmount, discountPercentage,
  finalTotalCost, floors, areaInputMode, selectedMiscServices,
  isIndividual, apartmentType, isLuxury, isRenovation,
  facadeCount, isBOQ, supervisionPackage, gardenArea
}) => {
  const showArchitecture = pricingLevel === 'standard' || pricingLevel === 'premium';
  const showInterior = pricingLevel === 'interior' || pricingLevel === 'premium';

  // Payments schedule logic
  const baseSchedule = PAYMENT_SCHEDULE_DATA[pricingLevel] || [];
  const scheduleData = useMemo(() => {
    if (pricingLevel === 'interior') {
      return baseSchedule.map((item) => ({
        ...item,
        content: isIndividual
          ? item.content.replace(/Công ty /g, '').replace(/CÁT NGHI /g, '')
          : item.content
      }));
    }
    if (isIndividual && baseSchedule.length > 0) {
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
  }, [baseSchedule, isIndividual, pricingLevel]);

  const brandName = isIndividual ? 'KTS HOÀNG PHI' : 'CÁT NGHI INTERIOR';
  const qrCodeUrl = isIndividual
    ? 'https://qr.zalo.me/s/2301985392078652395'
    : 'https://zalo.me/0934888040';
  const qrCodeImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrCodeUrl)}`;

  // 6 Steps definition
  const steps = [
    { step: 1, title: 'Khảo sát & Đo đạc', desc: 'Đo hiện trạng, lắng nghe nhu cầu & lập nhiệm vụ thiết kế chi tiết.' },
    { step: 2, title: 'Mặt bằng công năng', desc: 'Bố trí công năng chuẩn phong thủy & phối cảnh 3D ngoại thất tổng thể.' },
    { step: 3, title: 'Phối cảnh 3D nội thất', desc: 'Dựng 3D phòng khách, bếp, ngủ với vật liệu và ánh sáng thực tế.' },
    { step: 4, title: 'Bản vẽ kỹ thuật thi công', desc: 'Khai triển kết cấu chịu lực, móng dầm sàn, sơ đồ điện nước MEP.' },
    { step: 5, title: 'Bóc tách dự toán BOQ', desc: 'Bóc tách khối lượng vật tư và bảng giá dự toán thi công chi tiết.' },
    { step: 6, title: 'Bàn giao hồ sơ', desc: 'In đóng quyển 02 bộ A3 có dấu kỹ thuật cùng toàn bộ file CAD/PDF gốc.' },
  ];

  return (
    <div
      id="compiled-phone-poster-canvas"
      style={{ width: '900px', height: '1800px', boxSizing: 'border-box' }}
      className="bg-[#f0f5f4] text-slate-900 font-sans p-6 border-[14px] border-[#0e756c] relative overflow-hidden flex flex-col justify-between shadow-2xl"
    >
      {/* Background Watermark Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#0e756c 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* ================= 1. HEADER (Structured, high-end) ================= */}
      <div className="bg-gradient-to-r from-[#084b45] via-[#0e756c] to-[#116960] text-white rounded-3xl p-6 shadow-xl border border-teal-500/30 relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-400/10 rounded-full blur-2xl pointer-events-none -mr-24 -mt-24" />

        <div className="flex justify-between items-center border-b border-teal-400/30 pb-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#ffd54f] text-[#084b45] flex items-center justify-center font-black text-xl shadow-md">
              {isIndividual ? 'HP' : 'CN'}
            </div>
            <div>
              <p className="text-[18px] font-black tracking-wider uppercase text-white leading-tight">
                {brandName}
              </p>
              <p className="text-[11px] font-bold text-teal-100 uppercase tracking-widest mt-0.5">
                KIẾN TRÚC &amp; NỘI THẤT CAO CẤP • 0934 888 040
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#ffd54f] text-[#084b45] text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              HỒ SƠ TỔNG HỢP 1:2
            </span>
            <span className="bg-white/15 text-teal-50 text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
              {pricingLevel === 'standard' ? 'GÓI KIẾN TRÚC' : pricingLevel === 'interior' ? 'GÓI NỘI THẤT' : 'COMBO TOÀN DIỆN'}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <span className="text-[10.5px] font-extrabold tracking-widest uppercase text-[#ffd54f] bg-black/25 px-2.5 py-0.5 rounded inline-block mb-1">
              BẢNG TỔNG HỢP DỰ TOÁN &amp; QUY TRÌNH
            </span>
            <h1 className="text-[26px] font-black uppercase tracking-tight text-white leading-tight">
              Phương Án &amp; Báo Giá Thiết Kế
            </h1>
          </div>

          <div className="bg-black/25 backdrop-blur-sm border border-teal-400/30 px-4 py-2 rounded-2xl text-right">
            <p className="text-[14px] font-black text-[#ffd54f] uppercase truncate max-w-[280px]">
              CĐT: {clientName || 'Quý Khách Hàng'}
            </p>
            <p className="text-[11.5px] font-semibold text-teal-100 mt-0.5">
              {HOUSE_TYPE_LABELS[houseType]} • <strong className="text-white font-bold">{totalArea.toLocaleString()} m²</strong>
            </p>
          </div>
        </div>
      </div>

      {/* ================= 2. SECTION 1: HERO PRICING & PAYMENT SCHEDULE ================= */}
      <div className="bg-white rounded-3xl p-5 border border-teal-200 shadow-md shrink-0 my-1">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#0e756c]" />
            <h3 className="text-[15px] font-black text-[#0e756c] uppercase tracking-wider">
              1. Dự Toán Chi Phí &amp; Tiến Độ Thanh Toán
            </h3>
          </div>
          <span className="text-[11px] font-bold text-gray-500">
            Minh bạch từng đợt giải ngân
          </span>
        </div>

        <div className="grid grid-cols-12 gap-4 items-stretch">
          {/* Left Column: Hero Total + Detailed Cost Items (7 cols) */}
          <div className="col-span-7 flex flex-col justify-between space-y-3">
            {/* Total Hero Badge */}
            <div className="bg-gradient-to-br from-[#084b45] via-[#0e756c] to-[#0f6058] text-white rounded-2xl p-4 text-center shadow-lg border border-amber-300/40">
              <span className="text-[11px] font-black text-amber-300 tracking-widest uppercase bg-black/30 px-3 py-0.5 rounded-full border border-amber-400/30 inline-block mb-1.5">
                TỔNG CHI PHÍ THIẾT KẾ TRỌN GÓI
              </span>
              <div className="flex items-baseline justify-center gap-1.5">
                <span className="text-[40px] font-black text-[#ffd54f] tracking-tight leading-none">
                  {formatCurrency(finalTotalCost).replace(' ₫', '')}
                </span>
                <span className="text-[20px] font-black text-amber-200">VNĐ</span>
              </div>
              <div className="flex items-center justify-center gap-3 mt-2 pt-2 border-t border-teal-500/40 text-[12px] font-bold text-teal-100">
                <span>Đơn giá: <strong className="text-white">{formatCurrency(pricePerSqm).replace('₫', 'đ')}/m²</strong></span>
                <span>•</span>
                <span>DT: <strong className="text-white">{totalArea.toLocaleString()} m²</strong></span>
                {discountAmount > 0 && (
                  <>
                    <span>•</span>
                    <span className="text-amber-200 bg-red-900/40 px-2 py-0.5 rounded border border-red-400/30">
                      Giảm: -{Math.round(discountPercentage)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Cost Breakdown Details Card */}
            <div className="bg-teal-50/50 rounded-2xl p-3 border border-teal-100 text-[12.5px] space-y-1.5 flex-1 flex flex-col justify-center">
              <div className="flex justify-between font-bold text-gray-800 pb-1 border-b border-teal-100">
                <span>Phí thiết kế gốc ({totalArea} m²):</span>
                <span className="font-black text-teal-950">{formatCurrency(totalCost)}</span>
              </div>

              {/* Addons if any */}
              {(luxuryFee > 0 || facadeFee > 0 || renovationFee > 0 || gardenCost > 0 || boqCost > 0 || supervisorCost > 0) ? (
                <div className="space-y-1 text-gray-700 text-[12px]">
                  {luxuryFee > 0 && <div className="flex justify-between"><span>• Phong cách Luxury (+15%):</span><strong className="text-teal-800">+{formatCurrency(luxuryFee)}</strong></div>}
                  {facadeFee > 0 && <div className="flex justify-between"><span>• Thiết kế {facadeCount} mặt tiền (+10%):</span><strong className="text-teal-800">+{formatCurrency(facadeFee)}</strong></div>}
                  {renovationFee > 0 && <div className="flex justify-between"><span>• Cải tạo sửa chữa (+20%):</span><strong className="text-teal-800">+{formatCurrency(renovationFee)}</strong></div>}
                  {gardenCost > 0 && <div className="flex justify-between"><span>• Sân vườn ({gardenArea} m²):</span><strong className="text-teal-800">+{formatCurrency(gardenCost)}</strong></div>}
                  {boqCost > 0 && <div className="flex justify-between"><span>• Bóc tách dự toán BOQ:</span><strong className="text-teal-800">+{formatCurrency(boqCost)}</strong></div>}
                  {supervisorCost > 0 && <div className="flex justify-between"><span>• Giám sát tác giả ({supervisionPackage} lần):</span><strong className="text-teal-800">+{formatCurrency(supervisorCost)}</strong></div>}
                </div>
              ) : (
                <p className="text-[11.5px] font-semibold text-emerald-800 text-center py-1">
                  ✦ Đã bao gồm trọn gói hồ sơ kỹ thuật thi công &amp; phối cảnh 3D
                </p>
              )}

              {/* Selected Misc Services */}
              {selectedMiscServices.length > 0 && (
                <div className="border-t border-indigo-100 pt-1 text-indigo-900 space-y-1">
                  {selectedMiscServices.map(id => {
                    const s = MISC_SERVICES_DATA.find(x => x.id === id);
                    return (
                      <div key={id} className="flex justify-between font-medium text-[11.5px]">
                        <span className="truncate max-w-[200px]">• {s?.label}:</span>
                        <strong>{formatCurrency(s?.price || 0)}</strong>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Payment Schedule (5 cols) */}
          <div className="col-span-5 bg-teal-50/60 rounded-2xl p-3 border border-teal-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-teal-200/60 pb-1.5 mb-2">
                <span className="text-[12px] font-black uppercase text-[#0e756c] tracking-wider">
                  Tiến Độ Thanh Toán
                </span>
                <span className="text-[10px] font-bold bg-[#0e756c] text-white px-2.5 py-0.5 rounded-full shadow-2xs">
                  {scheduleData.length} Đợt
                </span>
              </div>

              <div className="space-y-2">
                {scheduleData.map((item) => (
                  <div
                    key={`${item.phase}-${item.content}`}
                    className="bg-white p-2 rounded-xl border border-teal-100 shadow-2xs flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-center text-[11.5px] font-bold mb-0.5">
                      <span className="text-[#0e756c]">Đợt {item.phase} ({item.percentage}%):</span>
                      <span className="text-teal-950 font-black">
                        {formatCurrency((finalTotalCost * item.percentage) / 100).replace(' ₫', 'đ')}
                      </span>
                    </div>
                    <p className="text-[10.5px] text-gray-500 font-medium truncate">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-teal-200/80 pt-2 mt-2 flex justify-between items-center text-[12px]">
              <span className="font-bold text-gray-600">Tổng thanh toán (100%):</span>
              <strong className="font-black text-[#0e756c] text-[14px]">{formatCurrency(finalTotalCost)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. SECTION 2: DELIVERABLES SCOPE ================= */}
      <div className="bg-white rounded-3xl p-5 border border-teal-200 shadow-md shrink-0 my-1">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#0e756c]" />
            <h3 className="text-[15px] font-black text-[#0e756c] uppercase tracking-wider">
              2. Thành Phần Hồ Sơ Bản Vẽ Thiết Kế Bàn Giao
            </h3>
          </div>
          <span className="text-[11px] font-bold text-gray-500">
            In 02 bộ A3 + File gốc CAD/PDF
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* CASE 1: STANDARD - Gói thuần Kiến Trúc */}
          {pricingLevel === 'standard' && (
            <>
              <div className="bg-teal-50/40 rounded-2xl p-3.5 border border-teal-100 flex flex-col justify-between space-y-2">
                <div>
                  <p className="text-[13px] font-black text-[#0e756c] uppercase border-b border-teal-200/60 pb-1 mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0e756c]" />
                    HỒ SƠ BẢN VẼ KIẾN TRÚC &amp; 3D
                  </p>
                  <ul className="space-y-1.5 text-[12px] text-gray-700 font-semibold">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px]">✓</span>
                      <span>Mặt bằng công năng các tầng chuẩn phong thủy</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px]">✓</span>
                      <span>Phối cảnh 3D ngoại thất đa góc nhìn chân thực</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px]">✓</span>
                      <span>Mặt đứng, mặt cắt, chi tiết sảnh &amp; ban công</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px]">✓</span>
                      <span>Bảng thống kê kích thước cửa đi, cửa sổ chi tiết</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-[#0e756c] text-[#ffd54f] py-1.5 px-3 rounded-xl text-center text-[11px] font-black uppercase tracking-wider">
                  Chuẩn kiến trúc &amp; ngoại quan
                </div>
              </div>

              <div className="bg-teal-50/40 rounded-2xl p-3.5 border border-teal-100 flex flex-col justify-between space-y-2">
                <div>
                  <p className="text-[13px] font-black text-[#0e756c] uppercase border-b border-teal-200/60 pb-1 mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0e756c]" />
                    KẾT CẤU CHỊU LỰC &amp; HỆ THỐNG MEP
                  </p>
                  <ul className="space-y-1.5 text-[12px] text-gray-700 font-semibold">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px]">✓</span>
                      <span>Bản vẽ định vị móng, dầm sàn, cột bê tông cốt thép</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px]">✓</span>
                      <span>Thống kê khối lượng sắt thép thi công từng cấu kiện</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px]">✓</span>
                      <span>Sơ đồ đơn tuyến tủ điện tổng, tủ tầng, cấp nguồn</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px]">✓</span>
                      <span>Mặt bằng cấp thoát nước, hầm tự hoại &amp; chống giật</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-[#0e756c] text-[#ffd54f] py-1.5 px-3 rounded-xl text-center text-[11px] font-black uppercase tracking-wider">
                  Chịu tải ISO &amp; an toàn kỹ thuật
                </div>
              </div>
            </>
          )}

          {/* CASE 2: INTERIOR - Gói thuần Nội Thất */}
          {pricingLevel === 'interior' && (
            <>
              <div className="bg-amber-50/40 rounded-2xl p-3.5 border border-amber-200/60 flex flex-col justify-between space-y-2">
                <div>
                  <p className="text-[13px] font-black text-amber-900 uppercase border-b border-amber-200/60 pb-1 mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                    PHỐI CẢNH 3D KHÔNG GIAN NỘI THẤT
                  </p>
                  <ul className="space-y-1.5 text-[12px] text-gray-700 font-semibold">
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px]">✓</span>
                      <span>Render 3D không gian phòng khách, sảnh &amp; vách tivi</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px]">✓</span>
                      <span>Phối cảnh 3D bếp, bàn ăn, đảo bếp &amp; tủ rượu kính</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px]">✓</span>
                      <span>Phối cảnh 3D phòng ngủ Master, ngủ con &amp; phòng thờ</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px]">✓</span>
                      <span>Moodboard bảng màu sắc, vật liệu &amp; ánh sáng ấm</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-600 text-white py-1.5 px-3 rounded-xl text-center text-[11px] font-black uppercase tracking-wider">
                  Phối cảnh 3D sống động chuẩn xác
                </div>
              </div>

              <div className="bg-amber-50/40 rounded-2xl p-3.5 border border-amber-200/60 flex flex-col justify-between space-y-2">
                <div>
                  <p className="text-[13px] font-black text-amber-900 uppercase border-b border-amber-200/60 pb-1 mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                    FIT-OUT &amp; SẢN XUẤT XƯỞNG ĐỒ GỖ
                  </p>
                  <ul className="space-y-1.5 text-[12px] text-gray-700 font-semibold">
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px]">✓</span>
                      <span>Bản vẽ kỹ thuật chi tiết tủ bếp, tủ áo, giường kệ</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px]">✓</span>
                      <span>Chỉ định mã ván gỗ MDF chống ẩm An Cường</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px]">✓</span>
                      <span>Chỉ định phụ kiện ray trượt, bản lề giảm chấn cao cấp</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px]">✓</span>
                      <span>Khai triển trần thạch cao, đèn led decor &amp; ốp lát sàn</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-600 text-white py-1.5 px-3 rounded-xl text-center text-[11px] font-black uppercase tracking-wider">
                  Sản xuất xưởng &amp; hoàn thiện thực tế
                </div>
              </div>
            </>
          )}

          {/* CASE 3: PREMIUM - Gói Combo Toàn Diện */}
          {pricingLevel === 'premium' && (
            <>
              <div className="bg-teal-50/40 rounded-2xl p-3.5 border border-teal-100 flex flex-col justify-between space-y-2">
                <div>
                  <p className="text-[13px] font-black text-[#0e756c] uppercase border-b border-teal-200/60 pb-1 mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0e756c]" />
                    HỒ SƠ BẢN VẼ KIẾN TRÚC
                  </p>
                  <ul className="space-y-1.5 text-[12px] text-gray-700 font-semibold">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px]">✓</span>
                      <span>Mặt bằng công năng các tầng chuẩn phong thủy</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px]">✓</span>
                      <span>Phối cảnh 3D ngoại thất đa góc nhìn chân thực</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px]">✓</span>
                      <span>Bản vẽ kết cấu móng dầm sàn + Thống kê thép</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px]">✓</span>
                      <span>Sơ đồ cấp thoát nước, hệ thống điện MEP</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-[#0e756c] text-[#ffd54f] py-1.5 px-3 rounded-xl text-center text-[11px] font-black uppercase tracking-wider">
                  Chuẩn kỹ thuật &amp; pháp lý xây dựng
                </div>
              </div>

              <div className="bg-amber-50/40 rounded-2xl p-3.5 border border-amber-200/60 flex flex-col justify-between space-y-2">
                <div>
                  <p className="text-[13px] font-black text-amber-900 uppercase border-b border-amber-200/60 pb-1 mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                    HỒ SƠ BẢN VẼ NỘI THẤT
                  </p>
                  <ul className="space-y-1.5 text-[12px] text-gray-700 font-semibold">
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px]">✓</span>
                      <span>Phối cảnh 3D không gian khách, bếp, phòng ngủ</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px]">✓</span>
                      <span>Bản vẽ kỹ thuật chi tiết sản xuất đồ gỗ Fit-out</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px]">✓</span>
                      <span>Chỉ định vật liệu gỗ An Cường, đá nhân tạo, acrylic</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px]">✓</span>
                      <span>Khai triển trần thạch cao, đèn led decor &amp; ốp lát</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-600 text-white py-1.5 px-3 rounded-xl text-center text-[11px] font-black uppercase tracking-wider">
                  Phối cảnh 3D &amp; sản xuất nội thất thực tế
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ================= 4. SECTION 3: 6-STEP PROCESS (Scientifically Arranged, Filled Space) ================= */}
      <div className="bg-white rounded-3xl p-5 border border-teal-200 shadow-md shrink-0 my-1">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#0e756c]" />
            <h3 className="text-[15px] font-black text-[#0e756c] uppercase tracking-wider">
              3. Quy Trình 6 Bước Thực Hiện Chuyên Nghiệp
            </h3>
          </div>
          <span className="text-[11px] font-black text-amber-800 bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200 uppercase">
            Tiêu Chuẩn ISO
          </span>
        </div>

        {/* 6 Steps Grid: 2 cols x 3 rows with balanced padding & typography */}
        <div className="grid grid-cols-2 gap-2.5">
          {steps.map((st) => (
            <div
              key={st.step}
              className="bg-gray-50/90 rounded-2xl p-3 border border-gray-100 flex items-start gap-3 hover:border-teal-300 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#084b45] to-[#0e756c] text-[#ffd54f] flex flex-col items-center justify-center shrink-0 font-black text-[13px] shadow-sm">
                0{st.step}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[12.5px] font-black text-[#0e756c] uppercase leading-tight truncate">
                  {st.title}
                </h4>
                <p className="text-[11px] text-gray-600 font-medium leading-relaxed mt-0.5 line-clamp-2">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= 5. FOOTER (Balanced & High Quality) ================= */}
      <div className="bg-white rounded-3xl p-4 border border-teal-200 shadow-lg flex justify-between items-center shrink-0 mt-1">
        <div>
          <p className="text-[12px] text-gray-500 font-medium italic leading-relaxed">
            * Đơn vị tư vấn kỹ thuật kiến trúc &amp; nội thất chuyên nghiệp.<br />
            * Báo giá có hiệu lực trong vòng 30 ngày kể từ ngày lập phương án.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[17px] font-black text-[#0e756c] uppercase leading-tight">
              {brandName}
            </p>
            <p className="text-[11.5px] text-amber-700 font-bold uppercase tracking-wider mt-0.5">
              HOTLINE: 0934 888 040
            </p>
          </div>
          <div className="bg-teal-50 p-1.5 rounded-2xl border border-teal-200">
            <img
              src={qrCodeImgSrc}
              alt="Zalo QR Code"
              className="w-12 h-12 rounded-xl object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
