// Fonction pour activer le mode sombre
function enableDarkMode() {
  document.body.classList.add('dark-mode');
  localStorage.setItem('darkMode', 'enabled');
}

// Fonction pour désactiver le mode sombre
function disableDarkMode() {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('darkMode', null);
}

// Fonction pour basculer entre le mode sombre et le mode clair
function toggleDarkMode() {
  if (localStorage.getItem('darkMode') === 'enabled') {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
}

// Ajouter un écouteur d'événement au bouton de bascule (uniquement sur la page avec le bouton)
const toggleButton = document.getElementById('toggleButton');
if (toggleButton) {
  toggleButton.addEventListener('change', toggleDarkMode);
}

// Vérifier si l'utilisateur a déjà une préférence de thème enregistrée
if (localStorage.getItem('darkMode') === 'enabled') {
  enableDarkMode();
}

// Ajouter un écouteur d'événement pour détecter les changements dans le stockage local
window.addEventListener('storage', function(event) {
  if (event.key === 'darkMode') {
    if (event.newValue === 'enabled') {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  }
});

