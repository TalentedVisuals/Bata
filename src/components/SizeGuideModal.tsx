import React from 'react';
import { X, Ruler, CheckCircle } from '@phosphor-icons/react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sizeTable = [
    { eu: 38, uk: 5, us: 6, cm: 24.0, inches: '9.4"' },
    { eu: 39, uk: 6, us: 6.5, cm: 24.5, inches: '9.6"' },
    { eu: 40, uk: 6.5, us: 7.5, cm: 25.0, inches: '9.8"' },
    { eu: 41, uk: 7.5, us: 8.5, cm: 26.0, inches: '10.2"' },
    { eu: 42, uk: 8, us: 9, cm: 26.5, inches: '10.4"' },
    { eu: 43, uk: 9, us: 10, cm: 27.5, inches: '10.8"' },
    { eu: 44, uk: 9.5, us: 10.5, cm: 28.0, inches: '11.0"' },
    { eu: 45, uk: 10.5, us: 11.5, cm: 29.0, inches: '11.4"' },
    { eu: 46, uk: 11.5, us: 12.5, cm: 29.5, inches: '11.6"' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#2B1518]/20 my-auto p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          aria-label="Close size guide"
        >
          <X size={20} weight="regular" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-xs font-sans font-medium text-[#B08D57] uppercase tracking-wider">
            <Ruler size={14} weight="regular" />
            <span>Find Your Exact Fit</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2B1518] font-normal mt-1">
            Shoe Size Conversion Guide
          </h2>
          <p className="text-xs sm:text-sm font-sans text-[#2B1518]/70 mt-1">
            In Nigeria, most shoes use European (EU) sizes (like 42, 43, 44). Check your exact UK and CM match below.
          </p>
        </div>

        {/* Conversion Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#FAF7F2] text-[#2B1518] font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">EU Size (Standard)</th>
                <th className="py-3 px-4">UK Size</th>
                <th className="py-3 px-4">US Size</th>
                <th className="py-3 px-4">Foot Length (cm)</th>
                <th className="py-3 px-4">Inches</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sizeTable.map((row) => (
                <tr key={row.eu} className="hover:bg-[#E8DCC8]/30 transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-[#B08D57]">EU {row.eu}</td>
                  <td className="py-2.5 px-4 text-[#2B1518]">{row.uk}</td>
                  <td className="py-2.5 px-4 text-[#2B1518]">{row.us}</td>
                  <td className="py-2.5 px-4 text-[#2B1518]">{row.cm} cm</td>
                  <td className="py-2.5 px-4 text-slate-500">{row.inches}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Practical tips for Nigerian shoe buyers */}
        <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#B08D57]/20 space-y-2.5 font-sans">
          <h4 className="text-xs font-sans font-medium text-[#B08D57] uppercase tracking-wider">
            Simple Tips to Get the Right Shoe Fit:
          </h4>
          <div className="space-y-2 text-xs text-[#2B1518]/85">
            <p className="flex items-start gap-2">
              <CheckCircle size={15} weight="regular" className="text-[#B08D57] shrink-0 mt-0.5" />
              <span>
                <strong>For Leather Slides & Slippers:</strong> If your normal sneakers size is 43, pick 42 for our handmade leather slides so it fits snug without your heel hanging.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle size={15} weight="regular" className="text-[#B08D57] shrink-0 mt-0.5" />
              <span>
                <strong>For Broad Feet:</strong> If you have wide feet or high instep, you can choose your normal size and send a note in WhatsApp so we widen the strap during lasting.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle size={15} weight="regular" className="text-[#B08D57] shrink-0 mt-0.5" />
              <span>
                <strong>Free Size Exchange:</strong> If a delivered pair does not fit your foot, contact us within 48 hours on WhatsApp and we will swap it for you!
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#2B1518] text-[#E8DCC8] border border-[#B08D57]/30 text-xs font-sans font-semibold hover:bg-[#3F2024] transition-colors cursor-pointer"
          >
            Got It, Back to Shoes
          </button>
        </div>
      </div>
    </div>
  );
};
