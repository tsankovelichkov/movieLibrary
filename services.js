const apiKey = "AIzaSyCuHFequepv_zS4bOTnE0_JGgng4X4xBgA"

let authService = {
    login(email,password) {
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
          .then(data=>localStorage.setItem('user',JSON.stringify(data)))
          .then(data=>navigate('/home'))
    },
    
    getData() {
        let data = JSON.parse(localStorage.getItem('user'))
        return {
            isAuthenticated: Boolean(data.idToken),
            email:data.email
        }
    }
}