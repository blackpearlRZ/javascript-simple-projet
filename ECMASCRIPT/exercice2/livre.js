class Book{
    constructor(title,author,description,pages,currentPage,read = false){
        this.title = title;
        this.author = author;
        this.description = description;
        this.pages = pages;
        this.currentPage = currentPage;
        this.read = read;
    }
    readBook(page){
        if(page < 1 || page > this.pages) {
            return "undefined number";
        }
        if(page > 1 && page < this.pages) {
            this.currentPage = page;
            return "En cous de lecture";
        }
        if(page == this.pages){
            this.currentPage = page;
            this.read = true;
            return "Lu";
        }
    }
}

export default Book;