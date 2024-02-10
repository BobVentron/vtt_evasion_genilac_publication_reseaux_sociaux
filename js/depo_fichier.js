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

    // Récupérer les valeurs des éléments
    const textValue1 = document.getElementById('text1').value;
    const dateValue = document.getElementById('date').value;
    const choicesSelect = document.getElementById('choices');
    const textValue2 = document.getElementById('text2').value;
    const selectedOptions = [...choicesSelect.selectedOptions].map(option => option.value);

    // Créer un objet avec les données à envoyer à l'API
    const data = {
        text1: textValue1,
        date: dateValue,
        choices: selectedOptions,
        text2: textValue2
    };


}