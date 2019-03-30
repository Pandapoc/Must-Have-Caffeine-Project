let apiUSDA = 'IIT5HHAkRjEtkiOxRLwoPmagdVBOWMfmfba7JXHu'
let searchItem = 'coffee'
let standard = 'Standard Reference'
let branded = 'Branded Food Products'

const searchItems = _
fetch(`https://api.nal.usda.gov/ndb/search/?format=json&q=${searchItem}&sort=r&ds=${standard}&max=25&offset=0&api_key=${apiUSDA}`)
  .then(r => r.json())
  .then(r => {
    console.log(r.list)
  })
