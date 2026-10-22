
import type { HouseType, PricingLevel, PricingData } from './types';

export const PRICING_DATA: PricingData = {
  townhouse: {
    standard: [ // Kiến Trúc - Nhà Phố
      { minArea: 450, price: 150000 },
      { minArea: 350, price: 170000 },
      { minArea: 250, price: 200000 },
      { minArea: 100, price: 230000 },
      { minArea: 0, price: 230000 },
    ],
    interior: [ // Nội thất - Nhà Phố
      { minArea: 350, price: 200000 },
      { minArea: 250, price: 220000 },
      { minArea: 100, price: 250000 },
      { minArea: 0, price: 250000 },
    ],
    premium: [ // Combo - Nhà Phố
      { minArea: 450, price: 290000 },
      { minArea: 350, price: 330000 },
      { minArea: 250, price: 380000 },
      { minArea: 100, price: 440000 },
      { minArea: 0, price: 440000 },
    ],
  },
  villa: {
    standard: [ // Kiến Trúc - Biệt Thự
      { minArea: 500, price: 190000 },
      { minArea: 350, price: 210000 },
      { minArea: 250, price: 220000 },
      { minArea: 0, price: 220000 },
    ],
    interior: [ // Nội thất - Biệt Thự
      { minArea: 0, price: 250000 },
    ],
    premium: [ // Combo - Biệt Thự
      { minArea: 500, price: 360000 },
      { minArea: 350, price: 400000 },
      { minArea: 250, price: 420000 },
      { minArea: 0, price: 420000 },
    ],
  },
};

export const APARTMENT_PRICING = {
  one_bedroom: { price: 20000000, label: '1 Phòng Ngủ' },
  two_bedrooms: { price: 25000000, label: '2 Phòng Ngủ' },
  three_bedrooms: { price: 30000000, label: '3 Phòng Ngủ' },
  large_area: { price: 250000, label: 'Căn hộ ≥ 100m²' }
};

export const HOUSE_TYPE_LABELS: { [key in HouseType]: string } = {
  townhouse: 'Nhà Phố',
  villa: 'Biệt Thự',
  apartment: 'Căn Hộ',
  commercial: 'Công trình khác'
};

export const PRICING_LEVEL_LABELS: { [key in PricingLevel]: string } = {
  standard: 'Kiến Trúc',
  interior: 'Nội thất',
  premium: 'Gói Combo',
};

export const ADDON_PRICES = {
    supervision_visit: 1500000,
    green_lotus: 20000000,
    redraw_facade: 10000000,
    boq_sqm: 25000,
    boq_min: 3000000,
};

export const PACKAGE_PROPORTIONS = {
  standard: [
    { id: 'arch_pm', label: 'Phí quản lý (luôn có)', percentage: 30, mandatory: true },
    { id: 'arch_3d', label: 'Vẽ phối cảnh ngoại thất', percentage: 10 },
    { id: 'arch_main', label: 'Triển khai kiến trúc', percentage: 10 },
    { id: 'arch_detail', label: 'Triển khai chi tiết', percentage: 10 },
    { id: 'arch_mep', label: 'Hệ thống Điện nước (ME)', percentage: 20 },
    { id: 'arch_struct', label: 'Hồ sơ Kết cấu (KC)', percentage: 20 },
  ],
  interior: [
    { id: 'int_pm', label: 'Phí quản lý (luôn có)', percentage: 30, mandatory: true },
    { id: 'int_3d', label: 'Vẽ phối cảnh 3D nội thất', percentage: 40 },
    { id: 'int_doc', label: 'Khai triển hồ sơ thi công', percentage: 30 },
  ],
  premium: [
    { id: 'combo_pm', label: 'Phí quản lý (luôn có)', percentage: 20, mandatory: true },
    { id: 'combo_arch_3d', label: 'Phối cảnh kiến trúc', percentage: 10 },
    { id: 'combo_arch_main', label: 'Triển khai kiến trúc', percentage: 10 },
    { id: 'combo_arch_mep', label: 'Hệ thống Điện nước (ME)', percentage: 10 },
    { id: 'combo_arch_struct', label: 'Hồ sơ Kết cấu (KC)', percentage: 10 },
    { id: 'combo_arch_detail', label: 'Triển khai chi tiết', percentage: 10 },
    { id: 'combo_int_3d', label: 'Vẽ 3D nội thất', percentage: 20 },
    { id: 'combo_int_doc', label: 'Khai triển hồ sơ nội thất', percentage: 10 },
  ],
};

