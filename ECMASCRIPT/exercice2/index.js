import book from './livre.js'

let book1 = new book ("POO","RAMU","Grave",255,65);
let book2 = new book ("HTML","NADA","Merveilleux",200,95);
let book3 = new book ("HTML","CHAIMAE","INFO",355,105);
const books = [book1,book2,book3]
console.log(books)
console.log("book1", book1.readBook(37))
console.log("book2", book2.readBook(200))
console.log("book3", book3.readBook(0))
console.log(books)