import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';

class QuickLine extends Component {
    render() {
        const datasets = [];
        for (let i = 0; i < this.props.datasets.length; i++) {
            datasets.push({
                data: this.props.datasets[i],
                label: this.props.labels[i],
                borderColor: this.props.colors[i],
                fill: false,
                lineTension: 0.2
            })
        }
        return (
            <React.Fragment>
                <Typography align="center" variant="subtitle1">{this.props.title}</Typography>
                <Line data={{ labels: [...Array(this.props.datasets[0].length).keys()], datasets: datasets }} />
            </React.Fragment>
        )
    }
}

export default QuickLine;