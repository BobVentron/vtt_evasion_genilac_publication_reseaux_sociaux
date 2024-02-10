const passwordInput = document.getElementById("motdepasse");

function validationLogin() {
    var username = document.getElementById('login').value;
    var password = document.getElementById('motdepasse').value;

    // Validation simple, vous voudrez peut-être ajouter une logique plus complexe
    if (username === 'user' && password === 'password') {
        window.location.href = 'poster_photo.html';
        sessionStorage.setItem('isLoggedIn', 'true');
    } else {
        window.location.href = 'poster_photo.html';
        var errorMessageElement1 = document.getElementById('errorMessage1');
        var errorMessageElement2 = document.getElementById('errorMessage2');
        errorMessageElement1.textContent = 'Nom d\'utilisateur ou mot de passe invalide.';
        errorMessageElement2.textContent = 'Veuillez réessayer.';
        var errorMessagesContainer = document.getElementById('errorMessages');
        errorMessagesContainer.style.height = 'auto'; // Ajustement de la hauteur pour afficher les messages
    }
}


function deconecction(){
    sessionStorage.setItem('isLoggedIn', 'false');
    window.location.href = 'index.html';
}

