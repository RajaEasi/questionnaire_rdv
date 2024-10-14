// Global variables
let currentStep = 0;
const steps = document.querySelectorAll('.step');
const sections = ['clientTypeSection', 'financialProfileSection', 'appointmentSection', 'contactSection', 'confirmationSection'];

// Function to update the progress bar
function updateProgressBar() {
  steps.forEach((step, index) => {
    if (index <= currentStep) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });

  // Adjust progress bar for mobile devices
  if (window.innerWidth < 768) {
    const activeStep = steps[currentStep];
    activeStep.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }
}

// Function to move to the next step
function nextStep() {
  if (currentStep < sections.length - 1) {
    if (validateCurrentSection()) {
      document.getElementById(sections[currentStep]).style.display = 'none';
      currentStep++;
      document.getElementById(sections[currentStep]).style.display = 'block';
      updateProgressBar();

      if (currentStep === 2) {
        fetchAvailableSlots();
      }
    }
  }
  
  if (currentStep > 0) {
    document.getElementById('backButton').style.display = 'block';
  }
  
  if (currentStep === sections.length - 1) {
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('backButton').style.display = 'none';
  }
}

// Function to move to the previous step
function previousStep() {
  if (currentStep > 0) {
    document.getElementById(sections[currentStep]).style.display = 'none';
    currentStep--;
    document.getElementById(sections[currentStep]).style.display = 'block';
    updateProgressBar();
  }
  
  if (currentStep === 0) {
    document.getElementById('backButton').style.display = 'none';
  }
  
  document.getElementById('nextButton').style.display = 'block';
}

// Function to validate the current section
function validateCurrentSection() {
  const currentSection = document.getElementById(sections[currentStep]);
  const inputs = currentSection.querySelectorAll('input[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (input.type === 'checkbox') {
      const checkboxes = currentSection.querySelectorAll('input[type="checkbox"]:checked');
      if (checkboxes.length === 0) {
        isValid = false;
        alert('Veuillez sélectionner au moins un objet de rendez-vous.');
      }
    } else if (!input.value) {
      isValid = false;
      alert(`Veuillez remplir le champ ${input.name}.`);
    }
  });

  return isValid;
}

// Function to update range value
function updateRangeValue(inputId, outputId) {
  const input = document.getElementById(inputId);
  const output = document.getElementById(outputId);
  output.textContent = input.value + ' €';
}

// Simulated API call to fetch available slots
function fetchAvailableSlots() {
  // In a real scenario, you would make an API call here
  // For this example, we'll use dummy data
  const dummySlots = [
    { date: '2023-06-01', time: '10:00' },
    { date: '2023-06-01', time: '14:00' },
    { date: '2023-06-02', time: '11:00' },
    { date: '2023-06-03', time: '15:00' },
  ];

  displayAvailableSlots(dummySlots);
}

// Function to display available slots
function displayAvailableSlots(slots) {
  const slotsContainer = document.getElementById('availableSlots');
  slotsContainer.innerHTML = '';

  slots.forEach(slot => {
    const button = document.createElement('button');
    button.textContent = `${slot.date} à ${slot.time}`;
    button.onclick = () => selectSlot(slot);
    slotsContainer.appendChild(button);
  });
}

// Function to select a slot
function selectSlot(slot) {
  document.getElementById('confirmedDate').textContent = `${slot.date} à ${slot.time}`;
  nextStep();
}

// Event listener for existing client radio button
document.querySelector('input[name="isExistingClient"][value="yes"]').addEventListener('change', function() {
  if (this.checked) {
    window.location.href = 'https://570easi.com/fr/user/login/?next=/fr/dashboard/accueil/';
  }
});

// Add resize event listener to handle responsiveness
window.addEventListener('resize', () => {
  updateProgressBar();
});

// Initialize the form
updateProgressBar();

// Make functions globally accessible
window.nextStep = nextStep;
window.previousStep = previousStep;
window.updateRangeValue = updateRangeValue;
window.selectSlot = selectSlot;