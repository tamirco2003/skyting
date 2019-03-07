import React from "react";
import { Button, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

function Counter(props) {
    return (
        <div style={{ display: "block" }}>
            <Button variant="outlined" onClick={() => {
                if (props.value < props.max) {
                    props.onChange({
                        target: {
                            name: props.name,
                            value: props.value + 1
                        }
                    });
                }
            }}>+</Button>
            <Typography variant="h6" style={{ display: "inline-block", padding: 16 }}>
                {props.value}
            </Typography>
            <Button variant="outlined" onClick={() => {
                    if (props.value > props.min)
                        props.onChange({
                            target: {
                                name: props.name,
                                value: props.value - 1
                            }
                        });
                }}>-</Button>
        </div>
    );
}

Counter.propTypes = {
    value: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number
};

Counter.defaultProps = {
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
};

export default Counter;
