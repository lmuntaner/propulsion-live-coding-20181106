export const getFeed = () => (dispatch, getState) => {
  const token = getState().user.token;
  const headers = new Headers({
    'Authorization': `Bearer ${token}`,
  });
  const options = {
    headers: headers,
  };
  const url = 'https://propulsion-blitz.herokuapp.com/api/feed';
  return fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      console.log('error status: ', response.status);
    })
    .then(feed => {
      console.log('in da success');
      console.log(feed);
    })
}