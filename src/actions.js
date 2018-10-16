export function getData () {
    return (dispatch) => {
        dispatch({type: 'START_DATA_REQUEST'})
        return fetch('http://localhost:3000/users/1.json')
        .then(response => response.json())
        .then(data => dispatch({type: "GET_DATA", data}))
   }
}