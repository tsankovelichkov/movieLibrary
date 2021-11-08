const routes = {
    "/home":"home-guest-template",
    "/login":"login-template",
}

function router(path) {
    let app = document.getElementById('app')

    let userData= authService.getData()
    console.log(userData)
 
    let template=Handlebars.compile(document.getElementById(routes[path]).innerHTML)
    app.innerHTML = template(userData)
}

function navigate(path) {
    history.pushState({},'',path)
    router(path)
}