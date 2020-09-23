export const masckPerfil = ( perfil ) => {

    if( perfil == 'ROLE_ADMIN' ) return 'Administrador'
    else if( perfil == 'ROLE_CHEFE_INFO' ) return 'Chefe Informática';
    else if( perfil == 'ROLE_BRIGADA' ) return 'Brigada';
    else if( perfil == 'ROLE_SGTE' ) return 'Sargenteante';
    else if( perfil == 'ROLE_AUXSGTE_JUST' ) return 'Aux sgte justiça';
    else if( perfil == 'ROLE_AUXSGTE_SAUDE' ) return 'Aux sgte saúde';

}