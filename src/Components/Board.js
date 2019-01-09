import React from 'react';

import { Grid } from 'semantic-ui-react'

import Square from './Square';

const Board = ({startGame, currentSquares, onClick, winnerTiles}) => ( 
            <div>
                {startGame && < hr/>}
                {startGame &&
                    
                    <Grid style={{ paddingLeft: '20%', paddingRight: '20%', textAlign: 'center', height: '50%', paddingTop: '3%', }} celled='internally'>
                        <Grid.Row columns={3} >
                            {[0, 1, 2].map((index) => {
                                console.log(index in winnerTiles, index, winnerTiles);
                                return (
                                    <Grid.Column key={index}  >
                                        {<Square className={winnerTiles.includes(index) ? 'winner' : ''} value={currentSquares[index]} onClick={() => onClick(index)} />}
                                    </Grid.Column>)
                            })}


                        </Grid.Row>

                        <Grid.Row columns={3}>
                            {[3, 4, 5].map((index) => {
                                console.log(index in winnerTiles, index, winnerTiles);
                                return (
                                    <Grid.Column key={index} >
                                        {<Square className={winnerTiles.includes(index) ? 'winner' : ''} value={currentSquares[index]} onClick={() => onClick(index)} />}
                                    </Grid.Column>)
                            })}
                        </Grid.Row>

                        <Grid.Row columns={3}>
                            {[6, 7, 8].map((index) => {
                                console.log(index in winnerTiles, index, winnerTiles);
                                return (
                                    <Grid.Column key={index} >
                                        {<Square className={winnerTiles.includes(index) ? 'winner' : ''} value={currentSquares[index]} onClick={() => onClick(index)} />}
                                    </Grid.Column>)
                            })}
                        </Grid.Row>
                    </Grid>}

            </div>
        );
   

export default Board;