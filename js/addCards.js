class addCards {
  constructor() {
    this.container = document.querySelector(`div.container`);
    this.counter = 0;
    this.data = [];
    this.urls = [];
    this.descriptions = [];
    this.images = [];
    this.fetchData();
  }
  add() {
    if (!document.startViewTransition) {
      this.addIt();
    } else {
      document.startViewTransition(() => this.addIt());
    }
  }

  addIt() {
    this.container.appendChild(this.htmlCardElement());
    this.counter++;
    let newElement = document.querySelector(
      `.container > a:nth-child(${this.counter})`
    );
    cards[`card${this.counter}`] = new card3D(newElement); // ! bug on mobile
  }

  htmlCardElement() {
    let div = document.createElement("div");
    div.innerHTML = `<a class='card' href='/${
      this.urls[this.counter]
    }' onclick='Spa.routing()'><img href='/${
      this.urls[this.counter]
    }' class='card__miniature' src='${
      this.images[this.counter]
    }' /><p class='card__description'>${
      this.descriptions[this.counter]
    }</p></a>`;
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
      const url = 'https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc';
      const response = await fetch(url, cors);
      const data = await response.json();
      this.data = data;
      this.urls = data.map((obj) => obj.id);
      this.descriptions = data.map((obj) => obj.short_description);
      this.images = data.map((obj) => obj.thumbnail);

      return;
    } catch (error) {
      console.error("I cannot fetch the data");
      console.error(error);
      return [];
    }
  }
}
const addVideosButton = new addCards();

// .then(names => console.log(`Names of categories: ${names}`))
// .catch(error => console.error(`Error: ${error}`));
