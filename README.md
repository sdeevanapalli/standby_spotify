# Spotify Standby

Spotify Standby is a web application that provides a simple interface for interacting with the Spotify API. It allows users to view and control playback, display album art, and manage their listening experience in a minimal, standby-style UI.

## Features
- Connect to Spotify and control playback
- Display current track information and album art
- Responsive design for desktop and mobile
- Progressive Web App (PWA) support (manifest and icons included)

## Project Structure
```
api/
  spotify.js           # Handles Spotify API interactions
public/
  icon-192.png         # PWA icon (192x192)
  icon-512.png         # PWA icon (512x512)
  index.html           # Main HTML file
  manifest.json        # PWA manifest
  script.js            # Frontend JavaScript
  style.css            # Stylesheet
```

## Getting Started
1. Clone the repository:
   ```sh
   git clone https://github.com/sdeevanapalli/standby_spotify.git
   ```
2. Install dependencies (if any backend or API dependencies are required).
3. Open `public/index.html` in your browser to run the app locally.

## API Setup
- The `api/spotify.js` file contains logic for interacting with the Spotify API. You may need to set up your own Spotify Developer credentials and configure authentication as required.

## PWA Support
- The app includes a manifest and icons for installation as a Progressive Web App.

## License
MIT

## Author
Shriniketh Deevanapalli
