export const getRestaurants = () => {
  return fetch('https://a1ecae6b-2320-4cd4-91ed-7da641c93480.mock.pstmn.io/api/v1/restaurants')
    .then((res)=> res.json())
}