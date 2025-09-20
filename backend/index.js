/*
 * Disease Treatment Game – Backend
 *
 * This Express application exposes two endpoints used by the front end:
 *   GET  /patient – returns a new virtual patient with three random symptoms.
 *   POST /treat  – accepts a patient ID and chosen medication, then returns feedback.
 *
 * Data about disorders, their symptoms and recommended treatments are deliberately simplified
 * and fictionalized.  The application keeps state in memory only (no database).
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Define a list of virtual disorders with associated symptoms and recommended medications.
const diseases = [
  {
    name: 'Bipolar Disorder',
    symptoms: [
      'mood swings',
      'periods of high energy',
      'feelings of sadness',
      'irritability',
      'difficulty sleeping'
    ],
    medication: 'Mood Stabilizer'
  },
  {
    name: 'Depression',
    symptoms: [
      'persistent sadness',
      'loss of interest',
      'fatigue',
      'feelings of guilt',
      'changes in appetite'
    ],
    medication: 'Antidepressant'
  },
  {
    name: 'Anxiety Disorder',
    symptoms: [
      'excessive worry',
      'restlessness',
      'muscle tension',
      'irritability',
      'difficulty concentrating'
    ],
    medication: 'Anxiolytic'
  },
  {
    name: 'Schizophrenia',
    symptoms: [
      'hallucinations',
      'delusions',
      'disorganized thinking',
      'social withdrawal',
      'flat affect'
    ],
    medication: 'Antipsychotic'
  },
  {
    name: 'Attention‑Deficit/Hyperactivity Disorder',
    symptoms: [
      'difficulty paying attention',
      'hyperactivity',
      'impulsivity',
      'forgetfulness',
      'fidgeting'
    ],
    medication: 'Stimulant'
  },
  {
    name: 'Obsessive‑Compulsive Disorder',
    symptoms: [
      'obsessive thoughts',
      'compulsive behaviors',
      'need for symmetry',
      'fear of contamination',
      'repetitive rituals'
    ],
    medication: 'Serotonin Reuptake Inhibitor'
  },
  {
    name: 'Post‑Traumatic Stress Disorder',
    symptoms: [
      'flashbacks',
      'nightmares',
      'avoidance',
      'hypervigilance',
      'emotional numbness'
    ],
    medication: 'Trauma‑Focused Therapy'
  }
];

// Create a list of unique medication names for the drop‑down in the UI.
const medicationOptions = Array.from(new Set(diseases.map(d => d.medication)));

// Some generic names to label our virtual patients.
const patientNames = [
  'Alex',
  'Taylor',
  'Jordan',
  'Casey',
  'Morgan',
  'Riley',
  'Jamie',
  'Sydney',
  'Bailey',
  'Cameron'
];

// Keep track of virtual patients by ID so that we can evaluate treatments later.
let nextId = 1;
const patients = new Map();

/**
 * Selects a random element from an array.
 * @param {any[]} arr
 */
function chooseRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generates and stores a new virtual patient.
 * Returns an object with patient ID, name, symptoms and the global medication options list.
 */
function generatePatient() {
  const disease = chooseRandom(diseases);
  // Select three unique symptoms from the disease's symptom list
  const chosenSymptoms = [];
  while (chosenSymptoms.length < 3) {
    const symptom = chooseRandom(disease.symptoms);
    if (!chosenSymptoms.includes(symptom)) {
      chosenSymptoms.push(symptom);
    }
  }
  const id = nextId++;
  const name = chooseRandom(patientNames);
  // Store the patient along with the underlying disease so we can check later
  patients.set(id, { id, disease });
  return {
    id,
    name,
    symptoms: chosenSymptoms,
    medicationOptions
  };
}

// Route that provides a new patient
app.get('/patient', (req, res) => {
  const patient = generatePatient();
  res.json(patient);
});

// Route that evaluates the player's chosen treatment
app.post('/treat', (req, res) => {
  const { id, medication } = req.body;
  const record = patients.get(id);
  if (!record) {
    return res.status(400).json({ error: 'Invalid patient ID' });
  }
  const recommended = record.disease.medication;
  const isCorrect = typeof medication === 'string' && recommended.toLowerCase() === medication.trim().toLowerCase();
  // Remove the patient from memory to prevent re‑treating
  patients.delete(id);
  let message;
  if (isCorrect) {
    message = `You chose the recommended treatment ("${recommended}"). The patient reports improvement!`;
  } else {
    message = `The recommended treatment was "${recommended}". Your choice "${medication}" was not ideal.`;
  }
  res.json({ correct: isCorrect, message, recommended });
});

// Start listening
app.listen(PORT, () => {
  console.log(`Disease Treatment Game server listening on port ${PORT}`);
});