export const MISC_SERVICES_DATA = [
  { id: 'int_small', label: 'TK nội thất không gian < 40 m²', price: 8000000 },
  { id: 'sup_visit_fixed', label: 'Giám sát tác giả (1 lần)', price: 1000000 },
  { id: 'struct_desc', label: 'Thuyết minh kết cấu', price: 10000000 },
  { id: 'permit', label: 'Bản vẽ xin phép', price: 6000000 },
  { id: 'as_built', label: 'Bản vẽ hoàn công', price: 6000000 },
];

export const PAYMENT_SCHEDULE_DATA = {
  standard: [
    { phase: 1, content: 'Ngay khi ký Hợp đồng', percentage: 40 },
    { phase: 2, content: 'Ngay khi Công ty bàn giao hồ sơ thiết kế đợt 01', percentage: 50 },
    { phase: 3, content: 'Ngay khi Công ty bàn giao hồ sơ thiết kế hoàn thiện (đợt cuối)', percentage: 10 },
  ],
  interior: [
    { phase: 1, content: 'Ngay khi ký Hợp đồng này', percentage: 50 },
    { phase: 2, content: 'Ngay khi Công ty bàn giao phối cảnh thiết kế 3D lần 1', percentage: 30 },
    { phase: 3, content: 'Ngay khi Công ty bàn giao hồ sơ thiết kế hoàn thiện (đợt cuối)', percentage: 20 },
  ],
  premium: [
    { phase: 1, content: 'Ngay khi ký Hợp đồng', percentage: 40 },
    { phase: 2, content: 'Ngay khi Công ty bàn giao hồ sơ thiết kế kiến trúc đợt 01', percentage: 30 },
    { phase: 3, content: 'Ngay khi Công ty bàn giao hồ sơ phối cảnh thiết kế 3D nội thất đợt 01', percentage: 20 },
    { phase: 4, content: 'Ngay khi Công ty bàn giao hồ sơ thiết kế hoàn thiện (đợt cuối)', percentage: 10 },
  ],
};

export const ARCH_COMPONENTS = {
  arch: [
    'Phối cảnh 3D ngoại thất',
    'Mặt bằng bố trí (Layout)',
    'Mặt đứng & Mặt cắt chính',
    'Chi tiết cấu tạo (Thang, WC, Cửa...)',
  ],
  pm: [
    'Quản lý hồ sơ & Điều phối hạng mục',
    'Kiểm soát xung đột kiến trúc-kỹ thuật',
    'Hồ sơ in ấn & Bàn giao bàn cứng',
  ],
  structure: [
    'Hồ sơ kết cấu móng & cọc',
    'Hồ sơ kết cấu phần thân',
    'Thuyết minh tính toán chịu lực',
  ],
  mep: [
    'Hệ thống điện & chiếu sáng',
    'Hệ thống cấp thoát nước chi tiết',
    'Hệ thống điện nhẹ & Thông tin',
  ]
};

export const DELIVERABLES_DATA = {
  interior: [
    'Moodboard định hình phong cách',
    'Phối cảnh 3D các không gian phòng',
    'Hồ sơ kỹ thuật trần - tường - sàn',
    'Hồ sơ chi tiết đồ nội thất (Fit-out)',
    'Hệ thống điện trang trí nội thất',
  ],
  luxury: [
      'Nghiên cứu tỷ lệ kiến trúc đặc thù',
      'Chi tiết trang trí tỉ lệ 1/10 - 1/20',
      'Chỉ định vật liệu hoàn thiện cao cấp',
      'Phối hợp xử lý kỹ thuật thi công khó',
  ]
};

export const ADDON_DELIVERABLES = {
  renovation: [
    'Khảo sát & Đánh giá hiện trạng sâu',
    'Hồ sơ biện pháp tháo dỡ, di dời',
    'Phương án gia cố kết cấu (nếu cần)',
  ],
  facade: [
    'Tối ưu hóa thiết kế kiến trúc đa chiều',
    'Gia tăng số lượng view phối cảnh 3D',
    'Chi tiết kỹ thuật mặt tiền phụ',
  ],
  supervision: [
    'Kiểm tra kỹ thuật tại các mốc chính',
    'Nghiệm thu cốt thép, xây tô, ốp lát',
    'Xử lý vướng mắc bản vẽ tại hiện trường',
  ],
  boq: [
    'Bảng khối lượng vật tư chi tiết',
    'Dự toán chi phí xây dựng thị trường',
    'Tư vấn tối ưu chi phí vật liệu',
  ],
  garden: [
    'Quy hoạch mặt bằng sân vườn, hồ cá',
    'Phối cảnh 3D cảnh quan ngoại thất',
    'Chi tiết thi công cổng rào, bồn hoa',
  ],
  green_building: [
    'Giải pháp kiến trúc xanh lotus',
    'Tối ưu năng lượng & thông gió tự nhiên',
    'Thủ tục hồ sơ cấp chứng nhận lotus',
  ]
};
