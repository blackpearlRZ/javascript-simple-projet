const nom = document.getElementById("nom")
const code = document.getElementById("code")
const prenom = document.getElementById("prenom")
const numero = document.getElementById("numero")
const equipe = document.getElementById("equipe")

const btnSauvegarder = document.getElementById('sauvegarder')
const btnAjouter = document.getElementById('ajouter')
const btnAnnuler = document.getElementById('annuler')
const btnVider = document.getElementById('vider')
const btnSupprimer = document.getElementById('supprimer')
const joueursTable = document.querySelector('#playersTable >tbody')
const formulaire = document.querySelector('form')
formulaire.style.display = 'none'

btnAjouter.addEventListener("click",function(){
    formulaire.style.display = 'flex'
})
function validateForm() {
   if (!code|| !nom || !prenom || !numero|| !equipe) {
        return false;
    }else{
        return true;
    }
}
let joueurs = []
function joueurExists(code,numero) {
    return joueurs.some(j => j.code == code || j.numero == numero);
}
btnSauvegarder.addEventListener("click",function(e){
    e.preventDefault()
    if(validateForm){
        // const joueurE = joueurs.find(j => j.code == Number(code.value) || j.numero == Number(numero.value));
        if(joueurExists( Number(code.value),Number(numero.value))){
            alert('code ou numero existe')
        }
        else{
            const joueur = {
                "nom" : nom.value,
                "prenom": prenom.value,
                "code": Number(code.value),
                "numero": Number(numero.value),
                "equipe": equipe.value
            }
            joueurs.push(joueur)
            listeJoueurs()
            coloration()
        }
        console.log(joueurs)
    }
    else{
        alert("remplir tout les champs")
    }
})

btnAnnuler.addEventListener('click',function(){
    formulaire.style.display = "none"
})
btnVider.addEventListener('click',function(){
    formulaire.reset()
})
function listeJoueurs(){
    joueursTable.innerHTML =""
    joueurs.forEach(j =>{
        joueursTable.innerHTML+=`
            <tr>
                <td>${j.code}</td>
                <td>${j.nom}</td>
                <td>${j.prenom}</td>
                <td>${j.numero}</td>
                <td>${j.equipe}</td>
            </tr>
        `;
    })
}
function coloration(){
    const trs = joueursTable.querySelectorAll("tr")
    trs.forEach(tr =>{ tr.addEventListener('mouseup',function(){
        tr.style.backgroundColor = "green"
    })})
}
function removing() {
    const trs = joueursTable.querySelectorAll("tr")
    trs.forEach(tr => {
    tr.addEventListener('mouseup', function () {
        tr.remove();
    });
})};
btnSupprimer.addEventListener('click', function () {
    removing()
})
const showlist =document.getElementsById('showlist')
    const matchList = document.createElement('ul');
    document.body.appendChild(matchList);
    // Ajout de l'événem ent clic au bouton
    showlist.addEventListener('click', function() {
        // Création de l'objet XMLHttpRequest
        const xhr = new XMLHttpRequest();
        // Configuration de la requête GET
        xhr.open('GET', 'https://www.kora.com/matchs', true);
        // Définition de la fonction de rappel
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Analyse de la réponse JSON
                const response = JSON.parse(xhr.responseText);
                // Effacement de la liste existante
                matchList.innerHTML = '';
                // Parcours des données et création des éléments de liste
                response.data.forEach(match => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${match.date} - ${match.match} à ${match.heure}`;
                    matchList.appendChild(listItem);
                });
            } else {
                console.error('Erreur lors de la récupération des données');
            }
        };
        xhr.send();
    });