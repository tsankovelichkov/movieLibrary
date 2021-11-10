const routes = {
    "/home": "home-guest-template",
    "/login": "login-template",
    "/register": "register-template",
    "/add-movie": "add-movie-template",
    "/details": 'details-page-template'
}

const router = async (path) => {

    let userData = authService.getData()

    let [ empty ,mainPath, key] = path.split('/')

    switch (path) {
        case '/home':
            userData.movies = await movieService.getAll()
            break
        case '/logout':
            authService.logout()
            return navigate('/home')
        case `/details/${key}`:
            let detialsPageData = await movieService.getOne(key)
            let app = document.getElementById('app')
            let template = Handlebars.compile(document.getElementById(routes['/details']).innerHTML)
            app.innerHTML = template(detialsPageData)
            return
        default:
            break;
    }

    let app = document.getElementById('app')
    let template = Handlebars.compile(document.getElementById(routes[path]).innerHTML)
    app.innerHTML = template(userData)
}

function navigate(path) {
    history.pushState({}, '', path)
    router(path)
}