let apiUSDA = 'IIT5HHAkRjEtkiOxRLwoPmagdVBOWMfmfba7JXHu'
let standard = 'Standard Reference'
let standardButton = document.querySelector('#standard')
let branded = 'Branded Food Products'
let brandedButton = document.querySelector('#branded')
let searchItem,
  NDBno,
  database,
  totalItems
let offset = 0
let itemsToDisplay = 7
let ingredientInfo = {}

document.addEventListener('click', e => {
  if (e.target.className === 'ingredientOption') {
    ingredientNutrients(e.target.dataset.ndbno)
  } else if (e.target.id === 'nextIngredientsBtn') {
    document.querySelector('#prevIngredientsBtn').style.display = 'inline'
    offset += 7
    searchItems()
  } else if (e.target.id === 'prevIngredientsBtn') {
    offset -= 7
    searchItems()
  } else if (e.target.id === 'backBtn') {
    searchItems()
  } else if (e.target.id === 'caffeineBtn') {
    document.querySelector('#caffeineLI').style.display = 'table-cell'
    document.querySelector('#caffeineBtn').style.visibility = 'hidden'
    document.querySelector('#noCaffeineNeeded').style.visibility = 'visible'
  } else if (e.target.id === 'noCaffeineNeeded') {
    document.querySelector('#caffeineLI').style.display = 'none'
    document.querySelector('#noCaffeineNeeded').style.visibility = 'hidden'
    document.querySelector('#caffeineBtn').style.visibility = 'visible'
  }

  if (offset <= 0) {
    document.querySelector('#prevIngredientsBtn').style.display = 'none'
    document.querySelector('#nextIngredientsBtn').style.display = 'none'
    offset = 0
  }
})

document.querySelector('#searchBtn').addEventListener('click', e => {
  e.preventDefault()
  if (standardButton.checked === false && brandedButton.checked === false) {
    document.querySelector('#uncheckedBox').style.visibility = 'visible'
  } else if (document.querySelector('#searchItem').value === '') {
    document.querySelector('#blankSearch').style.display = 'block'
    document.querySelector('#uncheckedBox').style.visibility = 'hidden'
  } else {
    offset = 0
    ingredientInfo = {}
    searchItem = document.querySelector('#searchItem').value
    ingredientInfo.searchItem = searchItem
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
    ingredientInfo.database = database
    searchItems()
  } else if (brandedButton.checked) {
    database = branded
    ingredientInfo.database = database
    searchItems()
  }
}

const printIngredientInfo = _ => {
  document.querySelector('#nutritionFacts').style.display = 'block'
  document.querySelector('#nutritionFacts').innerHTML = ''
  document.querySelector('#backBtn').style.display = 'inline'
  document.querySelector('#caffeineBtn').style.visibility = 'visible'

  let nutritionInfoTable = document.createElement('div')
  nutritionInfoTable.id = 'nutritionInfoTable'
  nutritionInfoTable.innerHTML =
    `
    <table>
    <caption>${ingredientInfo.name} Nutrients</caption>
    <tr>
    <td>Calories: ${ingredientInfo.calories} kcal</td>
    </tr>
    <tr>
    <td>Total fat: ${ingredientInfo.totalFat} g</td>
    </tr>
    <tr>
    <td>Saturated fat: ${ingredientInfo.satFat} g</td>
    </tr>
    <tr>
    <td>Trans fat: ${ingredientInfo.transFat} g</td>
    </tr>
    <tr>
    <td>Cholesterol: ${ingredientInfo.cholesterol} mg</td>
    </tr>
    <tr>
    <td>Sodium: ${ingredientInfo.sodium} mg</td>
    </tr>
    <tr>
    <td>Carbohydrates: ${ingredientInfo.carbs} g</td>
    </tr>
    <tr>
    <td>Fiber: ${ingredientInfo.fiber} g</td>
    </tr>
    <tr>
    <td>Sugar: ${ingredientInfo.sugar} g</td>
    </tr>
    <tr>
    <td>Protein: ${ingredientInfo.protein} g</td>
    </tr>
    <tr>
    <td id="caffeineLI">Caffeine: ${ingredientInfo.caffeine}</td>
    </tr>
    `
  document.querySelector('#nutritionFacts').append(nutritionInfoTable)
}

const nutritionTableStd = r => {
  let nutrientReport = r.report.food.nutrients

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
      if (nutrientReport[i].value === 0) {
        ingredientInfo.caffeine = `No caffeine here, sorry!`
      } else {
        ingredientInfo.caffeine = `${nutrientReport[i].value} g`
      }
    }
  }
  printIngredientInfo()
}

