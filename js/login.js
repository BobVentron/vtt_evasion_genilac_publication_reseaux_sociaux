const passwordInput = document.getElementById("motdepasse");

function validationLogin() {
    var username = document.getElementById('login').value;
    var password = document.getElementById('motdepasse').value;


    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: username,
          password: password
        })
      })
      .then(response => {
        if (response.ok) {
            console.log('Connexion réussie');
            window.location.href = 'poster_photo.html';
            sessionStorage.setItem('isLoggedIn', 'true');
        } else {
            console.error(response)
            console.error('Identifiants incorrects');
            var errorMessageElement1 = document.getElementById('errorMessage1');
            var errorMessageElement2 = document.getElementById('errorMessage2');
            errorMessageElement1.textContent = 'Nom d\'utilisateur ou mot de passe invalide.';
            errorMessageElement2.textContent = 'Veuillez réessayer.';
            var errorMessagesContainer = document.getElementById('errorMessages');
            errorMessagesContainer.style.height = 'auto'; // Ajustement de la hauteur pour afficher les messages
        }
      })
      .catch(error => console.error('Erreur lors de la requête :', error));
}


function deconecction(){
    sessionStorage.setItem('isLoggedIn', 'false');
    window.location.href = 'index.html';
}