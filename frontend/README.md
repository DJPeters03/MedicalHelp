# Frontend: Disease Treatment Game

This folder contains the static web assets for the Disease Treatment game.

## Files

- `index.html` — the main web page for the game.  Open this file in your browser to play.
- `script.js` — client‑side JavaScript that fetches patient data from the back end, handles user input, and updates the UI.
- `style.css` — simple styles to make the game presentable.

## How It Works

When the page loads it requests a new virtual patient from the back end (`GET /patient`).  The response includes the patient’s ID, name and three symptoms as well as a list of available treatments.  These details are displayed to the user.

When the player selects a medication and clicks **Treat Patient**, the front end sends a `POST /treat` request with the patient ID and chosen treatment.  The server responds with feedback indicating whether the chosen treatment matches the server’s recommended option.  The UI updates the score counters and displays the result.  Clicking **Next Patient** retrieves a new virtual patient and the cycle repeats.

## Note About Local Files

Because the front end is served from the local filesystem instead of a web server, browsers enforce security restrictions on cross‑origin requests.  For the game to work correctly you must start the back end on `http://localhost:3000` as described in the root `README.md`.  Once the server is running, opening `index.html` in your browser will allow the page to communicate with it.