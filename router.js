const routes = {
    "home":"home-guest-template"
}

function router(path) {
    history.pushState({},'',path)
    let app = document.getElementById('app')
    let template=Handlebars.compile(document.getElementById(routes[path]).innerHTML)
    app.innerHTML = template()
}