const BASEURL = 'localhost:3000';

async function fetchData(url, method, data, token) {
    let fetchOptions  = {
        method: method,
        body: data
    }
    if (token) fetchOptions.headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
    return await fetch(`${BASEURL}${url}`, fetchOptions)
}

export default fetchData