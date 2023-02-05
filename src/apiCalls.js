// export const getRestaurants = () => {
//   return fetch('https://a1ecae6b-2320-4cd4-91ed-7da641c93480.mock.pstmn.io/api/v1/restaurants')
//     .then((res)=> res.json())
// }

function getData(url) {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .catch(error => {
      console.log("Fetch error: ", error)
    })
}

function deleteData(url) {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .catch(error => {
      console.log("Fetch error: ", error)
    })
}

function postData(body, url) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.ok) {
        console.log(response)
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .catch(error => {
      console.log("Fetch error: ", error)
    })
}

export { getData, postData, deleteData }  