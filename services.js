const apiKey = "AIzaSyCuHFequepv_zS4bOTnE0_JGgng4X4xBgA" 
const dataBaseUrl='https://movielibrary-62811-default-rtdb.firebaseio.com/'

const authService = {
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
        try {
            let data = JSON.parse(localStorage.getItem('user'))
            return {
                isAuthenticated: Boolean(data.idToken),
                email:data.email
            } 
        } catch (error) {
            return {
                isAuthenticated: false,
                email: ''
            } 
        }
    },

    logout() {
        localStorage.setItem("user","")
    },

    register(email,password){
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
          .then(data=>navigate('/login'))
    }
}

const movieService = {
    add(data){
        fetch('https://movielibrary-62811-default-rtdb.firebaseio.com/movies.json', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res=>res.json())
          .then(data=>navigate('/home'))
    },

    async getAll(){
       let response = await fetch('https://movielibrary-62811-default-rtdb.firebaseio.com/movies.json')
       
       let data = await response.json()

       return Object.keys(data).map( key => ({key,...data[key]}))
    },

    async getOne(id) {
        let response = await fetch(`https://movielibrary-62811-default-rtdb.firebaseio.com/movies/${id}.json`)
       
       let data = await response.json()

       return data
    },

    async edit(id,movieEdit) {
        fetch(`https://movielibrary-62811-default-rtdb.firebaseio.com/movies/${id}.json`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(movieEdit)
        }).then(res=>res.json())
          .then(data=>navigate('/home'))
    },

    async delete(id) {
        fetch(`https://movielibrary-62811-default-rtdb.firebaseio.com/movies/${id}.json`, {
            method: "DELETE"
        }).then(res=>res.json())
          .then(data=>navigate('/home'))
    }


}