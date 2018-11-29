import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import AdminLayout from '../../../hoc/AdminLayout/AdminLayout';

import { playersCollection } from '../../../firebase/firebaseConfig';
import { firebaseDataTrans } from '../../../shared/utility/helperFunctions';
import * as routes from '../../../shared/utility/routeConstants';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

class Players extends Component {
    state = {
        isFetchingPlayers: true,
        players: [],
        tableCells: ['Firstname', 'Lastname', 'Number', 'Position']
    };

    componentDidMount() {
        playersCollection.once('value').then(res => {
            const players = firebaseDataTrans(res);

            this.setState({
                isFetchingPlayers: false,
                players: players.reverse()
            });
        })
        .catch(err => {
            this.setState({isFetchingPlayers:false});
        });
    }

    render() {
        let tableBody = null;

        if (!this.state.isFetchingPlayers && this.state.players.length > 0) {
            tableBody = (
                <TableBody>
                {
                    this.state.players.map((player, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Link style={{
                                        textDecoration: 'underline',
                                        color: '#3f51b5'
                                        }} 
                                        to={`${routes.adminAddEditPlayer}/${player._id}`}
                                >
                                    {player.name}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link style={{
                                        textDecoration: 'underline',
                                        color: '#3f51b5'
                                        }} 
                                        to={`${routes.adminAddEditPlayer}/${player._id}`}
                                >
                                    {player.lastname}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link  to={`${routes.adminAddEditPlayer}/${player._id}`}>
                                    {player.number}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link  to={`${routes.adminAddEditPlayer}/${player._id}`}>
                                    {player.position}
                                </Link>
                            </TableCell>                               
                        </TableRow>
                    ))
                }
                </TableBody>
            )
        }

        return (
            <AdminLayout>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {this.state.tableCells.map((tableCell, index) => (
                                    <TableCell key={index}>{tableCell}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {tableBody}
                    </Table>
                </Paper>
                { this.state.isFetchingPlayers ?
                    <LinearProgress />
                    :
                    null
                }
            </AdminLayout>
        );
    }
}

export default Players;