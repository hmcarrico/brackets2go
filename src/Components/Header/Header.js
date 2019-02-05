import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {updateUser} from '../../ducks/reducer';
import {connect} from 'react-redux';
import axios from 'axios';
import Logo from '../Media/social-bracket-logo-v2-color-fix.svg';
import './Header.css';

class Header extends Component{
    logout = () => {
        axios.post('/logout').then(response => {
            this.props.updateUser(null)
            alert('Logged out')
        })
    };
    render(){
        return (
            <div className='header-parent'>
            <img src={Logo} onClick={() => this.props.history.push('/')}/>
            <button onClick={() => this.logout()}>Logout</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchtoProps = {
    updateUser
}

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(Header));