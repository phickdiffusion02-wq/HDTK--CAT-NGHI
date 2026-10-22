
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { useCostCalculator } from './hooks/useCostCalculator';
import { ResultCard } from './components/ResultCard';
import { DesignProcessTimeline } from './components/DesignProcessTimeline';
import { InteriorDesignProcess } from './components/InteriorDesignProcess';
import { CompiledPhonePoster } from './components/CompiledPhonePoster';
import { PosterQuote, PosterDeliverables, PosterProcess } from './components/IndividualPosters';
import { ContractScheduleTool } from './components/ContractScheduleTool';
import { HOUSE_TYPE_LABELS, PRICING_LEVEL_LABELS, ADDON_PRICES, PAYMENT_SCHEDULE_DATA, DELIVERABLES_DATA, ADDON_DELIVERABLES, APARTMENT_PRICING, ARCH_COMPONENTS, MISC_SERVICES_DATA, PACKAGE_PROPORTIONS } from './constants';
import type { HouseType, PricingLevel, SavedQuote, FloorData } from './types';

// Make html2canvas available in the component
declare const html2canvas: any;

const formatCurrency = (value: number) => {
    if (value === 0) return '0 ₫';
    return new Intl.NumberFormat('vi-VN').format(value) + ' ₫';
};

// --- Component: PasswordModal ---
const PasswordModal: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: (pass: string) => void }> = ({ isOpen, onClose, onConfirm }) => {
    const [pass, setPass] = useState('');
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-2xl border border-teal-100">
                <h3 className="text-lg font-black text-teal-700 uppercase mb-4 text-center">Xác thực quyền hạn</h3>
                <input 
                    type="password" 
                    autoFocus
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className="w-full px-4 py-3 border-2 border-teal-50 rounded-xl mb-4 text-center text-xl font-bold focus:border-teal-500 outline-none transition-all"
                    onKeyDown={(e) => e.key === 'Enter' && onConfirm(pass)}
                />
                <div className="flex gap-2">
                    <button onClick={onClose} className="flex-1 py-2 text-gray-400 font-bold hover:text-gray-600 transition-colors uppercase text-xs">Hủy</button>
                    <button onClick={() => onConfirm(pass)} className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-black hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 uppercase text-xs">Xác nhận</button>
                </div>
            </div>
        </div>
    );
};

