import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { Snackbar } from '@material-ui/core';

class SForm extends Component {
    render() {
        const { children } = this.props;
        return (
            <FormControl>
                <form autoComplete="off" onSubmit={this.props.onSubmit} className={this.props.className}>
                    {
                        React.Children.map(children, (child, i) => {
                            let lines = [child, <br />, <br />];
                            if (child.props.formlabel) {
                                lines.unshift(<Typography variant={child.props.variant ? child.props.variant : "subtitle1"}>{child.props.formlabel}</Typography>);
                            }

                            if (child.props.requiredstate != null) {
                                if (!child.props.requiredstate) {
                                    return;
                                }
                            }

                            return (lines)
                        })
                    }
                    <br />
                    <Button variant="contained" color="primary" type="submit" disabled={this.props.loading}>שלח</Button>
                    <Snackbar open={this.props.snackbar} message={<span>נשלח!</span>} />
                </form>
            </FormControl>
        );
    }
}

export default SForm;