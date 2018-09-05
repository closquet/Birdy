import React from 'react'
import { Text, View, TouchableOpacity, AsyncStorage, ScrollView, Button, Image, Platform  } from 'react-native'
import styles from './styles'
import firebase from 'firebase'
import ImagePicker from 'react-native-image-picker'
import { Spinner, TextInputAndLabel, BurgerMenu, Footer } from '../../common'
import RNFetchBlob from 'react-native-fetch-blob'

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class EditProfile extends React.Component{

    static navigationOptions = ({ navigation }) => ({
        title: 'Profile',
        headerRight: <BurgerMenu navigation={navigation} />,
        headerMode: 'screen'
    });

    state = {
        email : '',
        displayName:'',
        loading : true,
        avatar:null,
        avatarSource:null
    };

    uploadImage(uri, mime = 'application/octet-stream') {
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            let uploadBlob = null

            let user = firebase.auth().currentUser;
            const imageRef = firebase.storage().ref('users/' + user.uid ).child('avatar')

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: mime })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    resolve(url)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    getImage = () => {
        const options = {
            title: 'Select Avatar',
            takePhotoButtonTitle: 'Prendre une Photo',
            chooseFromLibraryButtonTitle:'Ouvrir la galerie',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // let source = { uri: response.uri };
                // this.setState({image_uri: response.uri})

                // You can also display the image using data:
                // let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({loading:true});
                this.uploadImage(response.uri, response.type)
                    .then(url => {
                        this.setState({avatar: url})
                    })
                    .then(()=>{
                        let user = firebase.auth().currentUser;
                        firebase.database().ref('users/' + user.uid).update({
                            avatar:this.state.avatar
                        });
                        this.setState({loading:false});
                    })
                    .catch(error => console.log(error))
            }
        });
    };

    handleButtonPress = () => {
        this.getImage();
    };

    save = () => {
        let user = firebase.auth().currentUser;
        if(this.state.email === ''){
            alert('Veuillez choisir une email');
            return false;
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(this.state.email) === false){
            alert('Veuillez choisir une email valide');
            return false;
        }
        this.setState({loading:true});
        //--------------- try to update
        user.updateProfile({
            displayName: this.state.displayName,
        }).then(()=>{
            let user = firebase.auth().currentUser;
            user.updateEmail(this.state.email).then(()=>{
                this.onSaveSuccess();
            }).catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log('EditProfile/save error : ' + errorCode + ' - ' + errorMessage);
            });
        }).catch((error)=>{
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log('EditProfile/save error : ' + errorCode + ' - ' + errorMessage);
        });
    };

    onSaveSuccess = () =>{
        console.log('update success');
        AsyncStorage.setItem('userEmail', this.state.email);
        this. writeUserData();
        this.props.navigation.navigate('Profile');
        this.setState({loading:false});
    };

    writeUserData() {
        let user = firebase.auth().currentUser;
        firebase.database().ref('users/' + user.uid).update({
            displayName: this.state.displayName,
            email: this.state.email,
            avatar:this.state.avatar
        });
    }

    componentWillMount(){
        let me = firebase.auth().currentUser;

        let uid = me.uid;
        firebase.database().ref('/users/' + uid).once('value').then((snapshot)=>{
            let user = snapshot.val();
            this.setState({email:user.email,displayName:user.displayName, avatar:user.avatar});
        }).then(()=>this.setState({loading:false}));
    }

    render(){
        return (
            <View style={styles.container}>
                <ScrollView  contentContainerStyle={{flexGrow:1}}>
                    <View style={styles.content}>
                        {(this.state.loading) ? (
                            <View style={styles.spinnerContainer}>
                                <Spinner />
                            </View>
                        ):(
                            <View>
                                <View style={styles.imgContainer}>
                                    {this.state.avatar ? (
                                        <Image
                                            style={styles.avatar}
                                            source={{uri: this.state.avatar}}
                                        />
                                    ):(
                                        null
                                    )}
                                </View>
                                <Button title="Charger une image" onPress={this.handleButtonPress} />
                                <View style={styles.field}>
                                    <TextInputAndLabel
                                        returnKeyType={'next'}
                                        onSubmitEditing={() => this.customInput2.refs.innerTextInput2.focus()}
                                        label='Email'
                                        autoCapitalize={'none'}
                                        keyboardType={'email-address'}
                                        value={this.state.email}
                                        onChangeText={ email => this.setState({email}) }/>
                                </View>
                                <View style={styles.field}>
                                    <TextInputAndLabel
                                        ref={ref => this.customInput2 = ref}
                                        refInner="innerTextInput2"
                                        onSubmitEditing={() => this.save()}
                                        label='Nom Complet'
                                        value={this.state.displayName}
                                        onChangeText={ displayName => this.setState({displayName}) }/>
                                </View>
                                <View>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => {this.save();}}>
                                            <Text style={styles.buttonText}>Enregistrer</Text>
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
