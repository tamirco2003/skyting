import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';

class QuickBar extends Component {
    countArray(elementArr, arr) {
        var final = {};

        for (const string of elementArr) {
            final[string] = 0
        };

        for (const string of arr) {
            if (final[string] >= 0) {
                final[string] += 1;
            }
        }
        
        return final;
    }

    render() {
        const smallData = this.countArray(this.props.elements, this.props.data);
        return (
            <React.Fragment>
                <Typography align="center" variant="subtitle1">{this.props.title}</Typography>
                <Bar data={{ datasets: [{ data: Object.values(smallData), backgroundColor: this.props.colors }], labels: this.props.labels }} />
            </React.Fragment>
        )
    }
}

export default QuickBar;