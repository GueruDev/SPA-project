const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({},'',event.target.attributes['href'].value);
}

window.route = route;