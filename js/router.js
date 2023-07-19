// const route = (event) => {
//   event = event || window.event;
//   event.preventDefault();
//   window.history.pushState({}, "", event.target.attributes["href"].value);
// };
// window.route = route;

// ! Decirle Edwind que se ocupe del problema con redirecciones 301

class route{
  constructor(){
  }

  routing(event){
    event = window.event || event;
    event.preventDefault();
    window.history.pushState({},'',event.target.attributes['href'].value);
    window.routing = this.routing;
    urlLocationHandler();
  };
  async urlLocationHandler(){
    const location = window.location.pathname;
    if(location.length == 0) location = `/`;
  }

  cardTemplate(){
    
  }
}

const Spa = new route();