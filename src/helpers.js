export const asyncApiCall = async ( url, requestObject ) => {
    const res = fetch ( url, requestObject ).then ( res => {
        if ( res.ok ) return res
        else return Promise.reject(res)
    } )
    return ( await res ).json ()
}

export const htmlToElement = ( markup ) => {
    var templateEl = document.createElement ( 'template' )
    markup = markup.trim ()
    templateEl.innerHTML = markup
    return templateEl.content.firstChild
}