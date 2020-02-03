const nsApiAll = async (url, requestObject) => {
    const res =  await fetch( url, requestObject )
    return await res.json()
}

nsApiAll('https://gateway.apiportal.ns.nl/virtual-train-api/api/v2/ingekort', {
    headers: {
        'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
    }
}).then(data => {
    console.log(data)
})
