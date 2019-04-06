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



// fetch(recipes)
//  .then((response) => {
//      recipes = response.data
//      myFunc(recipes[i])
//  })

const woop = () =>{
    getRecipe()

    // let vidElem = document.createElement('div')
    // let recElem = document.createElement('div')

    // recElem.innerHTML =`
    //     <h6 id='title'>${title}</h6>        
    //     <a href="${url}" target="_blank">Click here for Recipe! :)</a>
    //     <hr>
    //     `
    // vidElem.innerHTML= `
    //     <iframe width="320" height="160" src="https://www.youtube.com/embed/${vidId}" frameborder="0" allowfullscreen></iframe>
    //     `



}

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
                recElem.innerHTML =`
                    <h6 id='title'>${title[i]}</h6>        
                    <a href="${url[i]}" target="_blank">Click here for Recipe! :)</a>
                    <hr>
                    `
                    document.querySelector('#recipeLink').append(recElem)

                    getYt(title, i)
                    
                    
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
                
                    document.querySelector('#recipeLink').append(vidElem)
                    
            
        })
        
    
    } 


// const getRecipe = () => {
    
//   let recipeSearch = document.querySelector('#Recipes').value
    
//   fetch(`https://www.food2fork.com/api/search?key=${apiRecipe}&q=${recipeSearch}&page=2`)        
//     .then(r => r.json())
//     .then(r => {

//         console.log(r)
//         console.log(2)
//         for (let i = 0; i <= 1; i++){
//             console.log(3)
//             console.log(r.recipes[i].title)
//             console.log(r.recipes[i].f2f_url)

//             let vidSearch = r.recipes[i].title
//             console.log(4)
//             let recElem = document.createElement('div')
//             recElem.innerHTML =`
//             <h6 id='title'>${r.recipes[i].title}</h6>
            
//             <a href="${r.recipes[i].f2f_url}" target="_blank">Click here for Recipe! :)</a>
//             <hr>
            
            
//             `
//             document.querySelector('#recipeLink').append(recElem)
//             console.log(5)
//             // getYt()
//             fetch(`https://www.googleapis.com/youtube/v3/search?part=id&q=${vidSearch}&type=video&key=AIzaSyBDmq6-SlY6LWmYDPunDUoOxU8fR07rDpA`)
//                 .then(r => r.json())
//                 .then(r => {
//                 console.log(r.items[2].id.videoId)
//                         console.log(6)
//                     let vidId = r.items[2].id.videoId

//                     let vidElem = document.createElement('div')
//                     vidElem.innerHTML= `
//                     <iframe width="320" height="160" src="https://www.youtube.com/embed/${vidId}" frameborder="0" allowfullscreen></iframe>
//                     `

//                     document.querySelector('#recipeLink').append(vidElem)
//                 })
            
//               console.log(7)      
//             //   sleep(5000)    
//         }
//     })
    
// }

document.querySelector('#search').addEventListener('click', e => {
    e.preventDefault()
    document.querySelector('#recipeLink').innerHTML = ''
    woop()


})