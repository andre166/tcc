
// export const localHost = 'http://localhost:8080';
export const localHost = 'https://shrouded-beach-54414.herokuapp.com';


export const hearderContent = ( token ) => {
    return {
        'Authorization': `Bearer ${token}`,
        'Host': localHost
      }
}
