import React from 'react';
import './estilo.css';
// import ShowRela from './showRelatorio';
import { connect } from 'react-redux';

import { 
    renderNavbar, 
} from '../../components/actions/navbarActions';

import { bindActionCreators } from 'redux';

import XsDrawner from '../../components/navbar/xsDrawner';


function Home( props ){

    return(
        <div class="home-container">
            <h1 class="text-center">HOME</h1>
            <XsDrawner/>
        </div>
    );
    
}

const mapDispatchToProps = dispatch => bindActionCreators({ renderNavbar }, dispatch)
  
const mapStateToProps =  state => state;
export default connect( mapStateToProps, mapDispatchToProps )(Home)
  
  

