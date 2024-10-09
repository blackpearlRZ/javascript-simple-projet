import Document,{Livre} from './etudiant.js' 
let doc1= new Document(33,"12-03-2015") 
let doc2= new Document(12,"21-09-2010") 
let liv1 = new Livre(12,"21-09-2010","POO","RAMI"); 
console.log(liv1.infoLivre()); 
let liv2 = new Livre(14,"31-01-2010","REACT","AHLAM"); 
console.log(liv2.infoLivre()); 
let liv3 = new Livre(22,"21-09-2012","HTML","Ibrahim"); 
console.log(liv3.infoLivre()); 