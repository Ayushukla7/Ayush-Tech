import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  X, 
  Printer, 
  Download, 
  ExternalLink,
  FileCheck
} from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

export default function ResumeModal({ isOpen, onClose }) {
  const [isRendered, setIsRendered] = useState(false);
  const sheetRef = useRef(null);
  const backdropRef = useRef(null);

  // Smooth slide-up transition when opening, slide-down when closing
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      requestAnimationFrame(() => {
        if (backdropRef.current && sheetRef.current) {
          gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
          gsap.fromTo(sheetRef.current, 
            { y: '100%', opacity: 0.8 }, 
            { y: '0%', opacity: 1, duration: 0.45, ease: 'power4.out' }
          );
        }
      });
    }
  }, [isOpen]);

  const handleSmoothClose = () => {
    playTacticalClick();
    if (backdropRef.current && sheetRef.current) {
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.25 });
      gsap.to(sheetRef.current, {
        y: '100%',
        duration: 0.35,
        ease: 'power3.in',
        onComplete: () => {
          setIsRendered(false);
          onClose();
        }
      });
    } else {
      onClose();
    }
  };

  const handlePrint = () => {
    playTacticalClick();
    window.print();
  };

  if (!isOpen && !isRendered) return null;

  return (
    <div 
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl overflow-hidden select-none"
      onClick={handleSmoothClose}
    >
      {/* SLIDING COMMAND CONTAINER */}
      <div 
        ref={sheetRef}
        className="relative w-full max-w-6xl bg-[#0e0f12] border-t-2 sm:border-2 border-[#ccff00]/60 shadow-[8px_8px_0px_#ccff00] flex flex-col h-[96vh] sm:h-[92vh] overflow-hidden will-change-transform"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ========================================================================= */}
        {/* TOP COMMAND BAR (ACID BRUTALIST RESUME CONTROLS) */}
        {/* ========================================================================= */}
        <div className="p-3 sm:p-4 border-b border-[#2a2d39] flex flex-wrap items-center justify-between gap-3 bg-[#14161c] z-20 font-mono text-xs">
          
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 bg-[#ccff00] animate-pulse" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-anton text-sm sm:text-base text-[#f4f3ee] uppercase tracking-wider block">
                  OFFICIAL RESUME // AYUSH SHUKLA
                </span>
                <span className="px-2 py-0.5 bg-[#ccff00]/15 border border-[#ccff00] text-[#ccff00] font-mono text-[10px] font-bold">
                  ORIGINAL PDF
                </span>
              </div>
              <span className="text-[10px] text-[#8a8d98] hidden sm:block">
                ABESEC B.TECH CSE (CGPA 7.89) • FULL-STACK MERN ARCHITECT
              </span>
            </div>
          </div>

          {/* ACTIONS: DOWNLOAD PDF, OPEN IN NEW WINDOW, PRINT, CLOSE */}
          <div className="flex items-center space-x-2">
            
            {/* Direct PDF Download button */}
            <a
              href="/Ayush_Shukla_Resume.pdf"
              download="Ayush_Shukla_Resume.pdf"
              onClick={playTacticalClick}
              className="px-3.5 py-1.5 bg-[#ccff00] hover:bg-white text-black font-anton text-xs uppercase flex items-center space-x-1.5 transition-all shadow-[2px_2px_0px_#fff]"
              title="Download Original PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            {/* Open in New Window */}
            <a
              href="/Ayush_Shukla_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={playTacticalClick}
              className="p-1.5 bg-[#0e0f12] hover:bg-[#ccff00] hover:text-black text-[#eae7dd] border border-[#2a2d39] hover:border-[#ccff00] transition-all"
              title="Open PDF in New Window"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-[#0e0f12] hover:bg-[#ccff00] hover:text-black text-[#eae7dd] border border-[#2a2d39] hover:border-[#ccff00] transition-all"
              title="Print Document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            {/* Slide Down & Close Button */}
            <button
              onClick={handleSmoothClose}
              className="p-1.5 bg-[#0e0f12] hover:bg-[#ccff00] hover:text-black border border-[#2a2d39] hover:border-[#ccff00] text-[#eae7dd] transition-colors"
              title="Slide Down & Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* DIRECT EMBEDDED ORIGINAL PDF VIEWER (FULL RESOLUTION & INTERACTIVE LINKS) */}
        {/* ========================================================================= */}
        <div className="flex-1 w-full h-full bg-[#0a0b0e] p-2 sm:p-4 flex flex-col overflow-hidden">
          <div className="w-full flex-1 rounded-none border border-[#2a2d39] bg-[#14161c] overflow-hidden relative">
            <iframe
              src="/Ayush_Shukla_Resume.pdf#view=FitH"
              className="w-full h-full border-0 rounded-none bg-white"
              title="Ayush Shukla Official Resume PDF"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
