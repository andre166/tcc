import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Table from 'material-table';
import tableIcons from './tableIcons';
import { Paper } from '@material-ui/core';
import { MTablePagination } from 'material-table';

const useStyles = makeStyles((theme) => ({
    centralizar:{
      padding: 0,
      margin: 0,
      alignItems: 'center',
      justifyContent: 'center',
      letterSpacing: '0.5px',
    },
}));


export default function GenerateTable( { columns, data, minBodyHeight, maxBodyHeight, elevation }){

    return (
      <Table
      
        icons={tableIcons}
        title={''}
        columns={columns}
        data={data}
        localization={{
            body: {
                emptyDataSourceMessage: 'Nenhum registro para exibir',
                filterRow: {
                  filterTooltip: 'Filtro'
              }
            },
            toolbar: {
                searchPlaceholder: 'Pesquisar...'
            },
            pagination: {
              labelRowsSelect: 'linhas',
              labelDisplayedRows: ' {from}-{to} de {count}',
              firstTooltip: 'Primeira página',
              previousTooltip: 'Página anterior',
              nextTooltip: 'Próxima página',
              lastTooltip: 'Última página'
            },
            
          }}

          options={{
            pageSize: 10,
            minBodyHeight: '100%',
            maxBodyHeight: maxBodyHeight || 400,
            showTitle: false,
            emptyRowsWhenPaging: false,
            filtering: true,
            paging: true,
            draggable: false,
            toolbar: true,
            headerStyle: {
                textAlign: 'center',
                position: 'sticky', top: 0
            },
            rowStyle: {padding: '4px !important'}
        }}

        components={{
            Container: props => <Paper {...props} elevation={elevation || 0} style={{border: 'none'}}/>,
        }}

      />

    );

  }