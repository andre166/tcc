
export const localHost = 'http://localhost:8080';

export const hearderContent = ( token ) => {
    return {
        'Authorization': `Bearer ${token}`,
        'Host': localHost
      }
}