// --- Component: ImagePreviewModal ---
const ImagePreviewModal: React.FC<{ imageUrl: string; onClose: () => void }> = ({ imageUrl, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl overflow-hidden max-w-lg w-full shadow-2xl flex flex-col max-h-[90vh]">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-teal-50">
                    <h3 className="text-lg font-bold text-gray-900">Xem trước & Lưu ảnh</h3>
                    <button onClick={onClose} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <div className="p-4 flex-1 overflow-auto bg-gray-100 flex items-center justify-center">
                    <img src={imageUrl} alt="Báo giá" className="max-w-full h-auto shadow-md rounded-md" />
                </div>
                <div className="p-4 bg-white border-t border-gray-100 text-center">
                     <p className="text-teal-600 font-bold mb-1">
                        Nhấn giữ vào ảnh trên để "Lưu vào Ảnh"
                    </p>
                    <p className="text-[10px] text-gray-400">
                        (Tính năng tải trực tiếp có thể bị chặn bởi một số trình duyệt di động)
                    </p>
                    <button 
                        onClick={onClose}
                        className="mt-3 w-full bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Component: PaymentSchedule ---
const PaymentSchedule: React.FC<{ totalCost: number; pricingLevel: PricingLevel; isIndividual?: boolean }> = ({ totalCost, pricingLevel, isIndividual }) => {
  const baseSchedule = PAYMENT_SCHEDULE_DATA[pricingLevel];
  
  if (!baseSchedule) return null;

  // Logic chia đợt thanh toán và đổi nội dung khi là Cá nhân
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
      
      const newSchedule = [
        { phase: 1, content: 'Tạm ứng Hợp đồng thiết kế', percentage: halfPct },
        { phase: 2, content: 'Ngay khi thống nhất phương án thiết kế cơ sở (layout & phối cảnh 3D ngoại thất)', percentage: halfPct },
        ...baseSchedule.slice(1).map((item, idx) => ({
          ...item,
          content: item.content.replace(/Công ty /g, '').replace(/CÁT NGHI /g, ''), 
          phase: idx + 3
        }))
      ];
      return newSchedule;
    }
    return baseSchedule;
  }, [baseSchedule, isIndividual, pricingLevel]);

  return (
    <section className="bg-teal-50/95 border border-teal-200 rounded-2xl shadow-xl text-gray-900 font-sans p-6">
      <h2 className="text-xl font-bold text-center text-teal-700 pb-2 mb-4 border-b border-teal-200 uppercase">
        PHƯƠNG THỨC THANH TOÁN
      </h2>
      <div className="space-y-3">
        {scheduleData.map((item) => (
          <div key={`${item.phase}-${item.content}`} className="bg-white rounded-lg p-3 border border-teal-100 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-teal-600 text-sm">Đợt {item.phase}</p>
                <p className="text-xs text-gray-600 mt-0.5 font-medium">{item.content}</p>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <p className="font-bold text-md text-gray-900">{item.percentage}%</p>
                <p className="text-xs text-gray-500 font-medium">{formatCurrency(totalCost * item.percentage / 100)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
       <div className="border-t border-teal-200 mt-4 pt-3 flex justify-between items-center text-md font-bold text-gray-900">
            <span>TỔNG CỘNG</span>
            <span>100%</span>
       </div>
    </section>
  );
};

// --- Component: DesignDeliverables ---
const DeliverableItem: React.FC<{ text: string }> = ({ text }) => (
    <li className="flex items-start">
        <span className="text-teal-500 mr-2 mt-0.5 font-bold text-xs">&#9679;</span>
        <span className="text-gray-700 font-medium text-xs leading-snug">{text}</span>
    </li>
);

interface DesignDeliverablesProps {
    pricingLevel: PricingLevel;
    isLuxury: boolean;
    isRenovation: boolean;
    facadeCount: number;
    isBOQ: boolean;
    supervisionPackage: 'none' | '1' | '2' | '4';
    gardenArea: string;
    isGreenBuilding: boolean;
    qrCodeBase64?: string;
    isRedrawFacade?: boolean;
    selectedMiscServices: string[];
    selectedProportions: string[];
    isIndividual?: boolean;
}

const DesignDeliverables: React.FC<DesignDeliverablesProps> = ({ 
    pricingLevel, isLuxury, isRenovation, facadeCount, isBOQ, supervisionPackage, gardenArea,
    isGreenBuilding,
    qrCodeBase64, isRedrawFacade, selectedMiscServices, selectedProportions,
    isIndividual
}) => {
    const showArchitecture = pricingLevel === 'standard' || pricingLevel === 'premium';
    const showInterior = pricingLevel === 'interior' || pricingLevel === 'premium';
    const hasGarden = parseFloat(gardenArea) > 0;

    const proportionItems = PACKAGE_PROPORTIONS[pricingLevel];
    const excludedLabels = proportionItems
      .filter(p => !selectedProportions.includes(p.id))
      .map(p => p.label);

    return (
        <section className="bg-teal-50/95 border border-teal-200 rounded-2xl shadow-xl text-gray-900 font-sans p-6">
            <h2 className="text-xl font-bold text-center text-teal-700 pb-2 mb-4 border-b border-teal-200 uppercase">
                NỘI DUNG CÔNG VIỆC
            </h2>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4`}>
                 {showArchitecture && (
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-teal-200 pb-1 uppercase">Hồ sơ Kiến Trúc</h3>
                        <ul className="space-y-1">
                            {ARCH_COMPONENTS.arch.map((item, index) => (
                                <DeliverableItem key={`arch-${index}`} text={item} />
                            ))}
                            {ARCH_COMPONENTS.pm.map((item, index) => (
                                <DeliverableItem key={`pm-${index}`} text={isIndividual ? 'Quản lý & Điều phối hạng mục' : item} />
                            ))}
                            {ARCH_COMPONENTS.structure.map((item, index) => (
                                <DeliverableItem key={`st-${index}`} text={item} />
                            ))}
                            {ARCH_COMPONENTS.mep.map((item, index) => (
                                <DeliverableItem key={`mep-${index}`} text={item} />
                            ))}
                        </ul>
                    </div>
                )}
                 {showInterior && (
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-teal-200 pb-1 uppercase">Hồ sơ Nội thất</h3>
                        <ul className="space-y-1">
                            {DELIVERABLES_DATA.interior.map((item, index) => (
                               <DeliverableItem key={`int-${index}`} text={item} />
                            ))}
                        </ul>
                    </div>
                )}
                {excludedLabels.length > 0 && (
                    <div className="col-span-1 md:col-span-2 bg-red-50 p-3 rounded-lg border border-red-100 shadow-sm mt-2">
                        <h3 className="text-xs font-bold text-red-600 mb-1 uppercase tracking-tighter">⚠️ Các hạng mục không bao gồm trong gói</h3>
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {excludedLabels.map((l, i) => (
                            <span key={i} className="text-[10px] text-red-500 font-bold">• {l}</span>
                          ))}
                        </div>
                    </div>
                )}
                {isLuxury && (
                    <div className="col-span-1 md:col-span-2 bg-white p-3 rounded-lg border border-teal-200 shadow-sm">
                        <h3 className="text-sm font-bold text-teal-600 mb-2 border-b border-teal-100 pb-1 uppercase">Phong cách phức tạp</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                             {DELIVERABLES_DATA.luxury.map((item, index) => (
                                <DeliverableItem key={`lux-${index}`} text={item} />
                             ))}
                        </ul>
                    </div>
                )}
                {isRenovation && (
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-teal-200 pb-1 uppercase">Thiết kế cải tạo</h3>
                        <ul className="space-y-1">
                            {ADDON_DELIVERABLES.renovation.map((item, index) => (
                                <DeliverableItem key={`ren-${index}`} text={item} />
                            ))}
                        </ul>
                    </div>
                )}
                {facadeCount > 1 && (
                    <div>
                         <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-teal-200 pb-1 uppercase">Thiết kế {facadeCount} mặt tiền</h3>
                         <ul className="space-y-1">
                             {ADDON_DELIVERABLES.facade.map((item, index) => (
                                 <DeliverableItem key={`fac-${index}`} text={item} />
                             ))}
                         </ul>
                    </div>
                )}
                {isRedrawFacade && (
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-teal-200 pb-1 uppercase">Phối cảnh ngoại thất lẻ</h3>
                        <ul className="space-y-1">
                            <DeliverableItem text="Thiết kế ngoại thất chi tiết bộ mới" />
                            <DeliverableItem text="Chỉ định vật liệu & Phối cảnh 3D" />
                        </ul>
                    </div>
                )}
                {supervisionPackage !== 'none' && (
                    <div>
                         <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-teal-200 pb-1 uppercase">Giám sát tác giả ({supervisionPackage} buổi)</h3>
                         <ul className="space-y-1">
                             {ADDON_DELIVERABLES.supervision.map((item, index) => (
                                 <DeliverableItem key={`sup-${index}`} text={item} />
                             ))}
                         </ul>
                    </div>
                )}
                 {isBOQ && (
                    <div>
                         <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-teal-200 pb-1 uppercase">Lập dự toán thi công</h3>
                         <ul className="space-y-1">
                             {ADDON_DELIVERABLES.boq.map((item, index) => (
                                 <DeliverableItem key={`boq-${index}`} text={item} />
                             ))}
                         </ul>
                    </div>
                )}
                {hasGarden && (
                     <div>
                         <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-teal-200 pb-1 uppercase">Thiết kế sân vườn</h3>
                         <ul className="space-y-1">
                             {ADDON_DELIVERABLES.garden.map((item, index) => (
                                 <DeliverableItem key={`gar-${index}`} text={item} />
                             ))}
                         </ul>
                    </div>
                )}
                {selectedMiscServices.length > 0 && (
                    <div>
                         <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-teal-200 pb-1 uppercase">Dịch vụ lẻ khác</h3>
                         <ul className="space-y-1">
                             {selectedMiscServices.map(id => (
                                 <DeliverableItem key={id} text={MISC_SERVICES_DATA.find(s => s.id === id)?.label || ''} />
                             ))}
                         </ul>
                    </div>
                )}
            </div>
        </section>
    );
};

const App: React.FC = () => {
  const [areaPerFloor, setAreaPerFloor] = useState<string>('150');
  const [numberOfFloors, setNumberOfFloors] = useState<string>('3');
  const [houseType, setHouseType] = useState<HouseType>('townhouse');
  const [pricingLevel, setPricingLevel] = useState<PricingLevel>('premium');
  const [clientName, setClientName] = useState<string>('');
  
  const [downloadingSection, setDownloadingSection] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [gardenArea, setGardenArea] = useState<string>('');
  
  // Branding state
  const [activeTab, setActiveTab] = useState<'quote' | 'timeline'>('quote');
  const [isIndividual, setIsIndividual] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // State for optional items
  const [isRenovation, setIsRenovation] = useState(false);
  const [isLuxury, setIsLuxury] = useState(false);
  const [facadeCount, setFacadeCount] = useState<number>(1);
  const [isBOQ, setIsBOQ] = useState(false);
  const [supervisionPackage, setSupervisionPackage] = useState<'none' | '1' | '2' | '4'>('none');
  const [isGreenBuilding, setIsGreenBuilding] = useState(false);
  const [isRedrawFacade, setIsRedrawFacade] = useState(false);
  
  // Tabs & Sections
  const [selectedMiscServices, setSelectedMiscServices] = useState<string[]>([]);
  const [isMiscOpen, setIsMiscOpen] = useState(false);
  const [isProportionOpen, setIsProportionOpen] = useState(false);
  const [selectedProportions, setSelectedProportions] = useState<string[]>([]);

  const [discountPercentage, setDiscountPercentage] = useState<string>('');
  const [discountReason, setDiscountReason] = useState<string>('');
  const [manualFinalTotal, setManualFinalTotal] = useState<string>('');

  const [apartmentType, setApartmentType] = useState<keyof typeof APARTMENT_PRICING>('two_bedrooms');
  const [apartmentArea, setApartmentArea] = useState<string>('100');
  
  const [isCustomCommercialPrice, setIsCustomCommercialPrice] = useState<boolean>(false);
  const [customCommercialPrice, setCustomCommercialPrice] = useState<string>('');

  const [areaInputMode, setAreaInputMode] = useState<'simple' | 'detailed'>('detailed');
  const [floors, setFloors] = useState<FloorData[]>([
    { id: 'f1', name: 'Trệt', area: '100', coefficient: '100' },
    { id: 'f2', name: 'Lầu 1', area: '100', coefficient: '100' },
    { id: 'f3', name: 'Lầu 2', area: '100', coefficient: '100' },
    { id: 'f4', name: 'Mái (BTCT/Ngói)', area: '100', coefficient: '50' },
  ]);
  
  const [isOcrLoading, setIsOcrLoading] = useState(false);
  const [qrCodeBase64, setQrCodeBase64] = useState<string>('');

  const quoteRef = useRef<HTMLDivElement>(null);
  const deliverablesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const compiledPosterRef = useRef<HTMLDivElement>(null);
  const posterQuoteRef = useRef<HTMLDivElement>(null);
  const posterDeliverablesRef = useRef<HTMLDivElement>(null);
  const posterProcessRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toneMoodInputRef = useRef<HTMLInputElement>(null);

  // AI Idea Generator State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiType, setAiType] = useState<'exterior' | 'interior'>('exterior');
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [imageCount, setImageCount] = useState<number>(4);
  const [toneMoodImage, setToneMoodImage] = useState<string | null>(null);

  // Sync proportions when pricing level changes
  useEffect(() => {
    const defaultIds = PACKAGE_PROPORTIONS[pricingLevel].map(p => p.id);
    setSelectedProportions(defaultIds);
  }, [pricingLevel]);

  const totalArea = useMemo(() => {
    if (houseType === 'apartment' && apartmentType === 'large_area') {
      return parseFloat(apartmentArea) || 0;
    }
    if (houseType === 'townhouse' || houseType === 'villa' || houseType === 'commercial') {
      if (areaInputMode === 'detailed') {
        return floors.reduce((sum, floor) => {
            const area = parseFloat(floor.area) || 0;
            const coef = parseFloat(floor.coefficient) || 100;
            return sum + (area * (coef / 100));
        }, 0);
      }
      return (parseFloat(areaPerFloor) || 0) * (parseFloat(numberOfFloors) || 0);
    }
    return 0;
  }, [houseType, apartmentType, apartmentArea, areaPerFloor, numberOfFloors, areaInputMode, floors]);

  const result = useCostCalculator(
    totalArea,
    houseType,
    pricingLevel,
    { 
        apartmentType: houseType === 'apartment' ? apartmentType : undefined,
        customPricePerSqm: (houseType === 'commercial' && isCustomCommercialPrice)
            ? parseFloat(customCommercialPrice) || 0
            : undefined
    }
  );
  
  const scopeFactor = useMemo(() => {
    const currentProportions = PACKAGE_PROPORTIONS[pricingLevel];
    const totalPercentage = currentProportions
      .filter(p => selectedProportions.includes(p.id))
      .reduce((sum, p) => sum + p.percentage, 0);
    return totalPercentage / 100;
  }, [pricingLevel, selectedProportions]);
  
  const adjustedTotalCost = result.totalCost * scopeFactor;
  const adjustedPricePerSqm = result.pricePerSqm * scopeFactor;

  const gardenCost = useMemo(() => {
      const area = parseFloat(gardenArea) || 0;
      if (area > 0) {
          return area * (adjustedPricePerSqm * 0.5);
      }
      return 0;
  }, [gardenArea, adjustedPricePerSqm]);

  const luxuryFee = isLuxury ? adjustedTotalCost * 0.15 : 0;
  const facadeFee = (facadeCount >= 2) ? adjustedTotalCost * 0.1 : 0;
  const renovationFee = isRenovation ? adjustedTotalCost * 0.2 : 0;

  const boqCost = useMemo(() => {
      if (!isBOQ) return 0;
      const calc = totalArea * ADDON_PRICES.boq_sqm;
      return Math.max(calc, ADDON_PRICES.boq_min);
  }, [isBOQ, totalArea]);

  const supervisorCost = useMemo(() => {
      const visits = parseInt(supervisionPackage) || 0;
      return visits * ADDON_PRICES.supervision_visit;
  }, [supervisionPackage]);

  const greenBuildingCost = isGreenBuilding ? ADDON_PRICES.green_lotus : 0;
  const redrawFacadeFee = isRedrawFacade ? ADDON_PRICES.redraw_facade : 0;

  const miscTotalCost = useMemo(() => {
      return selectedMiscServices.reduce((sum, id) => {
          const service = MISC_SERVICES_DATA.find(s => s.id === id);
          return sum + (service?.price || 0);
      }, 0);
  }, [selectedMiscServices]);

  const subTotal = adjustedTotalCost + gardenCost + luxuryFee + facadeFee + renovationFee + boqCost + supervisorCost + greenBuildingCost + redrawFacadeFee + miscTotalCost;
  
  // Final Calculation Logic: Priority to Manual Total to avoid floating point issues
  const finalTotalCost = useMemo(() => {
    if (manualFinalTotal && !isNaN(parseFloat(manualFinalTotal))) {
        return parseFloat(manualFinalTotal);
    }
    const parsedPct = parseFloat(discountPercentage) || 0;
    return subTotal - (subTotal * (parsedPct / 100));
  }, [manualFinalTotal, discountPercentage, subTotal]);

  const discountAmount = useMemo(() => subTotal - finalTotalCost, [subTotal, finalTotalCost]);
  
  const displayDiscountPercentage = useMemo(() => {
    if (subTotal === 0) return 0;
    return (discountAmount / subTotal) * 100;
  }, [subTotal, discountAmount]);

  // Sync effect only for UI percentage input when manual total changes
  useEffect(() => {
    if (manualFinalTotal && !isNaN(parseFloat(manualFinalTotal)) && subTotal > 0) {
        const target = parseFloat(manualFinalTotal);
        const calcDiscount = ((subTotal - target) / subTotal) * 100;
        setDiscountPercentage(calcDiscount.toFixed(2));
    }
  }, [manualFinalTotal, subTotal]);

  const handleDownload = async (ref: React.RefObject<HTMLDivElement>, sectionName: string, filenameSuffix: string) => {
    if (!ref.current) return;
    setDownloadingSection(sectionName);
    try {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const canvas = await html2canvas(ref.current, { 
          backgroundColor: '#ffffff', 
          scale: 3, 
          useCORS: true,
          logging: false
        });
        const dataUrl = canvas.toDataURL('image/png');
        
        if (isMobile) {
            setPreviewImage(dataUrl);
        } else {
            const brandingPrefix = isIndividual ? 'KTS_HoangPhi_0934888040' : 'CAT_NGHI';
            const fileName = `BG_${brandingPrefix}_${filenameSuffix}_${(clientName || 'Khach').replace(/\s+/g, '_')}.png`;
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = fileName;
            link.click();
        }
    } catch (e) { 
        console.error('Download error:', e); 
    } finally { 
        setDownloadingSection(null); 
    }
  };

  const handleHouseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHouseType = e.target.value as HouseType;
    setHouseType(newHouseType);
    if (newHouseType === 'apartment') { setPricingLevel('interior'); setFacadeCount(1); }
    else { setPricingLevel('standard'); }
  };

  const toggleProportion = (id: string, mandatory: boolean) => {
    if (mandatory) return;
    setSelectedProportions(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsOcrLoading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: file.type,
                    data: base64Data,
                  },
                },
                {
                  text: 'Trích xuất dữ liệu tính toán diện tích từ hình ảnh này. Trả về một mảng JSON các đối tượng có cấu trúc: {"name": "Tên tầng/hạng mục", "area": "số diện tích", "coefficient": "số phần trăm hệ số"}. Hãy cố gắng xác định đúng hệ số cho từng hạng mục như Trệt, Lầu, Mái, Sân... Nếu không thấy hệ số, mặc định là 100. Chỉ trả về JSON, không kèm giải thích.',
                },
              ],
            },
          ],
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  area: { type: Type.STRING },
                  coefficient: { type: Type.STRING },
                },
                required: ['name', 'area', 'coefficient'],
              },
            },
          },
        });

        const extractedData = JSON.parse(response.text || '[]');
        if (extractedData.length > 0) {
            const newFloors = extractedData.map((d: any, index: number) => ({
                id: `ocr-${Date.now()}-${index}`,
                name: d.name,
                area: d.area.replace(/[^\d.]/g, ''),
                coefficient: d.coefficient.replace(/[^\d.]/g, '') || '100'
            }));
            setFloors(newFloors);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Lỗi trích xuất ảnh:', err);
      alert('Không thể trích xuất dữ liệu từ ảnh. Vui lòng thử lại hoặc nhập thủ công.');
    } finally {
      setIsOcrLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleToneMoodUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setToneMoodImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateAiImages = async () => {
    if (!aiPrompt.trim() && !toneMoodImage) return;

    setIsGeneratingImages(true);
    setGeneratedImages([]);
    
    // Enhanced prompt with specific constraints for exterior and interior
    let moodPart = toneMoodImage ? "Dựa trên TONE MOOD và vật liệu của ảnh đính kèm. Hãy áp dụng tinh thần đó vào không gian mới sau: " : "";
    const enhancedPrompt = aiType === 'exterior'
      ? `${moodPart}Kiến trúc thực tế tại Việt Nam. Ánh sáng chuyên nghiệp. Chủ đề: ${aiPrompt}. Chất lượng 4K, siêu thực, phối cảnh đẹp.`
      : `${moodPart}Thiết kế nội thất cao cấp, ánh sáng sang trọng. Chủ đề: ${aiPrompt}. Chất lượng 4K, phong cách Architectural Digest.`;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const contents: any = {
        parts: [{ text: enhancedPrompt }]
      };

      if (toneMoodImage) {
        contents.parts.unshift({
          inlineData: {
            mimeType: 'image/jpeg',
            data: toneMoodImage.split(',')[1]
          }
        });
      }

      const promises = Array(imageCount).fill(null).map(() => 
        ai.models.generateContent({
          model: 'gemini-3.1-flash-lite-image',
          contents,
          config: {
            imageConfig: {
              aspectRatio: "4:3"
            }
          }
        })
      );

      const responses = await Promise.all(promises);
      const newImages: string[] = [];

      responses.forEach(response => {
        const imagePart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
        if (imagePart?.inlineData?.data) {
          newImages.push(`data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`);
        }
      });

      setGeneratedImages(newImages);
    } catch (err) {
      console.error('Lỗi tạo ảnh AI:', err);
      alert('Đã xảy ra lỗi khi tạo ảnh. Vui lòng thử lại sau.');
    } finally {
      setIsGeneratingImages(false);
    }
  };

  const downloadAiImage = (url: string, index: number) => {
    const link = document.createElement('a');
    link.href = url;
    const branding = isIndividual ? 'KTS-HoangPhi-0934888040' : 'CAT-NGHI';
    link.download = `${branding}-PA${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleIndividualToggle = () => {
      if (!isIndividual) {
          setShowPasswordModal(true);
      } else {
          setIsIndividual(false);
      }
  };

  const handlePasswordConfirm = (pass: string) => {
      if (pass === '2005') {
          setIsIndividual(true);
          setShowPasswordModal(false);
      } else {
          alert('Mật khẩu không chính xác!');
      }
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-fixed" style={{backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')`}}>
      {previewImage && <ImagePreviewModal imageUrl={previewImage} onClose={() => setPreviewImage(null)} />}
      <PasswordModal 
        isOpen={showPasswordModal} 
        onClose={() => setShowPasswordModal(false)} 
        onConfirm={handlePasswordConfirm} 
      />
      <div className="w-full min-h-screen bg-black/40 flex flex-col items-center p-4 sm:p-8 font-sans text-gray-900">
        <div className="w-full max-w-6xl mx-auto">
          <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 shadow-xl">
            <div>
                 <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-lg uppercase">
                   {activeTab === 'quote' ? 'CÔNG CỤ BÁO GIÁ 2026' : 'TIẾN ĐỘ THỜI GIAN HỢP ĐỒNG'}
                 </h1>
                 <p className="text-sm sm:text-md text-gray-100 font-bold">
                   {isIndividual ? 'KTS HOÀNG PHI - 0934 888 040' : 'CÁT NGHI INTERIOR'}
                 </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 bg-black/35 p-1.5 rounded-2xl border border-white/20 backdrop-blur-md shadow-inner">
              <button
                onClick={() => setActiveTab('quote')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs uppercase transition-all duration-200 ${
                  activeTab === 'quote'
                    ? 'bg-white text-teal-800 shadow-lg scale-105'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <span>1. Báo Giá Thiết Kế</span>
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs uppercase transition-all duration-200 ${
                  activeTab === 'timeline'
                    ? 'bg-amber-400 text-teal-950 shadow-lg scale-105'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                <span>2. Tiến Độ HĐTK</span>
                <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-black animate-pulse shadow-sm">MỚI</span>
              </button>
            </div>
          </header>
          
          {activeTab === 'timeline' ? (
            <div className="mb-12">
              <ContractScheduleTool
                initialArea={totalArea}
                clientName={clientName}
                houseType={houseType}
                isIndividual={isIndividual}
                onNavigateToQuote={() => setActiveTab('quote')}
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
            {/* Left: Inputs */}
            <div className="space-y-4 bg-white/90 backdrop-blur-lg rounded-xl p-6 border border-white/50 lg:sticky lg:top-8 shadow-2xl overflow-y-auto max-h-[85vh]">
              <div className="flex justify-between items-center border-b border-teal-200 pb-2">
                <h2 className="text-xl font-bold text-teal-700">Thông số dự án</h2>
                <button 
                    onClick={handleIndividualToggle}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm transition-all duration-300 ${isIndividual ? 'bg-teal-600 text-white border-teal-600' : 'bg-teal-50 text-teal-700 border-teal-100 hover:bg-teal-100'}`}
                >
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isIndividual ? 'bg-white border-white' : 'bg-transparent border-teal-300'}`}>
                        {isIndividual && <div className="w-1.5 h-1.5 bg-teal-600 rounded-full" />}
                    </span>
                    <span className="text-xs font-black uppercase tracking-tight">Cá nhân</span>
                </button>
              </div>
              
              <div className="space-y-3">
                <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Tên khách hàng" className="w-full px-4 py-2 border rounded-md" />
                
                <div className="grid grid-cols-2 gap-3">
                    <select value={houseType} onChange={handleHouseTypeChange} className="border p-2 rounded-md font-medium">
                        {(Object.keys(HOUSE_TYPE_LABELS) as HouseType[]).map(t => <option key={t} value={t}>{HOUSE_TYPE_LABELS[t]}</option>)}
                    </select>
                    {houseType !== 'apartment' && (
                        <select value={pricingLevel} onChange={e => setPricingLevel(e.target.value as any)} className="border p-2 rounded-md font-medium">
                            {Object.keys(PRICING_LEVEL_LABELS).map(l => <option key={l} value={l}>{PRICING_LEVEL_LABELS[l as any]}</option>)}
                        </select>
                    )}
                </div>

                {houseType === 'apartment' ? (
                    <div className="space-y-3">
                        <select value={apartmentType} onChange={e => setApartmentType(e.target.value as any)} className="w-full border p-2 rounded-md">
                            {Object.keys(APARTMENT_PRICING).map(t => <option key={t} value={t}>{APARTMENT_PRICING[t as any].label}</option>)}
                        </select>
                        {apartmentType === 'large_area' && <input type="number" value={apartmentArea} onChange={e => setApartmentArea(e.target.value)} placeholder="Tổng diện tích m2" className="w-full border p-2 rounded-md" />}
                    </div>
                ) : (
                    <>
                        <div className="flex bg-gray-100 rounded-md p-1 text-sm border">
                            <button onClick={() => setAreaInputMode('simple')} className={`w-1/2 py-1 rounded-md transition ${areaInputMode === 'simple' ? 'bg-teal-500 text-white shadow' : 'text-gray-600'}`}>Đơn giản</button>
                            <button onClick={() => setAreaInputMode('detailed')} className={`w-1/2 py-1 rounded-md transition ${areaInputMode === 'detailed' ? 'bg-teal-500 text-white shadow' : 'text-gray-600'}`}>Chi tiết sàn</button>
                        </div>
                        {areaInputMode === 'simple' ? (
                            <div className="grid grid-cols-2 gap-3">
                                <input type="number" value={areaPerFloor} onChange={e => setAreaPerFloor(e.target.value)} placeholder="DT 1 sàn" className="w-full border p-2 rounded-md" />
                                <input type="number" value={numberOfFloors} onChange={e => setNumberOfFloors(e.target.value)} placeholder="Số tầng" className="w-full border p-2 rounded-md" />
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between px-1 mb-2">
                                    <div className="flex gap-2 text-[10px] font-bold text-gray-400 uppercase">
                                        <span className="flex-grow">Hạng mục</span>
                                        <span className="w-16 text-center">Diện tích</span>
                                        <span className="w-12 text-center">HS (%)</span>
                                    </div>
                                    <button 
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isOcrLoading}
                                        className="text-[10px] font-bold bg-teal-600 text-white px-2 py-1 rounded hover:bg-teal-700 transition flex items-center gap-1 disabled:bg-gray-400"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                                        {isOcrLoading ? 'ĐANG XỬ LÝ...' : 'NHẬP TỪ ẢNH'}
                                    </button>
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        onChange={handleImageUpload} 
                                        accept="image/*" 
                                        className="hidden" 
                                    />
                                </div>
                                {floors.map((floor, index) => (
                                    <div key={floor.id} className="flex gap-2">
                                        <input type="text" value={floor.name} onChange={e => { const f = [...floors]; f[index].name = e.target.value; setFloors(f); }} className="flex-grow border p-1 rounded text-sm" />
                                        <input type="number" value={floor.area} onChange={e => { const f = [...floors]; f[index].area = e.target.value; setFloors(f); }} className="w-16 border p-1 rounded text-sm text-center" />
                                        <input type="number" value={floor.coefficient} onChange={e => { const f = [...floors]; f[index].coefficient = e.target.value; setFloors(f); }} className="w-12 border p-1 rounded text-sm text-center" />
                                        <button onClick={() => setFloors(floors.filter((_, i) => i !== index))} className="text-red-400 font-bold px-1">×</button>
                                    </div>
                                ))}
                                <button onClick={() => setFloors([...floors, { id: Date.now().toString(), name: `Tầng ${floors.length + 1}`, area: '100', coefficient: '100' }])} className="w-full text-xs text-teal-600 font-bold py-1 bg-teal-50 rounded border border-teal-200 hover:bg-teal-100 transition">+ Thêm hạng mục sàn</button>
                            </div>
                        )}
                    </>
                )}
              </div>

              {/* TỈ LỆ THÀNH PHẦN HỒ SƠ */}
              {houseType !== 'apartment' && (
                <div className="pt-2">
                    <button 
                        onClick={() => setIsProportionOpen(!isProportionOpen)}
                        className="w-full flex justify-between items-center bg-teal-50 p-3 rounded-lg border border-teal-100 hover:bg-teal-100 transition"
                    >
                        <span className="text-sm font-bold text-teal-700 uppercase">Tỉ lệ thành phần hồ sơ</span>
                        <svg className={`w-5 h-5 transition-transform ${isProportionOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {isProportionOpen && (
                        <div className="mt-2 space-y-1 bg-white p-3 rounded-lg border border-teal-50 animate-in fade-in duration-200">
                             <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">Bỏ chọn các phần KH đã có để giảm trừ chi phí</p>
                             {PACKAGE_PROPORTIONS[pricingLevel].map(item => (
                                <label 
                                  key={item.id} 
                                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition ${selectedProportions.includes(item.id) ? 'bg-teal-50 border-teal-100' : 'bg-gray-50 border-gray-100'} border`}
                                >
                                    <input 
                                        type="checkbox" 
                                        checked={selectedProportions.includes(item.id)}
                                        disabled={item.mandatory}
                                        onChange={() => toggleProportion(item.id, !!item.mandatory)}
                                        className="w-4 h-4 accent-teal-600"
                                    />
                                    <div className="flex-grow flex justify-between items-center">
                                        <span className={`text-xs font-bold ${item.mandatory ? 'text-teal-700' : 'text-gray-700'}`}>
                                          {item.label} {item.mandatory && '(luôn có)'}
                                        </span>
                                        <span className="text-xs font-black text-teal-600">{item.percentage}%</span>
                                    </div>
                                </label>
                             ))}
                        </div>
                    )}
                </div>
              )}

              <div className="bg-teal-50 p-3 rounded-md border border-teal-200">
                <label className="block text-sm font-bold text-teal-700 mb-1">Thiết kế Sân vườn (m2)</label>
                <input type="number" value={gardenArea} onChange={e => setGardenArea(e.target.value)} placeholder="Hệ số 0.5 đơn giá chính" className="w-full border p-2 rounded-md" />
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-lg font-bold text-teal-700 border-b pb-1 uppercase tracking-tight">HẠNG MỤC CỘNG THÊM</h3>
                <div className="grid grid-cols-1 gap-2">
                    <label className="flex items-center gap-2 cursor-pointer bg-gray-50 p-2 rounded hover:bg-teal-50 transition">
                        <input type="checkbox" checked={isLuxury} onChange={e => setIsLuxury(e.target.checked)} className="w-4 h-4" />
                        <span className="text-sm font-semibold">Phong cách phức tạp (+15%)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer bg-gray-50 p-2 rounded hover:bg-teal-50 transition">
                        <input type="checkbox" checked={isRenovation} onChange={e => setIsRenovation(e.target.checked)} className="w-4 h-4" />
                        <span className="text-sm font-semibold">Cải tạo sửa chữa (+20%)</span>
                    </label>
                    <div className="bg-gray-50 p-2 rounded">
                        <label className="block text-sm font-semibold mb-1">Số mặt tiền chính: {facadeCount} mặt {facadeCount >= 2 && '(+10%)'}</label>
                        <input type="range" min="1" max="4" value={facadeCount} onChange={e => setFacadeCount(parseInt(e.target.value))} className="w-full h-2 bg-teal-200 rounded-lg cursor-pointer" />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer bg-gray-50 p-2 rounded hover:bg-teal-50 transition">
                        <input type="checkbox" checked={isBOQ} onChange={e => setIsBOQ(e.target.checked)} className="w-4 h-4" />
                        <span className="text-sm font-semibold">Lập dự toán thi công (BOQ)</span>
                    </label>
                    <div className="bg-gray-50 p-2 rounded">
                        <label className="block text-sm font-semibold mb-1">Giám sát tác giả (1.5tr/buổi)</label>
                        <select value={supervisionPackage} onChange={e => setSupervisionPackage(e.target.value as any)} className="w-full border p-1 rounded text-sm">
                            <option value="none">Không yêu cầu</option>
                            <option value="1">1 buổi</option>
                            <option value="2">2 buổi</option>
                            <option value="4">4 buổi</option>
                        </select>
                    </div>
                </div>
                
                <div className="pt-2">
                    <button 
                        onClick={() => setIsMiscOpen(!isMiscOpen)}
                        className="w-full flex justify-between items-center bg-indigo-50 p-3 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition"
                    >
                        <span className="text-sm font-bold text-indigo-700 uppercase">Dịch vụ lẻ khác</span>
                        <svg className={`w-5 h-5 transition-transform ${isMiscOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {isMiscOpen && (
                        <div className="mt-2 space-y-2 animate-in fade-in duration-200">
                            {MISC_SERVICES_DATA.map(service => (
                                <label key={service.id} className="flex items-center gap-3 bg-white p-3 rounded-lg border hover:border-indigo-300 cursor-pointer transition">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedMiscServices.includes(service.id)}
                                        onChange={() => {
                                            setSelectedMiscServices(prev => prev.includes(service.id) ? prev.filter(i => i !== service.id) : [...prev, service.id]);
                                        }}
                                        className="w-4 h-4 accent-indigo-600"
                                    />
                                    <div className="flex-grow">
                                        <p className="text-sm font-bold text-gray-800">{service.label}</p>
                                        <p className="text-xs text-indigo-600 font-bold">{formatCurrency(service.price)}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <div className="pt-2 border-t mt-2 space-y-3">
                    <h3 className="text-sm font-black text-teal-700 uppercase">Giảm trừ & Điều chỉnh chốt</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Chiết khấu (%)</label>
                            <input 
                                type="number" 
                                value={discountPercentage} 
                                onChange={e => {
                                    setDiscountPercentage(e.target.value);
                                    setManualFinalTotal(''); // Clear manual total if editing percentage
                                }} 
                                placeholder="0%" 
                                className="w-full border p-2 rounded-md font-bold text-teal-600" 
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-teal-600 uppercase mb-1">Số tiền chốt cuối</label>
                            <input 
                                type="number" 
                                value={manualFinalTotal} 
                                onChange={e => {
                                    setManualFinalTotal(e.target.value);
                                    if (e.target.value === '') setDiscountPercentage('0');
                                }} 
                                placeholder="VD: 150000000" 
                                className="w-full border p-2 rounded-md font-bold text-gray-900 bg-teal-50" 
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Lý do giảm giá</label>
                        <input type="text" value={discountReason} onChange={e => setDiscountReason(e.target.value)} placeholder="Tặng quà, ưu đãi tháng..." className="w-full border p-2 rounded-md text-sm" />
                    </div>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                  <button 
                    disabled={downloadingSection !== null}
                    onClick={() => handleDownload(compiledPosterRef, 'compiled', 'ANH-GOP-1-2')} 
                    className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black py-3 px-4 rounded-xl text-xs uppercase shadow-lg hover:from-teal-700 hover:to-emerald-700 transition duration-300 disabled:bg-gray-400 flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    {downloadingSection === 'compiled' ? 'Đang tạo ảnh gộp 1:2...' : 'TẢI ẢNH GỘP 1:2 CHUYÊN NGHIỆP'}
                  </button>
                  <div className="grid grid-cols-3 gap-2">
                      <button 
                        disabled={downloadingSection !== null}
                        onClick={() => handleDownload(posterQuoteRef, 'quote', 'BAO-GIA')} 
                        className="bg-teal-50 text-teal-700 border border-teal-200 font-bold py-2 px-1 rounded-lg text-[10px] uppercase shadow-sm hover:bg-teal-100 disabled:bg-gray-400"
                      >
                        {downloadingSection === 'quote' ? '...' : 'Ảnh lẻ 1: Báo Giá'}
                      </button>
                      <button 
                        disabled={downloadingSection !== null}
                        onClick={() => handleDownload(posterDeliverablesRef, 'deliverables', 'NOI-DUNG')} 
                        className="bg-teal-50 text-teal-700 border border-teal-200 font-bold py-2 px-1 rounded-lg text-[10px] uppercase shadow-sm hover:bg-teal-100 disabled:bg-gray-400"
                      >
                        {downloadingSection === 'deliverables' ? '...' : 'Ảnh lẻ 2: Nội Dung'}
                      </button>
                      <button 
                        disabled={downloadingSection !== null}
                        onClick={() => handleDownload(posterProcessRef, 'process', 'QUY-TRINH')} 
                        className="bg-teal-50 text-teal-700 border border-teal-200 font-bold py-2 px-1 rounded-lg text-[10px] uppercase shadow-sm hover:bg-teal-100 disabled:bg-gray-400"
                      >
                        {downloadingSection === 'process' ? '...' : 'Ảnh lẻ 3: Quy Trình'}
                      </button>
                  </div>

                  {/* Switch to Timeline Tool Button */}
                  <button
                    onClick={() => {
                      setActiveTab('timeline');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full mt-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black py-3 px-4 rounded-xl text-xs uppercase shadow-md flex items-center justify-center gap-2 transition-all group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-100 group-hover:scale-110 transition-transform"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    <span>Xem Bảng Tiến Độ HĐTK ({totalArea.toLocaleString()} m²)</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </button>
              </div>
            </div>

            {/* Right: Preview Results */}
            <div className="space-y-8">
              <div ref={quoteRef} className="bg-white p-2">
                  <ResultCard 
                    totalArea={totalArea} pricePerSqm={adjustedPricePerSqm} totalCost={adjustedTotalCost} tierDescription={result.tierDescription}
                    houseType={houseType} pricingLevel={pricingLevel} clientName={clientName} gardenCost={gardenArea ? gardenCost : 0} supervisorCost={supervisorCost}
                    renovationFee={renovationFee} luxuryFee={luxuryFee} facadeFee={facadeFee} boqCost={boqCost} greenBuildingCost={greenBuildingCost}
                    redrawFacadeFee={redrawFacadeFee} totalBeforeDiscount={subTotal} 
                    discountAmount={discountAmount} 
                    discountPercentage={displayDiscountPercentage}
                    discountReason={discountReason} 
                    finalTotalCost={finalTotalCost} 
                    qrCodeBase64={qrCodeBase64} floors={floors} areaInputMode={areaInputMode}
                    selectedMiscServices={selectedMiscServices}
                    selectedProportions={selectedProportions}
                    isIndividual={isIndividual}
                    apartmentType={apartmentType}
                  />
                  <div className="mt-4"><PaymentSchedule totalCost={finalTotalCost} pricingLevel={pricingLevel} isIndividual={isIndividual} /></div>
              </div>

              <div ref={deliverablesRef} className="bg-white p-2">
                  <DesignDeliverables 
                      pricingLevel={pricingLevel} isLuxury={isLuxury} isRenovation={isRenovation} facadeCount={facadeCount} isBOQ={isBOQ}
                      supervisionPackage={supervisionPackage} gardenArea={gardenArea} isGreenBuilding={isGreenBuilding}
                      qrCodeBase64={qrCodeBase64} isRedrawFacade={isRedrawFacade}
                      selectedMiscServices={selectedMiscServices}
                      selectedProportions={selectedProportions}
                      isIndividual={isIndividual}
                  />
              </div>

              <div ref={processRef} className="bg-white p-2">
                  {pricingLevel === 'interior' ? <InteriorDesignProcess isIndividual={isIndividual} /> : <DesignProcessTimeline isIndividual={isIndividual} />}
              </div>
            </div>
          </div>

          {/* AI Idea Generator Section - ONLY SHOWN WHEN INDIVIDUAL IS TRUE */}
          {isIndividual && (
            <section className="w-full bg-white/95 backdrop-blur-xl border-2 border-teal-200 rounded-3xl shadow-2xl p-6 mb-20 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-teal-100 pb-4">
                <div>
                    <h2 className="text-2xl font-black text-teal-700 uppercase flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                      Sáng tạo ý tưởng AI (Chế độ Cá nhân)
                    </h2>
                    <p className="text-sm text-gray-500 font-medium">Gợi ý phương án thiết kế đa dạng không gian theo yêu cầu</p>
                </div>
                
                <div className="flex bg-teal-50 p-1 rounded-xl border border-teal-100">
                    <button 
                      onClick={() => setAiType('exterior')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${aiType === 'exterior' ? 'bg-teal-600 text-white shadow-md' : 'text-teal-700 hover:bg-teal-100'}`}
                    >
                      KIẾN TRÚC
                    </button>
                    <button 
                      onClick={() => setAiType('interior')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${aiType === 'interior' ? 'bg-teal-600 text-white shadow-md' : 'text-teal-700 hover:bg-teal-100'}`}
                    >
                      NỘI THẤT
                    </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1 space-y-4">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Mô tả ý tưởng</label>
                          <textarea 
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder={aiType === 'exterior' ? "VD: Biệt thự phố 3 tầng hiện đại..." : "VD: Phòng khách phong cách Indochine..."}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm h-24 resize-none focus:ring-2 focus:ring-teal-500 shadow-inner"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Tải lên Tone Mood (Nếu có)</label>
                          <div 
                            onClick={() => toneMoodInputRef.current?.click()}
                            className="w-full aspect-video border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-teal-50 transition-colors overflow-hidden"
                          >
                            {toneMoodImage ? (
                              <img src={toneMoodImage} className="w-full h-full object-cover" alt="Mood" />
                            ) : (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 mb-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                                <span className="text-[10px] font-bold text-gray-400">CHỌN ẢNH THAM KHẢO</span>
                              </>
                            )}
                          </div>
                          <input type="file" ref={toneMoodInputRef} onChange={handleToneMoodUpload} accept="image/*" className="hidden" />
                          {toneMoodImage && (
                            <button onClick={() => setToneMoodImage(null)} className="text-[10px] text-red-500 font-bold mt-1 uppercase">Xóa ảnh</button>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest flex justify-between">
                            Số lượng ảnh: <span>{imageCount}</span>
                          </label>
                          <input 
                            type="range" min="1" max="8" value={imageCount} 
                            onChange={(e) => setImageCount(parseInt(e.target.value))} 
                            className="w-full h-2 bg-teal-200 rounded-lg cursor-pointer accent-teal-600"
                          />
                        </div>

                        <button 
                          onClick={handleGenerateAiImages}
                          disabled={isGeneratingImages || (!aiPrompt.trim() && !toneMoodImage)}
                          className="w-full mt-4 bg-teal-600 text-white font-black py-4 rounded-xl hover:bg-teal-700 disabled:bg-gray-300 shadow-lg transition-all flex items-center justify-center gap-3 uppercase"
                        >
                          {isGeneratingImages ? 'Đang sáng tạo...' : 'Tạo các phương án'}
                        </button>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
                        {isGeneratingImages ? (
                          Array(imageCount).fill(null).map((_, i) => (
                            <div key={i} className="aspect-[4/3] bg-gray-50 animate-pulse rounded-2xl flex items-center justify-center border border-gray-100">
                                <svg className="animate-spin h-5 w-5 text-teal-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            </div>
                          ))
                        ) : generatedImages.length > 0 ? (
                          generatedImages.map((img, i) => (
                            <div key={i} className="group relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-md border border-gray-100">
                                <img src={img} alt={`AI Variant ${i+1}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button onClick={() => setPreviewImage(img)} className="bg-white text-teal-700 p-2 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></button>
                                    <button onClick={() => downloadAiImage(img, i)} className="bg-teal-600 text-white p-2 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg></button>
                                </div>
                                <div className="absolute bottom-2 left-2 bg-white/90 text-[10px] px-2 py-0.5 rounded-full font-black">PA {i+1}</div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-300">
                              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                              <p className="text-xs font-bold uppercase tracking-widest">Sẵn sàng sáng tạo ý tưởng mới</p>
                          </div>
                        )}
                    </div>
                  </div>
              </div>
            </section>
          )}
          </>
          )}

          {/* Off-screen compiled poster for 1:2 aspect ratio screenshotting */}
          <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', pointerEvents: 'none' }}>
            <div ref={compiledPosterRef}>
              <CompiledPhonePoster
                totalArea={totalArea}
                pricePerSqm={adjustedPricePerSqm}
                totalCost={adjustedTotalCost}
                tierDescription={result.tierDescription}
                houseType={houseType}
                pricingLevel={pricingLevel}
                clientName={clientName}
                gardenCost={gardenArea ? gardenCost : 0}
                supervisorCost={supervisorCost}
                renovationFee={renovationFee}
                luxuryFee={luxuryFee}
                facadeFee={facadeFee}
                boqCost={boqCost}
                greenBuildingCost={greenBuildingCost}
                redrawFacadeFee={redrawFacadeFee}
                totalBeforeDiscount={subTotal}
                discountAmount={discountAmount}
                discountPercentage={displayDiscountPercentage}
                discountReason={discountReason}
                finalTotalCost={finalTotalCost}
                floors={floors}
                areaInputMode={areaInputMode}
                selectedMiscServices={selectedMiscServices}
                selectedProportions={selectedProportions}
                isIndividual={isIndividual}
                apartmentType={apartmentType}
                isLuxury={isLuxury}
                isRenovation={isRenovation}
                facadeCount={facadeCount}
                isBOQ={isBOQ}
                supervisionPackage={supervisionPackage}
                gardenArea={gardenArea}
                isGreenBuilding={isGreenBuilding}
                isRedrawFacade={isRedrawFacade}
              />
            </div>

            <div ref={posterQuoteRef}>
              <PosterQuote
                totalArea={totalArea}
                pricePerSqm={adjustedPricePerSqm}
                totalCost={adjustedTotalCost}
                tierDescription={result.tierDescription}
                houseType={houseType}
                pricingLevel={pricingLevel}
                clientName={clientName}
                gardenCost={gardenArea ? gardenCost : 0}
                supervisorCost={supervisorCost}
                renovationFee={renovationFee}
                luxuryFee={luxuryFee}
                facadeFee={facadeFee}
                boqCost={boqCost}
                greenBuildingCost={greenBuildingCost}
                redrawFacadeFee={redrawFacadeFee}
                totalBeforeDiscount={subTotal}
                discountAmount={discountAmount}
                discountPercentage={displayDiscountPercentage}
                discountReason={discountReason}
                finalTotalCost={finalTotalCost}
                floors={floors}
                areaInputMode={areaInputMode}
                selectedMiscServices={selectedMiscServices}
                selectedProportions={selectedProportions}
                isIndividual={isIndividual}
                apartmentType={apartmentType}
                isLuxury={isLuxury}
                isRenovation={isRenovation}
                facadeCount={facadeCount}
                isBOQ={isBOQ}
                supervisionPackage={supervisionPackage}
                gardenArea={gardenArea}
                isGreenBuilding={isGreenBuilding}
                isRedrawFacade={isRedrawFacade}
              />
            </div>

            <div ref={posterDeliverablesRef}>
              <PosterDeliverables
                totalArea={totalArea}
                pricePerSqm={adjustedPricePerSqm}
                totalCost={adjustedTotalCost}
                tierDescription={result.tierDescription}
                houseType={houseType}
                pricingLevel={pricingLevel}
                clientName={clientName}
                gardenCost={gardenArea ? gardenCost : 0}
                supervisorCost={supervisorCost}
                renovationFee={renovationFee}
                luxuryFee={luxuryFee}
                facadeFee={facadeFee}
                boqCost={boqCost}
                greenBuildingCost={greenBuildingCost}
                redrawFacadeFee={redrawFacadeFee}
                totalBeforeDiscount={subTotal}
                discountAmount={discountAmount}
                discountPercentage={displayDiscountPercentage}
                discountReason={discountReason}
                finalTotalCost={finalTotalCost}
                floors={floors}
                areaInputMode={areaInputMode}
                selectedMiscServices={selectedMiscServices}
                selectedProportions={selectedProportions}
                isIndividual={isIndividual}
                apartmentType={apartmentType}
                isLuxury={isLuxury}
                isRenovation={isRenovation}
                facadeCount={facadeCount}
                isBOQ={isBOQ}
                supervisionPackage={supervisionPackage}
                gardenArea={gardenArea}
                isGreenBuilding={isGreenBuilding}
                isRedrawFacade={isRedrawFacade}
              />
            </div>

            <div ref={posterProcessRef}>
              <PosterProcess
                totalArea={totalArea}
                pricePerSqm={adjustedPricePerSqm}
                totalCost={adjustedTotalCost}
                tierDescription={result.tierDescription}
                houseType={houseType}
                pricingLevel={pricingLevel}
                clientName={clientName}
                gardenCost={gardenArea ? gardenCost : 0}
                supervisorCost={supervisorCost}
                renovationFee={renovationFee}
                luxuryFee={luxuryFee}
                facadeFee={facadeFee}
                boqCost={boqCost}
                greenBuildingCost={greenBuildingCost}
                redrawFacadeFee={redrawFacadeFee}
                totalBeforeDiscount={subTotal}
                discountAmount={discountAmount}
                discountPercentage={displayDiscountPercentage}
                discountReason={discountReason}
                finalTotalCost={finalTotalCost}
                floors={floors}
                areaInputMode={areaInputMode}
                selectedMiscServices={selectedMiscServices}
                selectedProportions={selectedProportions}
                isIndividual={isIndividual}
                apartmentType={apartmentType}
                isLuxury={isLuxury}
                isRenovation={isRenovation}
                facadeCount={facadeCount}
                isBOQ={isBOQ}
                supervisionPackage={supervisionPackage}
                gardenArea={gardenArea}
                isGreenBuilding={isGreenBuilding}
                isRedrawFacade={isRedrawFacade}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
