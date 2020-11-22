import React from 'react';
import { Button, Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { maskCpf } from '../../../../utils/maskAndValidators/cpf';
import { maskRa } from '../../../../utils/maskAndValidators/ra';
import { maskRg } from '../../../../utils/maskAndValidators/rg';

export default function Tabelinha( { chosenOne, classes } ){
    return (
        <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead style={{background: '#eeeeee'}}>
                                <TableRow>
                                    {chosenOne.numeroRecruta && <TableCell style={{textAlign: 'center'}}>Número</TableCell>}
                                    <TableCell style={{textAlign: 'center'}}>Post/Grad</TableCell>
                                    <TableCell style={{minWidth: 150, textAlign: 'center'}}>Nome de guerra</TableCell>
                                    <TableCell style={{minWidth: 150, textAlign: 'center'}}>Nome Completo</TableCell>
                                    <TableCell style={{minWidth: 150, textAlign: 'center'}}>cpf</TableCell>
                                    <TableCell style={{minWidth: 150, textAlign: 'center'}}>RA</TableCell>
                                    <TableCell style={{minWidth: 150, textAlign: 'center'}}>RG</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow key={chosenOne.id} className={classes.hideLastBorder}>
                                    {chosenOne.numeroRecruta && <TableCell style={{textAlign: 'center'}}>{chosenOne.numeroRecruta}</TableCell>}
                                    <TableCell style={{textAlign: 'center'}}>{chosenOne.postGrad}</TableCell>
                                    <TableCell style={{textAlign: 'center'}} >{chosenOne.nomeDeGuerra}</TableCell>
                                    <TableCell style={{textAlign: 'center'}} >{chosenOne.nomeCompleto}</TableCell>
                                    <TableCell style={{textAlign: 'center'}} >{ maskCpf(chosenOne.cpf)}</TableCell>
                                    <TableCell style={{textAlign: 'center'}} >{maskRa(chosenOne.ra)}</TableCell>
                                    <TableCell style={{textAlign: 'center'}} >{maskRg(chosenOne.rg)}</TableCell>
                                </TableRow>
                            </TableBody>

                        </Table>
                    </TableContainer>
    )
}