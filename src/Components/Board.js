import React, { Component } from 'react';

import { Grid } from 'semantic-ui-react'

import Square from './Square';

class Board extends Component {
    renderBox(i) {
        return <Square value={this.props.currentSquares[i]} onClick={() => this.props.onClick(i)} />;
    }

    render() {
        
        return (
            <div>
                {this.props.startGame && < hr/>}
                {this.props.startGame &&
                    
                    <Grid style={{ paddingLeft: '20%', paddingRight: '20%', textAlign: 'center', height: '50%', paddingTop: '3%', }} celled='internally'>
                        <Grid.Row columns={3} >
                            {[0, 1, 2].map((index) => {
                                return (
                                    <Grid.Column key={index}  >
                                        {this.renderBox(index)}
                                    </Grid.Column>)
                            })}


                        </Grid.Row>

                        <Grid.Row columns={3}>
                            {[3, 4, 5].map((index) => {
                                return (
                                    <Grid.Column key={index} >
                                        {this.renderBox(index)}
                                    </Grid.Column>)
                            })}
                        </Grid.Row>

                        <Grid.Row columns={3}>
                            {[6, 7, 8].map((index) => {
                                return (
                                    <Grid.Column key={index} >
                                        {this.renderBox(index)}
                                    </Grid.Column>)
                            })}
                        </Grid.Row>
                    </Grid>}

            </div>
        );
    }
}

export default Board;