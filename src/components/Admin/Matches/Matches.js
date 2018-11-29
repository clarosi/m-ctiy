import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import AdminLayout from '../../../hoc/AdminLayout/AdminLayout';

import { matchesCollection } from '../../../firebase/firebaseConfig';
import { firebaseDataTrans } from '../../../shared/utility/helperFunctions';
import * as routes from '../../../shared/utility/routeConstants';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

class AdminMatches extends Component {
    state = {
        isFetchingMatches: true,
        matches: [],
        tableCells: ['Date', 'Match', 'Result', 'Final']
    };

    componentDidMount() {
        matchesCollection.once('value').then(res => {
            const matches = firebaseDataTrans(res);

            this.setState({
                isFetchingMatches: false,
                matches: matches.reverse()
            });
        })
        .catch(err => {
            this.setState({isFetchingMatches:false});
        });
    }

    render() {
        let tableBody = null;

        if (!this.state.isFetchingMatches && this.state.matches.length > 0) {
            tableBody = (
                <TableBody>
                    {
                        this.state.matches.map((match, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {match.date}
                                </TableCell>
                                <TableCell>
                                    <Link style={{
                                        textDecoration: 'underline',
                                        color: '#3f51b5'
                                        }} 
                                        to={`${routes.adminAddEditMatch}/${match._id}`}
                                    >
                                        {match.away} - {match.local}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {match.resultAway} - {match.resultLocal}
                                </TableCell>
                                <TableCell>
                                    { match.final === 'Yes' ?
                                        <span className="matches_tag_red">Final</span>
                                        :
                                        <span className="matches_tag_green">Not played yet</span>
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            );
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
                { this.state.isFetchingMatches ?
                    <LinearProgress />
                    :
                    null
                }
            </AdminLayout>
        );
    }
}

export default AdminMatches;