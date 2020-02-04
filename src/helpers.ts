interface RequestObject {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'UPDATE'
    mode?: 'cors' | 'no-cors' | 'same-origin'
    cache?: 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached'
    credentials?: 'same-origin' | 'include' | 'omit'
    headers?
    body?
}

export const asyncApiCall = async (endpoint: string,
                                   requestObject: RequestObject,
                                   queries: [string[]] = [['']]): Promise<object> => {
    const queryArray: string[] = queries.map(query => query.join('='))
    const query: string = queryArray.join('&')
    const res = fetch(`https://cors-anywhere.herokuapp.com/https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/${endpoint}?${query}`, requestObject).then(res => {
        if (res.ok) return res
        else return Promise.reject(res)
    })
    return (await res).json()
}