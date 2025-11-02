# Simple Expense Tracker PWA

A clean, minimal expense tracking Progressive Web App optimized for mobile use. Track your expenses quickly without the complexity of traditional expense apps.

## Features

- **Quick Entry**: Add expenses with just item name, cost, and category
- **Auto Date Tracking**: Automatically timestamps each expense
- **Categories**: Food, Transport, Shopping, Entertainment, Bills, Other
- **Running Total**: See your total expenses at a glance
- **Edit & Delete**: Modify or remove expenses anytime
- **Offline Support**: Works without internet after first load
- **Mobile-First**: Optimized for iPhone Chrome/Safari
- **Installable**: Add to home screen as a standalone app
- **Local Storage**: All data stays on your device

## Quick Start

### Option 1: Test Locally

1. Open the project folder in Terminal:
   ```bash
   cd expense-tracker-pwa
   ```

2. Start a local server (choose one):
   ```bash
   # Using Python 3
   python3 -m http.server 8000

   # OR using Python 2
   python -m SimpleHTTPServer 8000

   # OR using Node.js (if you have npx)
   npx serve
   ```

3. Open in Chrome on your iPhone:
   - Find your computer's local IP address:
     ```bash
     # On Mac
     ifconfig | grep "inet " | grep -v 127.0.0.1

     # On Windows
     ipconfig
     ```
   - On your iPhone, open Chrome and go to: `http://YOUR_IP_ADDRESS:8000`
   - Example: `http://192.168.1.100:8000`

4. **Install to Home Screen**:
   - In Chrome, tap the menu (three dots)
   - Select "Add to Home Screen"
   - Name it "Expenses" and tap "Add"
   - The app icon will appear on your home screen

### Option 2: Just Browse Locally

Simply double-click `index.html` to open in your browser. The app will work, but service worker (offline mode) requires a server.

## How to Use

1. **Add an Expense**:
   - Enter item name
   - Enter cost
   - Select category
   - Tap "Add Expense"

2. **Edit an Expense**:
   - Tap "Edit" on any expense
   - Modify details in the modal
   - Tap "Save"

3. **Delete an Expense**:
   - Tap "Delete" on any expense
   - Confirm deletion

4. **View Total**:
   - Running total displayed at the top
   - Updates automatically

## Deployment (Share with Friends)

### Deploy to GitHub Pages (Free)

1. **Create a GitHub account** (if you don't have one): https://github.com/join

2. **Create a new repository**:
   - Go to https://github.com/new
   - Name it: `expense-tracker`
   - Set to Public
   - Click "Create repository"

3. **Upload your files**:
   ```bash
   cd expense-tracker-pwa
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/expense-tracker.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "main" branch
   - Click "Save"
   - Wait a few minutes

5. **Your app is live!**
   - URL: `https://YOUR_USERNAME.github.io/expense-tracker/`
   - Share this link with friends

6. **Update the Service Worker**:
   - Edit `service-worker.js` line 1: update CACHE_NAME to include version
   - Edit `app.js` line 236: update service worker path to include your repo name:
     ```javascript
     navigator.serviceWorker.register('/expense-tracker/service-worker.js')
     ```

### Alternative: Deploy to Netlify (Free)

1. Go to https://netlify.com and sign up
2. Drag and drop the `expense-tracker-pwa` folder
3. Your app is live instantly!
4. You'll get a URL like: `https://random-name-12345.netlify.app`
5. Optional: Change to a custom subdomain in settings

## File Structure

```
expense-tracker-pwa/
├── index.html          # Main HTML structure
├── styles.css          # Mobile-first responsive styles
├── app.js              # Core functionality
├── manifest.json       # PWA configuration
├── service-worker.js   # Offline support
└── README.md           # This file
```

## Browser Support

- ✅ Chrome (Mobile & Desktop)
- ✅ Safari (Mobile & Desktop)
- ✅ Edge
- ✅ Firefox
- ✅ Samsung Internet

## Data Privacy

- All data is stored locally on your device using browser localStorage
- No data is sent to any server
- No analytics or tracking
- Clear browser data to reset the app

## Troubleshooting

**App doesn't work offline:**
- Make sure you're accessing via a server (not file://)
- Check browser console for service worker errors

**Can't install to home screen:**
- Ensure you're using HTTPS or localhost
- Try clearing browser cache and reloading

**Data disappeared:**
- Check if browser data was cleared
- Each browser has separate storage (Chrome data ≠ Safari data)

## Customization

### Change Categories
Edit `index.html` and `app.js` - look for the category options in both files.

### Change Colors
Edit `styles.css` - look for the `:root` section with CSS variables:
```css
--primary-color: #4A90E2;  /* Change this! */
```

### Change App Icon
Replace the SVG emoji in `manifest.json` and `index.html` with your own icon.

## License

Free to use and modify for personal or commercial use.

## Support

For issues or questions, create an issue on GitHub or modify the code yourself!

---

Built with ❤️ using vanilla JavaScript - no frameworks needed!
