import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';
import firebase from '../Firebase.js';
import SForm from './SForm';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
  mostContent: {
    padding: 24
  }
}

class Testing extends Component {
  constructor() {
    super();
    this.state = {
      tournament: 'd1',
      team: '',
      game: '',
      winning: 'red'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref(`${this.state.tournament}/${this.state.team}/${this.state.game}`);
    const item = {
      winning: this.state.winning
    }
    itemsRef.push(item);
    this.setState({
      name: ''
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <SForm onSubmit={this.handleSubmit} className={classes.mostContent}>
        <Select value={this.state.tournament} onChange={this.handleChange}
          inputProps={{
            name: 'tournament'
          }}>
          <MenuItem value="d1">District 1</MenuItem>
          <MenuItem value="d3">District 3</MenuItem>
        </Select>
        <TextField required name="team" label="מס' קבוצה" value={this.state.team} onChange={this.handleChange} margin="normal" />
        <TextField required name="game" label="מס' משחק" value={this.state.game} onChange={this.handleChange} margin="normal" />
        <RadioGroup required name="winning" formLabel="מי ניצח?" value={this.state.winning} onChange={this.handleChange}>
          <FormControlLabel value="red" control={<Radio />} label="אדום" />
          <FormControlLabel value="blue" control={<Radio />} label="כחול" />
          <FormControlLabel value="tie" control={<Radio />} label="תיקו" />
        </RadioGroup>
        <p requiredState={this.state.winning} requiredValue='blue'>BLUUUUUUUUUE</p>
      </SForm>
    );
  }
}

export default withStyles(styles)(Testing);
