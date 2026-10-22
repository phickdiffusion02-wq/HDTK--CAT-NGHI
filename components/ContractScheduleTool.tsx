import React, { useState, useMemo, useRef } from 'react';
import { HOUSE_TYPE_LABELS } from '../constants';
import type { HouseType } from '../types';
import { VerticalProcessPoster } from './VerticalProcessPoster';

declare const html2canvas: any;

export interface TimelineMilestone {
  id: number;
  title: string;
  contractClause: string;
  party: 'designer' | 'client' | 'both';
  partyLabel: string;
  standardDays: number;
  daysByArea: {
    under300: number;
    from300to500: number;
    from500to800: number;
    from800to1200: number;
  };
  note?: string;
}

// Data for "Tiến độ HĐTK với KH"
export const CLIENT_TIMELINE_DATA: TimelineMilestone[] = [
  {
    id: 1,
    title: 'Khởi động & Nắm bắt yêu cầu',
    party: 'designer',
    partyLabel: 'CAT NGHI Interior',
    standardDays: 3,
    contractClause: 'CAT NGHI Interior cử Kiến trúc sư phụ trách liên hệ Chủ Đầu Tư trong thời hạn {DAYS} ngày làm việc kể từ ngày bắt đầu. (Giai đoạn này, Kiến trúc sư CAT NGHI Interior sẽ trao đổi ý tưởng, 3 ngày nắm bắt các yêu cầu về phong cách thiết kế nội thất của Chủ Đầu Tư).',
    daysByArea: { under300: 3, from300to500: 3, from500to800: 3, from800to1200: 3 },
    note: 'Trao đổi ý tưởng, nắm bắt yêu cầu phong cách thiết kế'
  },
  {
    id: 2,
    title: 'Trình duyệt Concept thiết kế (Ý tưởng)',
    party: 'designer',
    partyLabel: 'CAT NGHI Interior',
    standardDays: 7,
    contractClause: 'Sau lần gặp đầu tiên, CAT NGHI Interior sẽ trình concept thiết kế (ý tưởng thiết kế) cho Chủ Đầu Tư ký duyệt phương án sau {DAYS} ngày làm việc kể từ ngày gặp mặt.',
    daysByArea: { under300: 7, from300to500: 7, from500to800: 7, from800to1200: 7 },
    note: 'Mặt bằng bố trí công năng, moodboard định hướng vật liệu & ý tưởng'
  },
  {
    id: 3,
    title: 'Bàn giao phối cảnh 3D nội thất đợt 01',
    party: 'designer',
    partyLabel: 'CAT NGHI Interior',
    standardDays: 20,
    contractClause: 'CAT NGHI Interior bàn giao hồ sơ phối cảnh 3D nội thất đợt 01 cho Chủ Đầu Tư trong thời hạn {DAYS} ngày làm việc kể từ ngày thống nhất concept thiết kế (ý tưởng thiết kế).',
    daysByArea: { under300: 20, from300to500: 25, from500to800: 35, from800to1200: 45 },
    note: 'Bộ ảnh phối cảnh 3D toàn bộ không gian nội thất theo concept'
  },
  {
    id: 4,
    title: 'CĐT kiểm tra & lập danh mục chỉnh sửa đợt 01',
    party: 'client',
    partyLabel: 'Chủ Đầu Tư (CĐT)',
    standardDays: 5,
    contractClause: 'Chủ Đầu Tư kiểm tra hồ sơ thiết kế và lập danh mục yêu cầu chỉnh sửa trong vòng {DAYS} ngày làm việc kể từ ngày nhận được hồ sơ phối cảnh nội thất đợt 01.',
    daysByArea: { under300: 5, from300to500: 5, from500to800: 5, from800to1200: 5 },
    note: 'CĐT tổng hợp danh mục yêu cầu chỉnh sửa'
  },
  {
    id: 5,
    title: 'Chỉnh sửa & Bàn giao 3D đợt 02',
    party: 'designer',
    partyLabel: 'CAT NGHI Interior',
    standardDays: 12,
    contractClause: 'CAT NGHI Interior thực hiện chỉnh sửa và bàn giao hồ sơ phối cảnh 3D nội thất đợt 01 trong thời hạn {DAYS} ngày làm việc kể từ ngày nhận được danh mục yêu cầu chỉnh sửa của Chủ Đầu Tư.',
    daysByArea: { under300: 12, from300to500: 14, from500to800: 16, from800to1200: 21 },
    note: 'Hiệu chỉnh phối cảnh 3D theo danh mục yêu cầu đợt 1'
  },
  {
    id: 6,
    title: 'CĐT kiểm tra & phê duyệt 3D đợt 02',
    party: 'client',
    partyLabel: 'Chủ Đầu Tư (CĐT)',
    standardDays: 5,
    contractClause: 'Thời gian CĐT tiến hành kiểm tra và phê duyệt hồ sơ thiết kế chỉnh sửa kể từ ngày nhận được hồ sơ phối cảnh nội thất đợt 02 là: {DAYS} ngày làm việc.',
    daysByArea: { under300: 5, from300to500: 7, from500to800: 7, from800to1200: 7 },
    note: 'CĐT phê duyệt hoàn tất phương án phối cảnh 3D'
  },
  {
    id: 7,
    title: 'Bàn giao hồ sơ hoàn thiện (3D + Khai triển kỹ thuật)',
    party: 'designer',
    partyLabel: 'CAT NGHI Interior',
    standardDays: 7,
    contractClause: 'Kể từ ngày nhận được ý kiến chấp thuận của Chủ Đầu Tư về hồ sơ phối cảnh nội thất đã chỉnh sửa (đợt 02), CAT NGHI Interior bàn giao hồ sơ thiết kế nội thất hoàn thiện (phối cảnh 3D và khai triển kỹ thuật) cho Chủ Đầu Tư trong thời hạn {DAYS} ngày làm việc.',
    daysByArea: { under300: 7, from300to500: 10, from500to800: 15, from800to1200: 18 },
    note: 'Hồ sơ thiết kế hoàn chỉnh: phối cảnh 3D & khai triển kỹ thuật thi công'
  }
];

