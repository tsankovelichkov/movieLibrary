function onInit() {
    let navigationTemplate = Handlebars.compile(document.getElementById('navigation-template').innerHTML)
    Handlebars.registerPartial("navigation-template", navigationTemplate)
    navigate('/home')

}

function urlFilter(httpAdress){
    let url = new URL(httpAdress)
    navigate(url.pathname)
}

function navigateHandler(e) {
    e.preventDefault()
    if (e.target.classList.contains('navi')) {
        urlFilter(e.target.href)
    } 
}

function onSubmitLoginHandler(e) {
    e.preventDefault()
    let formData = new FormData(document.forms['login-form'])

    let email = formData.get('email')
    let password = formData.get('password')

    authService.login(email, password)
}

function onSubmitRegisterHandler(e) {
    e.preventDefault()
    let formData = new FormData(document.forms['register-form'])

    let email = formData.get('email')
    let password = formData.get('password')
    let repeatPassword = formData.get("repeatPassword")

    if (password == repeatPassword) {
        authService.register(email, password)
    }

}

function onSubmitAddMovieHandler(e) {
    e.preventDefault()
    let formData = new FormData(document.forms['add-movie-form'])

    let title = formData.get('title')
    let description = formData.get('description')
    let imageUrl = formData.get("imageUrl")

    let movieData = {
        title,
        description,
        imageUrl
    }

    movieService.add(movieData)
}

function onSubmitEditMovieHandler(e,key) {
    e.preventDefault()
    let formData = new FormData(document.forms['edit-form'])
    
    let title = formData.get('title')
    let description = formData.get('description')
    let imageUrl = formData.get("imageUrl")


    movieService.edit(key,{
        title,
        description,
        imageUrl
    })

    

}

function movieDeleteHandler(e,key) {
    e.preventDefault()
    movieService.delete(key)
}

onInit()