export function renderNavbar( e ){
    return {
        type: 'RENDER_NAVBAR',
        payLoad: e
    }
}

export function renderLeftDrawner( e ){
    return {
        type: 'LEFTDRAWNER_RENDER',
        payLoad: e
    }
}
