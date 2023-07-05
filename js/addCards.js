class addCards {
  constructor(element) {
    this.element = element;
    this.target = document.querySelector(".container > div.card");
    this.counter = 1;
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
    document
      .querySelector(`.container > div.card:nth-child(${this.counter})`)
      .insertAdjacentHTML("afterend", this.target.outerHTML);
    this.counter++;
    let newElement = document.querySelector(
      `.container > div.card:nth-child(${this.counter})`
    );
    cards[`card${this.counter}`] = new card3D(newElement);
  }
}

const addVideosButton = new addCards(
  document.querySelector("main > button.addCard")
);