const $ = (selector) => document.querySelector(selector);

class App {
    constructor() {
        this.add = $("#add");
        this.qty = $("#qty");
        this.dropdown = $("select");
        this.pannierTable = $("#pannier-table>tbody");
        this.pricTable = $("#afficher-prix");
        this.commanderBtn = $("#commander-btn");

        this.products = {
            tvs: [
                { nom: "Samsung QLED", prix: 17999, taille: 65, image: "tv.png" },
                { nom: "TCL QLED", prix: 6100, taille: 42, image: "tv.png" },
                { nom: "SONY OLED", prix: 25000, taille: 52, image: "tv.png" },
                { nom: "LG OLED", prix: 9000, taille: 65, image: "tv.png" }
            ]
        }

        this.cart = [];

        this.ajouterAuPanier = this.ajouterAuPanier.bind(this);
    }

    validation() {
        return this.dropdown.value !== "Choisir un TV"
                && +this.qty.value >= 1
                && +this.qty.value <= 10;
    }

    remplireTVs() {
        this.products.tvs.forEach(p => {
            this.dropdown.innerHTML += `
                <option value="${p.nom}">${p.nom}</option>
            `;
        });
    }

    ajouterAuPanier() {
        if(this.validation()) {
            const product = this.products.tvs.find((p) => {
                return p.nom === this.dropdown.value;
            });

            // to show an example of how a cart looks like
            // this.cart = [
            //     { nom: "Samsung QLED", prix: 17999, taille: 65, image: "tv.png", qty: 2 },
            //     { nom: "TCL QLED", prix: 6100, taille: 42, image: "tv.png", qty: 1 }
            // ]

            // If product exists
            if(this.cart.some(p => p.nom === product.nom)) {
                this.cart = this.cart.map(p => {
                    if(p.nom === product.nom) {
                        return {
                            ...p,
                            qty: p.qty + +this.qty.value
                        };
                    } else {
                        return p;
                    }
                });
            } else {
                this.cart.push({
                    ...product,
                    qty: +this.qty.value
                });
            }

            this.updateCartTable();
        }
    }

    updateCartTable() {
        this.pannierTable.innerHTML = "";

        this.cart.forEach(p => {
            this.pannierTable.innerHTML += `
                <tr>
                    <td>${p.nom}</td>
                    <td>${p.qty}</td>
                    <td>
                        <img src="${p.image}" alt="tv" class="tv-image">
                    </td>
                    <td>
                        <button class="secondary-btn supprimer-btn" data-nom="${p.nom}">
                            Supprimer
                        </button>
                    </td>
                </tr>
            `;
        });

        document.querySelectorAll(".supprimer-btn").forEach(element => {
            element.addEventListener("click", event => {
                this.supprimerProduit(event.target.dataset.nom);
            });
        });
    }

    supprimerProduit(nom) {
        this.cart = this.cart.filter(p => p.nom !== nom);

        this.updateCartTable();
    }

    __init__() {
        this.remplireTVs();
        this.add.addEventListener("click", this.ajouterAuPanier);
    }
}

const app = new App();

app.__init__();