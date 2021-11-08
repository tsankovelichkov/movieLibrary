function onInit(){ 
    let navigationTemplate=Handlebars.compile(document.getElementById('navigation-template').innerHTML)
    Handlebars.registerPartial("navigation-template",navigationTemplate)
    navigate('/home')

    document.querySelector('.navi').addEventListener('click',e=>{
        e.preventDefault()
        if(e.target.classList.contains('nav-link')){
            let url = new URL(e.target.href)

            switch (url.pathname) {
                case '/login':
                    navigate('/login')
                    break;
            
                default:
                    break;
            }
        }
    })
}

function onSubmitLoginHandler(e){
    e.preventDefault()
    let formData = new FormData(document.forms['login-form'])

    let email = formData.get('email')
    let password=formData.get('password')

    authService.login(email,password)
}





onInit()