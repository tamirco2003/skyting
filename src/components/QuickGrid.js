import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

class QuickGrid extends Component {
    render() {
        const { children } = this.props;
        return (
            <Grid container spacing={16} {...this.props}>
                {React.Children.map(children, (child, i) =>
                    child ?
                        <Grid item xs={child.props.xs ? child.props.xs : true} sm={child.props.sm ? child.props.sm : false} md={child.props.md ? child.props.md : false} lg={child.props.lg ? child.props.lg : false} xl={child.props.xl ? child.props.xl : false}>
                            {child}
                        </Grid>
                        :
                        null
                )}
            </Grid>
        )
    }
}

export default QuickGrid;