class addCards {
  constructor() {
    this.container = document.querySelector(`div.container`);
    this.counter = 0;
    this.data = [];
    this.showed = [];
    this.fetchData().then(() => {
      this.renderFirstElements(9); //! Si vas a empezar a usarlo cambia el valor de ésta función a la cantidad de parametros iniciales
    });
    this.mainCaptured;
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
    cards[`card${this.counter}`] = new card3D(newElement);

    this.showed.push(elementData);
  }

  htmlCardElement(data) {
    let div = document.createElement("div");
    let titleNoSpace = data.title.replace(/\s+/g, ""); //! Expresion regular junto a un replace para eliminar espacios en las frases
    div.innerHTML = `<a class='card' href='/${titleNoSpace}' onclick='routing()' data-id='${data.id}' style='view-transition-name: pic${data.id};'>
    <img href='/${titleNoSpace}' class='card__miniature' src='${data.thumbnail}' data-id='${data.id}'/>
    <h2 href='/${titleNoSpace}' data-id='${data.id}'>${data.title}</h2>
    <p class='card__description' href='/${titleNoSpace}' data-id='${data.id}'>${data.short_description}</p> </a>`;
    let card = div.firstChild;
    return card;
  }
  async fetchData() { 
    //! Usa esta función para extraer solo los datos que quieras de la api
    const mapData = (data) => {
      //! En la variable 'map' cada clave es usada en la estructura del proyecto. Los valores de 'map' son las claves de la data del fetch por los cuales va a ser reemplazada
      const map = {
        title: 'title',
        short_description: 'short_description',
        thumbnail: 'thumbnail',
        id: 'id'
      };
    
      if (Array.isArray(data)) {
        // ! Si es un array de objetos, mapeamos cada objeto.
        return data.map((obj) => {
          const result = {};
          const mapKeys = Object.keys(map);
    
          for (const key of mapKeys) {
            result[key] = obj[map[key]];
          }
    
          return result;
        });
      } else {
        // ! Si es un solo objeto, aplicamos el mapeo directamente.
        const result = {};
        const mapKeys = Object.keys(map);
    
        for (const key of mapKeys) {
          result[key] = data[map[key]];
        }
    
        return result;
      }
    };
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
      this.data = mapData(data);
      console.log(this.data);
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
    setTimeout(()=> {
      this.mainCaptured = document.querySelector('div.container');
    }
      , 5);
    
  }
}

const addVideosButton = new addCards(); 