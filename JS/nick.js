let apiRecipe = 'eb0a6e5a5c2deb96f194939dc9821bee'
let recipeSearch


const getRecipe = () => {
    
  let recipeSearch = document.querySelector('#Recipes').value
    
  fetch(`https://www.food2fork.com/api/search?key=${apiRecipe}&q=${recipeSearch}&page=2`)        
    .then(r => r.json())
    .then(r => {

        console.log(r)

        for (let i = 0; i <= 10; i++){

            console.log(r.recipes[i].title)
            console.log(r.recipes[i].f2f_url)
            
            let recElem = document.createElement('div')
            recElem.innerHTML =`
            <h6 id='title'>${r.recipes[i].title}</h6>
            
            <a href="${r.recipes[i].f2f_url}" target="_blank">Click here for Recipe! :)</a>
            <hr>
            `
            document.querySelector('#recipeLink').append(recElem)
        }
    })
    
}

document.querySelector('#search').addEventListener('click', e => {
    e.preventDefault()
    getRecipe()

})