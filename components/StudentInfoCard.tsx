import React, { useState, useRef } from 'react';
import { Student } from '../types';
import { EyeIcon } from './icons/EyeIcon';
import { EyeOffIcon } from './icons/EyeOffIcon';
import { PrintIcon } from './icons/PrintIcon';
import { DownloadIcon } from './icons/DownloadIcon';

// Declare jspdf and html2canvas from global scope (loaded via CDN)
declare const jspdf: any;
declare const html2canvas: any;

interface StudentInfoCardProps {
  student: Student;
}

const InfoRow: React.FC<{ label: string; value: string; isPassword?: boolean; onToggleVisibility?: () => void; isPasswordVisible?: boolean; }> = ({ label, value, isPassword = false, onToggleVisibility, isPasswordVisible }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 print:grid-cols-4">
    <dt className="text-sm font-bold text-gray-500 print:text-gray-600 print:col-span-1">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center justify-between print:text-black print:col-span-3">
      <span className="flex-grow break-all pr-2">
        {isPassword && !isPasswordVisible ? '●●●●●●●●' : value}
      </span>
      {isPassword && (
        <button onClick={onToggleVisibility} className="text-gray-500 hover:text-green-700 focus:outline-none print:hidden">
          {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      )}
    </dd>
  </div>
);

const StudentInfoCard: React.FC<StudentInfoCardProps> = ({ student }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    if (cardRef.current) {
      // Temporarily change text color to black for PDF generation
      const originalColors = new Map<HTMLElement, string>();
      const elements = cardRef.current.querySelectorAll<HTMLElement>('*');
      elements.forEach(el => {
        originalColors.set(el, el.style.color);
        el.style.color = 'black';
      });

      html2canvas(cardRef.current, { scale: 2 }).then((canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = jspdf;
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`student-info-${student.civilId}.pdf`);
        
        // Restore original colors
        elements.forEach(el => {
            const originalColor = originalColors.get(el);
            if (originalColor !== undefined) {
                el.style.color = originalColor;
            }
        });
      });
    }
  };

  return (
    <div className="mt-6 border-t border-gray-200 print:border-t print:border-gray-200">
      <div ref={cardRef} className="bg-transparent p-4 print:p-0">
        <dl className="divide-y divide-gray-200 print:divide-gray-200">
          <InfoRow label="الاسم الكامل" value={student.fullName} />
          <InfoRow label="الرقم المدني" value={student.civilId} />
          <InfoRow label="البريد الإلكتروني" value={student.email} />
          <InfoRow 
            label="كلمة المرور" 
            value={student.password}
            isPassword={true}
            isPasswordVisible={isPasswordVisible}
            onToggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        </dl>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 print:hidden">
        <button 
          onClick={handlePrint}
          className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-green-500"
        >
          <PrintIcon />
          <span className="mr-2">طباعة</span>
        </button>
        <button 
          onClick={handleDownloadPdf}
          className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-green-500"
        >
          <DownloadIcon />
          <span className="mr-2">تنزيل PDF</span>
        </button>
      </div>
    </div>
  );
};

export default StudentInfoCard;