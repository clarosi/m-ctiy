import React, { Component } from 'react';
import { firebaseDB } from '../../firebase/firebaseConfig';
import { firebaseDataTrans } from '../../shared/utility/helperFunctions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';

const style = {
    cell:{
        padding: '4px 16px 4px 11px',
        borderBottom: '1px solid #ffffff',
        color: '#ffffff',
        textAlign: 'center'
    }
};

class LeagueTable extends Component {
    state = {
        isLoading: true,
        positions:[],
        tableRows: ['Rank', 'Team', 'W', 'L', 'D', 'Pts']
    };

    componentDidMount(){
        firebaseDB.ref('positions').once('value')
        .then(res => {
            const positions = firebaseDataTrans(res);

            this.setState({
                positions,
                isLoading: false
            });
        })
    }

    showTeamPositionsHandler = (pos) => (
        pos ?
            pos.map((pos, index)=>(
                <TableRow key={index}>
                    <TableCell style={style.cell}>{index + 1}</TableCell>
                    <TableCell style={style.cell}>{pos.team}</TableCell>
                    <TableCell numeric style={style.cell}>{pos.w}</TableCell>
                    <TableCell numeric style={style.cell}>{pos.d}</TableCell>
                    <TableCell numeric style={style.cell}>{pos.l}</TableCell>
                    <TableCell numeric style={style.cell}>{pos.pts}</TableCell>
                </TableRow>
            ))
            :null
    )

    render() {       
        return (
            <div className="league_table_wrapper">
                <div className="title">
                    League Table
                </div>
                <div style={{background: '#98c6e9'}}>
                    {!this.state.isLoading ?              
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {this.state.tableRows.map((tableRow, index) => (
                                        <TableCell key={index} style={style.cell}>{tableRow}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.showTeamPositionsHandler(this.state.positions)}
                            </TableBody>
                        </Table>
                        :
                        <LinearProgress />
                    }
                </div>
            </div>
        )
    }
};

export default LeagueTable;