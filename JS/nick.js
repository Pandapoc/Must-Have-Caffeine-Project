// let apiRecipe = 'eb0a6e5a5c2deb96f194939dc9821bee'
let apiRecipe = '7eeaffd805deb54dbb3c726f7df75092'
let recipeSearch
let vidElem
let recElem
let vidId = []
let title = []
let url = []
let recipes = []
let i = 0



const getRecipe = () => {
    let recipeSearch = document.querySelector('#Recipes').value
        fetch(`https://www.food2fork.com/api/search?key=${apiRecipe}&q=${recipeSearch}&page=2`)        
            .then(r => r.json())
            .then(r => {
                console.log(r)
            for (let i = 0; i <= 1; i++) {

                
        
                title.push(r.recipes[i].title)
                url.push(r.recipes[i].f2f_url)
                console.log(title)
                let recElem = document.createElement('div')
                recElem.setAttribute('id',`vid${i}`)
                recElem.setAttribute('class', 'recipeVid')
                recElem.innerHTML =`
                    <h6 class='title'>${title[i]}</h6>        
                    <a href="${url[i]}" target="_blank">Click here for Recipe! :)</a>
                    <hr>
                    `
                    document.querySelector('#recipeLink').append(recElem)

                    getYt(title, i, recElem)
                    
                    
                }    
                
            })

        }


       
const getYt = (title, i) => {
        fetch(`https://www.googleapis.com/youtube/v3/search?part=id&q=${title[i]}&type=video&key=AIzaSyBDmq6-SlY6LWmYDPunDUoOxU8fR07rDpA`)
        .then(r => r.json())
        .then(r => {
            console.log(r)
            vidId.push(r.items[1].id.videoId)
            console.log(vidId)
            
            let vidElem = document.createElement('div')
                    vidElem.innerHTML= `
                    <iframe width="320" height="160" src="https://www.youtube.com/embed/${vidId[i]}" frameborder="0" allowfullscreen></iframe>
                    `
                
            document.querySelector(`#vid${i}`).append(vidElem)
                    
            
        })
        
    
    } 




document.querySelector('#search').addEventListener('click', e => {
    e.preventDefault()
    document.querySelector('#recipeLink').innerHTML = ''
    getRecipe()


})