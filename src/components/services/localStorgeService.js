export const getToken = () => {

    let responseStorage = JSON.parse(localStorage.getItem("userInfo"));

    if( responseStorage ){
        let token = responseStorage.token;
        return token;
    }

} 

export const getUserName = () => {

    let responseStorage = JSON.parse(localStorage.getItem("userInfo"));
    if( responseStorage ){
        let name = responseStorage.name;
        return name;
    }

}

export const getUserPerfil = () => {

    let responseStorage = JSON.parse(localStorage.getItem("userInfo"));
    if( responseStorage ){
        let perfil = responseStorage.perfil;
        return perfil;
    }

}

export const getUserId = () => {

    let responseStorage = JSON.parse(localStorage.getItem("userInfo"));
    if( responseStorage ){
        let userId = responseStorage.userId;
        return userId;
    }

}

export const getUserInfo = () => {

    let responseStorage = JSON.parse(localStorage.getItem("userInfo"));

    return responseStorage;
}

export const getNavbarItem = () => {

    let responseStorage = JSON.parse(localStorage.getItem("navBarItem"));

    return responseStorage;
}

export const getUserSu = () => {

    let responseStorage = JSON.parse(localStorage.getItem("userInfo"));
    if( responseStorage ){
        let userId = responseStorage.userSu;
        return userId;
    }

}

export const getTurma = () => {

    let responseStorage = JSON.parse(localStorage.getItem("turma"));
    return responseStorage;

}