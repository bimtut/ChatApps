import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, AsyncStorage, FlatList, SafeAreaView } from 'react-native'
import User from '../user'
import styles from '../styles/style'
import firebase from 'firebase'

class HomeScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('ChatApps/assets/images/man.png')} style={{ width: 32, height: 32, marginRight: 7 }} />
                </TouchableOpacity>
            ),
            title: 'CHATS',
        }
    }

    state = {
        users: []
    }

    componentWillMount() {
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.phone = val.key
            if (person.phone === User.phone) {
                User.name = person.name
            } else {
                this.setState((prevState => {
                    return {
                        users: [...prevState.users, person]
                    }
                }))
            }
        })
    }

    renderRow = ({ item }) => {
        return (
            <TouchableOpacity style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }} onPress={() => this.props.navigation.navigate('Chat', item)}>
                <Text style={{ fontSize: 20 }}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }

    // _logOut = async () => {
    //     await AsyncStorage.clear();
    //     this.props.navigation.navigate('Auth')
    // }

    render() {
        return (
            // <View style={styles.container}>
            //     <Text>
            //         Hello, This is {User.phone}
            //     </Text>
            //     <TouchableOpacity onPress={this._logOut}>
            //         <Text>
            //             Log out
            //         </Text>
            //     </TouchableOpacity>
            // </View>
            <SafeAreaView>
                <FlatList
                    data={this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.phone}
                />
            </SafeAreaView>
        )
    }
}

export default HomeScreen