import React from 'react';
import { Text, View, FlatList, TouchableOpacity, AsyncStorage, ScrollView, Image, Geolocation } from 'react-native';
import styles from './styles';
import firebase from 'firebase';
import  { BurgerMenu, Footer, Spinner } from '../../common';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


export default class Home extends React.Component{

    static navigationOptions = ({ navigation }) => ({
        title: 'Accueil',
        headerRight: <BurgerMenu navigation={navigation} />,
    });

    state = {
        user:{
            displayName:'',
            lastPlace:null
        },
        birds: null,
        loading:true
    };

    onRegionChange(region) {
        this.state.region.setValue(region);
    }

    componentWillMount(){
        let currentUser = firebase.auth().currentUser;
        firebase.database().ref('/users/' + currentUser.uid).once('value').then((snapshot)=>{
            let userData = snapshot.val();
            this.setState({user:userData});
        })
        .then(()=>{
            this.setState({loading:false});
        });

        // Get the Storage service for the app
        let storage = firebase.storage();
        storage.ref('/birds.png').getDownloadURL().catch( () => false ).then( url => this.setState({birds:url}) );
        let theDate = new Date();
    }

    render(){
        if(this.state.loading){
            return(
                <View style={styles.spinnerContainer}>
                    <Spinner />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <ScrollView  contentContainerStyle={{flexGrow:1}}>
                    <View style={styles.content}>
                        <View style={styles.imgContainer}>
                            {this.state.birds ? (
                                <Image
                                    style={styles.birds}
                                    source={{uri: this.state.birds}}
                                />
                            ):(
                                null
                            )}
                        </View>

                        <Text style={styles.hello}>
                            Bonjour {this.state.user.displayName} !
                        </Text>

                        <View style={styles.infoContainer}>
                            <Text style={styles.textContent}>
                                Nombre de captures réalisées : {this.state.user.bandingAmount}
                            </Text>

                        {this.state.user.lastPlace ? (
                            <View>
                                <Text style={[styles.textContent,styles.captureText,]}>
                                    Dernier lieu de capture
                                </Text>
                                <View style ={styles.mapContainer}>
                                    <MapView
                                        provider={PROVIDER_GOOGLE}
                                        style={styles.map}
                                        initialRegion={{
                                            latitude: parseFloat(this.state.user.lastGeo.latitude),
                                            longitude: parseFloat(this.state.user.lastGeo.longitude),
                                            latitudeDelta: 0.011,
                                            longitudeDelta: 0.011
                                        }}
                                    >
                                        <MapView.Marker
                                            coordinate={{
                                                latitude: parseFloat(this.state.user.lastGeo.latitude),
                                                longitude: parseFloat(this.state.user.lastGeo.longitude),
                                            }}
                                            title={this.state.user.lastPlace}
                                        />
                                    </MapView>
                                </View>
                            </View>

                        ) : (
                            null
                        )}
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {this.props.navigation.navigate('AddCapture')}}>
                                <Text style={styles.buttonText}>Ajouter des captures</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                        <View style={styles.footerContainer}>
                            <Footer content={'© 2017 Closquet Eric'} />
                        </View>
                </ScrollView>
            </View>
        );
    }
}
//
// import React from 'react';
// import { View, Text } from 'react-native';
// import MapView from 'react-native-maps';
//
// export default class Home extends React.Component {
//     state = {
//         latitude: 20.9948891,
//         longitude: 105.799677,
//         latitudeDelta: 0.002,
//         longitudeDelta: 0.002
//     }
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.text}>Welcome to react-native-maps</Text>
//                 <MapView style={styles.map} initialRegion={this.state}>
//                     <MapView.Marker coordinate={this.state} />
//                 </MapView>
//             </View>
//         );
//     }
// }
//
// const styles = {
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff'
//     },
//     text: {
//         fontSize: 30,
//         fontWeight: '700',
//         color: '#59656C',
//         marginBottom: 10,
//     },
//     map: {
//         width: 300,
//         height: 300,
//         flex: 1
//     }
// };