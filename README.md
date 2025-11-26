# eKazi React Application

(Consider Live Link https://emmajulius.github.io/eKAZI)

A modern React-based job portal platform that connects employers with potential candidates. eKazi provides a seamless experience for job seekers to browse opportunities and for employers to discover talented professionals.

## 📋 Project Description

eKazi is a comprehensive job portal application built with React that facilitates the connection between employers and job seekers in Tanzania. The platform features:

- **Job Listings**: Browse and search through available job opportunities across various industries
- **Featured Candidates**: Discover talented professionals with detailed profiles
- **Candidate Profiles**: Comprehensive profile pages showcasing experience, education, skills, and assessments
- **Employer Showcase**: Display of partner employers and organizations
- **Responsive Design**: Fully responsive interface optimized for all devices
- **Modern UI/UX**: Clean, modern design with smooth animations and intuitive navigation

## 🚀 Installation Steps

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14.0.0 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js, or use **yarn** (v1.22.0 or higher)
- **Git** - [Download Git](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/ekazi-react.git
cd ekazi-react
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

Or if you prefer using yarn:

```bash
yarn install
```

### Step 3: Start the Development Server

Run the application in development mode:

```bash
npm start
```

The application will automatically open in your browser at [http://localhost:3000](http://localhost:3000)

The page will reload automatically when you make changes to the code.

### Step 4: Build for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `build` folder with optimized production files ready for deployment.

## 🛠️ Tools and Dependencies

### Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **react** | ^18.2.0 | React library for building user interfaces |
| **react-dom** | ^18.2.0 | React DOM rendering library |
| **react-router-dom** | ^6.30.2 | Client-side routing for React applications |
| **react-scripts** | 5.0.1 | Build tooling and scripts for Create React App |

### External Libraries (via CDN)

- **Bootstrap 4**: CSS framework for responsive design
- **Font Awesome 6**: Icon library for UI icons

### Development Tools

- **Create React App**: Build tooling and development environment
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing and autoprefixing

## 📁 Project Structure

```
ekazi-react/
├── public/
│   ├── assets/
│   │   └── images/          # Image assets and candidate photos
│   └── index.html           # HTML template
├── src/
│   ├── components/          # React components
│   │   ├── Navbar.js        # Navigation bar component
│   │   ├── Hero.js          # Hero section component
│   │   ├── PromotionalBanner.js
│   │   ├── Statistics.js    # Statistics display
│   │   ├── Employers.js     # Employer logos carousel
│   │   ├── JobCategories.js # Job categories grid
│   │   ├── AllJobs.js       # Job listings component
│   │   ├── FeaturedCandidates.js # Featured candidates display
│   │   ├── CandidateProfile.js   # Detailed candidate profile page
│   │   ├── JobTitles.js     # Job titles section
│   │   ├── Newsletter.js    # Newsletter subscription
│   │   ├── Footer.js        # Footer component
│   │   └── LoginModal.js   # Login modal dialog
│   ├── pages/
│   │   └── Home.js          # Home page component
│   ├── data.js              # Application data (jobs, candidates)
│   ├── App.js               # Main App component with routing
│   ├── index.js             # Application entry point
│   ├── index.css            # Base CSS styles
│   └── styles.css           # Main stylesheet
├── package.json             # Project dependencies and scripts
└── README.md               # Project documentation
```

## 🎯 Key Features

### For Job Seekers
- Browse available job opportunities
- View detailed job descriptions
- Explore featured candidate profiles
- Create and manage profile information
- View profile assessment metrics

### For Employers
- Post job vacancies
- Browse candidate profiles
- View candidate skills and experience
- Contact potential candidates
- Access candidate assessment data

### UI/UX Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern Card Layout**: Clean, card-based design for better content organization
- **Smooth Animations**: Engaging animations and transitions
- **Interactive Elements**: Hover effects, modal dialogs, and dynamic content
- **Accessibility**: Semantic HTML and ARIA labels for better accessibility

## 📝 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run eject`
**Note: this is a one-way operation.** Once you `eject`, you can't go back!

Ejects from Create React App, giving you full control over the build configuration.

## 🔧 Configuration

### Environment Variables

Currently, the application uses default configurations. For production deployment, you may want to configure:

- API endpoints
- Environment-specific settings
- Feature flags

### Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deploy to Static Hosting

The `build` folder can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your repository for automatic deployments
- **GitHub Pages**: Use the `build` folder contents
- **AWS S3**: Upload the `build` folder to an S3 bucket

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Authors

- eKazi Development Team

## 🙏 Acknowledgments

- React team for the amazing framework
- Bootstrap for the CSS framework
- Font Awesome for the icon library
- All contributors and testers

## 📞 Support

For support, email emmajulius2512@gmail.com or open an issue in the repository.

---

**Note**: This is a React-based frontend application. Ensure you have the appropriate backend API configured for full functionality in production environments.
