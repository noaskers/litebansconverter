# CSV Cleaner App

## Overview
The CSV Cleaner App is a web application that allows users to upload and clean CSV files specifically for managing bans, warns, mutes, and kicks. The application provides a user-friendly interface for uploading CSV files and processing them to remove unwanted entries.

## Features
- Upload CSV files for bans, warns, mutes, and kicks.
- Clean the uploaded CSV files to remove unnecessary data.
- Download the cleaned CSV files.

## Project Structure
```
csv-cleaner-app
├── public
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   └── scripts.js
│   └── index.html
├── src
│   ├── app.js
│   ├── controllers
│   │   └── fileController.js
│   ├── routes
│   │   └── fileRoutes.js
│   └── utils
│       └── csvCleaner.js
├── uploads
│   └── .gitkeep
├── package.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd csv-cleaner-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the application:
   ```
   npm start
   ```
2. Open your web browser and go to `http://localhost:3000`.
3. Use the interface to upload your CSV files and clean them as needed.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.