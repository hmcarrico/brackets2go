import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Dashboard.css';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            events: [{name: 'Smash Tournament', totalRounds: 3, currentRound: 1, activePlayers: 4, id: 1}, {name: 'March Madness', totalRounds: 4, currentRound: 2, activePlayers: 6, id: 2}, {name: 'Ping Pong', totalRounds: 6, currentRound: 5, activePlayers: 2, id: 3}, {name: 'Darts Tournament', totalRounds: 2, currentRound: 1, activePlayers: 10, id: 4}]
        }
    }
    render() {
        const myEvents = this.state.events.map(bracket => {
            return <div className='bracket-card'>
            <Link to={`/bracket/${bracket.name}/${bracket.id}`}>
                <div>
                    {bracket.name}
                </div>
                <div>
                    Round {bracket.currentRound} of {bracket.totalRounds}
                </div>
                <div>
                    {bracket.activePlayers} players remain
                </div>
            </Link>
            </div>
        })
    return (
        <div>
            {
                this.props.user
                ?
                <div>
                    <div>
                        <h1 style={{fontSize: 50, background: 'white', padding: 5}}>Dashboard</h1>
                        </div>
                    <div className='dashboard-parent'>
                        
                        <div>
                            {myEvents}
                        </div>
                    </div>
                </div>
                :
                <div>
                    {
                        this.props.history.push('/')
                    }
                </div>
            }
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Dashboard);