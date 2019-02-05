import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/reducer'
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Login.css'

class Login extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            loading: true,
            message: null
        }
    }

    handleKeyPress = (event) => {
        if(event.key == 'Enter'){
            this.login(this.state.username, this.state.password)
        }
    }

    login = (user, pass) => {
        axios.post(`/login/${user}/${pass}`).then(response => {
            console.log(response)
            if(response.data.user){
            this.props.updateUser(response.data.user)
            this.setState({ loding: false })
            } else if(response.data.message){
                this.setState({message: response.data.message})
            }
        })
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
render() {
    console.log('UsEr-=-=-=->', this.props.user)
    return (
        <div>
            { 
            this.props.user ?
                <div>
                    {
                        this.props.history.push('/dashboard')
                    }
                </div>
                :
            <div className='login-background'>
                <div className='login-parent'>
                <div className='login-title'>
                    {/* <div>
                        <img src={brackets} />
                    </div> */}
                    <div className={this.state.message ? 'error-message' : 'none'}>
                        <p className='x-out' onClick={() => this.setState({message: null})}>x</p>
                        <p>{this.state.message}</p>
                    </div>
                    <div className='title-names'>
                        <h1 className='login-h1One'>Social</h1> <h1 className='login-h1Two'>Brackets</h1>
                        <h1 className='login-h1Three'>Login</h1>
                    </div>
                </div>
                    <div>
                        Email: <input name='username' onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div>
                        Password: <input type='password' name='password' onChange={(e) => this.handleChange(e)} onKeyPress={this.handleKeyPress} />
                    </div>
                    <div>
                        <button onClick={() => this.login(this.state.username, this.state.password)}>Log in</button>
                    </div>
                    <div>
                        <Link to='/register' className='login-link'><p>Dont have an account? Register</p></Link>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchtoProps)(Login);