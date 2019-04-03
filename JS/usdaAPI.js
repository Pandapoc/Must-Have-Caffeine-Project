let apiUSDA = 'IIT5HHAkRjEtkiOxRLwoPmagdVBOWMfmfba7JXHu'
let standard = 'Standard Reference'
let standardButton = document.querySelector('#standard')
let branded = 'Branded Food Products'
let brandedButton = document.querySelector('#branded')
let searchItem
let database
let offset = 0

document.querySelector('#searchBtn').addEventListener('click', e => {
  e.preventDefault()
  if (standardButton.checked === false && brandedButton.checked === false) {
    document.querySelector('#uncheckedBox').style.visibility = 'visible'
  } else if (document.querySelector('#searchItem').value === '') {
    console.log('test')
    document.querySelector('#blankSearch').style.display = 'inline'
    document.querySelector('#uncheckedBox').style.visibility = 'hidden'
  } else {
    databaseSelect()
    buttonUnselect()
    document.querySelector('#blankSearch').style.display = 'none'
    document.querySelector('#searchItem').value = ''
  }
})

const buttonUnselect = _ => {
  standardButton.checked = false
  brandedButton.checked = false
}

const databaseSelect = _ => {
  if (standardButton.checked) {
    database = standard
    searchItems()
  } else if (brandedButton.checked) {
    database = branded
    searchItems()
  }
}

const ingredientNutrients = (NDBno) => {
  document.querySelector('#ingredients').innerHTML = ''
  fetch(`https://api.nal.usda.gov/ndb/reports/?ndbno=${NDBno}&type=f&format=json&api_key=${apiUSDA}`)
    .then(r => r.json())
    .then(r => {
      console.log(r.report.food.name)
      console.log(r.report.food)
      if (r.report.food.cn === '') {
        console.log(`${r.report.food.name} name`)
      } else {
        console.log(`${r.report.food.cn} cn`)
      }
    })
}

const searchItems = _ => {
  searchItem = document.querySelector('#searchItem').value
  document.querySelector('#ingredients').innerHTML = ''

  fetch(`https://api.nal.usda.gov/ndb/search/?format=json&q=${searchItem}&sort=r&ds=${database}&max=10&offset=${offset}&api_key=${apiUSDA}`)
    .then(r => r.json())
    .then(r => {
      r.list.item.forEach(item => {
        let NDBno = item.ndbno
        let ingredientName = item.name
        let ingredient = document.createElement('div')
        ingredient.innerHTML = `
        <a href="javascript:ingredientNutrients(${NDBno})">${ingredientName}</a>
        `
        document.querySelector('#ingredients').append(ingredient)
      })
    })


}