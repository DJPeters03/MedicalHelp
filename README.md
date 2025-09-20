# Disease Treatment Game

This project demonstrates a simple full‑stack web game built with a JavaScript front end and a Node.js back end.  It was designed as a sample project for a prompt‑engineering job application and is **not** intended to provide real medical advice.  All disorders, symptoms and medications in the game are fictionalized for entertainment and demonstration purposes only.

## Overview

Players are presented with a series of virtual patients, each reporting three symptoms.  Based on those symptoms the player chooses one medication from a list of available options.  The back end evaluates whether the chosen medication matches the recommended treatment for that patient’s condition and returns feedback.  A running score of correct and incorrect treatments is displayed.

The game runs entirely in the browser once the back end server is started.  No database is required; all data live in memory.

## Directory Structure

```
disease-treatment-game/
├── backend/
│   ├── index.js           # Express server defining API endpoints
│   ├── package.json       # Node module configuration and dependencies
│   └── README.md          # Instructions for running the server
├── frontend/
│   ├── index.html         # Main game page (launch this file in your browser)
│   ├── script.js          # Client‑side logic for interacting with the API
│   ├── style.css          # Basic styling for the game
│   └── README.md          # Information about the front end
└── README.md              # Project overview and high‑level instructions
```

## Running the Game

1. **Install dependencies and start the back end**

   Open a terminal and navigate into the `backend` folder:

   ```bash
   cd backend
   npm install
   npm start
   ```

   This will start the Node.js server on `http://localhost:3000`.

2. **Launch the front end**

   Open the file `frontend/index.html` directly in your web browser (double‑clicking it in your file manager will usually suffice).  Make sure the back end is running before you start playing, otherwise the page will not be able to load patients.

3. **Play!**

   The game will display a patient’s symptoms and provide a list of medications.  Select the medication you think is most appropriate and press **Treat Patient**.  The result and an updated score will appear.  Click **Next Patient** to continue.

## Disclaimer

This game is for entertainment and educational purposes only.  It **does not** provide medical advice, diagnosis, or treatment, and should not be used to make real clinical decisions.  Always consult a qualified healthcare professional for medical concerns.