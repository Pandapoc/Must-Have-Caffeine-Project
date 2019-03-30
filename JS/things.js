let apiUSDA = 'IIT5HHAkRjEtkiOxRLwoPmagdVBOWMfmfba7JXHu'

fetch(`https://api.nal.usda.gov/ndb/search/?format=json&q=butter&sort=n&max=25&offset=0&api_key=${apiUSDA}`)
  .then(r => r.json())
  .then(r => {
    console.log(r.list.item)
  })



