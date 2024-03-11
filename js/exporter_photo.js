document.getElementById('fileInput').addEventListener('change', handleFileSelect);
document.getElementById('dropArea').addEventListener('dragover', handleDragOver);
document.getElementById('dropArea').addEventListener('dragleave', handleDragLeave);
document.getElementById('dropArea').addEventListener('drop', handleDrop);

function handleFileSelect(event) {
    const files = event.target.files;
    const fileList = document.getElementById('fileList');
    const imagePreview = document.getElementById('imagePreview');
    const message = document.getElementById('message');

    message.textContent = "Fichiers sélectionnés :";
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const listItem = document.createElement('div');

        const reader = new FileReader();
        reader.onload = function(event) {
            if (file.type.match('image.*')) {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.classList.add('preview-image');
                imagePreview.appendChild(img);
            }
        }
        reader.readAsDataURL(file);
        
        listItem.textContent = file.name;
        fileList.appendChild(listItem);
    }
}

function handleDragOver(event) {
    event.preventDefault();
    document.getElementById('dropArea').classList.add('drag-over');
}

function handleDragLeave(event) {
    event.preventDefault();
    document.getElementById('dropArea').classList.remove('drag-over');
}

function handleDrop(event) {
    event.preventDefault();
    document.getElementById('dropArea').classList.remove('drag-over');
    const files = event.dataTransfer.files;
    
    // Effacer d'abord toute visualisation précédente
    const dropZone = document.getElementById('dropArea');
    dropZone.innerHTML = '';
    
    // Créer et afficher les miniatures des fichiers déposés
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Créer un élément pour afficher le nom du fichier
        const listItem = document.createElement('div');
        listItem.textContent = file.name;
        dropZone.appendChild(listItem);
        
        // Vérifier si le fichier est une image
        if (file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.classList.add('preview-image');
                dropZone.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
    }
}

