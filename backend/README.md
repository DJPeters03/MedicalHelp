# Backend: Disease Treatment Game

This folder contains the Node.js/Express server that powers the Disease Treatment game.  The server defines two endpoints:

- `GET /patient` — returns a random virtual patient with a disorder and three symptoms.
- `POST /treat` — accepts a patient ID and a chosen medication, evaluates the choice, and returns whether the choice was correct.

## Setup and Running

To start the server you need Node.js installed (version 14 or higher is recommended).  Then run:

```bash
npm install
npm start
```

This will start the server on port **3000**.  The front end expects to communicate with `http://localhost:3000`.

If you wish to change the port, edit the `PORT` constant in `index.js`.  Note that the front end will also need its fetch URLs updated if you change the port.

## Files

- `index.js` — main application file, defines data, routes and evaluation logic.
- `package.json` — lists dependencies (`express` and `cors`) and defines the start script.