# eKazi React Application

A React version of the eKazi job portal website.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd ekazi-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
ekazi-react/
├── public/
│   ├── assets/          # Images and static assets
│   └── index.html       # HTML template
├── src/
│   ├── components/      # React components
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── PromotionalBanner.js
│   │   ├── Statistics.js
│   │   ├── Employers.js
│   │   ├── JobCategories.js
│   │   ├── AllJobs.js
│   │   ├── FeaturedCandidates.js
│   │   ├── JobTitles.js
│   │   ├── Newsletter.js
│   │   ├── Footer.js
│   │   └── LoginModal.js
│   ├── data.js          # Data constants
│   ├── App.js           # Main App component
│   ├── index.js         # Entry point
│   ├── index.css        # Base styles
│   └── styles.css       # Main stylesheet
└── package.json
```

## Features

- Responsive design
- Job listings
- Featured candidates
- Employer logos scrolling animation
- Newsletter subscription
- Login modal
- Smooth scrolling navigation

## Technologies Used

- React 18
- Bootstrap 4 (via CDN)
- Font Awesome 6 (via CDN)
- CSS3

