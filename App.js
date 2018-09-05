import React, { Component } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import { Header, Footer } from './src/components/common'
import Navigator from './src/components/Navigator'
import * as firebase from 'firebase';
console.ignoredYellowBox = [
    'Setting a timer'
];

export default class App extends Component{

    componentWillMount(){
        const config = {
            apiKey: "xxxxxx",
            authDomain: "xxxxx.firebaseapp.com",
            databaseURL: "https://xxxxx.firebaseio.com",
            projectId: "xxxxx",
            storageBucket: "xxxxx.appspot.com",
            messagingSenderId: "xxxxx"
        };
        firebase.initializeApp(config);
    }
    render() {
        return (
            <View style={{flexGrow:1, maxHeight:'100%'}}>
                <Header content={'Birdy'} />
                <ScrollView  contentContainerStyle={{flexGrow:1}}>
                    <Navigator/>
                </ScrollView>
            </View>
        );
    }
}
