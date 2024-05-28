let livre = [
    {"ISBN":"01234","titre":"Langage C","image":"langagec.jpg","prix":150},
    {"ISBN":"56789","titre":"Programmation Javascript","image":"javascript.jpg","prix":250},
    {"ISBN":"11778","titre":"Laravel","image":"laravel.jpg","prix":200}
]
function createElement({ tag, className, innerText, onClick, src }) {
    const element = document.createElement(tag);
    if(className) {
        element.className = className;
    }
    if(innerText) {
        element.innerText = innerText;
    }
    if(onClick && typeof onClick == "function") {
        element.addEventListener("click", onClick);
    }
    if(tag == "img" && src) {
        element.src = src;
    }
    return element;
}

const liste = document.getElementById("ld")
function charger(){
    livre.forEach((l)=>{
        liste.innerHTML += `
            <option value="${l.titre}">${l.titre}</option>
        `;
    })
}
const liste1 = document.getElementById('affichage')
function afficher(){
    liste1.innerHTML=''
    const livre1 = livre.find(l => l.titre == liste.value)
    const li1 = createElement({tag:"li",innerText:"Titre:  "+livre1.titre})
    const li2 = createElement({tag:"li",innerText:"ISBN:  "+livre1.ISBN})
    const li3 = createElement({tag:"li",innerText:"Prix:  "+livre1.prix})
    const li4 = createElement({tag:"li",innerText:"Image:  "+livre1.image})
    liste1.append(li1,li2,li3,li4)
}

const add = document.getElementById('add')
const panier = []
function ajouter(){
    const prix = document.getElementById("afficher-prix")
    const p1 = livre.find(l => l.titre == liste.value)
    if(panier.includes(p1)){
        alert('produit deja existe')
    }
    else{
        panier.push(p1)
        console.log(panier)
        let price = panier.reduce((acc, p) => p.prix + acc, 0)
        prix.textContent = price + " DHs"
    }
}

const affbtn = document.getElementById('aff-btn')
document.addEventListener("DOMContentLoaded", () => {
   charger()
   affbtn.addEventListener('click',afficher)
   add.addEventListener("click",ajouter)
});