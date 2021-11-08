const routes = {
    "/home":"home-guest-template",
    "/login":"login-template",
}

function router(path) {

    switch (path) {
        case '/logout':
            authService.logout()
            return navigate('/home')
        default:
            break;
    }

    let app = document.getElementById('app')

    let userData= authService.getData()
 
    let template=Handlebars.compile(document.getElementById(routes[path]).innerHTML)
    app.innerHTML = template(userData)
}

function navigate(path) {
    history.pushState({},'',path)
    router(path)
}