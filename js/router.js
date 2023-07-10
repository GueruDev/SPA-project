// function router (event){
//     event = event || window.event;
//     event.preventDefault();
//     console.log(event);
//     window.history.pushState({}, '', '/home');
// }


const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({},'',event.target.href);
}

window.route = route;