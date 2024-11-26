# News App - Web and Mobile Application

This project is a **news application** that provides real-time news updates. Built using **React** for the web and **Ionic Capacitor** for the mobile version, the app integrates with a news API to display the latest news articles. It also features push notifications and interactive graphs for better user experience.

## Features

- **Real-time News Fetching**: Displays the latest news articles based on selected topics or sources.
- **Push Notifications**: Stay updated with breaking news alerts on both web and mobile.
- **Interactive Graphs**: Visualize publication times for news articles using **Chart.js** or **D3.js**.
- **Responsive Design**: The web version is fully responsive, and the mobile version is optimized for Android and iOS devices.
- **Offline Support**: Cached data allows viewing articles offline, especially on mobile devices.

---

## Prerequisites

Make sure you have the following tools installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Ionic CLI](https://ionicframework.com/docs/cli)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development, macOS only)

---

## How to Install and Run the Project

Follow these steps to set up and run the project:

### Step 1: Clone the Repository

Clone the project repository from GitHub:

```bash
git clone https://github.com/serkanbilsel/news-app.git

Step 2: Navigate to the Project Directory
Go to the main project directory:
cd news-app


Step 3: Install Dependencies
Install the required npm packages for both the web and mobile parts of the project:
npm install


Step 4: Configure API Key
Open the .env file
Replace YOUR_API_KEY with your actual News API key.

Step 5: Run the React Web Application
To run the React web app locally, use:
npm start


This will open the app in your default web browser at http://localhost:3000.

Step 6: Add Capacitor to Mobile App
In the project root, add the mobile platforms for Android or iOS.

For Android:
ionic capacitor add android

For iOS (on macOS):
ionic capacitor add ios

Step 7: Build the Project
Run the following command to build the project for both web and mobile:
ionic build

Step 8: Sync Capacitor with Mobile Platforms
Sync the build files with the native platform code:
ionic capacitor sync

Step 9: Run the Application on Mobile
For Android:
Open the project in Android Studio:
ionic capacitor open android

Connect your Android device or use an emulator.
Click "Run" in Android Studio to launch the app.

For iOS (on macOS):
Open the project in Xcode:
ionic capacitor open ios
Connect your iPhone or use a simulator.
Click "Run" in Xcode to launch the app.

Project Structure
Below is the main directory structure of the project:

news-app/
├── node_modules/            # NPM dependencies
├── public/                  # Public assets
├── src/                     # Application source code
│   ├── components/          # Reusable UI components
│   ├── pages/               # Application pages (Web and Mobile)
│   ├── services/            # API calls and data services
│   ├── styles/              # Global styles (CSS/SCSS)
│   ├── types/               # TypeScript types and interfaces
│   ├── App.tsx              # Main React application entry
│   ├── index.tsx            # React entry point
│   └── config/              # API configurations
├── capacitor.config.ts      # Capacitor configuration for mobile platforms
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation



Troubleshooting
If you encounter issues, try the following steps:

Ensure Dependencies Are Installed: Run npm install to check missing packages.
Verify Node and npm Versions: Ensure Node.js (v16 or later) and npm are properly installed.
Clear Cache: Use npm cache clean --force and reinstall dependencies.
Update Ionic CLI:
npm install -g @ionic/cli
Check Capacitor Sync: Run ionic capacitor sync to sync platforms.

Contributions
Feel free to contribute by creating pull requests or submitting issues on GitHub.

License
This project is licensed under the MIT License.
```
