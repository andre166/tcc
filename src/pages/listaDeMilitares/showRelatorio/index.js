import React, {Component} from 'react';
import RelatorioTable from './components/relatorio/relatorioTable';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import store from './store';

class ShowRelatorio extends Component {

  constructor( props ){
        
    super( props );

    this.state = {
      renderRelatorio: true,
    }
    
  }

  componentDidUpdate( prevProps ){

    if( prevProps !== this.props ){

      const closeRelatorio = async () => {
        await this.setState(() => ({ renderRelatorio: false }) );
        openRelatorio()
      }


      const openRelatorio = async () => {
        await this.setState( () => ({ renderRelatorio: true }) );
      }

      closeRelatorio()

      
    }

  }

  render(){
    return (
    <Provider store={store}>
      <div>
        {this.state.renderRelatorio == false ? '' :
          <RelatorioTable relatorio={this.props.relatorio} customColumns={this.props.customColumns}/>
        }
      </div>
    </Provider>
    );
  }
}

ShowRelatorio.propTypes = {
  relatorio: PropTypes.array.isRequired,
  customColumns: PropTypes.array,

};

export default ShowRelatorio;
