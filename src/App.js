import React, { useEffect, useState } from 'react'
import './App.css';

const App = () => {
  const [ nutrition, setNutrition ] = useState({})
  const [ foods, setFoods ] = useState({})
  
  const getNutrition = () => {
    const YOUR_APP_ID = '7881f9dd'
    const YOUR_APP_KEY = 'f9646cf426bdad4538bf13d6584157e1	'
    fetch(`https://api.edamam.com/api/nutrition-data?app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&ingr=1%20large%20apple`)
    .then(response => response.json())
    .then(data => setNutrition(data))
  }

  const getFoods = () => {
    const YOUR_APP_ID = '9be3f05e'
    const YOUR_APP_KEY = 'fdc02607d63fde33500e33923f988a9e	'
    fetch(`https://api.edamam.com/api/food-database/v2/parser?ingr=red%20apple&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`)
    .then(response => response.json())
    .then(data => setFoods(data))
  }

  useEffect(() => {
    getNutrition()
    getFoods()
  }, [])

  const filterFoodByImage = foods && foods.hints && foods.hints.filter(o => o.food.image)

  return (
    <div>
      {console.log(filterFoodByImage)}
      <div>
        <h1>Nutrition API</h1>
        <p>Calories: {nutrition && nutrition.calories}</p>
        <p>Total Weight: {nutrition && nutrition.totalWeight}</p>
      </div>

      <div>
        <h1>Food API</h1>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
        {
          filterFoodByImage ?
          filterFoodByImage.map((o, key) => {
            return (
            <div key={key}>
              {
                o.food.image &&
                <div>
                  <p>{o.food.label}</p>
                  <img src={o.food.image} width='100px' alt=''/>
                </div>
              }
            </div>
            )})
          : ''
        }
        </div>
      </div>
    </div>
  );
}

export default App;
