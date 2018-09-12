import React, {
    Component
} from 'react'
import {
    View
} from 'react-native'
import {
    Actions
} from 'react-native-router-flux'
import {
    Button,
    InputItem,
    List,
    Toast
} from 'antd-mobile-rn';
import {connect} from 'react-redux'
import ActionTypes from './actions'
import LoginCommand from './actions/LoginCommand'

class Login extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.status === ActionTypes.USER_LOGIN_INPUT || nextProps.status === ActionTypes.USER_LOGIN_IN)
            return true;
        else if (nextProps.status === ActionTypes.USER_LOGIN_SUCCESS) {
            Toast.success('login success !!!', 1);
            Actions.pop();
            return false;
        }
    }

    userInput(value) {
        this.props.dispatch({
            type: ActionTypes.USER_LOGIN_INPUT,
            userLogin: {...this.props.userLogin,...value}
        });
    }

    userLogin() {
        if (this.props.status !== ActionTypes.USER_LOGIN_IN)
            this.props.dispatch(LoginCommand.userLogin(this.props.userLogin));
    }

    render() {
        return (
            <View>
                <List style={{marginTop: 10}}>
                    <InputItem
                        value={this.props.userLogin.loginName}
                        onChangeText={(value) => this.userInput({loginName:value})}
                        placeholder="loginName"
                    >
                    </InputItem>
                    <InputItem
                        onChangeText={(value) => this.userInput({password:value})}
                        value={this.props.userLogin.password}
                        placeholder="password"
                    >
                    </InputItem>
                </List>
                <Button style={{margin: 10}} onClick={() => this.userLogin()} type="primary"
                        loading={this.props.status === ActionTypes.USER_LOGIN_IN}>login</Button>
            </View>
        );
    }
}

function select(store) {
    return {
        userLogin: store.default.userStore.userLogin,
        status: store.default.userStore.status,
    }
}

export default connect(select)(Login);
