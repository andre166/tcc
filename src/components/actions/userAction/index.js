export function setNameAndToken( e ){
    return {
        type: 'SET_NAME_TOKEN',
        payLoad: e
    }
}

export function setAuthRoutesErro( e ){
    return {
        type: 'ERRO_AUTH_ROUTES_RESTRICT',
        payLoad: e
    }
}


