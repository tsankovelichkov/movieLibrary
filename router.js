const routes = {
    "/home":"home-guest-template",
    "/login":"login-template",
    "/register":"register-template",
    "/add-movie":"add-movie-template"
}

const router = async (path) => {

    let userData= authService.getData()


    switch (path) {
        case '/home':
            userData.movies = await movieService.getAll()
            break
        case '/logout':
            authService.logout()
            return navigate('/home')
        default:
            break;
    }

    let app = document.getElementById('app')

    let template=Handlebars.compile(document.getElementById(routes[path]).innerHTML)
    app.innerHTML = template(userData)
}

function navigate(path) {
    history.pushState({},'',path)
    router(path)
}