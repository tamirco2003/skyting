import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { Snackbar } from '@material-ui/core';

class SForm extends Component {
    render() {
        const { children } = this.props;
        return (
            <FormControl fullWidth>
                <form autoComplete="off" onSubmit={this.props.onSubmit} className={this.props.className}>
                    {
                        React.Children.map(children, (child, i) => 
                            <>
                                {child.props.formlabel && <Typography variant={child.props.variant ? child.props.variant : "subtitle1"}>{child.props.formlabel}</Typography>}
                                {child}
                                {/* <br />
                                <br /> */}
                            </>
                        )
                    }
                    <br />
                    <br />
                    <Button variant="contained" color="primary" type="submit" disabled={this.props.loading}>שלח</Button>
                    <Snackbar open={this.props.snackbar} message={<span>נשלח!</span>} />
                </form>
            </FormControl>
        );
    }
}

export default SForm;