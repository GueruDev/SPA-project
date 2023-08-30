// ! Decirle Edwind que se ocupe del problema con redirecciones 301
let elementPicked;

function routing(event) {
  // ! Function that prevents the normal behavior and change the url
  event = window.event || event;
  event.preventDefault();

  let newUrl = event.target.attributes["href"].value;
  if (window.location.pathname === '/') elementPicked = event.target.attributes["data-id"].value; //! Fixing hover bug.
  if (newUrl == window.location.pathname) {
    return;
  } else if (newUrl === "/") {
    window.history.pushState({}, "", newUrl);
    function renderHome(){
      document.body.innerHTML= `
      <nav id="nav-main">
      <ul class="menu" id="menu-paginas">
        <div class="menu-items">
          <li class="menu-item">
            <a href="https://academia-lab.com/foros/">FORUMS</a>
          </li>
          <li class="menu-item">
            <a href="https://academia-lab.com/books/">BOOKS</a>
          </li>
          <li class="menu-item">
            <a href="https://academia-lab.com/apa-gen/">APA GENERATOR</a>
          </li>
          <li class="menu-item">
            <a href="https://www.youtube.com/@academialab?sub_confirmation=1"
              >YOUTUBE</a
            >
          </li>
        </div>
        <button id="accountBtn" class="loginWraper" type="button">
          <span>
            LOGIN
          </span>
          <svg
              class="svg-accountcircle"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path class="svg-color"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                fill="white"
              ></path>
            </svg>
        </button>
      </ul>
    </nav>
      <main id="main">
      <a href="/" onclick="routing()"><h1 href="/" class="logo">AcademiaLab</h1></a>
      </div>
      </main>`;
      setTimeout(()=> {
        let container = document.querySelector('main');
        container.appendChild(addVideosButton.mainCaptured);
      } ,0)
    }
    function fixHoverBug(){
      setTimeout(()=>{
        const cards = document.querySelectorAll('a.card');
        let elementToFix;
        for (const element of cards) {
          if(element.getAttribute('data-id') === elementPicked){
            elementToFix = element;
            break;
          }
        };
        elementToFix.style.transform ='unset';
      },0)
    }
    if (!document.startViewTransition) {
      renderHome()
      fixHoverBug();
      return
    } else {
      document.startViewTransition(() => {
        renderHome();
        fixHoverBug();
      });
      return
    }
  }
  let elementID = Number(event.target.attributes["data-id"].value);

  window.history.pushState({}, "", newUrl);
  window.routing = this.routing;
  urlHandler(elementID);
}

function urlHandler(identifier) {
  const location = window.location.pathname;
  let data = addVideosButton.data;
  let dataLeft;

  if (data.some((obj) => obj.id == identifier)) {
    let mainContent = data.find((obj) => obj.id == identifier);
    let htmlCode = document.createElement("main");
    htmlCode.classList.add("mainSecondary");
    dataLeft = addVideosButton.data.filter((obj) => obj.id !== identifier);

    function randomNumberArray(length) {
      return Math.floor(Math.random() * length);
    }
    function showMainVideo(data) {
      htmlCode.innerHTML += `<a href="/" onclick="routing()"><h1 class="logo" href="/">AcademiaLab</h1></a>
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
      return;
    }

    // function indexFindFilter(numb) {
    //   let result = data[numb];
    //   data = data.filter((obj) => obj.id !== result.id);
    //   console.log(result);
    //   return result;
    // }

    function showOthers(data) {
      let container = htmlCode.querySelector(`div.secondaryContent`);
      for (let i = 0; 6 > i; i++) {
        let result = data[randomNumberArray(data.length - 1)];
        let titleNoSpace = result.title.replace(/\s+/g, "");
        let htmlElement = document.createElement("a");
        htmlElement.classList.add("secondaryCard");
        htmlElement.setAttribute("href", `/${titleNoSpace}`);
        htmlElement.setAttribute("onclick", "routing()");

        // let elementHovered = new card3D(htmlElement);

        data = data.filter((obj) => obj.id !== result.id);
        htmlElement.innerHTML = `<img href='/${titleNoSpace}' src='${result.thumbnail}' data-id='${result.id}'/>
        <h3 href='/${titleNoSpace}' data-id='${result.id}'>${result.title}</h3>
        <p href='/${titleNoSpace}' data-id='${result.id}'>${result.short_description}</p>`;
        container.appendChild(htmlElement);
      }
    }

    function showComments() {
      let container = htmlCode.querySelector(`section.commentsContainer`);
      for (let i = 0; 5 > i; i++) {
        let comment = document.createElement("div");
        comment.classList.add("commentCard");
        comment.innerHTML = `<img src="https://picsum.photos/40"/>
        <div class="comment__text">
        <h4>User${randomNumberArray(100)}</h4>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate iste corrupti ipsa nemo odio, obcaecati nam accusantium numquam! Deserunt, saepe voluptatem? Repellat quisquam nisi maiores corrupti distinctio consequatur qui atque, numquam.</p>
        </div>`;
        container.appendChild(comment);
      }
    }

    function addHovers() {
      const elements = document.querySelectorAll(`a.secondaryCard`);
      elements.forEach((element) => {
        let hovered = new card3D(element);
      });
    }
    showMainVideo(mainContent);
    showOthers(dataLeft);
    showComments();

    if (!document.startViewTransition) {
      document.body.innerHTML = htmlCode.outerHTML;
    } else {
      document.startViewTransition(() => {
        document.body.innerHTML = `
        <nav id="nav-main">
      <ul class="menu" id="menu-paginas">
        <div class="menu-items">
          <li class="menu-item">
            <a href="https://academia-lab.com/foros/">FORUMS</a>
          </li>
          <li class="menu-item">
            <a href="https://academia-lab.com/books/">BOOKS</a>
          </li>
          <li class="menu-item">
            <a href="https://academia-lab.com/apa-gen/">APA GENERATOR</a>
          </li>
          <li class="menu-item">
            <a href="https://www.youtube.com/@academialab?sub_confirmation=1"
              >YOUTUBE</a
            >
          </li>
        </div>
        <button id="accountBtn" class="loginWraper" type="button">
          <span>
            LOGIN
          </span>
          <svg
              class="svg-accountcircle"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path class="svg-color"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                fill="white"
              ></path>
            </svg>
        </button>
      </ul>
    </nav>
        ` //! ADDING NAV ... it would be better ...
        document.body.innerHTML += htmlCode.outerHTML;
        setTimeout(() => addHovers(), 10);
      });
    }

    window.scrollTo({
      top: 0,
      behavior: "auto",
    }); // ! line of code that scroll the content to the begginning.
  } else {
    document.body.innerHTML = `<h1>Error 404 not found</h1>`;
  }
}
