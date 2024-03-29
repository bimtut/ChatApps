import React, { Component } from 'react'
import { Dimensions, SafeAreaView, TouchableOpacity, Text, TextInput, View } from 'react-native'
import styles from '../styles/style'
import User from '../user'
import firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler';
// import { TouchableOpacity } from 'react-native-gesture-handler';

class ChatScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name', null)
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            textMessage: '',
            person: {
                name: props.navigation.getParam('name'),
                phone: props.navigation.getParam('phone')

            }
        }
    }

    UNSAFE_componentWillMount() {
        firebase.database().ref('message').child(User.phone).child(this.state.person.phone).on('child_added', (value) => {
            this.setState((prevState) => {
                return {
                    messageList: [...prevState.messageList, value.val()]
                }
            })
        })
    }

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = firebase.database().ref('message').child(User.phone).child(this.state.person.phone).push().key
            let updates = {}
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone
            }
            updates['message/' + User.phone + '/' + this.state.person.phone + '/' + msgId] = message
            updates['message/' + this.state.person.phone + '/' + User.phone + '/' + msgId] = message
            firebase.database().ref().update(updates);
            this.setState({ textMessage: '' })
        }
    }

    renderRow = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'row',
                width: '60',
                alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === User.phone ? '#00897b' : '#7cb342',
                borderRadius: 5,
                marginBottom: 10
            }}>
                <Text style={{ color: '#fff', padding: 7, fontSize: 16 }}>
                    {item.message}
                </Text>
                <Text style={{ color: '#eee', padding: 3, fontSize: 12 }}>
                    {item.time}
                </Text>
            </View>
        )
    }

    render() {
        let { height, width } = Dimensions.get('window');
        return (
            <SafeAreaView >
                <FlatList
                    style={{ padding: 10, height: height * 0.8 }}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <TextInput style={styles.input} value={this.state.textMessage} onChangeText={val => this.setState({ 'textMessage': val })}  >
                    </TextInput>
                    <TouchableOpacity onPress={this.sendMessage}>
                        <Text style={styles.buttonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

        )
    }
}

export default ChatScreen