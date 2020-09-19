export const getToken = () => {
    let responseStorage = JSON.parse(localStorage.getItem("userInfo"));
    let token = responseStorage.token;
    return token;
} 