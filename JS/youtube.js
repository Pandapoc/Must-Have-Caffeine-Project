// // Youtube API
// let apiYoutube = 'AIzaSyD9YNmSrcL7KpEt8gD9eSdDiSMpoY1CQdc'
// // let searchRecipes ='applepie'
// fetch(`https://www.googleapis.com/playlists?part=snippet&channelId=UC_x5XG10V2P6uZZ5FSM9Ttw&key=${apiYoutube}`)
//  .then(r => r.json())
//  .then(r => {
//      console.log(r)
//  })
//  .catch(e => console.error(e))
 
document.addEventListener('click', e =>{  
    if(e.target.id === 'searchRecipes'){
        e.preventDefault()
        let recipes = document.querySelector("#Recipes").value
        document.querySelector("#ytplayer").setAttribute("src", `https://www.youtube.com/embed?listType=search&list=${recipes}`)}
    })
    