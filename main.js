function onInit(){ 
    let navigationTemplate=Handlebars.compile(document.getElementById('navigation-template').innerHTML)
    Handlebars.registerPartial("navigation-template",navigationTemplate)
    navigate('/home')
    
}

function navigateHandler(e){
    e.preventDefault()
    if(e.target.classList.contains('nav-link')){
            let url = new URL(e.target.href)
            navigate(url.pathname)
     }
}

function onSubmitLoginHandler(e){
    e.preventDefault()
    let formData = new FormData(document.forms['login-form'])

    let email = formData.get('email')
    let password=formData.get('password')

    authService.login(email,password)
}

function onSubmitRegisterHandler(e){
    e.preventDefault()
    let formData = new FormData(document.forms['register-form'])

    let email = formData.get('email')
    let password=formData.get('password')
    let repeatPassword = formData.get("repeatPassword")

    if(password == repeatPassword){
        authService.register(email,password)
    }

}

onInit()