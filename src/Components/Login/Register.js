import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/reducer'
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Register.css';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
            loading: true,
            message: ''
        }
    }

    handleKeyPress = (event) => {
        if(event.key == 'Enter'){
            this.register(this.state.username, this.state.password)
        }
    }

    register = (user, pass) => {
        if(this.state.password === this.state.passwordConfirm){
        axios.post(`/register/${user}/${pass}`).then(response => {
            if(response.data.user){
            this.props.updateUser(response.data.user)
            this.setState({ loading: false });
            } else if(response.data.message) {
                this.setState({message: response.data.message})
            }
        })
        } else {
            this.setState({message: 'Passwords do not match'})
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
        <div>
            { 
            this.props.user === null ?
            <div className='register-background'>
                <div className='register-parent'>
                <div className={this.state.message ? 'error-message' : 'none'}>
                        <p className='x-out' onClick={() => this.setState({message: null})}>x</p>
                        <p>{this.state.message}</p>
                    </div>
                    <div className='title-names'>
                        <h1 className='login-h1One'>Social</h1> <h1 className='login-h1Two'>Brackets</h1>
                        <h1 className='login-h1Three'>Register</h1>
                    </div>
                    <div>
                        Enter Email: <input name='username' onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div>
                        Enter password: <input type='password' name='password' onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div>
                        Confirm Password: <input type='password' onKeyPress={this.handleKeyPress}  name='passwordConfirm' onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div>
                        <button onClick={() => this.register(this.state.username, this.state.password)}>Submit</button> 
                    </div>
                    <div>
                        <Link to='/' className='register-link'><p>Already a User? Login</p></Link>
                    </div>
                </div>
            </div>
            :
                this.props.history.push('/dashboard')
            }
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

export default connect(mapStateToProps, mapDispatchtoProps)(Register);