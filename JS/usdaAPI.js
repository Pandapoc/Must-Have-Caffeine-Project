let apiUSDA = 'IIT5HHAkRjEtkiOxRLwoPmagdVBOWMfmfba7JXHu'
let searchItem = 'coffee'
let standard = 'Standard Reference'
let branded = 'Branded Food Products'
let database

document.addEventListener('click', e => {
  console.log(e)
  if (e.id === 'standard') {
  }
})
// document.querySelector('#standard').checked

const databaseSelect = _ => {
  var radioBtns = document.getElementsByName('itemType')
  for (var i = 0; i < radioBtns.length; i++) {
    if (radioBtns[i].checked) {
      console.log(radioBtns[i].dataset-database)
    }
  }
}

const searchItems = _ => {
  fetch(`https://api.nal.usda.gov/ndb/search/?format=json&q=${searchItem}&sort=r&ds=${database}&max=25&offset=0&api_key=${apiUSDA}`)
    .then(r => r.json())
    .then(r => {
      console.log(r.list)
    })
}