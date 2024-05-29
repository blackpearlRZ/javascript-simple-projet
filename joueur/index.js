const nom = document.getElementById("nom").value
const code = document.getElementById("code").value
const prenom = document.getElementById("prenom").value
const numero = document.getElementById("numero").value
const equipe = document.getElementById("equipe").value

function validateForm(code, nom, prenom, numero, equipe) {
    const codePattern = /^\d+$/;
    const namePattern = /^[A-Za-z]+$/;
    const numeroPattern = /^\d+$/;

    if (!codePattern.test(code) || !namePattern.test(nom) || !namePattern.test(prenom) || !numeroPattern.test(numero) || equipe === '') {
        return false;
    }

    const existingPlayers = document.querySelectorAll('#playersTable tbody tr');
    for (let player of existingPlayers) {
        if (player.querySelector('.code').textContent === code || player.querySelector('.numero').textContent === numero) {
            alert('Code joueur ou numéro déjà utilisé.');
            return false;
        }
    }

    return true;
}
