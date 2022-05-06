import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/meals`

function create(recipe) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: recipe
  })
  .then(res => res.json())
}

function getAll() {
  return fetch(BASE_URL, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    }
  })
  .then(res => res.json())
}

function getDetails(recipeId) {
  return fetch(`${BASE_URL}/${recipeId}`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    }
  })
  .then(res => res.json())
}

function deleteOne(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
  })
  .then(res => res.json())
}

function update(recipe) {
  return fetch(`${BASE_URL}/${recipe.get('_id')}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: recipe
  })
  .then(res => res.json())
}

function addReview(recipeId, reviewData) {
  return fetch(`${BASE_URL}/${recipeId}/reviews`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(reviewData)
  })
  .then(res => res.json())
}

function addRestaurantToRecipe(recipeId, restaurant) {
  return fetch(`${BASE_URL}/${recipeId}/restaurants`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(restaurant)
  })
  .then(res => res.json())
}

function removeRestaurantFromRecipe(recipeId, restaurantId) {
  return fetch(`${BASE_URL}/${recipeId}/restaurants/${restaurantId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    }
  })
  .then(res => res.json())
}

export {
  create,
  getAll,
  getDetails,
  deleteOne,
  update,
  addReview,
  addRestaurantToRecipe,
  removeRestaurantFromRecipe
}