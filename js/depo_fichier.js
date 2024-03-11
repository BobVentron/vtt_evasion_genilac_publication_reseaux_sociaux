// Fonction appelée lorsque des fichiers sont déposés dans la zone de dépôt
function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer.files; // Récupération des fichiers déposés
    if (files.length > 0) {
        handleFiles(files[0]); // Appel de handleFiles avec le premier fichier déposé
    }
}

// Fonction appelée lorsque des fichiers sont sélectionnés
function handleFiles(file) { // Prend en paramètre directement le fichier
    console.log('File selected:', file);

    const reader = new FileReader();

    reader.onload = function(event) {
        const img = document.getElementById('preview');
        img.style.display = 'block';
        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}

// Fonctions appelées pour gérer les événements de glisser-déposer
function dragOverHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy'; // Définit l'effet de glisser-déposer comme copie
}

function dragEnterHandler(event) {
    event.preventDefault();
    event.stopPropagation();
}

function dragLeaveHandler(event) {
    event.preventDefault();
    event.stopPropagation();
}

// Ajout des écouteurs d'événements à la zone de dépôt
const dropArea = document.getElementById('drop-area');
dropArea.addEventListener('dragover', dragOverHandler);
dropArea.addEventListener('dragenter', dragEnterHandler);
dropArea.addEventListener('dragleave', dragLeaveHandler);
dropArea.addEventListener('drop', handleDrop);

function handleSubmit(event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement

    // Appel de la fonction pour soumettre les données et l'image
    handleSubmitWithImageAndData();
}
function handleSubmitWithImageAndData() {
    const file = document.getElementById('fileElem').files[0];
    const textValue1 = document.getElementById('text1').value;
    const dateValue = document.getElementById('date').value;
    const choicesSelect = document.getElementById('choices');
    const textValue2 = document.getElementById('text2').value;
    const selectedOptions = [...choicesSelect.selectedOptions].map(option => option.value);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('text1', textValue1);
    formData.append('date', dateValue);
    selectedOptions.forEach(option => formData.append('choices[]', option));
    formData.append('text2', textValue2);

    fetch('http://localhost:3000/api/forms', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('Données et image envoyées avec succès à l\'API');
            // Réinitialiser le formulaire ou afficher un message de succès si nécessaire
        } else {
            console.error('Échec de l\'envoi des données et de l\'image à l\'API');
            // Afficher un message d'erreur ou prendre une autre action si nécessaire
        }
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi des données et de l\'image à l\'API:', error);
        // Afficher un message d'erreur ou prendre une autre action si nécessaire
    });
}