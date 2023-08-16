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
  let dataLeft;
  
  if (location.length == 0) location = `/`; // ! I don't understand well why this exist
  
  if (data.some(obj => obj.id == identifier)){
    let mainContent = data.find(obj => obj.id == identifier);
    let htmlCode = document.createElement('main');
    htmlCode.classList.add('mainSecondary');
    dataLeft = addVideosButton.data.filter(obj => obj.id !== identifier);
    
    function randomNumberArray (length){
      return Math.floor(Math.random() * length);
    }
    function showMainVideo (data){

      htmlCode.innerHTML += `<a href="/"><h1 class="logo">AcademiaLab</h1></a>
      <div class='allContent'>
      <div class='mainContent'>
      <h2>${data.title}</h2>
      <img src='${data.thumbnail}' style='view-transition-name:pic${data.id};'/>
      <h2>Genre:${data.genre}</h2>
      <h2>Platform:${data.platform}</h2>
      <p>${data.short_description}Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas autem consequuntur delectus saepe ut iure et soluta. Omnis, nostrum inventore.</p>
      <section class='commentsContainer'><h3>Comments:</h3></section>
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
      let container = htmlCode.querySelector(`div.secondaryContent`);
      for(let i = 0; 6 > i; i++){
        let result = data[randomNumberArray(data.length - 1)];
        let titleNoSpace = result.title.replace(/\s+/g, "");
        let htmlElement = document.createElement('a');
        htmlElement.classList.add('secondaryCard');
        htmlElement.setAttribute('href',`/${titleNoSpace}`);
        htmlElement.setAttribute('onclick','routing()');

        let elementHovered = new  card3D(htmlElement);
        
        data = data.filter(obj => obj.id !== result.id);
        htmlElement.innerHTML= `<img href='/${titleNoSpace}' src='${result.thumbnail}' data-id='${result.id}'/>
        <h3 href='/${titleNoSpace}' data-id='${result.id}'>${result.title}</h3>
        <p href='/${titleNoSpace}' data-id='${result.id}'>${result.short_description}</p>`
        container.appendChild(htmlElement);
      };
    }

    function showComments(){
      let container = htmlCode.querySelector(`section.commentsContainer`);
      for(let i = 0; 5 > i; i++){
        let comment = document.createElement('div');
        comment.classList.add('commentCard');
        comment.innerHTML=`<img src="https://picsum.photos/40"/>
        <div class="comment__text">
        <h4>User${randomNumberArray(100)}</h4>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate iste corrupti ipsa nemo odio, obcaecati nam accusantium numquam! Deserunt, saepe voluptatem? Repellat quisquam nisi maiores corrupti distinctio consequatur qui atque, numquam.</p>
        </div>`
        container.appendChild(comment);        
      };
    }
    showMainVideo(mainContent);
    showOthers(dataLeft);
    showComments();

    if (!document.startViewTransition) {
      document.body.innerHTML = htmlCode.outerHTML;
    } else {
      document.startViewTransition(() =>{
        document.body.innerHTML = htmlCode.outerHTML;        
      });
    }

    // ! Probably be the multi renders of the dom let's order this shit

    window.scrollTo({
      top:0,
      behavior:'smooth'
    }); // ! line of code that scroll the content to the begginning.

  }else{
    document.body.innerHTML = `<h1>Error 404 not found</h1>`;
  }
}