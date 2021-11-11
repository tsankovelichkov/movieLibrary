const apiKey = "AIzaSyCuHFequepv_zS4bOTnE0_JGgng4X4xBgA"
const dataBaseUrl = 'https://movielibrary-62811-default-rtdb.firebaseio.com/'

async function request(requestUrl, infoData, method) {
    let response = await fetch(requestUrl, {
        method: method,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(infoData)
    })

    let data = await response.json()
    return data
}

const authService = {
    async login(email, password) {
        let res = await request(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            email,
            password
        }, "POST")

        let data = await localStorage.setItem("user", JSON.stringify(res))

        await navigate('/home')
    },

    getData() {
        try {
            let data = JSON.parse(localStorage.getItem('user'))
            return {
                isAuthenticated: Boolean(data.idToken),
                email: data.email
            }
        } catch (error) {
            return {
                isAuthenticated: false,
                email: ''
            }
        }
    },

    logout() {
        localStorage.setItem("user", "")
    },

    async register(email, password) {
        let res = await request(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            email,
            password
        }, "POST")

        await navigate('/login')
    }
}

const movieService = {
    async add(data) {
        let res = await request('https://movielibrary-62811-default-rtdb.firebaseio.com/movies.json', data , "POST")
        
        await navigate('/home')
    },

    async getAll() {
        let res = await request('https://movielibrary-62811-default-rtdb.firebaseio.com/movies.json', undefined , "GET")


       return Object.keys(res).map( key => ({key,...res[key]}))
    },

    async getOne(id) {
        let response = await fetch(`https://movielibrary-62811-default-rtdb.firebaseio.com/movies/${id}.json`)

        let data = await response.json()

        return data
    },

    async edit(id, movieEdit) {
        let res = await request(`https://movielibrary-62811-default-rtdb.firebaseio.com/movies/${id}.json`, movieEdit , "PUT")

        await navigate('/home')
    },

    async delete(id) {
        let res = await request(`https://movielibrary-62811-default-rtdb.firebaseio.com/movies/${id}.json`, undefined , "DELETE")

        await navigate('/home')
        
    }


}