// Data for "Tiến độ HĐTK NỘI THẤT"
export const INTERIOR_TIMELINE_DATA: TimelineMilestone[] = [
  {
    id: 1,
    title: 'Bàn giao hồ sơ phối cảnh 3D nội thất đợt 01',
    party: 'designer',
    partyLabel: 'CAT NGHI Interior',
    standardDays: 21,
    contractClause: 'Công ty bàn giao hồ sơ phối cảnh 3D nội thất đợt 01 cho Chủ Đầu Tư trong thời hạn {DAYS} ngày làm việc kể từ ngày bắt đầu.',
    daysByArea: { under300: 21, from300to500: 25, from500to800: 33, from800to1200: 45 },
    note: 'Bộ phối cảnh 3D nội thất đợt 1 toàn bộ không gian'
  },
  {
    id: 2,
    title: 'CĐT kiểm tra & lập danh mục chỉnh sửa đợt 01',
    party: 'client',
    partyLabel: 'Chủ Đầu Tư (CĐT)',
    standardDays: 7,
    contractClause: 'Chủ Đầu Tư kiểm tra hồ sơ thiết kế và lập danh mục yêu cầu chỉnh sửa trong vòng {DAYS} ngày làm việc kể từ ngày nhận được hồ sơ phối cảnh nội thất đợt 01.',
    daysByArea: { under300: 7, from300to500: 7, from500to800: 7, from800to1200: 7 },
    note: 'CĐT rà soát và lập danh mục yêu cầu chỉnh sửa đợt 1'
  },
  {
    id: 3,
    title: 'Chỉnh sửa & bàn giao phối cảnh 3D đợt 02',
    party: 'designer',
    partyLabel: 'CAT NGHI Interior',
    standardDays: 10,
    contractClause: 'Công ty thực hiện chỉnh sửa và bàn giao hồ sơ phối cảnh 3D nội thất đợt 02 trong thời hạn {DAYS} ngày làm việc kể từ ngày nhận được danh mục yêu cầu chỉnh sửa của Chủ Đầu Tư.',
    daysByArea: { under300: 10, from300to500: 12, from500to800: 14, from800to1200: 18 },
    note: 'Hiệu chỉnh phối cảnh 3D theo danh mục yêu cầu đợt 1'
  },
  {
    id: 4,
    title: 'CĐT kiểm tra & phê duyệt phối cảnh 3D đợt 02',
    party: 'client',
    partyLabel: 'Chủ Đầu Tư (CĐT)',
    standardDays: 5,
    contractClause: 'Chủ Đầu Tư tiến hành kiểm tra và phê duyệt hồ sơ thiết kế chỉnh sửa trong vòng {DAYS} ngày làm việc kể từ ngày nhận được hồ sơ phối cảnh nội thất đợt 02.',
    daysByArea: { under300: 5, from300to500: 5, from500to800: 5, from800to1200: 5 },
    note: 'CĐT phê duyệt hoàn tất phương án phối cảnh 3D nội thất'
  },
  {
    id: 5,
    title: 'Bàn giao hồ sơ hoàn thiện (3D & Khai triển kỹ thuật)',
    party: 'designer',
    partyLabel: 'CAT NGHI Interior',
    standardDays: 7,
    contractClause: 'Kể từ ngày nhận được ý kiến chấp thuận của Chủ Đầu Tư về hồ sơ phối cảnh nội thất đã chỉnh sửa (đợt 02), Công ty bàn giao hồ sơ thiết kế nội thất hoàn thiện (phối cảnh 3D và khai triển kỹ thuật) cho Chủ Đầu Tư trong thời hạn {DAYS} ngày làm việc.',
    daysByArea: { under300: 7, from300to500: 9, from500to800: 11, from800to1200: 14 },
    note: 'Khai triển hồ sơ bản vẽ kỹ thuật thi công nội thất chi tiết'
  },
  {
    id: 6,
    title: 'CĐT kiểm tra & phê duyệt hồ sơ thiết kế tổng hợp',
    party: 'client',
    partyLabel: 'Chủ Đầu Tư (CĐT)',
    standardDays: 3,
    contractClause: 'Chủ Đầu Tư tiến hành kiểm tra và phê duyệt hồ sơ thiết kế tổng hợp trong vòng {DAYS} ngày làm việc kể từ ngày nhận được hồ sơ tổng hợp đợt 2.',
    daysByArea: { under300: 3, from300to500: 3, from500to800: 3, from800to1200: 3 },
    note: 'CĐT kiểm tra và phê duyệt hồ sơ kỹ thuật tổng hợp'
  },
  {
    id: 7,
    title: 'Chỉnh sửa & bàn giao hồ sơ tổng hợp hoàn thiện',
    party: 'designer',
    partyLabel: 'CAT NGHI Interior',
    standardDays: 7,
    contractClause: 'Công ty thực hiện chỉnh sửa và bàn giao hồ sơ thiết kế tổng hợp hoàn thiện trong thời hạn {DAYS} ngày làm việc kể từ ngày nhận được danh mục yêu cầu chỉnh sửa của Chủ Đầu Tư.',
    daysByArea: { under300: 7, from300to500: 7, from500to800: 7, from800to1200: 7 },
    note: 'Bàn giao bộ hồ sơ thiết kế nội thất tổng hợp hoàn chỉnh'
  }
];

