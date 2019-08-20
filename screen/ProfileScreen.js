import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, AsyncStorage} from 'react-native'
import firebase from 'firebase'
import User from '../user'
import Styles from '../styles/style'
import { SafeAreaView } from 'react-navigation';
import styles from '../styles/style';

export default class ProfileScreen extends Component {
    static navigationOptions = {
        title: 'Profile'
    }

    state = {
        name: User.name,
        newName:User.name
    }

    changeName = async () => {
        if (this.state.name.length < 3) {
            Alert.alert('Error', 'Isi dengan nama yang lebih panjang')
        } else if (User.name !== this.state.name) {
            firebase.database().ref('users').child(User.phone).set({name: this.state.name}).then(this.setState({newName:this.state.name}));
            User.name = this.state.name
            Alert.alert('Succes', 'Nama berhasil diubah')
            
        }
    }
    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth')
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ fontSize: 25 }}>
                    {this.state.newName}
                </Text>
                <Text style={{ fontSize: 20 }}>
                    {User.phone}
                </Text>
                <TextInput 
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={val => this.setState({ name: val })}
                />
                <TouchableOpacity onPress={this.changeName}>
                    <Text style={styles.buttonText}>
                        change name
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._logOut}>
                    <Text style={styles.buttonText}>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}