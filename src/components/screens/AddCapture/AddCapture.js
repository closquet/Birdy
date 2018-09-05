import React, {Component} from 'react'
import { View, Text, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import styles from './styles'
import firebase from 'firebase'
import { Spinner, TextInputAndLabel, Footer, BurgerMenu } from '../../common'

export default class AddCapture extends Component{

    static navigationOptions = ({ navigation }) => ({
        headerRight: <BurgerMenu navigation={navigation} />,
        headerMode: 'screen'
    });

    state = {
        name: '',
        age: '', // in year
        uid: '',
        userId: '',
        bandType: '',
        bandNumber: '',
        firstbanding: '', //"oui" or "non"
        how: '',
        mass: '', // in gramme
        sex: '', // "m" or "f"
        when: '', // aaaa-mm-jj
        where: '', // place name
        geo: {
            longitude:'',
            latitude:'',
        },
        wingspan: '', //in cm
        loadind:false
    };

    register = () => {
        if(true){
            this.setState({loading:true});
            let birdUid = firebase.database().ref().child('birdBanding').push().key;
            let user = firebase.auth().currentUser;
            firebase.database().ref('birdBanding/' + birdUid).set({
                age: this.state.age,
                uid: birdUid,
                userId: user.uid,
                bandType: this.state.bandType,
                bandNumber: this.state.bandNumber,
                firstbanding: this.state.firstbanding,
                how: this.state.how,
                mass: this.state.mass,
                name: this.state.name,
                sex: this.state.sex,
                when: this.state.when,
                where: this.state.where,
                geo: this.state.geo,
                wingspan: this.state.wingspan,
            })
            .then(()=>{
                let currentUser = firebase.auth().currentUser;
                firebase.database().ref('users/' + currentUser.uid).update({
                    bandingAmount:this.state.bandingAmount + 1,
                    lastPlace: this.state.where,
                    lastGeo: this.state.geo,
                });
                this.setState({loading:false});
            })
            .then(()=>{
                this.onRegisterSuccess();
            })
            .catch((error)=>{
                this.setState({loading:false});
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log('Capture/register error : ' + errorCode + ' : ' + errorMessage);
                alert(errorMessage);
            });
        }
    };

    onRegisterSuccess = () =>{
        console.log('bird register success');
        alert('Capture enregistré');
        this.props.navigation.navigate('Capture');
        this.setState({
            name: '',
            age: '', // in year
            uid: '',
            userId: '',
            bandType: '',
            bandNumber: '',
            firstbanding: '', //"oui" or "non"
            how: '',
            mass: '', // in gramme
            sex: '', // "m" or "f"
            when: '', // aaaa-mm-jj
            where: '', // sentence or long + lat
            wingspan: '', //in cm
            loadind:false
        });
        ToastAndroid.show('Bien enregistré', ToastAndroid.SHORT);
    };

    componentWillMount(){
        let theDate = new Date();
        theDate = theDate.getFullYear() + '-' + (  (parseInt(theDate.getMonth())+1) < 10 ? '0' + (parseInt(theDate.getMonth())+1) : parseInt(theDate.getMonth())+1  ) + '-' + (theDate.getDate() < 10 ? '0' + theDate.getDate() : theDate.getDate());
        this.setState({when: theDate});

        let currentUser = firebase.auth().currentUser;
        firebase.database().ref('/users/' + currentUser.uid).once('value').then((snapshot)=>{
            let userData = snapshot.val();
            this.setState({bandingAmount:userData.bandingAmount});
        })

        //geo loc
        navigator.geolocation.getCurrentPosition(loc=>{
            console.log('geolocalisation ok');
            this.setState({geo: {
                longitude: loc.coords.longitude+'',
                latitude: loc.coords.latitude+''
            } });
        },x=>{
            console.log('geolocalisation erreur');
            console.log(x);
        })
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
                                            onSubmitEditing={() => this.customInput2.refs.innerTextInput2.focus()}
                                            autoFocus={true}
                                            label='Nom latin'
                                            value={this.state.name}
                                            onChangeText={ name => this.setState({name}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            returnKeyType={'next'}
                                            ref={ref => this.customInput2 = ref}
                                            refInner="innerTextInput2"
                                            onSubmitEditing={() => this.customInput3.refs.innerTextInput3.focus()}
                                            label='Type de bague'
                                            value={this.state.bandType}
                                            onChangeText={ bandType => this.setState({bandType}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            returnKeyType={'next'}
                                            ref={ref => this.customInput3 = ref}
                                            refInner="innerTextInput3"
                                            onSubmitEditing={() => this.customInput4.refs.innerTextInput4.focus()}
                                            label='Est-ce une reprise? (oui ou non)'
                                            value={this.state.firstbanding}
                                            onChangeText={ firstbanding => this.setState({firstbanding}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            returnKeyType={'next'}
                                            ref={ref => this.customInput4 = ref}
                                            refInner="innerTextInput4"
                                            onSubmitEditing={() => this.customInput5.refs.innerTextInput5.focus()}
                                            label='Technique de capture'
                                            value={this.state.how}
                                            placeholder='Au filet...'
                                            onChangeText={ how => this.setState({how}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            returnKeyType={'next'}
                                            ref={ref => this.customInput5 = ref}
                                            refInner="innerTextInput5"
                                            onSubmitEditing={() => this.customInput6.refs.innerTextInput6.focus()}
                                            label='Sexe (m ou f)'
                                            value={this.state.sex}
                                            onChangeText={ sex => this.setState({sex}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            returnKeyType={'next'}
                                            ref={ref => this.customInput6 = ref}
                                            refInner="innerTextInput6"
                                            onSubmitEditing={() => this.customInput7.refs.innerTextInput7.focus()}
                                            label='Nom du lieu'
                                            value={this.state.where}
                                            onChangeText={ where => this.setState({where}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            returnKeyType={'next'}
                                            ref={ref => this.customInput7 = ref}
                                            refInner="innerTextInput7"
                                            onSubmitEditing={() => this.customInput8.refs.innerTextInput8.focus()}
                                            label='Âge (en années)'
                                            keyboardType={'numeric'}
                                            value={this.state.age}
                                            onChangeText={ age => this.setState({age}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            returnKeyType={'next'}
                                            ref={ref => this.customInput8 = ref}
                                            refInner="innerTextInput8"
                                            onSubmitEditing={() => this.customInput9.refs.innerTextInput9.focus()}
                                            label='Numero de la bague'
                                            keyboardType={'numeric'}
                                            value={this.state.bandNumber}
                                            onChangeText={ bandNumber => this.setState({bandNumber}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            returnKeyType={'next'}
                                            ref={ref => this.customInput9 = ref}
                                            refInner="innerTextInput9"
                                            onSubmitEditing={() => this.customInput10.refs.innerTextInput10.focus()}
                                            label='Poids (en grammes)'
                                            keyboardType={'numeric'}
                                            value={this.state.mass}
                                            onChangeText={ mass => this.setState({mass}) }/>
                                    </View>
                                    <View style={styles.field}>
                                        <TextInputAndLabel
                                            ref={ref => this.customInput10 = ref}
                                            refInner="innerTextInput10"
                                            onSubmitEditing={() => this.register()}
                                            label="Longueure à l'air (en cm)"
                                            keyboardType={'numeric'}
                                            value={this.state.wingspan}
                                            onChangeText={ wingspan => this.setState({wingspan}) }/>
                                    </View>

                                    <View>
                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity
                                                style={styles.button}
                                                onPress={() => {this.register();}}>
                                                <Text style={styles.buttonText}>Enregister</Text>
                                            </TouchableOpacity>
                                        </View>
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



