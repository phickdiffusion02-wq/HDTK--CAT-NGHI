
import React from 'react';

interface DesignProcessTimelineProps {
    isIndividual?: boolean;
}

const getTimelineData = (isIndividual: boolean) => [
    {
        step: 1,
        title: 'THIẾT KẾ MẶT BẰNG & PHỐI CẢNH NGOẠI THẤT',
        duration: '(2-5 ngày/ lần chỉnh sửa)',
        details: [
            'Thời gian theo sự phối hợp giữa CĐT và KTS.',
            'Phương án bố trí mặt bằng + thiết kế phối cảnh ngoại thất phù hợp với nhu cầu của Khách Hàng, phù hợp với thực tế công trình là cực kỳ quan trọng ảnh hưởng đến toàn bộ công tác thiết kế sau này.',
            'Vì vậy, CĐT và KTS nếu không thật sự kỹ lưỡng trong giai đoạn này thì gần như thiết kế phải chỉnh sửa nhiều, ảnh hưởng đến thời gian và công sức của cả hai bên.',
        ],
    },
    {
        step: 2,
        title: 'TRIỂN KHAI CHI TIẾT HỒ SƠ THIẾT KẾ & PHỐI CẢNH 3D NỘI THẤT',
        duration: '(Gói cao cấp)',
        details: [
            'Thời gian thực hiện : 20 ngày',
            `${isIndividual ? 'KTS' : 'CÁT NGHI Interior'} sẽ triển khai toàn bộ chi tiết của hồ sơ thiết kế trong thời gian 20 ngày và bàn giao hồ sơ đợt 1 cho CĐT ( Khối lượng thực hiện gần 90% theo Hợp Đồng).`,
            'Với các Hợp Đồng thiết kế gói cao cấp thì giai đoạn này chỉ bàn giao toàn bộ phối cảnh 3D nội thất, chưa bao gồm chi tiết nội thất.',
        ],
    },
    {
        step: 3,
        title: 'CĐT CHỈNH SỬA HỒ SƠ THIẾT KẾ',
        duration: '',
        details: [
            'Thời gian thực hiện : Theo kế hoạch làm việc của CĐT.',
            `Sau khi bàn giao HS đợt 1 cho CĐT, CĐT sẽ xem xét toàn bộ Hồ Sơ thiết kế và phản hồi lại ${isIndividual ? 'để' : 'cho CÁT NGHI Interior'} tiến hành chỉnh sửa.`,
        ],
    },
    {
        step: 4,
        title: 'HOÀN THIỆN HỒ SƠ THIẾT KẾ VÀ BÀN GIAO HỒ SƠ THIẾT KẾ KIẾN TRÚC',
        duration: '',
        details: [
            'Thời gian thực hiện : 05 ngày.',
            `Sau khi nhận lại Hồ Sơ đợt 1 và các phản hồi của CĐT, ${isIndividual ? 'KTS' : 'CÁT NGHI Interior'} sẽ tiến hành chỉnh sửa các chi tiết theo yêu cầu của CĐT và bàn giao chính thức Hồ Sơ Thiết kế phần Kiến Trúc cho CĐT.`,
        ],
    },
    {
        step: 5,
        title: 'HOÀN THIỆN HỒ SƠ THIẾT KẾ VÀ BÀN GIAO HỒ SƠ THIẾT KẾ PHẦN NỘI THẤT',
        duration: '(Gói cao cấp)',
        details: [
            'Thời gian thực hiện : 15 ngày.',
            'Đối với các hợp đồng thiết kế gói cao cấp thì thời gian chỉnh sửa phần Nội Thất sau khi nhận được phản hồi từ phía CĐT lâu hơn một chút – Khoảng 15 ngày.',
            'Hồ sơ thiết kế Nội Thất sẽ là hồ sơ riêng biệt so với hồ sơ thiết kế kiến trúc.',
        ],
    },
    {
        step: 6,
        title: 'HOÀN THIỆN CÁC HẠNG MỤC PHỤ - NẾU CÓ',
        duration: '',
        details: [
            'Thời gian thực hiện : 05 ngày.',
            `Sau khi bàn giao đầy đủ các hồ sơ thiết kế, ${isIndividual ? 'KTS' : 'CÁT NGHI Interior'} sẽ tiến hành thực hiện các hạng mục phụ theo Hợp Đồng ( Nếu có ): Dự Toán, bản vẽ xin phép, PCCC…`,
        ],
    },
];

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-2xl font-bold text-center text-teal-700 pb-4 mb-8 border-b border-teal-200 uppercase">
        {children}
    </h2>
);

const TimelineStep: React.FC<{ step: number; title: string; duration: string; details: string[] }> = ({ step, title, duration, details }) => (
    <div className="flex items-start space-x-4 md:space-x-6">
        <div className="flex-shrink-0 bg-teal-600 text-white font-bold rounded-md px-4 py-1.5 mt-1 shadow-md">
            Bước {step}
        </div>
        <div className="border-l-2 border-teal-200 pl-4 md:pl-6 w-full">
            <h3 className="text-md font-bold text-gray-900 -mt-1">{title} <span className="font-normal text-gray-600">{duration}</span></h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 font-medium">
                {details.map((text, index) => (
                    <li key={index} className="flex items-start">
                        <span className="text-teal-500 mr-2 mt-1 font-bold">&#9679;</span>
                        <span>{text}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);


export const DesignProcessTimeline: React.FC<DesignProcessTimelineProps> = ({ isIndividual = false }) => {
    const timelineData = getTimelineData(isIndividual);
    return (
        <section className="bg-teal-50/95 backdrop-blur-xl border border-teal-200 rounded-2xl shadow-xl text-gray-900 font-sans p-6 sm:p-8">
            <SectionTitle>QUY TRÌNH THIẾT KẾ (Dự kiến)</SectionTitle>
            <div className="space-y-8">
                {timelineData.map((item) => (
                    <TimelineStep key={item.step} {...item} />
                ))}
            </div>
        </section>
    );
};
