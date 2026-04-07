import React from 'react';
import { 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, format, isSameMonth, isSameDay, 
  isWithinInterval, isBefore, isAfter, isToday 
} from 'date-fns';
import { cn } from '../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarGrid = ({ 
  currentDate, 
  setCurrentDate, 
  selectedRange, 
  setSelectedRange 
}) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Handle Day Click
  const onDateClick = (day) => {
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: day, end: null });
    } else if (selectedRange.start && !selectedRange.end) {
      if (isBefore(day, selectedRange.start)) {
        // If selected day is before start, swap them
        setSelectedRange({ start: day, end: selectedRange.start });
      } else {
        setSelectedRange({ start: selectedRange.start, end: day });
      }
    }
  };

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  // Determine styles for highlighted ranges
  const isSelectedStart = (day) => selectedRange.start && isSameDay(day, selectedRange.start);
  const isSelectedEnd = (day) => selectedRange.end && isSameDay(day, selectedRange.end);
  const isWithinSelection = (day) => {
    if (selectedRange.start && selectedRange.end) {
      return isWithinInterval(day, { start: selectedRange.start, end: selectedRange.end }) && 
             !isSameDay(day, selectedRange.start) && 
             !isSameDay(day, selectedRange.end);
    }
    return false;
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden flex flex-col h-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-100 bg-neutral-50/50">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-800">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-neutral-200 transition-colors text-neutral-600"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-neutral-200 transition-colors text-neutral-600"
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 border-b border-neutral-100">
        {weekDays.map((col, i) => (
          <div key={i} className="py-4 text-center text-xs font-semibold uppercase tracking-wider text-neutral-500">
            {col}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 flex-1">
        {days.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelected = isSelectedStart(day) || isSelectedEnd(day);
          const isRanged = isWithinSelection(day);
          const isTodayDate = isToday(day);

          return (
            <div
              key={day.toString()}
              onClick={() => onDateClick(day)}
              className={cn(
                "relative min-h-[4rem] sm:min-h-[6rem] p-1 flex justify-center items-start pt-2 sm:pt-4 border-r border-b border-neutral-50 cursor-pointer transition-colors group",
                !isCurrentMonth ? "bg-neutral-50/50" : "hover:bg-neutral-50",
                isRanged && "bg-primary-50 hover:bg-primary-100"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-sm sm:text-base font-medium z-10 transition-all",
                  !isCurrentMonth && "text-neutral-400",
                  isCurrentMonth && !isSelected && !isTodayDate && "text-neutral-700",
                  isTodayDate && !isSelected && "bg-neutral-800 text-white shadow-md",
                  isSelected && "bg-primary-600 text-white shadow-lg scale-110",
                  !isSelected && "group-hover:scale-110"
                )}
              >
                {format(day, dateFormat)}
              </div>
              
              {/* Range Connection Background Highlights */}
              {isSelectedStart(day) && selectedRange.end && (
                 <div className="absolute top-0 right-0 bottom-0 left-1/2 bg-primary-50 z-0"></div>
              )}
              {isSelectedEnd(day) && selectedRange.start && (
                 <div className="absolute top-0 left-0 bottom-0 right-1/2 bg-primary-50 z-0"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
