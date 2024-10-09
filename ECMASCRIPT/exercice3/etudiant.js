class Document{
    constructor(id, dateEd){
        this.id = id;
        this.dateEd = dateEd;
    }
}
class Livre extends Document{ 
    constructor(id,dateEd,titre,auteur){ 
        super(id,dateEd); 
        this.titre=titre;
        this.auteur = auteur;
    } 
    infoLivre(){
        return `Livre id: ${this.id},
        dateEd: ${this.dateEd}, titre: ${this.titre},Auteur:${this.auteur}`    
    } 
} 
export default Document
export {Livre}