class addCards {
  constructor() {
    this.container = document.querySelector(`div.container`);
    this.counter = 0;
    this.data = [];
    this.showed = [];
    this.fetchData().then(() => {
      this.renderFirstElements(9);
    });
  }
  add() { //! método que verifica si la api startViewTransition está disponible sino renderiza de manera común
    if (!document.startViewTransition) {
      this.addIt();
    } else {
      document.startViewTransition(() => this.addIt());
    }
  }

  addIt() {
    let elementData = this.data[this.counter];
    this.container.appendChild(this.htmlCardElement(elementData));
    this.counter++;
    let newElement = document.querySelector(
      `.container > a:nth-child(${this.counter})`
    );
    cards[`card${this.counter}`] = new card3D(newElement); // ! bug on mobile

    this.showed.push(elementData);
  }

  htmlCardElement(data) {
    let div = document.createElement("div");
    let titleNoSpace = data.title.replace(/\s+/g, ""); //! Expresion regular junto a un replace para eliminar espacios en las frases
    div.innerHTML = `<a class='card' href='/${titleNoSpace}' onclick='routing()' data-id='${data.id}'>
    <img href='/${titleNoSpace}' class='card__miniature' src='${data.thumbnail}' data-id='${data.id}'/>
    <h2>${data.title}</h2>
    <p class='card__description' href='/${titleNoSpace}' data-id='${data.id}'>${data.short_description}</p> </a>`;
    let card = div.firstChild;
    return card;
  }
  async fetchData() {
    const cors = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "cef41ea26cmsh7308dd6ccd72652p19d01cjsnfe9fcbd97b9a",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    try {
      const url =
        "https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc";
      const response = await fetch(url, cors);
      const data = await response.json();
      this.data = data;
      return;
    } catch (error) {
      console.error("I cannot fetch the data");
      console.error(error);
      return [];
    }
  }

  renderFirstElements(amount) {
    // Asegurarse de que hay al menos 9 elementos en this.data antes de continuar
    if (this.data.length < amount) {
      console.error("No hay suficientes elementos para renderizar.");
      return;
    }

    for (let i = 0; i < amount; i++) {
      this.add();
    }
  }
}
const addVideosButton = new addCards(); //! Falta manejar el error cuando no hay data.