import React, { Component } from 'react';
import './DetailedBracket.css';

class DetailedBracket extends Component {
    constructor(){
        super();
        this.state = {
            bracketInfo: [
                {
                    name: 'Smash Tournament',
                    totalRounds: 3,
                    currentRound: 1,
                    activePlayers: 4,
                    initialSetup: false
                }
            ],
            players: [
                {
                    name: 'Travis',
                    totalRounds: 3,
                    currentRound: 1,
                    bracketPairId: 0,
                    winner: null
                },
                {
                    name: 'Hunter',
                    totalRounds: 3,
                    currentRound: 1,
                    bracketPairId: 0,
                    winner: null
                },
                {
                    name: 'Sean',
                    totalRounds: 3,
                    currentRound: 1,
                    bracketPairId: 0,
                    winner: null
                },
                {
                    name: 'Michael',
                    totalRounds: 3,
                    currentRound: 1,
                    bracketPairId: 0,
                    winner: null
                }
            ],
        pairs: []         
        }
    }

    componentDidMount(){
        if(this.state.bracketInfo[0].initialSetup === false){
            this.bracketPairsInitial()
        }
    }

    bracketPairsInitial = () => {
        let playersArray = this.state.players.slice();

        let playerCount = playersArray.length;
    
        if(playerCount % 2 !== 0){
            playersArray.push({name: 'PLACEHOLDER', bracketPairId: -2})
        }
    
        let pairs = []
    
        for (let i = playersArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = playersArray[i];
            playersArray[i] = playersArray[j];
            playersArray[j] = temp;
        }
    
        playersArray.reduce(function(result, value, index, array) {
        if (index % 2 === 0)
            pairs.push(array.slice(index, index + 2));
            }, []);

        //make axios call to make this.state.bracketsInfo[0].initialSetup = true
        this.setState({
            pairs: pairs
        })
    }
    
    render() {
        const bracketInfoDisplay = this.state.bracketInfo.map(bracket => {
            return <div>
                <div>
                    <h1>{bracket.name}</h1>
                </div>
                <div>
                    Current round {bracket.currentRound} of {bracket.totalRounds}
                </div>
            </div>
        })

        const officialPairs = this.state.pairs.map(array => {
            return <div className='pairs-display'>  {array.map((pair,index) => {
                if(index % 2 === 0)
                return <div>{pair.name} <br /> vs.</div>
                else{
                    return <div>{pair.name} </div>
                }
            })
            }
            </div>
        })
    return (
        <div className='bracket-background-parent'>
            {bracketInfoDisplay}
            {officialPairs}
        </div>
    )}
}

export default DetailedBracket;