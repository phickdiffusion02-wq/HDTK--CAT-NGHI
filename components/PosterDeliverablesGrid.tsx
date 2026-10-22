import React from 'react';
import type { PricingLevel } from '../types';

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

interface Props {
  pricingLevel: PricingLevel;
}

export const PosterDeliverablesGrid: React.FC<Props> = ({ pricingLevel }) => {
  return (
    <div className="grid grid-cols-2 gap-4 flex-1 my-2">
      {/* ========================================================================= */}
      {/* CASE 1: STANDARD (GÓI THUẦN KIẾN TRÚC & KỸ THUẬT) */}
      {/* ========================================================================= */}
      {pricingLevel === 'standard' && (
        <>
          {/* Column 1: Kiến trúc & 3D Ngoại thất */}
          <div className="bg-white rounded-3xl p-4 border border-teal-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 border-b border-gray-100 pb-2.5 mb-2.5">
                <div className="p-2 bg-teal-50 text-[#0e756c] rounded-2xl border border-teal-100">
                  <IconBlueprint />
                </div>
                <div>
                  <h3 className="text-[16px] font-black text-[#0e756c] uppercase">Hồ Sơ Kiến Trúc &amp; 3D Ngoại Thất</h3>
                  <p className="text-[10.5px] text-gray-500 font-semibold">Quy hoạch không gian chuẩn phong thủy &amp; thẩm mỹ ngoại quan</p>
                </div>
              </div>

              <div className="space-y-2.5 text-[11.5px]">
                <div className="bg-teal-50/60 p-3 rounded-xl border border-teal-100">
                  <p className="font-black uppercase text-[#0e756c] text-[11.5px] mb-1.5 flex items-center justify-between">
                    <span>1. Mặt Bằng &amp; Khối Kiến Trúc Quy Chuẩn</span>
                    <span className="text-[9.5px] bg-teal-100 text-[#0e756c] px-2 py-0.5 rounded font-bold">Chuẩn phong thủy</span>
                  </p>
                  <ul className="space-y-1.5 text-gray-700 font-medium text-[11.5px]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Mặt bằng định vị tim trục &amp; bố trí phân khu công năng từng tầng chuẩn cung tốt phong thủy</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Mặt đứng chính diện, mặt đứng bên &amp; các mặt cắt kỹ thuật dọc/ngang công trình chi tiết</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Mặt bằng lát gạch nền các tầng, chi tiết ban công, sảnh đón, seno thoát nước &amp; mái bê tông</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Chi tiết cầu thang bộ, bậc tam cấp, thiết kế hộp gen kỹ thuật và chống thấm sàn</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-teal-50/60 p-3 rounded-xl border border-teal-100">
                  <p className="font-black uppercase text-[#0e756c] text-[11.5px] mb-1.5 flex items-center justify-between">
                    <span>2. Phối Cảnh 3D &amp; Chi Tiết Ngoại Thất Đa Chiều</span>
                    <span className="text-[9.5px] bg-teal-100 text-[#0e756c] px-2 py-0.5 rounded font-bold">3D Photoreal</span>
                  </p>
                  <ul className="space-y-1.5 text-gray-700 font-medium text-[11.5px]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Phối cảnh 3D ngoại thất ban ngày &amp; kịch bản ánh sáng đêm chân thực, sống động</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Chi tiết sảnh đón, bậc tam cấp, ban công, lan can kính/sắt nghệ thuật &amp; hệ lam chắn nắng</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Bảng tổng hợp thống kê quy cách cửa sổ, cửa đi chính, cửa ban công kèm kích thước lỗ ban</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Chi tiết cổng rào, tường bao sân vườn, bồn hoa trang trí mặt tiền đồng bộ cảnh quan</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#0e756c] text-[#ffd54f] py-2 px-3 rounded-2xl text-center font-black text-[12px] uppercase tracking-wider mt-2 shadow-inner">
              ✦ HỒ SƠ THIẾT KẾ KIẾN TRÚC &amp; NGOẠI THẤT TOÀN DIỆN
            </div>
          </div>

          {/* Column 2: Kết Cấu Chịu Lực & Cơ Điện (MEP) */}
          <div className="bg-white rounded-3xl p-4 border border-teal-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 border-b border-gray-100 pb-2.5 mb-2.5">
                <div className="p-2 bg-teal-50 text-[#0e756c] rounded-2xl border border-teal-100">
                  <IconBlueprint />
                </div>
                <div>
                  <h3 className="text-[16px] font-black text-[#0e756c] uppercase">Kết Cấu Chịu Lực &amp; Cơ Điện (MEP)</h3>
                  <p className="text-[10.5px] text-gray-500 font-semibold">An toàn chịu lực tải trọng &amp; hạ tầng kỹ thuật hiện đại</p>
                </div>
              </div>

              <div className="space-y-2.5 text-[11.5px]">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <p className="font-black uppercase text-gray-800 text-[11.5px] mb-1.5 flex items-center justify-between">
                    <span>1. Bản Vẽ Kết Cấu Chịu Lực (KC)</span>
                    <span className="text-[9.5px] bg-gray-200 text-gray-800 px-2 py-0.5 rounded font-bold">Chịu tải ISO</span>
                  </p>
                  <ul className="space-y-1.5 text-gray-700 font-medium text-[11.5px]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Mặt bằng định vị tim cọc, móng cọc/băng/đơn, đài móng &amp; hệ giằng móng kiên cố</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Khai triển kết cấu cột, vách bê tông cốt thép, dầm ngang, dầm dọc và sàn các tầng</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Chi tiết cốt thép bản thang bộ, lanh-tô cửa, ô văng &amp; bể nước ngầm/hầm tự hoại</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Bảng tổng hợp &amp; thống kê khối lượng thép chi tiết từng cấu kiện phục vụ mua sắm vật tư</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <p className="font-black uppercase text-gray-800 text-[11.5px] mb-1.5 flex items-center justify-between">
                    <span>2. Hệ Thống Điện Nước &amp; Hạ Tầng (MEP)</span>
                    <span className="text-[9.5px] bg-gray-200 text-gray-800 px-2 py-0.5 rounded font-bold">An toàn kỹ thuật</span>
                  </p>
                  <ul className="space-y-1.5 text-gray-700 font-medium text-[11.5px]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Sơ đồ đơn tuyến tủ điện tổng, tủ phân phối từng tầng, cấp nguồn máy lạnh &amp; tiếp địa chống giật</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Mặt bằng cấp thoát nước lạnh/nóng (hỗ trợ NLMT), sơ đồ hầm tự hoại 3 ngăn &amp; thoát nước mưa sân thượng</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Mặt bằng định vị đèn chiếu sáng, công tắc, ổ cắm đôi &amp; đường chờ cáp mạng Internet, Camera</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Bảng kê chi tiết chủng loại dây dẫn Cadivi, ống luồn Sino/Panasonic &amp; ống thoát Bình Minh</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#0e756c] text-[#ffd54f] py-2 px-3 rounded-2xl text-center font-black text-[12px] uppercase tracking-wider mt-2 shadow-inner">
              ✦ BẢN VẼ KẾT CẤU &amp; CƠ ĐIỆN ĐẦY ĐỦ CƠ SỞ PHÁP LÝ THI CÔNG
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* CASE 2: INTERIOR (GÓI THUẦN NỘI THẤT) */}
      {/* ========================================================================= */}
      {pricingLevel === 'interior' && (
        <>
          {/* Column 1: Phối Cảnh 3D Render Không Gian Nội Thất */}
          <div className="bg-white rounded-3xl p-4 border border-teal-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 border-b border-gray-100 pb-2.5 mb-2.5">
                <div className="p-2 bg-amber-50 text-amber-700 rounded-2xl border border-amber-100">
                  <IconInterior3D />
                </div>
                <div>
                  <h3 className="text-[16px] font-black text-[#0e756c] uppercase">Phối Cảnh 3D Không Gian Nội Thất</h3>
                  <p className="text-[10.5px] text-gray-500 font-semibold">Trực quan hóa phong cách sống &amp; thẩm mỹ sang trọng</p>
                </div>
              </div>

              <div className="space-y-2.5 text-[11.5px]">
                <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/70">
                  <p className="font-black uppercase text-amber-900 text-[11.5px] mb-1.5 flex items-center justify-between">
                    <span>1. Không Gian Sinh Hoạt Chung Sang Trọng</span>
                    <span className="text-[9.5px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded font-bold">Không gian mở</span>
                  </p>
                  <ul className="space-y-1.5 text-gray-700 font-medium text-[11.5px]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px] mt-0.5">✓</span>
                      <span>Phối cảnh 3D phòng khách: sofa, bàn trà, vách tivi đá lam sóng, sảnh đón &amp; tủ giày âm tường</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px] mt-0.5">✓</span>
                      <span>Phối cảnh 3D phòng bếp: hệ tủ bếp trên/dưới kịch trần, bàn đảo bếp &amp; tủ rượu kính led hiện đại</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px] mt-0.5">✓</span>
                      <span>Bố trí bàn ăn gia đình 6-8 ghế, đèn thả nghệ thuật &amp; các mảng gương kính decor mở rộng không gian</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px] mt-0.5">✓</span>
                      <span>Render đa góc nhìn cận cảnh các chi tiết vân đá hoa cương, nẹp inox mạ vàng pvd tinh xảo</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/70">
                  <p className="font-black uppercase text-amber-900 text-[11.5px] mb-1.5 flex items-center justify-between">
                    <span>2. Không Gian Riêng Tư &amp; Thư Giãn Ấm Cúng</span>
                    <span className="text-[9.5px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded font-bold">Tiện nghi cao</span>
                  </p>
                  <ul className="space-y-1.5 text-gray-700 font-medium text-[11.5px]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px] mt-0.5">✓</span>
                      <span>Phối cảnh 3D phòng ngủ Master: giường ngủ bọc nệm, tab đầu giường, bàn phấn &amp; phòng thay đồ walk-in</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px] mt-0.5">✓</span>
                      <span>Phối cảnh 3D phòng ngủ con, góc học tập thông minh, phòng thờ trang nghiêm &amp; góc làm việc yên tĩnh</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px] mt-0.5">✓</span>
                      <span>Moodboard bảng màu sắc (Color Scheme), vật liệu phủ Melamine/Laminate/Veneer &amp; rèm cửa 2 lớp</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-black text-[11px] mt-0.5">✓</span>
                      <span>Mô phỏng kịch bản chiếu sáng 3000K-4000K tạo cảm giác ấm cúng, thư thái sau ngày làm việc</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-600 text-white py-2 px-3 rounded-2xl text-center font-black text-[12px] uppercase tracking-wider mt-2 shadow-inner">
              ✦ PHỐI CẢNH 3D NỘI THẤT SỐNG ĐỘNG CHUẨN XÁC TỪNG CHI TIẾT
            </div>
          </div>

          {/* Column 2: Khai Triển Fit-Out & Bản Vẽ Sản Xuất Xưởng Đồ Gỗ */}
          <div className="bg-white rounded-3xl p-4 border border-teal-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 border-b border-gray-100 pb-2.5 mb-2.5">
                <div className="p-2 bg-amber-50 text-amber-700 rounded-2xl border border-amber-100">
                  <IconInterior3D />
                </div>
                <div>
                  <h3 className="text-[16px] font-black text-[#0e756c] uppercase">Khai Triển Fit-Out &amp; Sản Xuất Xưởng</h3>
                  <p className="text-[10.5px] text-gray-500 font-semibold">Bản vẽ kỹ thuật đóng đồ gỗ &amp; hoàn thiện thi công thực tế</p>
                </div>
              </div>

              <div className="space-y-2.5 text-[11.5px]">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <p className="font-black uppercase text-gray-800 text-[11.5px] mb-1.5 flex items-center justify-between">
                    <span>1. Bản Vẽ Sản Xuất Xưởng Đồ Gỗ (1:20)</span>
                    <span className="text-[9.5px] bg-gray-200 text-gray-800 px-2 py-0.5 rounded font-bold">Xưởng sản xuất</span>
                  </p>
                  <ul className="space-y-1.5 text-gray-700 font-medium text-[11.5px]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Khai triển kỹ thuật đóng tủ bếp dưới/trên, mặt đá bếp chống ố, khay chia muỗng đĩa &amp; giá gia vị</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Chi tiết module tủ áo kịch trần cánh kính/gỗ, giường ngủ ngăn kéo, vách đầu giường &amp; bàn trang điểm</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Chỉ định code mã ván gỗ MDF chống ẩm An Cường (Melamine, Acrylic, Laminate) chuẩn catalog</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Chỉ định phụ kiện ngũ kim: ray âm giảm chấn, bản lề hơi chống va đập thương hiệu Hafele/Blum/Ivan</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <p className="font-black uppercase text-gray-800 text-[11.5px] mb-1.5 flex items-center justify-between">
                    <span>2. Khai Triển Hoàn Thiện Trần - Tường - Sàn</span>
                    <span className="text-[9.5px] bg-gray-200 text-gray-800 px-2 py-0.5 rounded font-bold">Fit-out hoàn thiện</span>
                  </p>
                  <ul className="space-y-1.5 text-gray-700 font-medium text-[11.5px]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Mặt bằng thiết kế trần thạch cao giật cấp, khe rèm âm trần, khe hắt led &amp; vị trí rọi ray nam châm</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Mặt bằng định vị đèn downlight âm trần, công tắc đảo chiều đầu giường &amp; ổ cắm thiết bị bếp</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Mặt bằng ốp lát gạch trang trí, đá hoa cương bàn bếp, sàn gỗ công nghiệp chống nước 12mm</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0e756c] font-black text-[11px] mt-0.5">✓</span>
                      <span>Chỉ định mã sơn nước Jotun/Dulux, giấy dán tường Hàn Quốc &amp; quy cách rèm cửa 2 lớp chống nắng</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-600 text-white py-2 px-3 rounded-2xl text-center font-black text-[12px] uppercase tracking-wider mt-2 shadow-inner">
              ✦ HỒ SƠ SẢN XUẤT XƯỞNG &amp; THI CÔNG NỘI THẤT CAO CẤP
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* CASE 3: PREMIUM (GÓI COMBO TOÀN DIỆN KIẾN TRÚC & NỘI THẤT) */}
      {/* ========================================================================= */}
      {pricingLevel === 'premium' && (
        <>
          {/* Column 1: Hồ Sơ Kiến Trúc & Kỹ Thuật (Architecture, KC, MEP) */}
          <div className="bg-white rounded-3xl p-4 border border-teal-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 border-b border-gray-100 pb-2.5 mb-2.5">
                <div className="p-2 bg-teal-50 text-[#0e756c] rounded-2xl border border-teal-100">
                  <IconBlueprint />
                </div>
                <div>
                  <h3 className="text-[16px] font-black text-[#0e756c] uppercase">Hồ Sơ Bản Vẽ Kiến Trúc &amp; Kỹ Thuật</h3>
                  <p className="text-[10.5px] text-gray-500 font-semibold">Đầy đủ cơ sở pháp lý &amp; tiêu chuẩn thi công xây dựng</p>
                </div>
              </div>

              <div className="space-y-2 text-[11.5px]">
                <div className="bg-teal-50/60 p-2.5 rounded-xl border border-teal-100">
                  <p className="font-black uppercase text-[#0e756c] text-[11px] mb-1 flex items-center justify-between">
                    <span>1. Bản Vẽ Kiến Trúc &amp; Phối Cảnh 3D</span>
                    <span className="text-[9.5px] bg-teal-100 text-[#0e756c] px-1.5 py-0.2 rounded font-bold">Quy chuẩn</span>
                  </p>
                  <ul className="space-y-1 text-gray-700 font-medium text-[11px]">
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Mặt bằng định vị &amp; bố trí công năng từng tầng chuẩn phong thủy</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Mặt đứng chính, mặt đứng bên &amp; các mặt cắt kỹ thuật dọc/ngang</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Phối cảnh 3D ngoại thất ban ngày &amp; kịch bản ánh sáng đêm chân thực</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Chi tiết ban công, lan can, lam chắn nắng, sảnh đón &amp; cổng rào</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Chi tiết cầu thang, tam cấp, nhà vệ sinh (WC) &amp; bảng thống kê cửa sổ/cửa đi</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <p className="font-black uppercase text-gray-800 text-[11px] mb-1 flex items-center justify-between">
                    <span>2. Bản Vẽ Kết Cấu Chịu Lực (KC)</span>
                    <span className="text-[9.5px] bg-gray-200 text-gray-800 px-1.5 py-0.2 rounded font-bold">Chịu tải ISO</span>
                  </p>
                  <ul className="space-y-1 text-gray-700 font-medium text-[11px]">
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Mặt bằng định vị tim cọc, móng đơn/băng/cọc, đài móng &amp; giằng móng</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Khai triển kết cấu cột, vách, dầm sàn bê tông cốt thép các tầng</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Bảng tổng hợp &amp; thống kê khối lượng thép chi tiết từng cấu kiện</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <p className="font-black uppercase text-gray-800 text-[11px] mb-1 flex items-center justify-between">
                    <span>3. Hệ Thống Điện Nước &amp; Hạ Tầng (MEP)</span>
                    <span className="text-[9.5px] bg-gray-200 text-gray-800 px-1.5 py-0.2 rounded font-bold">An toàn</span>
                  </p>
                  <ul className="space-y-1 text-gray-700 font-medium text-[11px]">
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Sơ đồ đơn tuyến tủ điện tổng, tủ tầng, cấp nguồn máy lạnh &amp; tiếp địa</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Mặt bằng cấp thoát nước lạnh/nóng, thoát nước sinh hoạt &amp; hầm tự hoại</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Mặt bằng đèn chiếu sáng, công tắc, ổ cắm &amp; đường chờ cáp mạng/Camera</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#0e756c] text-[#ffd54f] py-2 px-3 rounded-2xl text-center font-black text-[12px] uppercase tracking-wider mt-2 shadow-inner">
              ✦ HỒ SƠ THI CÔNG XÂY THÔ &amp; HOÀN THIỆN TOÀN DIỆN
            </div>
          </div>

          {/* Column 2: Bản Vẽ Thiết Kế & Fit-Out Nội Thất */}
          <div className="bg-white rounded-3xl p-4 border border-teal-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 border-b border-gray-100 pb-2.5 mb-2.5">
                <div className="p-2 bg-amber-50 text-amber-700 rounded-2xl border border-amber-100">
                  <IconInterior3D />
                </div>
                <div>
                  <h3 className="text-[16px] font-black text-[#0e756c] uppercase">Hồ Sơ Thiết Kế &amp; Fit-Out Nội Thất</h3>
                  <p className="text-[10.5px] text-gray-500 font-semibold">Phối cảnh 3D sống động &amp; bản vẽ sản xuất xưởng gỗ</p>
                </div>
              </div>

              <div className="space-y-2 text-[11.5px]">
                <div className="bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/70">
                  <p className="font-black uppercase text-amber-900 text-[11px] mb-1 flex items-center justify-between">
                    <span>1. Phối Cảnh 3D Render Đa Chiều</span>
                    <span className="text-[9.5px] bg-amber-200 text-amber-950 px-1.5 py-0.2 rounded font-bold">Chất lượng cao</span>
                  </p>
                  <ul className="space-y-1 text-gray-700 font-medium text-[11px]">
                    <li className="flex items-start gap-1">
                      <span className="text-amber-700 font-black text-[10px] mt-0.5">✓</span>
                      <span>Phối cảnh 3D không gian phòng khách, sảnh vào, tủ giày &amp; vách tivi</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-amber-700 font-black text-[10px] mt-0.5">✓</span>
                      <span>Phối cảnh 3D phòng bếp, đảo bếp, bàn ăn &amp; tủ rượu decor sang trọng</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-amber-700 font-black text-[10px] mt-0.5">✓</span>
                      <span>Phối cảnh 3D phòng ngủ Master, phòng ngủ con, phòng thờ &amp; góc làm việc</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-amber-700 font-black text-[10px] mt-0.5">✓</span>
                      <span>Định hình Moodboard bảng màu sắc, vật liệu phủ &amp; gu thẩm mỹ đồng nhất</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <p className="font-black uppercase text-gray-800 text-[11px] mb-1 flex items-center justify-between">
                    <span>2. Khai Triển Bản Vẽ Sản Xuất Đồ Gỗ</span>
                    <span className="text-[9.5px] bg-gray-200 text-gray-800 px-1.5 py-0.2 rounded font-bold">Tỉ lệ 1:20</span>
                  </p>
                  <ul className="space-y-1 text-gray-700 font-medium text-[11px]">
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Khai triển kỹ thuật tủ áo kịch trần, giường ngủ có ngăn kéo, tab đầu giường</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Chi tiết module tủ bếp trên/dưới, khay chia phụ kiện, vách ngăn CNC trang trí</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Chỉ định code mã ván gỗ công nghiệp An Cường (MDF chống ẩm, Melamine/Acrylic)</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Chỉ định thương hiệu phụ kiện ray âm giảm chấn, bản lề hơi (Hafele/Blum/Ivan)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <p className="font-black uppercase text-gray-800 text-[11px] mb-1 flex items-center justify-between">
                    <span>3. Chi Tiết Trần - Sàn &amp; Chiếu Sáng Decor</span>
                    <span className="text-[9.5px] bg-gray-200 text-gray-800 px-1.5 py-0.2 rounded font-bold">Thẩm mỹ cao</span>
                  </p>
                  <ul className="space-y-1 text-gray-700 font-medium text-[11px]">
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Mặt bằng thiết kế trần thạch cao giật cấp, khe hắt led &amp; vị trí đèn nam châm</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Mặt bằng ốp lát gạch trang trí, đá hoa cương bàn bếp, sàn gỗ công nghiệp</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-[#0e756c] font-black text-[10px] mt-0.5">✓</span>
                      <span>Chỉ định mã sơn nước (Jotun/Dulux), rèm cửa 2 lớp, giấy dán tường cao cấp</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-600 text-white py-2 px-3 rounded-2xl text-center font-black text-[12px] uppercase tracking-wider mt-2 shadow-inner">
              ✦ HỒ SƠ SẢN XUẤT XƯỞNG &amp; THI CÔNG NỘI THẤT CAO CẤP
            </div>
          </div>
        </>
      )}
    </div>
  );
};
