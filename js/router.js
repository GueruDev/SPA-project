// ! Decirle Edwind que se ocupe del problema con redirecciones 301

function routing(event) { // ! Function that prevents the normal behavior and change the url
  event = window.event || event;
  event.preventDefault();

  let newUrl = event.target.attributes["href"].value;
  let elementID = Number(event.target.attributes["data-id"].value); 

  window.history.pushState({}, "", newUrl);
  window.routing = this.routing;
  urlHandler(elementID);
}

function urlHandler(identifier) { 
  const location = window.location.pathname;
  let data = addVideosButton.data;
  
  if (location.length == 0) location = `/`; // ! I don't understand well why this exist
  
  if (data.some(obj => obj.id == identifier)){
    let mainContent = data.find(obj => obj.id == identifier);
    let dataLeft = addVideosButton.data.filter(obj => obj.id !== identifier);
    
    function randomNumberArray (length){
      return Math.floor(Math.random() * length);
    }
    function showMainVideo (data){
      document.body.innerHTML = `<a href="/"><h1 class="logo">AcademiaLab</h1></a>
      <div class='allContent'>
      <div class='mainContent'>
      <h2>${data.title}</h2>
      <img src='${data.thumbnail}'/>
      <h2>Genre:${data.genre}</h2>
      <h2>Platform:${data.platform}</h2>
      <p>${data.short_description}</p>
      </div>
      <div class='secondaryContent'></div>
      </div>`;
      return
    }



    function indexFindFilter (numb){
      let result = data[numb];
      data = data.filter(obj => obj.id !== result.id);
      console.log(result);
      return result;
    }


    function showOthers (data){
      let container = document.querySelector(`div.secondaryContent`);
      for(let i = 0; 3 > i; i++){
        let result = data[randomNumberArray(data.length - 1)];
        let htmlElement = document.createElement('div');
        htmlElement.classList.add('cardOtherElement');

        data = data.filter(obj => obj.id !== result.id);
        htmlElement.innerHTML= `<h2>${result.title}</h2>`
        container.appendChild(htmlElement);
      };
      // indexFindFilter(randomNumberArray(data.length - 1));
      console.log(data);
    }

    showMainVideo(mainContent);
    showOthers(dataLeft);

  }else{
    document.body.innerHTML = `<h1>Error 404 not found</h1>`;
  }
}