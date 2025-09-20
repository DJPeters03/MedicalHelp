// Client‑side logic for the Disease Treatment Game

// The API base URL.  Adjust this if you run the server on a different port.
const API_BASE = 'http://localhost:3000';

// Keep track of the current patient ID and score counters.
let currentPatientId = null;
let correctCount = 0;
let incorrectCount = 0;

// Grab DOM elements
const patientNameEl = document.getElementById('patient-name');
const symptomListEl = document.getElementById('symptom-list');
const medSelectEl = document.getElementById('med-select');
const treatBtn = document.getElementById('treat-btn');
const resultSectionEl = document.getElementById('result-section');
const resultMessageEl = document.getElementById('result-message');
const nextBtn = document.getElementById('next-btn');
const correctScoreEl = document.getElementById('correct-score');
const incorrectScoreEl = document.getElementById('incorrect-score');
const patientSectionEl = document.getElementById('patient-section');

/**
 * Fetches a new patient from the back end and updates the UI.
 */
async function loadPatient() {
  try {
    const res = await fetch(`${API_BASE}/patient`);
    const data = await res.json();
    currentPatientId = data.id;
    patientNameEl.textContent = `Patient: ${data.name}`;
    // Populate symptom list
    symptomListEl.innerHTML = '';
    data.symptoms.forEach((sym) => {
      const li = document.createElement('li');
      li.textContent = sym;
      symptomListEl.appendChild(li);
    });
    // Populate medication options
    medSelectEl.innerHTML = '';
    data.medicationOptions.forEach((opt) => {
      const option = document.createElement('option');
      option.value = opt;
      option.textContent = opt;
      medSelectEl.appendChild(option);
    });
    // Show patient section and hide result section
    patientSectionEl.hidden = false;
    resultSectionEl.hidden = true;
  } catch (err) {
    console.error('Error fetching patient:', err);
    alert('Failed to load a patient. Is the server running on localhost:3000?');
  }
}

/**
 * Sends the selected treatment to the server and displays feedback.
 */
async function treatPatient() {
  const selectedMed = medSelectEl.value;
  if (!currentPatientId || !selectedMed) {
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/treat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: currentPatientId, medication: selectedMed })
    });
    const data = await res.json();
    // Update score counters
    if (data.correct) {
      correctCount++;
    } else {
      incorrectCount++;
    }
    correctScoreEl.textContent = correctCount;
    incorrectScoreEl.textContent = incorrectCount;
    // Show result message
    resultMessageEl.textContent = data.message;
    resultSectionEl.hidden = false;
    patientSectionEl.hidden = true;
  } catch (err) {
    console.error('Error submitting treatment:', err);
    alert('Failed to submit treatment. Please check your network connection.');
  }
}

// Event listeners
treatBtn.addEventListener('click', treatPatient);
nextBtn.addEventListener('click', loadPatient);

// Load the first patient when the page loads
loadPatient();