// Data for "Tiến độ HĐTK NỘI BỘ CÁT NGHI - CHI NHÁNH"
export const INTERNAL_TIMELINE_DATA: TimelineMilestone[] = [
  {
    id: 1,
    title: 'PTK cử nhân sự phụ trách & liên hệ CĐT',
    party: 'designer',
    partyLabel: 'PTK-CN',
    standardDays: 3,
    contractClause: 'Thời gian PTK-CN cử nhân sự phụ trách liên hệ CĐT trong thời hạn làm việc kể từ ngày bắt đầu (giai đoạn này, PTK-CN sẽ trao đổi ý tưởng, nắm bắt các yêu cầu về phong cách thiết kế nội thất của CĐT) là: {DAYS} Ngày.',
    daysByArea: { under300: 3, from300to500: 3, from500to800: 3, from800to1200: 3 },
    note: 'Phân công nhân sự, trao đổi ý tưởng & nắm bắt yêu cầu CĐT'
  },
  {
    id: 2,
    title: 'Trình duyệt concept thiết kế (Ý tưởng)',
    party: 'designer',
    partyLabel: 'PTK-CN',
    standardDays: 7,
    contractClause: 'Sau lần gặp đầu tiên, thời gian PTK-CN sẽ trình bày concept thiết kế (ý tưởng thiết kế) cho CĐT ký duyệt phương án kể từ ngày gặp mặt là: {DAYS} Ngày.',
    daysByArea: { under300: 7, from300to500: 7, from500to800: 7, from800to1200: 7 },
    note: 'Mặt bằng công năng, định hình vật liệu, tone & mood'
  },
  {
    id: 3,
    title: 'Bàn giao phối cảnh 3D nội thất đợt 01',
    party: 'designer',
    partyLabel: 'PTK-CN',
    standardDays: 20,
    contractClause: 'Thời gian PTK-CN bàn giao hồ sơ phối cảnh 3D nội thất đợt 01 cho CĐT kể từ ngày thống nhất concept thiết kế (ý tưởng thiết kế) là: {DAYS} Ngày.',
    daysByArea: { under300: 20, from300to500: 25, from500to800: 35, from800to1200: 45 },
    note: 'Bộ 3D render không gian nội thất toàn diện'
  },
  {
    id: 4,
    title: 'CĐT kiểm tra & lập danh mục chỉnh sửa đợt 01',
    party: 'client',
    partyLabel: 'Chủ Đầu Tư (CĐT)',
    standardDays: 5,
    contractClause: 'Thời gian CĐT kiểm tra hồ sơ thiết kế và lập danh mục yêu cầu chỉnh sửa kể từ ngày nhận được hồ sơ phối cảnh nội thất đợt 01 là: {DAYS} Ngày.',
    daysByArea: { under300: 5, from300to500: 7, from500to800: 7, from800to1200: 7 },
    note: 'CĐT kiểm tra và lập danh mục chỉnh sửa'
  },
  {
    id: 5,
    title: 'Chỉnh sửa & bàn giao phối cảnh 3D đợt 02',
    party: 'designer',
    partyLabel: 'PTK-CN',
    standardDays: 12,
    contractClause: 'Thời gian PTK-CN thực hiện chỉnh sửa và bàn giao hồ sơ phối cảnh 3D nội thất đợt 01 kể từ ngày nhận được danh mục yêu cầu chỉnh sửa của CĐT là: {DAYS} Ngày.',
    daysByArea: { under300: 12, from300to500: 15, from500to800: 18, from800to1200: 21 },
    note: 'Hiệu chỉnh 3D theo phản hồi đợt 1'
  },
  {
    id: 6,
    title: 'CĐT kiểm tra & phê duyệt hồ sơ 3D đợt 02',
    party: 'client',
    partyLabel: 'Chủ Đầu Tư (CĐT)',
    standardDays: 5,
    contractClause: 'Thời gian CĐT tiến hành kiểm tra và phê duyệt hồ sơ thiết kế chỉnh sửa kể từ ngày nhận được hồ sơ phối cảnh nội thất đợt 02 là: {DAYS} Ngày.',
    daysByArea: { under300: 5, from300to500: 7, from500to800: 7, from800to1200: 7 },
    note: 'CĐT phê duyệt phương án 3D chính thức'
  },
  {
    id: 7,
    title: 'Bàn giao hồ sơ hoàn thiện (3D + Khai triển kỹ thuật)',
    party: 'designer',
    partyLabel: 'PTK-CN',
    standardDays: 7,
    contractClause: 'Kể từ ngày nhận được ý kiến chấp thuận của CĐT về hồ sơ phối cảnh nội thất đã chỉnh sửa (đợt 02), PTK-CN bàn giao hồ sơ thiết kế nội thất hoàn thiện (phối cảnh 3D và khai triển kỹ thuật) cho CĐT trong thời hạn: {DAYS} Ngày.',
    daysByArea: { under300: 7, from300to500: 10, from500to800: 15, from800to1200: 18 },
    note: 'Khai triển hồ sơ bản vẽ thi công chi tiết đầy đủ'
  }
];

export type ScheduleType = 'client' | 'interior' | 'internal';

export type AreaTier = 'under300' | 'from300to500' | 'from500to800' | 'from800to1200';

export interface AreaTierInfo {
  key: AreaTier;
  label: string;
  rangeText: string;
  min: number;
  max: number;
}

export const AREA_TIERS: AreaTierInfo[] = [
  { key: 'under300', label: 'Dưới 300 m²', rangeText: '< 300 m²', min: 0, max: 299.99 },
  { key: 'from300to500', label: '300 - 500 m²', rangeText: '300 - 500 m²', min: 300, max: 500 },
  { key: 'from500to800', label: '500 - 800 m²', rangeText: '500 - 800 m²', min: 500.01, max: 800 },
  { key: 'from800to1200', label: '800 - 1200 m²', rangeText: '800 - 1200 m²', min: 800.01, max: 99999 },
];

export const getAreaTier = (area: number): AreaTier => {
  if (area < 300) return 'under300';
  if (area <= 500) return 'from300to500';
  if (area <= 800) return 'from500to800';
  return 'from800to1200';
};

interface ContractScheduleToolProps {
  initialArea: number;
  clientName: string;
  houseType: HouseType;
  isIndividual?: boolean;
  onNavigateToQuote?: () => void;
}

