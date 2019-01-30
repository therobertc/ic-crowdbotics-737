const baseUrl = 'https://api.dialogflow.com/v1/query?v=20170712';
const ACCESS_TOKEN = 'ebca4682c8514a74882090b65834c51e'

randomString = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const fetchResponseFromDialogflow = (msg) => {
  return fetch(baseUrl + this.randomString() + ':detectIntent', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      query: msg,
      lang: 'en',
      sessionId: this.randomString()
    })
  }).then((res) => res.json())
  .catch((err) => err.message)
}

