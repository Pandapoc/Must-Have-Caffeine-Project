let apiUSDA = 'IIT5HHAkRjEtkiOxRLwoPmagdVBOWMfmfba7JXHu'
let standard = 'Standard Reference'
let branded = 'Branded Food Products'
let searchItem
let database

document.querySelector('#searchBtn').addEventListener('click', e => {
  e.preventDefault()
  databaseSelect()
  buttonUnselect()
  document.querySelector('#searchItem').value = ''
})

const buttonUnselect = _ => {
  document.getElementById('#standard').checked = false
  document.getElementById('#branded').checked = false
}

const databaseSelect = _ => {
  let standardRdo = document.querySelector('#standard')
  let brandedRdo = document.querySelector('#branded')
  if (standardRdo.checked) {
    database = standard
    console.log(database)
    searchItems()
  } else if (brandedRdo.checked) {
    database = branded
    console.log(database)
    searchItems()
  } else if (standardRdo.checked === false && brandedRdo.checked === false) {
    console.log('no can do')
  }
}

const searchItems = _ => {
  searchItem = document.querySelector('#searchItem').value

  fetch(`https://api.nal.usda.gov/ndb/search/?format=json&q=${searchItem}&sort=r&ds=${database}&max=25&offset=0&api_key=${apiUSDA}`)
    .then(r => r.json())
    .then(r => {
      console.log(r.list)
    })


}