const nutritionTableBrn = r => {
  let nutrientReportBrn = r.report.food.nutrients

  for (let j = 0; j < nutrientReportBrn.length; j++) {
    let nutrientidBrn = nutrientReportBrn[j].nutrient_id
    if (nutrientidBrn === '208') {
      ingredientInfo.calories = nutrientReportBrn[j].value
    } else if (nutrientidBrn === '204') {
      ingredientInfo.totalFat = nutrientReportBrn[j].value
    } else if (nutrientidBrn === '606') {
      ingredientInfo.satFat = nutrientReportBrn[j].value
    } else if (nutrientidBrn === '605') {
      ingredientInfo.transFat = nutrientReportBrn[j].value
    } else if (nutrientidBrn === '601') {
      ingredientInfo.cholesterol = nutrientReportBrn[j].value
    } else if (nutrientidBrn === '307') {
      ingredientInfo.sodium = nutrientReportBrn[j].value
    } else if (nutrientidBrn === '205') {
      ingredientInfo.carbs = nutrientReportBrn[j].value
    } else if (nutrientidBrn === '291') {
      ingredientInfo.fiber = nutrientReportBrn[j].value
    } else if (nutrientidBrn === '269') {
      ingredientInfo.sugar = nutrientReportBrn[j].value
    } else if (nutrientidBrn === '203') {
      ingredientInfo.protein = nutrientReportBrn[j].value
    }
  }
  ingredientInfo.caffeine = `No caffeine value available, sorry!`
  printIngredientInfo()
}

const ingredientNutrients = NDBno => {
  document.querySelector('#ingredients').innerHTML = ''
  document.querySelector('#foodOptions').style.display = 'none'
  document.querySelector('#nextIngredientsBtn').style.display = 'none'
  document.querySelector('#prevIngredientsBtn').style.display = 'none'

  fetch(`https://api.nal.usda.gov/ndb/reports/?ndbno=${NDBno}&type=f&format=json&api_key=${apiUSDA}&measureby=m`)
    .then(r => r.json())
    .then(r => {
      if (ingredientInfo.database === 'Standard Reference') {
        if (r.report.food.cn === '') {
          ingredientInfo.name = r.report.food.name
        } else {
          ingredientInfo.name = r.report.food.cn
        }
        nutritionTableStd(r)
      } else if (ingredientInfo.database === 'Branded Food Products') {
        nutritionTableBrn(r)
      }
    })
    .catch(e => console.log(e))
}

const searchItems = _ => {
  document.querySelector('#ingredients').innerHTML = ''
  document.querySelector('#nutritionFacts').style.display = 'none'
  document.querySelector('#backBtn').style.display = 'none'
  document.querySelector('#caffeineBtn').style.visibility = 'hidden'
  document.querySelector('#noCaffeineNeeded').style.visibility = 'hidden'

  fetch(`https://api.nal.usda.gov/ndb/search/?format=json&q=${searchItem}&sort=r&ds=${ingredientInfo.database}&max=1000&offset=0&api_key=${apiUSDA}`)
    .then(r => r.json())
    .then(r => {
      if (r.errors) {
        document.querySelector('#invalidFood').style.display = 'block'
        document.querySelector('#foodOptions').style.display = 'none'
        document.querySelector('#ingredients').style.display = 'none'
      } else {
        document.querySelector('#invalidFood').style.display = 'none'
        document.querySelector('#foodOptions').style.display = 'block'
        document.querySelector('#ingredients').style.display = 'block'
        totalItems = r.list.total
        for (let i = offset; i < offset + itemsToDisplay; i++) {
          if ((totalItems - offset) < itemsToDisplay) {
            document.querySelector('#nextIngredientsBtn').style.display = 'none'
            document.querySelector('#prevIngredientsBtn').style.display = 'none'
          }
          if (i === totalItems) {
            break
          }
          NDBno = r.list.item[i].ndbno
          let ingredientName = r.list.item[i].name
          let ingredient = document.createElement('li')
          ingredient.className = 'ingredientOption'
          ingredient.dataset.ndbno = NDBno
          ingredient.innerHTML =
            `
      ${ingredientName}
      `
          document.querySelector('#ingredients').append(ingredient)
          document.querySelector('#nextIngredientsBtn').style.display = 'inline'
        }
      }
    })
    .catch(e => console.log(e))
}
