
import React from 'react';

interface InteriorDesignProcessProps {
    isIndividual?: boolean;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-2xl font-bold text-center text-teal-700 pb-4 mb-8 border-b border-teal-200 uppercase">
        {children}
    </h2>
);

const FlowNode: React.FC<{ children: React.ReactNode; variant?: 'teal' | 'navy'; className?: string }> = ({ children, variant = 'teal', className = '' }) => {
    const baseClasses = "font-semibold rounded-md shadow-lg p-3 text-center text-sm w-48";
    const variantClasses = {
        teal: "bg-teal-600 text-white border border-teal-700",
        navy: "bg-indigo-900 text-white border border-indigo-700"
    };
    return <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>{children}</div>;
};

const VerticalConnector: React.FC<{ short?: boolean }> = ({ short = false }) => (
    <div className={`flex flex-col items-center ${short ? 'my-1' : 'my-2'}`}>
        <div className="w-0.5 h-4 bg-teal-400"></div>
        <div className="w-3 h-3 rounded-full bg-teal-500 shadow-md border-2 border-white"></div>
        <div className="w-0.5 h-4 bg-teal-400"></div>
    </div>
);

const CheckIcon = () => (
    <svg className="w-10 h-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CrossIcon = () => (
    <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const InteriorDesignProcess: React.FC<InteriorDesignProcessProps> = ({ isIndividual = false }) => {
    return (
        <section className="bg-teal-50/95 backdrop-blur-xl border border-teal-200 rounded-2xl shadow-xl text-gray-900 font-sans p-6 sm:p-8">
            <SectionTitle>QUY TRÌNH THIẾT KẾ NỘI THẤT</SectionTitle>
            
            <div className="flex flex-col items-center space-y-0">
                <FlowNode>TIẾP NHẬN THÔNG TIN CDT</FlowNode>
                <VerticalConnector />
                <FlowNode>KHẢO SÁT THỰC TẾ</FlowNode>

                {/* --- Branching --- */}
                <div className="w-full max-w-lg flex flex-col items-center relative my-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500 z-10 border-2 border-white"></div>
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-teal-400"></div>
                    <div className="absolute top-1/2 left-1/2 w-0.5 h-6 -translate-y-1/2 bg-teal-400 -mt-3"></div>
                    
                    <div className="w-full flex justify-between items-start mt-4">
                        <div className="flex flex-col items-center w-1/2">
                            <div className="w-0.5 h-4 bg-teal-400"></div>
                             <p className="text-xs text-center text-gray-600 font-bold mb-2">Khách Hàng Chưa Có Bản Vẽ</p>
                            <FlowNode variant="navy">CHỤP HÌNH, ĐO ĐẠC HIỆN TRẠNG</FlowNode>
                        </div>
                        <div className="flex flex-col items-center w-1/2">
                             <div className="w-0.5 h-4 bg-teal-400"></div>
                            <p className="text-xs text-center text-gray-600 font-bold mb-2">Khách Hàng Có Bản Vẽ</p>
                            <FlowNode variant="navy">KHÁCH HÀNG GỬI THÔNG TIN</FlowNode>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-1/4 w-0.5 h-6 bg-teal-400 translate-y-full"></div>
                    <div className="absolute bottom-0 right-1/4 w-0.5 h-6 bg-teal-400 translate-y-full"></div>
                    <div className="absolute bottom-0 left-1/4 w-1/2 h-0.5 bg-teal-400 translate-y-[24px]"></div>
                </div>

                <div className="h-12"></div>
                
                <VerticalConnector short />
                <FlowNode>VẼ LAYOUT</FlowNode>
                <VerticalConnector />
                <FlowNode>THỎA THUẬN VÀ BÁO GIÁ</FlowNode>
                <VerticalConnector />
                <FlowNode>KÍ HỢP ĐỒNG THIẾT KẾ</FlowNode>

                {/* --- Decision Point --- */}
                <div className="w-full max-w-lg flex flex-col items-center relative my-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500 z-10 border-2 border-white"></div>
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-teal-400"></div>

                    <div className="w-full flex justify-between items-start mt-4">
                        <div className="flex flex-col items-center w-1/2 space-y-2">
                            <div className="w-0.5 h-4 bg-teal-400"></div>
                            <CheckIcon />
                            <p className="font-bold text-gray-800">ĐỒNG Ý</p>
                        </div>
                         <div className="flex flex-col items-center w-1/2 space-y-2">
                            <div className="w-0.5 h-4 bg-teal-400"></div>
                            <CrossIcon />
                            <p className="font-bold text-gray-800">KHÔNG ĐỒNG Ý</p>
                            <div className="relative text-center">
                                <div className="w-0.5 h-4 bg-teal-400"></div>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-4 h-4 border-l-2 border-t-2 border-teal-400 -mb-4 transform rotate-45"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* --- Agreed Path --- */}
                <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-teal-400 -mt-2"></div>
                    <VerticalConnector />
                     <FlowNode variant="navy" className="bg-teal-700 border-teal-800">THIẾT KẾ - HOÀN CHỈNH HỒ SƠ</FlowNode>
                    <VerticalConnector />
                    <FlowNode variant="teal">BÀN GIAO THIẾT KẾ</FlowNode>
                </div>

            </div>
        </section>
    );
};
