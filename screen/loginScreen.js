import styles from '../styles/style'
import React, { Fragment } from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, TouchableOpacity, Alert, AsyncStorage
} from 'react-native';
import User from '../user';
// import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'


class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    phone: '',
    name: ''
  }

  componentWillMount() {
    AsyncStorage.getItem('userPhone').then(val => {
      if (val) {
        this.setState({
          phone: val
        })
      }
    })
  }

  submitForm = async () => {
    if (this.state.phone.length < 10) {
      Alert.alert('Error', 'Nomor anda belum lengkap')
    } else if (this.state.name.length < 3) {
      Alert.alert('Error', 'Nama anda terlalu pendek')
    } else {
      await AsyncStorage.setItem('userPhone', this.state.phone)
      User.phone = this.state.phone
      firebase.database().ref('users/' + User.phone).set({ name: this.state.name })
      this.props.navigation.navigate('App');
    }

    // alert(`phone number :\n${this.state.phone}\nname :\n${this.state.name}`)
    // alert(this.state.phone+'\n'+this.state.name)

  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder='phone number' onChangeText={val => this.setState({ 'phone': val })} value={this.state.phone} keyboardType='number-pad'>

        </TextInput>
        <TextInput style={styles.input} placeholder='name' onChangeText={val => this.setState({ 'name': val })} value={this.state.name}>

        </TextInput>
        <TouchableOpacity onPress={this.submitForm}>
          <Text>
            Enter
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

};





export default LoginScreen;
