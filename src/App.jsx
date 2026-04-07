import React, { useState } from 'react';
import CalendarGrid from './components/CalendarGrid';
import HeroImage from './components/HeroImage';
import NotesSidebar from './components/NotesSidebar';
import { Calendar as CalendarIcon } from 'lucide-react';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-primary-200">
      
      {/* Dynamic ambient background based on month - subtle */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header / Logo */}
        <div className="w-full flex justify-between items-center mb-6 px-2">
          <div className="flex items-center space-x-2 text-neutral-800">
             <div className="p-2 bg-white rounded-xl shadow-sm border border-neutral-200">
                <CalendarIcon size={24} className="text-primary-600" />
             </div>
             <span className="text-xl font-bold tracking-tight">Lumina Calendar</span>
          </div>
          
          <div className="flex items-center space-x-4">
             {selectedRange.start && (
               <button 
                 onClick={() => setSelectedRange({ start: null, end: null })}
                 className="text-sm font-medium text-neutral-500 hover:text-neutral-800 transition-colors bg-white px-3 py-1.5 rounded-full shadow-sm border border-neutral-200"
               >
                 Clear Selection
               </button>
             )}
             <button 
                onClick={() => setCurrentDate(new Date())}
                className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors bg-primary-50 px-3 py-1.5 rounded-full shadow-sm border border-primary-100"
              >
                Today
              </button>
          </div>
        </div>

        {/* Main Interface Layout */}
        {/* On desktop: 12 col grid. Left column 4 (hero + notes), Right column 8 (calendar) */}
        {/* On mobile: Flex column */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 h-auto lg:h-[80vh] min-h-[700px] max-h-[1000px]">
          
          {/* Left Column */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-6 lg:gap-8 h-full order-1 lg:order-none">
            {/* Hero Image Block */}
            <div className="w-full h-64 lg:flex-1 min-h-[250px] shadow-sm rounded-3xl">
              <HeroImage currentDate={currentDate} />
            </div>

            {/* Notes Block */}
            <div className="w-full h-80 lg:flex-1 min-h-[300px]">
              <NotesSidebar currentDate={currentDate} selectedRange={selectedRange} />
            </div>
          </div>

          {/* Right Column (Calendar Grid) */}
          <div className="lg:col-span-8 xl:col-span-9 h-[600px] lg:h-full order-2 lg:order-none">
            <CalendarGrid 
              currentDate={currentDate} 
              setCurrentDate={setCurrentDate} 
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
