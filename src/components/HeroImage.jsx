import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { MapPin } from 'lucide-react';

// Curated Unsplash images for each month (highly polished landscape/nature)
const monthImages = [
  { id: "photo-1548625361-ec6be99c0aa0", location: "Banff National Park, Canada", author: "Colter Olmstead" }, // January (Snow)
  { id: "photo-1478719059408-592965723cbc", location: "Lofoten, Norway", author: "John O'Nolan" }, // February (Ice)
  { id: "photo-1469474968028-56623f02e42e", location: "Yosemite Valley, USA", author: "Bailey Zindel" }, // March (Spring start)
  { id: "photo-1464822759023-fed622ff2c3b", location: "Mount Fuji, Japan", author: "David Edelstein" }, // April (Blossoms/Mountain)
  { id: "photo-1501854140801-50d01698950b", location: "Grindelwald, Switzerland", author: "Andreas Gücklhorn" }, // May (Green valley)
  { id: "photo-1507525428034-b723cf961d3e", location: "Maldives", author: "Sean O." }, // June (Summer beach)
  { id: "photo-1597848212624-a19eb35e265c", location: "Tuscany, Italy", author: "Zdeněk Macháček" }, // July (Sunflowers)
  { id: "photo-1470770903672-7eca1b0d079f", location: "Lake Bled, Slovenia", author: "Kari Shea" }, // August (Summer lake)
  { id: "photo-1476820865390-c52aeebb9891", location: "Kyoto, Japan", author: "Ricardo Gomez Angel" }, // September (Autumn begins)
  { id: "photo-1508614999368-9260051292e5", location: "Vermont, USA", author: "Jeremy Thomas" }, // October (Fall colors)
  { id: "photo-1447752875215-b2761acb3c5d", location: "Black Forest, Germany", author: "Paul Bulai" }, // November (Misty woods)
  { id: "photo-1512915922686-57c11dde9b6b", location: "Lapland, Finland", author: "Roberto Nickson" }, // December (Cozy cabin)
];

const HeroImage = ({ currentDate }) => {
  const monthIndex = currentDate.getMonth();
  const currentImage = monthImages[monthIndex];
  
  // Construct the Unsplash image URL with formatting
  const imageUrl = `https://images.unsplash.com/${currentImage.id}?auto=format&fit=crop&w=1600&q=80`;

  return (
    <div className="relative w-full h-64 md:h-80 xl:h-full rounded-3xl overflow-hidden shadow-lg group">
      <AnimatePresence mode="wait">
        <motion.img
          key={monthIndex}
          src={imageUrl}
          alt={`Landscape for ${format(currentDate, "MMMM")}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Elegant Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      
      {/* Information Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 xl:p-8 flex flex-col xl:flex-row justify-between items-end">
        <div>
           <motion.h1 
             key={`title-${monthIndex}`}
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="text-4xl xl:text-6xl font-bold text-white tracking-tight mb-2 drop-shadow-md"
           >
             {format(currentDate, "MMMM")}
           </motion.h1>
           <motion.div
             key={`loc-${monthIndex}`}
             initial={{ y: 10, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.5, delay: 0.3 }}
             className="flex items-center text-white/90 font-medium"
           >
              <MapPin size={18} className="mr-1.5 opacity-80" />
              {currentImage.location}
           </motion.div>
        </div>
        
        <motion.div 
           key={`author-${monthIndex}`}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.5, delay: 0.4 }}
           className="hidden xl:block text-white/60 text-sm"
        >
          Photo by {currentImage.author}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroImage;
