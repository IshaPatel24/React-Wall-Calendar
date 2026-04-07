import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Edit2, Save, Trash2 } from 'lucide-react';

const NotesSidebar = ({ currentDate, selectedRange }) => {
  const [note, setNote] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [savedNotes, setSavedNotes] = useState({});

  // Generate a unique key for the current context (either month, or specific date range)
  const getNoteKey = () => {
    if (selectedRange.start && selectedRange.end) {
      return `note-${format(selectedRange.start, 'yyyy-MM-dd')}-to-${format(selectedRange.end, 'yyyy-MM-dd')}`;
    } else if (selectedRange.start) {
      return `note-${format(selectedRange.start, 'yyyy-MM-dd')}`;
    } else {
      return `note-${format(currentDate, 'yyyy-MM')}-overview`;
    }
  };

  const currentKey = getNoteKey();

  // Load notes on component mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('wall-calendar-notes');
      if (stored) {
        setSavedNotes(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error loading notes", e);
    }
  }, []);

  // Update text area when the selection context changes
  useEffect(() => {
    setNote(savedNotes[currentKey] || '');
    setIsEditing(false); // Reset to view mode on context change
  }, [currentKey, savedNotes]);

  const handleSave = () => {
    const updatedNotes = { ...savedNotes, [currentKey]: note };
    setSavedNotes(updatedNotes);
    localStorage.setItem('wall-calendar-notes', JSON.stringify(updatedNotes));
    setIsEditing(false);
  };

  const handleDelete = () => {
    const updatedNotes = { ...savedNotes };
    delete updatedNotes[currentKey];
    setNote('');
    setSavedNotes(updatedNotes);
    localStorage.setItem('wall-calendar-notes', JSON.stringify(updatedNotes));
    setIsEditing(false);
  };

  // Determine the title of the notes section based on context
  let sectionTitle = format(currentDate, "MMMM") + " Notes";
  if (selectedRange.start && selectedRange.end) {
    sectionTitle = `${format(selectedRange.start, 'MMM do')} - ${format(selectedRange.end, 'MMM do')}`;
  } else if (selectedRange.start) {
    sectionTitle = format(selectedRange.start, 'MMMM do, yyyy');
  }

  const hasExistingNote = !!savedNotes[currentKey] && savedNotes[currentKey].trim().length > 0;

  return (
    <div className="w-full bg-[#fdfaf6] rounded-3xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col h-full relative">
      {/* Tape decoration for aesthetic */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-8 bg-white/40 border border-white/60 shadow-sm backdrop-blur-md rotate-1 z-10" 
           style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)", clipPath: "polygon(0 5%, 100% 0, 95% 100%, 2% 95%)" }}></div>

      <div className="px-6 py-6 border-b border-red-200/60 flex items-center justify-between bg-[#fdfaf6] pt-8">
        <h3 className="font-semibold text-neutral-800 flex items-center">
          <Edit2 size={16} className="mr-2 text-primary-500" />
          {sectionTitle}
        </h3>
        {isEditing ? (
          <div className="flex space-x-2">
             <button onClick={handleDelete} className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors bg-white rounded-md shadow-sm border border-neutral-100"><Trash2 size={16}/></button>
             <button onClick={handleSave} className="p-1.5 text-primary-600 hover:text-primary-700 transition-colors bg-white rounded-md shadow-sm border border-neutral-100 bg-primary-50"><Save size={16}/></button>
          </div>
        ) : (
          <button 
             onClick={() => setIsEditing(true)} 
             className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg shadow-sm hover:bg-neutral-50"
          >
             {hasExistingNote ? 'Edit Notes' : 'Add Note'}
          </button>
        )}
      </div>

      <div className="flex-1 p-0 bg-[#fdfaf6] relative">
        {/* Lined paper effect using custom global style */}
        <div className="absolute inset-0 notepad-lines pointer-events-none opacity-50 z-0"></div>
        
        {/* Red margin line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-red-200/80 z-0"></div>
        <div className="absolute left-7 top-0 bottom-0 w-px bg-red-200/80 z-0"></div>

        {isEditing ? (
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Type your notes here..."
            className="w-full h-full p-6 pl-12 bg-transparent resize-none outline-none leading-[32px] text-neutral-700 font-medium z-10 relative"
            style={{ lineHeight: '32px' }}
            autoFocus
          />
        ) : (
          <div 
             className="w-full h-full p-6 pl-12 overflow-y-auto z-10 relative text-neutral-700 font-medium whitespace-pre-wrap cursor-text"
             style={{ lineHeight: '32px' }}
             onClick={() => setIsEditing(true)}
          >
            {hasExistingNote ? (
              note
            ) : (
              <span className="text-neutral-400 italic">No notes for this selection. Click to add...</span>
            )}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default NotesSidebar;
