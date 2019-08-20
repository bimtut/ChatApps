import React, { Component } from 'react'
import { Text, View, TouchableOpacity, AsyncStorage, FlatList, SafeAreaView } from 'react-native'
import User from '../user'
import styles from '../styles/style'
import firebase from 'firebase'

class HomeScreen extends Component {

    static navigationOptions = {
        // header: null
        title: 'CHATS'
    }

    state = {
        users: []
    }

    componentWillMount() {
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) => {
            let person = val.key;
            this.setState((prevState => {
                return {
                    users: [...prevState.users, person]
                }
            }))
        })
    }

    renderRow = ({item}) => {
        return (
            <TouchableOpacity>
                <Text>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }




    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth')
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Hello, This is {User.phone}
                </Text>
                <TouchableOpacity onPress={this._logOut}>
                    <Text>
                        Log out
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default HomeScreen