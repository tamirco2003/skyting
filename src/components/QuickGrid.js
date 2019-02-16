import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

class QuickGrid extends Component {
    render() {
        const { children } = this.props;
        return (
            <Grid container spacing={16} {...this.props}>
                {React.Children.map(children, (child, i) => {
                    return (
                        <Grid item xs={child.props.xs ? child.props.xs : true}>
                            {child}
                        </Grid>
                    )
                }
                )}
            </Grid>
        )
    }
}

export default QuickGrid;