export const ContractScheduleTool: React.FC<ContractScheduleToolProps> = ({
  initialArea,
  clientName,
  houseType,
  isIndividual = false,
  onNavigateToQuote
}) => {
  const [scheduleType, setScheduleType] = useState<ScheduleType>('client');
  const [customArea, setCustomArea] = useState<number>(initialArea > 0 ? initialArea : 250);
  const [startDate, setStartDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [includeWeekends, setIncludeWeekends] = useState<boolean>(false);
  const [copiedClauseIndex, setCopiedClauseIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [downloadingPoster, setDownloadingPoster] = useState<'step' | 'matrix' | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [previewModalTitle, setPreviewModalTitle] = useState<string>('Xem Trước Bảng Tiến Độ 16:9');

  const stepPosterRef = useRef<HTMLDivElement>(null);
  const matrixPosterRef = useRef<HTMLDivElement>(null);

  const activeTier = useMemo(() => getAreaTier(customArea), [customArea]);
  const activeMilestones = useMemo(() => {
    if (scheduleType === 'client') return CLIENT_TIMELINE_DATA;
    if (scheduleType === 'interior') return INTERIOR_TIMELINE_DATA;
    return INTERNAL_TIMELINE_DATA;
  }, [scheduleType]);

  // Designer working days (excluding client review/approval days)
  const designerDays = useMemo(() => {
    return activeMilestones
      .filter(m => m.party === 'designer')
      .reduce((sum, m) => sum + m.daysByArea[activeTier], 0);
  }, [activeMilestones, activeTier]);

  const clientDays = useMemo(() => {
    return activeMilestones
      .filter(m => m.party === 'client')
      .reduce((sum, m) => sum + m.daysByArea[activeTier], 0);
  }, [activeMilestones, activeTier]);

  // Total working days of the contract (excluding client review days as requested)
  const totalWorkingDays = designerDays;

  // Helper to add working days to a starting date
  const addWorkDays = (start: Date, days: number, countWeekends: boolean): Date => {
    const result = new Date(start);
    if (countWeekends) {
      result.setDate(result.getDate() + days);
      return result;
    }
    let added = 0;
    while (added < days) {
      result.setDate(result.getDate() + 1);
      const dayOfWeek = result.getDay();
      // Skip Saturday (6) and Sunday (0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        added++;
      }
    }
    return result;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Calculate cumulative dates for each milestone
  const milestonesWithDates = useMemo(() => {
    const start = new Date(startDate);
    let runningDate = new Date(start);

    return activeMilestones.map((m) => {
      const days = m.daysByArea[activeTier];
      const milestoneStart = new Date(runningDate);
      const milestoneEnd = addWorkDays(milestoneStart, days, includeWeekends);
      runningDate = new Date(milestoneEnd);

      const formattedClause = (isIndividual
        ? m.contractClause
            .replace(/CAT NGHI Interior/g, 'KTS Hoàng Phi')
            .replace(/Công ty/g, 'KTS Hoàng Phi')
            .replace(/PTK-CN/g, 'Kiến trúc sư')
        : m.contractClause
            .replace(/Công ty/g, 'CAT NGHI Interior')
      ).replace('{DAYS}', days.toString());

      return {
        ...m,
        days,
        startDate: milestoneStart,
        endDate: milestoneEnd,
        formattedClause
      };
    });
  }, [activeMilestones, activeTier, startDate, includeWeekends, isIndividual]);

  const finalCompletionDate = useMemo(() => {
    if (milestonesWithDates.length === 0) return new Date();
    return milestonesWithDates[milestonesWithDates.length - 1].endDate;
  }, [milestonesWithDates]);

  const handleCopyClause = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedClauseIndex(index);
    setTimeout(() => setCopiedClauseIndex(null), 2000);
  };

  const handleCopyAllClauses = () => {
    const allText = milestonesWithDates
      .map((m, idx) => `Mốc ${idx + 1}: ${m.title}\n${m.formattedClause}\n- Thời gian thực hiện: ${m.days} ngày làm việc (Dự kiến: ${formatDate(m.startDate)} -> ${formatDate(m.endDate)})`)
      .join('\n\n');
    const scheduleLabel =
      scheduleType === 'client'
        ? 'VỚI KHÁCH HÀNG'
        : scheduleType === 'interior'
        ? 'HĐ NỘI THẤT'
        : 'NỘI BỘ CÁT NGHI - CHI NHÁNH';
    const header = `TIẾN ĐỘ THỜI GIAN HỢP ĐỒNG THIẾT KẾ (${scheduleLabel})\nKhách hàng: ${clientName || 'Quý Khách Hàng'} | Diện tích: ${customArea} m² (${AREA_TIERS.find(t => t.key === activeTier)?.label})\nTổng thời gian: ${totalWorkingDays} ngày làm việc\n\n------------------------\n\n`;
    
    navigator.clipboard.writeText(header + allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  // Export 16:9 Vertical Poster (Step-by-step)
  const handleExportStepPoster = async (previewOnly = false) => {
    if (!stepPosterRef.current || typeof html2canvas === 'undefined') return;
    setDownloadingPoster('step');
    try {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const canvas = await html2canvas(stepPosterRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#f0f5f4',
        logging: false
      });
      const dataUrl = canvas.toDataURL('image/png');
      const typeStr = scheduleType === 'client' ? 'KHACH_HANG' : scheduleType === 'interior' ? 'NOI_THAT' : 'NOI_BO';
      
      if (previewOnly || isMobile) {
        setPreviewModalTitle(`Bảng Tiến Độ 7 Bước 16:9 Dọc (${customArea} m²)`);
        setPreviewImageUrl(dataUrl);
      } else {
        const branding = isIndividual ? 'KTS_HoangPhi' : 'CAT_NGHI';
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `TIEN_DO_7_BUOC_16x9_${typeStr}_${branding}_${(clientName || 'Khach').replace(/\s+/g, '_')}_${customArea}m2.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error('Export step poster error:', err);
      alert('Không thể xuất ảnh tiến độ. Vui lòng thử lại.');
    } finally {
      setDownloadingPoster(null);
    }
  };

  // Export 16:9 Matrix Poster
  const handleExportMatrixPoster = async () => {
    if (!matrixPosterRef.current || typeof html2canvas === 'undefined') return;
    setDownloadingPoster('matrix');
    try {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const canvas = await html2canvas(matrixPosterRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#f4f7f6',
        logging: false
      });
      const dataUrl = canvas.toDataURL('image/png');
      const typeStr = scheduleType === 'client' ? 'KHACH_HANG' : scheduleType === 'interior' ? 'NOI_THAT' : 'NOI_BO';
      
      if (isMobile) {
        setPreviewModalTitle(`Bảng Ma Trận Tiến Độ Khung m² (${customArea} m²)`);
        setPreviewImageUrl(dataUrl);
      } else {
        const branding = isIndividual ? 'KTS_HoangPhi' : 'CAT_NGHI';
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `BANG_MA_TRAN_TIEN_DO_${typeStr}_${branding}_${(clientName || 'Khach').replace(/\s+/g, '_')}_${customArea}m2.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error('Export matrix error:', err);
    } finally {
      setDownloadingPoster(null);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div className="bg-white/95 backdrop-blur-xl border-2 border-teal-200 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-teal-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black uppercase px-3 py-1 bg-teal-50 text-[#0e756c] rounded-full border border-teal-200">
                MODULE 2: TIẾN ĐỘ THỜI GIAN
              </span>
              <span className="text-xs font-bold text-gray-500">
                Khách hàng: <strong className="text-gray-900">{clientName || 'Quý Khách Hàng'}</strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0e756c] tracking-tight uppercase">
              CÔNG CỤ TIẾN ĐỘ THỜI GIAN HỢP ĐỒNG
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Tự động tính toán số ngày làm việc và ngày hoàn thành từng mốc dựa trên diện tích sàn $m^2$
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {onNavigateToQuote && (
              <button
                onClick={onNavigateToQuote}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs uppercase transition-all flex items-center gap-1.5 shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Trở lại Báo Giá
              </button>
            )}
            
            <button
              onClick={handleCopyAllClauses}
              className="px-3.5 py-2.5 bg-teal-50 hover:bg-teal-100 text-[#0e756c] border border-teal-200 font-black rounded-xl text-xs uppercase transition-all flex items-center gap-1.5 shadow-sm"
              title="Sao chép toàn bộ điều khoản tiến độ"
            >
              {copiedAll ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><polyline points="20 6 9 17 4 12"/></svg>
                  Đã chép!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  Chép Điều Khoản
                </>
              )}
            </button>

            {/* Preview 16:9 button */}
            <button
              onClick={() => handleExportStepPoster(true)}
              disabled={downloadingPoster !== null}
              className="px-3.5 py-2.5 bg-white hover:bg-teal-50 text-[#0e756c] border-2 border-teal-300 font-black rounded-xl text-xs uppercase transition-all flex items-center gap-1.5 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              Xem Trước 16:9
            </button>

            {/* Matrix export button */}
            <button
              onClick={handleExportMatrixPoster}
              disabled={downloadingPoster !== null}
              className="px-3.5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-black rounded-xl text-xs uppercase transition-all flex items-center gap-1.5 shadow-md disabled:bg-gray-400"
            >
              {downloadingPoster === 'matrix' ? (
                <span>Đang xuất...</span>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                  Tải Bảng Ma Trận
                </>
              )}
            </button>

            {/* Step-by-Step 16:9 Vertical Poster Download (Primary) */}
            <button
              onClick={() => handleExportStepPoster(false)}
              disabled={downloadingPoster !== null}
              className="px-4 py-2.5 bg-gradient-to-r from-[#084b45] to-[#0e756c] hover:from-[#05322e] hover:to-[#095f58] text-white border-2 border-[#ffd54f] font-black rounded-xl text-xs uppercase transition-all flex items-center gap-2 shadow-xl shadow-teal-900/30 disabled:opacity-50"
            >
              {downloadingPoster === 'step' ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang tạo ảnh 16:9...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#ffd54f]"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  <span>Tải Bảng 7 Bước (16:9 Dọc)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Control Panel: Schedule Type Selection & Area Input */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
          {/* Schedule Mode Toggle */}
          <div className="md:col-span-6 space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500">
              1. LỰA CHỌN LOẠI TIẾN ĐỘ HỢP ĐỒNG:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
              <button
                type="button"
                onClick={() => setScheduleType('client')}
                className={`py-3 px-2 rounded-xl font-black text-xs uppercase transition-all flex flex-col items-center justify-center text-center gap-1 ${
                  scheduleType === 'client'
                    ? 'bg-[#0e756c] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  <span className="truncate">HĐTK KHÁCH HÀNG</span>
                </div>
                <span className="text-[9.5px] font-normal opacity-90">Ký kết với CĐT</span>
              </button>

              <button
                type="button"
                onClick={() => setScheduleType('interior')}
                className={`py-3 px-2 rounded-xl font-black text-xs uppercase transition-all flex flex-col items-center justify-center text-center gap-1 ${
                  scheduleType === 'interior'
                    ? 'bg-[#0e756c] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7v10"/><path d="M4 7v10"/><path d="M4 12h16"/><path d="M7 7h10"/><path d="M9 17v2"/><path d="M15 17v2"/></svg>
                  <span className="truncate">HĐ NỘI THẤT</span>
                </div>
                <span className="text-[9.5px] font-normal opacity-90">Tiến độ chuẩn 3D &amp; KT</span>
              </button>

              <button
                type="button"
                onClick={() => setScheduleType('internal')}
                className={`py-3 px-2 rounded-xl font-black text-xs uppercase transition-all flex flex-col items-center justify-center text-center gap-1 ${
                  scheduleType === 'internal'
                    ? 'bg-[#0e756c] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                  <span className="truncate">HĐ NỘI BỘ</span>
                </div>
                <span className="text-[9.5px] font-normal opacity-90">PTK &amp; Chi Nhánh</span>
              </button>
            </div>
          </div>

          {/* Area Input & Tier Detection */}
          <div className="md:col-span-3 space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500">
              2. DIỆN TÍCH SÀN THIẾT KẾ (M²):
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="5000"
                value={customArea || ''}
                onChange={(e) => setCustomArea(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 bg-teal-50/50 border-2 border-teal-200 rounded-2xl text-xl font-black text-[#0e756c] focus:border-[#0e756c] outline-none shadow-inner"
                placeholder="Nhập số m2 sàn..."
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-400 text-sm">
                m²
              </span>
            </div>
            <div className="text-[11px] font-bold text-gray-500 flex items-center justify-between">
              <span>Đang áp dụng khung:</span>
              <span className="text-[#0e756c] font-black bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                {AREA_TIERS.find(t => t.key === activeTier)?.label}
              </span>
            </div>
          </div>

          {/* Start Date Setting */}
          <div className="md:col-span-3 space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500">
              3. NGÀY BẮT ĐẦU DỰ ÁN:
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-gray-800 text-sm focus:border-teal-500 outline-none"
            />
            <label className="flex items-center gap-2 cursor-pointer pt-0.5">
              <input
                type="checkbox"
                checked={includeWeekends}
                onChange={(e) => setIncludeWeekends(e.target.checked)}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
              />
              <span className="text-[11px] text-gray-600 font-semibold">Bao gồm Thứ 7 &amp; CN</span>
            </label>
          </div>
        </div>

        {/* Quick Summary Highlights Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-teal-100">
          <div className="bg-[#f4f7f6] p-4 rounded-2xl border border-teal-100 text-center">
            <p className="text-[11px] font-black uppercase tracking-wider text-gray-500">Tổng thời gian thực hiện</p>
            <p className="text-2xl sm:text-3xl font-black text-[#0e756c] mt-1">{totalWorkingDays} <span className="text-sm font-bold">ngày làm việc</span></p>
            <p className="text-[10px] text-gray-400 font-semibold mt-0.5">(Không gồm CĐT duyệt)</p>
          </div>
          <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-100 text-center">
            <p className="text-[11px] font-black uppercase tracking-wider text-teal-700">Đơn vị thiết kế thực hiện</p>
            <p className="text-2xl sm:text-3xl font-black text-teal-800 mt-1">{designerDays} <span className="text-sm font-bold">ngày</span></p>
            <p className="text-[10px] text-teal-600 font-semibold mt-0.5">Tiến độ HĐ chính</p>
          </div>
          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-center">
            <p className="text-[11px] font-black uppercase tracking-wider text-amber-800">Chủ đầu tư xem &amp; duyệt</p>
            <p className="text-2xl sm:text-3xl font-black text-amber-900 mt-1">{clientDays} <span className="text-sm font-bold">ngày</span></p>
            <p className="text-[10px] text-amber-700 font-semibold mt-0.5">Độc lập (ngoài HĐ)</p>
          </div>
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-center">
            <p className="text-[11px] font-black uppercase tracking-wider text-emerald-800">Dự kiến hoàn thiện</p>
            <p className="text-lg sm:text-xl font-black text-emerald-900 mt-1.5">{formatDate(finalCompletionDate)}</p>
            <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">Toàn bộ 7 bước</p>
          </div>
        </div>
      </div>

      {/* Main Interactive Matrix & Active Bracket Table */}
      <div className="bg-white/95 backdrop-blur-xl border-2 border-teal-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0e756c] uppercase tracking-tight">
              BẢNG TIẾN ĐỘ THỜI GIAN CHI TIẾT
            </h2>
            <p className="text-xs text-gray-500 font-bold mt-0.5">
              Khung cột tương ứng với diện tích <span className="text-[#0e756c] font-black">{customArea} m²</span> được làm nổi bật tự động
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#0e756c]"></span>
            <span className="text-xs font-black text-gray-700 uppercase">Khung đang áp dụng</span>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto rounded-2xl border border-teal-200 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0e756c] text-white">
                <th className="p-4 text-xs font-black uppercase tracking-wider w-[50px] text-center border-r border-teal-700/50">STT</th>
                <th className="p-4 text-xs font-black uppercase tracking-wider min-w-[320px] border-r border-teal-700/50">Mốc Công Việc &amp; Nội Dung Điều Khoản</th>
                <th className="p-3 text-xs font-black uppercase tracking-wider text-center w-[120px] border-r border-teal-700/50">Thời Gian Chuẩn</th>
                {AREA_TIERS.map((tier) => {
                  const isActive = tier.key === activeTier;
                  return (
                    <th
                      key={tier.key}
                      className={`p-3 text-xs font-black uppercase tracking-wider text-center w-[110px] transition-colors border-r last:border-r-0 border-teal-700/50 ${
                        isActive
                          ? 'bg-[#ffd54f] text-[#0e756c] font-black ring-2 ring-inset ring-[#ffca28]'
                          : 'text-teal-100 hover:bg-[#095f58]'
                      }`}
                    >
                      <div>{tier.label}</div>
                      {isActive && (
                        <span className="inline-block mt-0.5 text-[9px] bg-[#0e756c] text-white px-1.5 py-0.2 rounded font-extrabold uppercase">
                          ĐANG CHỌN
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {milestonesWithDates.map((item, idx) => {
                const isClient = item.party === 'client';
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-teal-50/50 transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
                    }`}
                  >
                    <td className="p-4 font-black text-gray-700 text-center border-r border-gray-100">
                      {idx + 1}
                    </td>
                    <td className="p-4 border-r border-gray-100">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isClient
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-teal-100 text-teal-800 border border-teal-200'
                          }`}
                        >
                          {item.partyLabel}
                        </span>
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed italic bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                        "{item.formattedClause}"
                      </p>
                      {item.note && (
                        <p className="text-[11px] text-gray-400 font-medium mt-1">
                          • {item.note}
                        </p>
                      )}
                    </td>
                    <td className="p-3 text-center font-bold text-gray-600 text-xs border-r border-gray-100">
                      {item.days} ngày
                      <div className="text-[10px] text-gray-400 font-normal mt-0.5">
                        ({formatDate(item.startDate)} → {formatDate(item.endDate)})
                      </div>
                    </td>
                    {AREA_TIERS.map((tier) => {
                      const isActive = tier.key === activeTier;
                      const val = item.daysByArea[tier.key];
                      return (
                        <td
                          key={tier.key}
                          className={`p-3 text-center font-black transition-all border-r last:border-r-0 border-gray-100 ${
                            isActive
                              ? 'bg-amber-50/80 text-[#0e756c] font-black text-base ring-1 ring-amber-300'
                              : 'text-gray-600 text-xs'
                          }`}
                        >
                          {val} ngày
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-teal-900 text-white font-black">
                <td colSpan={2} className="p-4 text-right uppercase text-xs tracking-wider">
                  TỔNG CỘNG THỜI GIAN THỰC HIỆN (KHÔNG GỒM CĐT DUYỆT):
                </td>
                <td className="p-3 text-center text-[#ffd54f] text-sm">
                  {totalWorkingDays} ngày
                </td>
                {AREA_TIERS.map((tier) => {
                  const isActive = tier.key === activeTier;
                  const total = activeMilestones
                    .filter((m) => m.party === 'designer')
                    .reduce((s, m) => s + m.daysByArea[tier.key], 0);
                  return (
                    <td
                      key={tier.key}
                      className={`p-3 text-center text-sm ${
                        isActive
                          ? 'bg-[#ffd54f] text-[#0e756c] font-black ring-2 ring-[#ffca28]'
                          : 'text-teal-100'
                      }`}
                    >
                      {total} ngày
                    </td>
                  );
                })}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Visual Gantt Flow & Milestone Sequence Cards */}
      <div className="bg-white/95 backdrop-blur-xl border-2 border-teal-200 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0e756c] uppercase tracking-tight">
              SƠ ĐỒ TIẾN ĐỘ THỰC HIỆN TỪNG BƯỚC (7 BƯỚC)
            </h2>
            <p className="text-xs text-gray-500 font-bold mt-0.5">
              Dòng thời gian tuần tự theo lịch làm việc dự án ({totalWorkingDays} ngày làm việc)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExportStepPoster(true)}
              className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#0e756c] border border-teal-200 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              Xem Trước 16:9
            </button>
            <button
              onClick={() => handleExportStepPoster(false)}
              disabled={downloadingPoster === 'step'}
              className="px-3.5 py-1.5 bg-[#0e756c] hover:bg-[#095f58] text-white text-xs font-black rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-teal-900/20 disabled:opacity-50"
            >
              {downloadingPoster === 'step' ? (
                <span>Đang xuất...</span>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#ffd54f]"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  Tải Ảnh 16:9 Dọc
                </>
              )}
            </button>
          </div>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-1 before:bg-gradient-to-b before:from-[#0e756c] before:via-teal-400 before:to-[#ffd54f]">
          {milestonesWithDates.map((m, idx) => {
            const isClient = m.party === 'client';
            return (
              <div key={m.id} className="relative group">
                {/* Number bullet */}
                <div className="absolute -left-6 sm:-left-8 top-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-[#0e756c] flex items-center justify-center font-black text-xs sm:text-sm text-[#0e756c] shadow-md group-hover:scale-110 group-hover:bg-[#0e756c] group-hover:text-white transition-all">
                  {idx + 1}
                </div>

                <div className="bg-[#f4f7f6] hover:bg-teal-50/80 border border-teal-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                          isClient
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-[#0e756c] text-white'
                        }`}
                      >
                        {m.partyLabel}
                      </span>
                      <h3 className="text-base font-black text-gray-900 uppercase tracking-tight">
                        {m.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black bg-white px-3 py-1 rounded-xl border border-teal-200 text-[#0e756c] shadow-sm">
                        {m.days} ngày làm việc
                      </span>
                      <span className="text-xs font-bold text-gray-500 bg-white/80 px-2.5 py-1 rounded-xl border border-gray-200">
                        {formatDate(m.startDate)} → {formatDate(m.endDate)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium bg-white p-3 rounded-xl border border-gray-100">
                    {m.formattedClause}
                  </p>

                  <div className="mt-3 flex justify-between items-center text-xs">
                    <span className="text-[11px] text-gray-400 font-semibold italic">
                      • {m.note || 'Theo quy trình chuẩn'}
                    </span>
                    <button
                      onClick={() => handleCopyClause(m.formattedClause, idx)}
                      className="px-3 py-1 bg-teal-50 hover:bg-teal-100 text-[#0e756c] font-black rounded-lg border border-teal-200 transition-colors flex items-center gap-1 text-[11px]"
                    >
                      {copiedClauseIndex === idx ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><polyline points="20 6 9 17 4 12"/></svg>
                          Đã chép!
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                          Chép điều khoản mốc này
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hidden Render Container for Clean High-Resolution Poster Export */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        {/* 1. Step-by-Step 16:9 Vertical Poster */}
        <div ref={stepPosterRef}>
          <VerticalProcessPoster
            milestonesWithDates={milestonesWithDates}
            clientName={clientName}
            customArea={customArea}
            activeTier={activeTier}
            totalWorkingDays={totalWorkingDays}
            designerDays={designerDays}
            clientDays={clientDays}
            startDate={startDate}
            finalCompletionDate={finalCompletionDate}
            scheduleType={scheduleType}
            isIndividual={isIndividual}
            formatDate={formatDate}
          />
        </div>

        {/* 2. Comparative Matrix Poster */}
        <div
          ref={matrixPosterRef}
          style={{ width: '1080px', boxSizing: 'border-box' }}
          className="bg-[#f4f7f6] text-gray-900 font-sans p-10 border-[16px] border-[#0e756c] relative overflow-hidden flex flex-col justify-between shadow-2xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b-2 border-[#0e756c]/20 pb-5">
            <div>
              <span className="text-[14px] font-black text-amber-800 tracking-widest uppercase bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
                PHỤ LỤC TIẾN ĐỘ THỜI GIAN HỢP ĐỒNG
              </span>
              <h1 className="text-[34px] font-black text-[#0e756c] tracking-tight uppercase leading-tight mt-2">
                TIẾN ĐỘ {scheduleType === 'client' ? 'HĐTK VỚI KHÁCH HÀNG' : scheduleType === 'interior' ? 'HĐTK NỘI THẤT' : 'HĐTK NỘI BỘ CÁT NGHI'}
              </h1>
              <p className="text-[16px] text-gray-600 font-bold uppercase tracking-wider mt-1">
                KHÁCH HÀNG: {clientName || 'QUÝ KHÁCH HÀNG'} • DIỆN TÍCH SÀN: {customArea} M²
              </p>
            </div>
            <div className="text-right bg-white p-4 rounded-2xl border border-teal-100 shadow-sm min-w-[190px]">
              <p className="text-[12px] font-black text-[#0e756c] uppercase">Tổng thời gian</p>
              <p className="text-[34px] font-black text-[#0e756c] leading-none mt-1">{totalWorkingDays} NGÀY</p>
              <p className="text-[11px] text-gray-400 font-bold mt-1">NGÀY LÀM VIỆC</p>
            </div>
          </div>

          {/* Table */}
          <div className="my-6 bg-white rounded-2xl border border-teal-100 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0e756c] text-white text-[13px] font-black uppercase">
                  <th className="p-3.5 text-center w-[45px]">STT</th>
                  <th className="p-3.5">Mốc Công Việc &amp; Nội Dung Điều Khoản</th>
                  <th className="p-3.5 text-center w-[100px]">Thời Gian Chuẩn</th>
                  <th className="p-3.5 text-center w-[100px]">Dưới 300</th>
                  <th className="p-3.5 text-center w-[100px]">300-500</th>
                  <th className="p-3.5 text-center w-[100px]">500-800</th>
                  <th className="p-3.5 text-center w-[110px]">800-1200</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[13px]">
                {activeMilestones.map((m, idx) => (
                  <tr key={m.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'}>
                    <td className="p-3.5 font-black text-center text-gray-600">{idx + 1}</td>
                    <td className="p-3.5">
                      <div className="font-bold text-gray-900 text-[14px]">{m.title}</div>
                      <div className="text-[12px] text-gray-500 leading-snug mt-1">{m.contractClause.replace('{DAYS}', m.daysByArea[activeTier].toString())}</div>
                    </td>
                    <td className="p-3.5 text-center font-bold text-gray-700 bg-gray-50/50">{m.standardDays} ngày</td>
                    <td className={`p-3.5 text-center font-bold ${activeTier === 'under300' ? 'bg-amber-100 text-[#0e756c] font-black' : 'text-gray-600'}`}>{m.daysByArea.under300} ngày</td>
                    <td className={`p-3.5 text-center font-bold ${activeTier === 'from300to500' ? 'bg-amber-100 text-[#0e756c] font-black' : 'text-gray-600'}`}>{m.daysByArea.from300to500} ngày</td>
                    <td className={`p-3.5 text-center font-bold ${activeTier === 'from500to800' ? 'bg-amber-100 text-[#0e756c] font-black' : 'text-gray-600'}`}>{m.daysByArea.from500to800} ngày</td>
                    <td className={`p-3.5 text-center font-bold ${activeTier === 'from800to1200' ? 'bg-amber-100 text-[#0e756c] font-black' : 'text-gray-600'}`}>{m.daysByArea.from800to1200} ngày</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-teal-900 text-white font-black text-[14px]">
                  <td colSpan={2} className="p-3.5 text-right uppercase">TỔNG CỘNG THỜI GIAN (KHÔNG GỒM CĐT DUYỆT):</td>
                  <td className="p-3.5 text-center text-[#ffd54f]">{activeMilestones.filter(m => m.party === 'designer').reduce((s, m) => s + m.standardDays, 0)} ngày</td>
                  <td className={`p-3.5 text-center ${activeTier === 'under300' ? 'bg-[#ffd54f] text-teal-950' : 'text-teal-100'}`}>{activeMilestones.filter(m => m.party === 'designer').reduce((s, m) => s + m.daysByArea.under300, 0)} ngày</td>
                  <td className={`p-3.5 text-center ${activeTier === 'from300to500' ? 'bg-[#ffd54f] text-teal-950' : 'text-teal-100'}`}>{activeMilestones.filter(m => m.party === 'designer').reduce((s, m) => s + m.daysByArea.from300to500, 0)} ngày</td>
                  <td className={`p-3.5 text-center ${activeTier === 'from500to800' ? 'bg-[#ffd54f] text-teal-950' : 'text-teal-100'}`}>{activeMilestones.filter(m => m.party === 'designer').reduce((s, m) => s + m.daysByArea.from500to800, 0)} ngày</td>
                  <td className={`p-3.5 text-center ${activeTier === 'from800to1200' ? 'bg-[#ffd54f] text-teal-950' : 'text-teal-100'}`}>{activeMilestones.filter(m => m.party === 'designer').reduce((s, m) => s + m.daysByArea.from800to1200, 0)} ngày</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end border-t border-gray-200 pt-4">
            <p className="text-[12px] text-gray-500 italic">
              * Thời gian tiến độ tính theo ngày làm việc (không tính Thứ 7, Chủ Nhật và ngày Lễ theo quy định).
            </p>
            <div className="text-right">
              <p className="text-[20px] font-black text-[#0e756c]">
                {isIndividual ? 'KTS HOÀNG PHI' : 'CÁT NGHI INTERIOR'}
              </p>
              <p className="text-[12px] text-gray-500 font-bold">HOTLINE: 0934 888 040</p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl overflow-hidden max-w-xl w-full shadow-2xl flex flex-col max-h-[92vh] border-2 border-teal-200">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-teal-50">
              <div>
                <h3 className="text-base font-black text-gray-900 uppercase">
                  {previewModalTitle}
                </h3>
                <p className="text-xs text-gray-500 font-semibold mt-0.5">
                  Khổ chuẩn 16:9 dọc • Chữ nét rõ ràng không chồng chéo
                </p>
              </div>
              <button
                onClick={() => setPreviewImageUrl(null)}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="p-4 flex-1 overflow-auto bg-gray-100 flex items-center justify-center">
              <img
                src={previewImageUrl}
                alt="Tiến độ hợp đồng thiết kế 16:9"
                className="max-w-full h-auto shadow-xl rounded-xl border border-gray-300"
              />
            </div>

            <div className="p-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <p className="text-xs text-teal-700 font-bold">
                  📱 Trên di động: Nhấn giữ vào ảnh để "Lưu vào Ảnh"
                </p>
                <p className="text-[11px] text-gray-400 font-medium">
                  💻 Trên máy tính: Nhấn nút bên dưới để tải trực tiếp file PNG
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    const branding = isIndividual ? 'KTS_HoangPhi' : 'CAT_NGHI';
                    const link = document.createElement('a');
                    link.href = previewImageUrl;
                    link.download = `TIEN_DO_HDTK_16x9_${branding}_${(clientName || 'Khach').replace(/\s+/g, '_')}_${customArea}m2.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#0e756c] hover:bg-[#095f58] text-white font-black text-xs uppercase rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#ffd54f]"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  Tải Ảnh PNG
                </button>
                <button
                  onClick={() => setPreviewImageUrl(null)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs uppercase rounded-xl transition-all"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
