import React, { Component } from 'react';

import winnerLogic from '../WinnerLogic';
import { Grid, Header, Button, Icon, Segment, Message, Dropdown } from 'semantic-ui-react'

import Board from './Board';

const headStyle = {
  textAlign: 'center', paddingLeft: '20%', paddingRight: '20%'
};

const options = [
  { value: 'A', text: 'A' }, { value: 'O', text: 'O' },
  { value: 'B', text: 'B' }, { value: 'X', text: 'X' }
]

class Game extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      player1: '',
      player2: '',
      squaresStates: [Array(9).fill(null)],
      currentSquares: Array(9).fill(null),
      nextPlayer: true,
      sameSym: false
    }
    this.state = this.initialState;
  }

  resetState = () => {
    this.setState(this.initialState);
  }

  handleChange = (e, { value }, name) => {
    console.log(e, value, name);
    if (name === 'player1' && value !== this.state.player2) {
      const copyOfSquares = this.state.currentSquares.map((elem) => elem === this.state.player1 ? value : elem);
      const copyOfSquareStates = this.state.squaresStates.map((elem) => {
        return elem.map((e) => e === this.state.player1 ? value : e)
      })
      this.setState({ player1: value, currentSquares: copyOfSquares, squaresStates: copyOfSquareStates, sameSym: false });
      return;
    }
    if (name === 'player2' && value !== this.state.player1) {
      const copyOfSquares = this.state.currentSquares.map((elem) => elem === this.state.player2 ? value : elem);
      const copyOfSquareStates = this.state.squaresStates.map((elem) => {
        return elem.map((e) => e === this.state.player2 ? value : e)
      })
      this.setState({ player2: value, currentSquares: copyOfSquares, squaresStates: copyOfSquareStates, sameSym: false });
      return;
    }
    this.setState({ sameSym: true });
    setTimeout(() => {
      this.setState({ sameSym: false });
    }, 2000)

  }

  handleClick = (i) => {
    const copyOfSquares = this.state.currentSquares.slice();
    if (winnerLogic(copyOfSquares) || copyOfSquares[i] || this.state.player1 === '' || this.state.player2 === '') {
      return;
    }
    console.log(copyOfSquares[i]);
    const squaresStates = this.state.squaresStates;
    copyOfSquares[i] = this.state.nextPlayer ? this.state.player1 : this.state.player2;
    this.setState({

      currentSquares: copyOfSquares,
      nextPlayer: !this.state.nextPlayer,
      squaresStates: squaresStates.concat([copyOfSquares])
    });
  }

  handleUndo = () => {
    const newCurrentSquares = this.state.squaresStates.slice(-2, -1)[0];
    const newSquaresStates = this.state.squaresStates.slice(0, -1);
    if (newCurrentSquares && newSquaresStates.length > 0) {
      this.setState({
        squaresStates: newSquaresStates,
        currentSquares: newCurrentSquares,
        nextPlayer: !this.state.nextPlayer
      })
    }

  }

  render() {
    let status;
    const winner = winnerLogic(this.state.currentSquares);
    let startGame = this.state.player1 !== '' && this.state.player2 !== '';

    if (winner) {
      status = winner;
    } else {
      status = (this.state.nextPlayer ? this.state.player1 : this.state.player2) + '\'s turn';
    }

    return (
      <div>
        <Header as='h2' icon textAlign='center'>
          <Icon name='game' circular />
          <Header.Content>Tic Tac Toe</Header.Content>
        </Header>
        <Grid divided>
          <Grid.Row style={headStyle} columns={2}>
            <Grid.Column >
              <h3>Player 1</h3>
              <Dropdown placeholder='Select Symbol' selection fluid value={this.state.player1} onChange={(e, { value }) => this.handleChange(e, { value }, 'player1')} options={options} />
            </Grid.Column>
            <Grid.Column>
              <h3>Player 2</h3>
              <Dropdown placeholder='Select Symbol' selection fluid value={this.state.player2} onChange={(e, { value }) => this.handleChange(e, { value }, 'player2')} options={options} />
            </Grid.Column>
          </Grid.Row>

          {this.state.sameSym &&
            <Grid.Row columns={1} style={headStyle}>
              <Grid.Column>
                <Message color='red'>Both players can not have same symbols!</Message>
              </Grid.Column>
            </Grid.Row>}

          {!startGame &&
            <Grid.Row style={headStyle} columns={1}>
              <Grid.Column >
                <Message color='blue' size="huge">Select Symbols to start the game!</Message>

              </Grid.Column>
            </Grid.Row>}

          {startGame &&
            <Grid.Row columns={2} style={headStyle}>
              <Grid.Column >
                <Segment color='black' inverted><div className="status" ><b>{status}</b></div></Segment>
              </Grid.Column>
              <Grid.Column >
                <Button style={{ fontSize: '1em' }} icon="undo" onClick={this.handleUndo} content="undo" labelPosition='left' />
                <Button style={{ fontSize: '1em', margin: '1%' }} onClick={this.resetState} icon="refresh" content="Restart" labelPosition='right' />
              </Grid.Column>


            </Grid.Row>}
        </Grid>
        <Board currentSquares={this.state.currentSquares} onClick={this.handleClick} startGame={startGame} />
      </div>

    );
  }
}
export default Game;
