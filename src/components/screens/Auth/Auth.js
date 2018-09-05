import React, {Component} from 'react'
import { View, Text, TouchableOpacity, AsyncStorage, ScrollView, Keyboard  } from 'react-native'
import styles from './styles'
import firebase from 'firebase'
import { Spinner, TextInputAndLabel, Footer } from '../../common'

export default class Auth extends Component{

    state = {
        email : '', // 'aa@aa.be',
        password : '', // '00000000',
        loading : true,
    };

    async reconnect(){
        let userEmail = await AsyncStorage.getItem('userEmail');
        let userPassword = await AsyncStorage.getItem('userPassword');
        if(userEmail && userPassword){
            this.setState({loading:true});
            firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
                .then( () => this.onReconnectSuccess() )
                .catch((error) => {
                    this.setState({loading:false});
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log('auth/login error : ' + errorCode + ' - ' + errorMessage);
                    alert(errorMessage);
                });
        }else{
            this.setState({loading:false});
        }

    }

    login = () => {
        this.setState({loading:true});
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then( () => this.onLoginSuccess() )
            .catch((error) => {
                this.setState({loading:false});
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log('auth/login error : ' + errorCode + ' - ' + errorMessage);
                alert(errorMessage);
            });
    };

    onLoginSuccess = () =>{
        console.log('login success');
        AsyncStorage.setItem('userEmail', this.state.email);
        AsyncStorage.setItem('userPassword', this.state.password);
        this.props.navigation.navigate('Home');
        this.setState({
            loading:false,
            email:'',
            password:'',
        });
    };

    onReconnectSuccess = () =>{
        console.log('reconnect success');
        this.props.navigation.navigate('Home');
        this.setState({loading:false});
    };

    componentWillMount(){
        this.reconnect();
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView  contentContainerStyle={{flexGrow:1}}>
                    <View style={styles.content}>
                        {(this.state.loading) ? (
                            <View style={styles.spinnerContainer}>
                                <Spinner />
                            </View>
                        ):(
                            <View>
                                <View style={styles.field}>
                                    <TextInputAndLabel
                                        returnKeyType={'next'}
                                        label='Email'
                                        placeholder='example@test.com'
                                        value={this.state.email}
                                        autoCapitalize={'none'}
                                        keyboardType={'email-address'}
                                        onSubmitEditing={() => this.customInput2.refs.innerTextInput2.focus()}
                                        onChangeText={ email => this.setState({email}) }/>
                                </View>
                                <View style={styles.field}>
                                    <TextInputAndLabel
                                        ref={ref => this.customInput2 = ref}
                                        refInner="innerTextInput2"
                                        onSubmitEditing={() => {this.login();}}
                                        label='Password'
                                        placeholder={'Entrez votre mot de passe'}
                                        secureTextEntry
                                        autoCapitalize={'none'}
                                        value={this.state.password}
                                        onChangeText={ password => this.setState({password}) }/>
                                </View>
                                <View>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => {this.login();}}>
                                            <Text style={styles.buttonText}>Se connecter</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')} style={styles.signUpLink}>
                                        <Text>Créer un compte</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                    <View style={styles.footerContainer}>
                        <Footer content={'© 2017 Closquet Eric'} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

