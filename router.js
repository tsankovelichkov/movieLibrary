const routes = {
    "/home":"home-guest-template",
    "/login":"login-template",
}

function router(path) {
    let app = document.getElementById('app')
    let template=Handlebars.compile(document.getElementById(routes[path]).innerHTML)
    app.innerHTML = template()
}

function navigate(path) {
    history.pushState({},'',path)
    router(path)
}