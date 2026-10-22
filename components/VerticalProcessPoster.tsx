import React from 'react';
import type { TimelineMilestone, AreaTier, ScheduleType } from './ContractScheduleTool';
import { AREA_TIERS } from './ContractScheduleTool';

interface MilestoneWithCalculatedDates extends TimelineMilestone {
  days: number;
  startDate: Date;
  endDate: Date;
  formattedClause: string;
}

interface VerticalProcessPosterProps {
  milestonesWithDates: MilestoneWithCalculatedDates[];
  clientName: string;
  customArea: number;
  activeTier: AreaTier;
  totalWorkingDays: number;
  designerDays: number;
  clientDays: number;
  startDate: string;
  finalCompletionDate: Date;
  scheduleType: ScheduleType;
  isIndividual: boolean;
  formatDate: (date: Date) => string;
}

export const VerticalProcessPoster: React.FC<VerticalProcessPosterProps> = ({
  milestonesWithDates,
  clientName,
  customArea,
  activeTier,
  totalWorkingDays,
  designerDays,
  clientDays,
  finalCompletionDate,
  scheduleType,
  isIndividual,
  formatDate,
}) => {
  const tierInfo = AREA_TIERS.find((t) => t.key === activeTier);
  const companyName = isIndividual ? 'KTS HOÀNG PHI' : 'CÁT NGHI INTERIOR';
  const scheduleTitle =
    scheduleType === 'client'
      ? 'TIẾN ĐỘ THỰC HIỆN HỢP ĐỒNG THIẾT KẾ'
      : scheduleType === 'interior'
      ? 'TIẾN ĐỘ HỢP ĐỒNG THIẾT KẾ NỘI THẤT'
      : 'TIẾN ĐỘ HỢP ĐỒNG THIẾT KẾ NỘI BỘ';
  const targetLabel =
    scheduleType === 'client'
      ? 'DỰ ÁN VỚI KHÁCH HÀNG'
      : scheduleType === 'interior'
      ? 'HĐTK NỘI THẤT'
      : 'NỘI BỘ - CHI NHÁNH';

  return (
    <div
      style={{
        width: '1080px',
        height: '1920px',
        maxHeight: '1920px',
        boxSizing: 'border-box',
        fontFamily: "'Montserrat', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
      className="bg-[#f0f5f4] text-slate-900 flex flex-col justify-between p-[36px] relative overflow-hidden border-[16px] border-[#0e756c] shadow-2xl"
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />

      {/* 1. TOP HEADER (Height ~210px) */}
      <div className="relative z-10 bg-gradient-to-r from-[#084b45] via-[#0e756c] to-[#128a80] text-white rounded-3xl p-6 shadow-xl border border-teal-600/40">
        <div className="flex justify-between items-center border-b border-teal-500/40 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffd54f] text-[#084b45] flex items-center justify-center font-black text-xl shadow-md">
              CN
            </div>
            <div>
              <p className="text-[18px] font-black tracking-wider uppercase text-white leading-tight">
                {companyName}
              </p>
              <p className="text-[12px] font-bold text-teal-100 uppercase tracking-widest">
                KIẾN TRÚC &amp; NỘI THẤT CAO CẤP • 0934 888 040
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#ffd54f] text-[#084b45] text-[12px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {targetLabel}
            </span>
            <span className="bg-white/15 text-teal-100 text-[12px] font-bold px-3 py-1 rounded-full border border-white/20">
              KHỔ 16:9 DỌC
            </span>
          </div>
        </div>

        {/* Title & Stats */}
        <div className="flex justify-between items-center mt-3.5 pt-1">
          <div>
            <span className="text-[12px] font-extrabold tracking-widest uppercase text-[#ffd54f] bg-black/20 px-2.5 py-0.5 rounded-md">
              QUY TRÌNH 7 BƯỚC THỰC HIỆN
            </span>
            <h1 className="text-[28px] font-black uppercase tracking-tight text-white mt-1 leading-tight drop-shadow-sm">
              {scheduleTitle}
            </h1>
            <p className="text-[15px] font-semibold text-teal-100 mt-0.5">
              Khách hàng: <strong className="text-[#ffd54f] font-black">{clientName || 'Quý Khách Hàng'}</strong>
              <span className="mx-2 text-teal-300">•</span>
              Diện tích: <strong className="text-white font-black">{customArea.toLocaleString()} m²</strong> ({tierInfo?.label})
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-md border border-[#ffd54f]/40 px-5 py-3 rounded-2xl text-center shadow-inner min-w-[200px]">
            <p className="text-[11px] font-black uppercase text-teal-200 tracking-wider">
              TỔNG THỜI GIAN
            </p>
            <p className="text-[34px] font-black text-[#ffd54f] leading-none mt-0.5">
              {totalWorkingDays}{' '}
              <span className="text-[15px] font-extrabold text-white">NGÀY</span>
            </p>
            <p className="text-[10px] font-semibold text-teal-200 mt-1">
              (Không gồm thời gian CĐT duyệt)
            </p>
          </div>
        </div>
      </div>

      {/* 2. BODY: 7 STEP-BY-STEP PROCESS CARDS (Height ~1440px) */}
      <div className="relative z-10 my-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {milestonesWithDates.map((m, idx) => {
            const isClient = m.party === 'client';
            return (
              <div
                key={m.id}
                className={`relative rounded-2xl p-4 border transition-all shadow-md flex items-start gap-4 ${
                  isClient
                    ? 'bg-amber-50/90 border-amber-300 text-slate-800'
                    : 'bg-white border-teal-200 text-slate-900'
                }`}
                style={{ minHeight: '185px' }}
              >
                {/* Left: Step Badge & Responsible Party */}
                <div className="flex flex-col items-center justify-between w-[120px] shrink-0 self-stretch border-r border-gray-200/80 pr-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-black shadow-md ${
                      isClient
                        ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white'
                        : 'bg-gradient-to-br from-[#084b45] to-[#0e756c] text-[#ffd54f]'
                    }`}
                  >
                    <span className="text-[9px] uppercase tracking-tighter opacity-80 leading-none">BƯỚC</span>
                    <span className="text-[20px] leading-none mt-0.5">0{idx + 1}</span>
                  </div>

                  <span
                    className={`text-[10px] font-black uppercase text-center px-2 py-1 rounded-lg w-full mt-2 leading-tight ${
                      isClient
                        ? 'bg-amber-200/80 text-amber-950 border border-amber-400/50'
                        : 'bg-teal-100 text-teal-900 border border-teal-300/60'
                    }`}
                  >
                    {isClient ? 'CĐT Phê Duyệt' : (isIndividual ? 'KTS Hoàng Phi' : 'CAT NGHI Interior')}
                  </span>

                  <div className="mt-auto pt-1 text-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Giai đoạn</span>
                    <p className="text-[12px] font-black text-gray-700">Đợt 0{idx + 1}</p>
                  </div>
                </div>

                {/* Center: Main Title & Detailed Contract Clause */}
                <div className="flex-1 flex flex-col justify-between self-stretch pr-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-[17px] font-black uppercase tracking-tight leading-snug ${
                          isClient ? 'text-amber-900' : 'text-[#084b45]'
                        }`}
                      >
                        {m.title}
                      </h3>
                    </div>

                    <p className="text-[13.5px] text-slate-700 leading-relaxed font-normal mt-1.5 bg-white/70 p-2 rounded-xl border border-gray-100">
                      {m.formattedClause}
                    </p>
                  </div>

                  {m.note && (
                    <div className="mt-2 flex items-center gap-1.5 text-[12px] font-bold text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 inline-block" />
                      <span>{m.note}</span>
                    </div>
                  )}
                </div>

                {/* Right: Duration Pill & Calendar Range */}
                <div className="w-[170px] shrink-0 self-stretch flex flex-col justify-center items-end bg-[#f8faf9] p-3 rounded-xl border border-teal-100/80 shadow-sm text-right">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                    Thời lượng
                  </span>
                  <div
                    className={`text-[20px] font-black leading-tight mt-0.5 ${
                      isClient ? 'text-amber-700' : 'text-[#0e756c]'
                    }`}
                  >
                    {m.days}{' '}
                    <span className="text-[13px] font-bold text-gray-600">NGÀY</span>
                  </div>

                  <div className="w-full border-t border-gray-200/80 my-1.5" />

                  <span className="text-[10px] font-bold text-gray-400 uppercase">
                    Thời gian dự kiến
                  </span>
                  <p className="text-[12px] font-black text-slate-800 whitespace-nowrap mt-0.5">
                    {formatDate(m.startDate)}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold">đến</p>
                  <p className="text-[12px] font-black text-teal-800 whitespace-nowrap">
                    {formatDate(m.endDate)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. BOTTOM FOOTER & SUMMARY (Height ~170px) */}
      <div className="relative z-10 bg-white rounded-3xl p-4.5 border-2 border-teal-200 shadow-xl">
        <div className="grid grid-cols-4 gap-3 text-center border-b border-gray-200 pb-3">
          <div className="bg-teal-50/80 p-2.5 rounded-xl border border-teal-100">
            <span className="text-[11px] font-black uppercase text-teal-800">
              Thiết Kế Thực Hiện
            </span>
            <p className="text-[19px] font-black text-[#084b45] leading-none mt-1">
              {designerDays} <span className="text-[12px] font-bold text-gray-600">ngày</span>
            </p>
          </div>

          <div className="bg-amber-50/80 p-2.5 rounded-xl border border-amber-200">
            <span className="text-[11px] font-black uppercase text-amber-800">
              CĐT Xem &amp; Duyệt
            </span>
            <p className="text-[19px] font-black text-amber-900 leading-none mt-1">
              {clientDays} <span className="text-[12px] font-bold text-gray-600">ngày</span>
            </p>
          </div>

          <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
            <span className="text-[11px] font-black uppercase text-emerald-800">
              Dự Kiến Hoàn Tất
            </span>
            <p className="text-[15px] font-black text-emerald-900 leading-none mt-1.5">
              {formatDate(finalCompletionDate)}
            </p>
          </div>

          <div className="bg-[#084b45] text-white p-2.5 rounded-xl flex flex-col justify-center">
            <span className="text-[10px] font-extrabold uppercase text-teal-200">
              TỔNG THỰC HIỆN
            </span>
            <p className="text-[20px] font-black text-[#ffd54f] leading-none mt-0.5">
              {totalWorkingDays} NGÀY
            </p>
          </div>
        </div>

        {/* Legal notice & Branding */}
        <div className="flex justify-between items-center pt-2.5 text-[12px]">
          <p className="text-gray-500 font-medium italic">
            * Thời gian tiến độ tính theo ngày làm việc (không bao gồm Thứ 7, Chủ Nhật &amp; ngày Lễ Tết theo luật định).
          </p>
          <div className="text-right">
            <span className="font-black text-[#084b45] uppercase tracking-wider text-[13px]">
              {companyName}
            </span>
            <span className="text-gray-400 font-bold ml-2">HOTLINE: 0934 888 040</span>
          </div>
        </div>
      </div>
    </div>
  );
};
