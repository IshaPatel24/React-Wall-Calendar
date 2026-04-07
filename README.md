# 📅 Lumina Interactive Wall Calendar

![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

A meticulously designed, interactive web-based wall calendar component that brings the premium aesthetic of physical wall calendars into the digital space. 

## 🚀 Live Demo

https://react-wall-calendar-yxnd.vercel.app/

## 🛠 Tech Stack

*   **Framework**: React 19 (via Vite)
*   **Styling**: Tailwind CSS v4
*   **Storage**: Browser `localStorage` (No backend required)
*   **Libraries**: `date-fns` for date manipulation, `framer-motion` for fluid page animations, `lucide-react` for clean iconography.

## ✨ Features

*   **Wall Calendar Aesthetic**: Multi-layered, structured design featuring a curated Unsplash hero image that changes with every month to set a beautiful seasonal mood.
*   **Day Range Selector**: Intuitive day selection logic. Click a start date and an end date to instantly generate a visually connected range highlight directly on the grid.
*   **Smart Notes Section**: A beautifully contextual, lined notepad that dynamically switches between "Month Overview" notes and "Specific Range" notes based on your active calendar selection.
*   **Fully Responsive**:
    *   *Desktop*: An immersive side-by-side dashboard layout balancing the imagery and grid.
    *   *Mobile*: A polished vertical stacking order optimized for touch interactions.
*   **Month Navigation**: Smooth previous/next navigation augmented by elegant Framer Motion slide-and-fade transition effects.
*   **Holiday Markers**: Support for visual markers highlighting the current day and selected ranges reliably.
*   **Data Persistence**: Seamless, silent saving to the browser's `localStorage` means your notes are never lost on reload.

## 🏁 Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm (v9 or higher)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/IshaPatel24/React-Wall-Calendar.git
    cd React-Wall-Calendar
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the local development server:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173` in your browser to view the application!

## 💡 How to Use

1.  **Navigate Months**: Click the `<` and `>` arrow icons in the top right corner of the calendar grid to move between months. Watch the hero image automatically adapt!
2.  **Select a Date Range**: Click once on the date you want to start from, and click a second date to set the end of your range. The calendar natively highlights the connection.
3.  **Add Notes**: With a date range selected, look at the Notes Sidebar. Click "Add Note" (or click directly on the lined paper) to open the editor. Type your thoughts and click the Save icon when done. 
4.  **Month Overview Notes**: To write a general monthly note, simply click "Clear Selection" at the top and type in the blank slate for that month.

## 🧠 Design Decisions

*   **Layout Strategy**: I prioritized a visual hierarchy mimicking physical calendars, granting significant screen real estate to the rotating hero imagery on desktop to create a "wow" factor, while keeping the main grid highly legible and spacious. 
*   **State Management Approach**: Utilizing React's native hook state architecture (`useState`, `useEffect`) was optimal over relying on complex state managers like Redux or Zustand given the scoped nature of the application. The state is strictly tied to `currentDate` and `selectedRange`, propagating cleanly down to functional child components.
*   **Responsive Strategy**: Built "mobile-first" with Tailwind, ensuring that the critical vertical stacking allows touch-users to see the hero, check the calendar, and view notes efficiently, prior to expanding into a robust 12-column CSS Grid layout for large monitors.
*   **Library Integrations**: Selected `date-fns` for its extremely modular, tree-shakeable structure rather than monolithic monolithic libraries, keeping bundle sizes low and performance snappy.

## 📸 Screenshots
Web View Placeholder
<img width="1512" height="982" alt="Screenshot 2026-04-07 at 23 59 36" src="https://github.com/user-attachments/assets/babd08a6-f460-4d0a-8ebb-39359ed13ae8" />



Mobile View Placeholder
<img width="1080" height="3920" alt="image" src="https://github.com/user-attachments/assets/fa92c1c1-5156-4e26-81e5-a2a386771f84" />


## 🔮 Future Improvements

While the application represents a complete, polished frontend piece, potential future enhancements include:
*   Integrating a cloud backend (e.g. Firebase or Supabase) for user authentication and cross-device note synchronization.
*   Building an iCal / Google Calendar integration to automatically import your existing daily events.
*   Adding customizable color themes and font choices toggled by the user in a settings modal.
*   Integrating a dynamic Holiday API to automatically flag and label regional and global holidays on the calendar grid.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
