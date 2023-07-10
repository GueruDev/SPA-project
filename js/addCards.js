class addCards {
  constructor() {
    this.container = document.querySelector(`div.container`);
    this.counter = 0;
    this.urls = [];
    this.descriptions = [];
    this.images = [];
    this.fetchData();
  }
  add() {
    if(!document.startViewTransition){
        this.addIt();
    }
    else {
      document.startViewTransition(() => this.addIt());
    }
  }

  addIt() {
    this.container.appendChild(this.htmlCardElement());
    this.counter++;
    let newElement = document.querySelector(
      `.container > div.card:nth-child(${this.counter})`
    );
    console.log(newElement);
    cards[`card${this.counter}`] = new card3D(newElement); // ! bug on mobile
  }

  htmlCardElement(){
    let div = document.createElement('div');
    div.innerHTML = `<div class='card'><img class='card__miniature' src='${this.images[this.counter]}' /><p class='card__description'>${this.descriptions[this.counter]}</p></div>`; //! code structure
    let card = div.firstChild;
    return card;
  }
  async fetchData(){
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      const data = await response.json();
      this.urls = data.map(obj => obj.name);
      this.descriptions = data.map(obj => obj.description);
      this.images = data.map(obj => obj.images[0]);
      
      return;
    } catch (error) {
      console.error('I cannot fetch the data');
      return [];
    }
  }
}
const addVideosButton = new addCards();

  // .then(names => console.log(`Names of categories: ${names}`))
  // .catch(error => console.error(`Error: ${error}`));