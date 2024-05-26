// Utility functions
const $ = (selector) => document.querySelector(selector);

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

// Main script
const add = $("#add");
const qty = $("#qty");
const dropdown = $("select");
const panierTable = $("#panier-table>tbody");
const prixTable = $("#afficher-prix");
const commanderBtn = $("#commander-btn");

const products = {
    tvs: [
        { nom: "Samsung QLED", prix: 17999, taille: 65, image: "tv.png" },
        { nom: "TCL QLED", prix: 6100, taille: 42, image: "tv.png" },
        { nom: "SONY OLED", prix: 25000, taille: 52, image: "tv.png" },
        { nom: "LG OLED", prix: 9000, taille: 65, image: "tv.png" }
    ]
}

function validation() {
    return dropdown.value !== "Choisir un TV"
            && Number(qty.value) >= 1
            && Number(qty.value) <= 10;
}

function remplireTVs() {
    products.tvs.forEach(tv => {
        dropdown.innerHTML += `
            <option value="${tv.nom}">${tv.nom}</option>
        `;
    });
}

let panierDeCommandes = [];

function ajouterAuPanier() {
    if(validation()) {
        // Ajouter le produit au tableau de panier
        const product = products.tvs.find(p => p.nom == dropdown.value);
        
        if(productExists(product.nom)) {
            // if products exists => increment qty
            panierDeCommandes = panierDeCommandes.map(p => {
                if(p.nom == product.nom) {
                    return {
                        ...p,
                        qty: p.qty + Number(qty.value)
                    };
                } else {
                    return p;
                }
            });
        } else {
            // else create product with qty
            panierDeCommandes.push({
                ...product,
                qty: Number(qty.value)
            });
        }
    
        // Mise a jour du tableau de commandes et tableau des prix
        updatePanierTable();
        updatePrixTable();
    }
}

function productExists(nom) {
    return panierDeCommandes.some(p => p.nom == nom);
}

function updatePanierTable() {
    panierTable.innerHTML = "";

    panierDeCommandes.forEach(p => {
        const tr = createElement({ tag: "tr" });
        const tdNom = createElement({ tag: "td", innerText: p.nom });
        const tdQty = createElement({ tag: "td", innerText: p.qty });
        const tdImg = createElement({ tag: "td" });
        const img = createElement({ tag: "img", src: p.image, className: "tv-image" });
        const tdBtn = createElement({ tag: "td" });
        const btn = createElement({ tag: "button", className: "secondary-btn", onClick: () => supprimerDuPanier(p.nom), innerText: "Supprimer" });

        tdImg.appendChild(img);
        tdBtn.appendChild(btn);
        tr.append(tdNom, tdQty, tdImg, tdBtn);

        panierTable.appendChild(tr);
    });
}

function supprimerDuPanier(nom) {
    panierDeCommandes = panierDeCommandes.filter(p => p.nom !== nom);

    updatePanierTable();
    updatePrixTable();
}

function calculerPrixHT() {
    return panierDeCommandes.reduce((acc, p) => p.prix * p.qty + acc, 0);
}

function calculerPrixTTC() {
    return calculerPrixHT() + calculerPrixHT() * 0.2;
}

function updatePrixTable() {
    prixTable.innerHTML = `
        <tbody>
            <tr>
                <th>Total HT</th>
                <td>${calculerPrixHT()} DHs</td>
            </tr>
            <tr>
                <th>Total TTC</th>
                <td>${calculerPrixTTC()} DHs</td>
            </tr>
        </tbody>
    `;
}

function jsonSerializer() {
    const obj = {
        tvs_commande: panierDeCommandes.map(p => {
            return {
                reference: p.nom,
                quantite: p.qty
            }
        })
    };

    console.log(JSON.stringify(obj));
}

document.addEventListener("DOMContentLoaded", () => {
    remplireTVs();
    add.addEventListener("click", ajouterAuPanier);
    commanderBtn.addEventListener("click", jsonSerializer);
});