function onInit(){
    let navigationTemplate=Handlebars.compile(document.getElementById('navigation-template').innerHTML)
    Handlebars.registerPartial("navigation-template",navigationTemplate)
    router('home')
}

onInit()