import React, { Component } from 'react';
import firebase from '../Firebase'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        firebase.database().ref("scouters").on("value", (snapshot) => {
            const snapshotVal = snapshot.val();
            const data = [];
            for (const key in snapshotVal) {
                data.push([key, snapshotVal[key].formsFilled]);
            }
            data.sort((a, b) => b[1] - a[1]);
            this.setState({
                data: data
            })
        });
    }

    render() {
        if (!this.state.data) {
            return (
                <center className="mostContent">
                    <CircularProgress />
                </center>
            );
        }
        return (
            <div className="mostContent">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right"><Typography variant="h5">שם</Typography></TableCell>
                            <TableCell align="right"><Typography variant="h5">כמה סקאוטינג עשה?</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map((value, index) =>
                            <TableRow key={index}>
                                <TableCell align="right" component="th" scope="row"><Typography variant="h6">{value[0]}</Typography></TableCell>
                                <TableCell align="right"><Typography variant="h6">{value[1]}</Typography></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default Leaderboard;