let apiUSDA = 'IIT5HHAkRjEtkiOxRLwoPmagdVBOWMfmfba7JXHu'
let standard = 'Standard Reference'
let standardButton = document.querySelector('#standard')
let branded = 'Branded Food Products'
let brandedButton = document.querySelector('#branded')
let searchItem
let NDBno
let database
let offset = 0
let ingredientInfo = {}

document.addEventListener('click', e => {
  if (e.target.className === 'ingredientOption') {
    ingredientNutrients(e.target.dataset.ndbno)
  }
})

document.querySelector('#searchBtn').addEventListener('click', e => {
  e.preventDefault()
  if (standardButton.checked === false && brandedButton.checked === false) {
    document.querySelector('#uncheckedBox').style.visibility = 'visible'
  } else if (document.querySelector('#searchItem').value === '') {
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

const printIngredientInfo = _ => {
  // console.log(ingredientInfo)
  document.querySelector('#nutritionFacts').innerHTML = ''
  
  let nutritionInfoTable = document.createElement('div')
  nutritionInfoTable.id = 'nutritionInfoTable'
  nutritionInfoTable.innerHTML =
    `
  <h5>${ingredientInfo.name} Nutrients</h5>
  <ul>
  <li>Calories: ${ingredientInfo.calories}</li>
  <li>Total fat: ${ingredientInfo.totalFat}</li>
  <li>Saturated fat: ${ingredientInfo.satFat}</li>
  <li>Trans fat: ${ingredientInfo.transFat}</li>
  <li>Cholesterol: ${ingredientInfo.cholesterol}</li>
  <li>Sodium: ${ingredientInfo.sodium}</li>
  <li>Carbohydrates: ${ingredientInfo.carbs}</li>
  <li>Fiber: ${ingredientInfo.fiber}</li>
  <li>Sugar: ${ingredientInfo.sugar}</li>
  <li>Protein: ${ingredientInfo.protein}</li>
  <li id="caffeineLI">Caffeine: ${ingredientInfo.caffeine}</li>
  </ul>
  `
  document.querySelector('#nutritionFacts').append(nutritionInfoTable)
}

const nutritionTable = r => {
  let nutrientReport = r.report.food.nutrients
  console.log(nutrientReport)

  for (let i = 0; i < nutrientReport.length; i++) {
    let nutrientID = nutrientReport[i].nutrient_id
    if (nutrientID === 208) {
      ingredientInfo.calories = nutrientReport[i].value
    } else if (nutrientID === 204) {
      ingredientInfo.totalFat = nutrientReport[i].value
    } else if (nutrientID === 606) {
      ingredientInfo.satFat = nutrientReport[i].value
    } else if (nutrientID === 605) {
      ingredientInfo.transFat = nutrientReport[i].value
    } else if (nutrientID === 601) {
      ingredientInfo.cholesterol = nutrientReport[i].value
    } else if (nutrientID === 307) {
      ingredientInfo.sodium = nutrientReport[i].value
    } else if (nutrientID === 205) {
      ingredientInfo.carbs = nutrientReport[i].value
    } else if (nutrientID === 291) {
      ingredientInfo.fiber = nutrientReport[i].value
    } else if (nutrientID === 269) {
      ingredientInfo.sugar = nutrientReport[i].value
    } else if (nutrientID === 203) {
      ingredientInfo.protein = nutrientReport[i].value
    } else if (nutrientID === 262) {
      ingredientInfo.caffeine = nutrientReport[i].value
    }
  }
  printIngredientInfo()
}

const ingredientNutrients = NDBno => {
  document.querySelector('#ingredients').innerHTML = ''
  document.querySelector('#foodOptions').style.display = 'none'
  document.querySelector('.ingredientOption')

  fetch(`https://api.nal.usda.gov/ndb/reports/?ndbno=${NDBno}&type=f&format=json&api_key=${apiUSDA}&measureby=m`)
    .then(r => r.json())
    .then(r => {
      if (r.report.food.cn === '') {
        ingredientInfo.name = r.report.food.name
      } else {
        ingredientInfo.name = r.report.food.cn
      }
      nutritionTable(r)
    })
}

const searchItems = _ => {
  searchItem = document.querySelector('#searchItem').value
  document.querySelector('#ingredients').style.display = 'inline'
  document.querySelector('#ingredients').innerHTML = ''

  fetch(`https://api.nal.usda.gov/ndb/search/?format=json&q=${searchItem}&sort=r&ds=${database}&max=10&offset=${offset}&api_key=${apiUSDA}`)
    .then(r => r.json())
    .then(r => {
      r.list.item.forEach(item => {
        NDBno = item.ndbno
        let ingredientName = item.name
        let ingredient = document.createElement('li')
        ingredient.className = 'ingredientOption'
        ingredient.dataset.ndbno = NDBno
        ingredient.innerHTML =
          `
        ${ingredientName}
          `
        document.querySelector('#ingredients').append(ingredient)
      })
    })
}
