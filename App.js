import styles from './styles/style'
import React, { Fragment } from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, TouchableOpacity, Alert, AsyncStorage
} from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './screen/loginScreen'
import HomeScreen from './screen/homeScreen'
import AuthLoadingScreen from './screen/AuthLoadingScreen'
import ChatScreen from './screen/chatScreen'
import ProfileScreen from './screen/ProfileScreen'

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = createStackNavigator({ Home: HomeScreen, Chat: ChatScreen, Profile: ProfileScreen });
const AuthStack = createStackNavigator({ LogIn: LoginScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));