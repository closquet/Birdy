import React from 'react';
import { Text, View, FlatList, TouchableOpacity, AsyncStorage, ScrollView, Image } from 'react-native';
import styles from './styles';
import firebase from 'firebase'
import  { BurgerMenu, Footer, Spinner } from '../../common'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


export default class Profile extends React.Component{

    static navigationOptions = ({ navigation }) => ({
        headerRight: <BurgerMenu navigation={navigation} />,
    });

    state = {

    };

    componentWillMount(){
        let bird = this.props.navigation.state.params.bird;
        this.setState({bird});
        this.setState({loading:false});
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
                        {this.state.bird.geo ? (
                            <View>
                                <Text style={[styles.textContent,styles.captureText,]}>
                                    Lieu de capture
                                </Text>
                                <View style ={styles.mapContainer}>
                                    <MapView
                                        provider={PROVIDER_GOOGLE}
                                        style={styles.map}
                                        initialRegion={{
                                            latitude: parseFloat(this.state.bird.geo.latitude),
                                            longitude: parseFloat(this.state.bird.geo.longitude),
                                            latitudeDelta: 0.011,
                                            longitudeDelta: 0.011
                                        }}
                                    >
                                        <MapView.Marker
                                            coordinate={{
                                                latitude: parseFloat(this.state.bird.geo.latitude),
                                                longitude: parseFloat(this.state.bird.geo.longitude),
                                            }}
                                            title={this.state.bird.where}
                                        />
                                    </MapView>
                                </View>
                            </View>

                        ) : (
                            null
                        )}
                        <FlatList
                            data={[
                                {key: 'Nom latin : ' + this.state.bird.name},
                                {key: 'Numero de la bague : ' + this.state.bird.bandNumber},
                                {key: 'Âge (en années) : ' + this.state.bird.age},
                                {key: 'Type de bague : ' + this.state.bird.bandType},
                                {key: 'Est-ce une reprise? : ' + this.state.bird.firstbanding},
                                {key: 'Technique de capture : ' + this.state.bird.how},
                                {key: 'Sexe : ' + this.state.bird.sex},
                                {key: 'Date de capture : ' + this.state.bird.when},
                                {key: 'Longueure à l\'air (en cm) : ' + this.state.bird.wingspan},
                                {key: 'Nom du lieu : ' + this.state.bird.where},
                                {key: 'Longitude : ' + this.state.bird.geo.longitude},
                                {key: 'Latitude : ' + this.state.bird.geo.latitude},
                            ]}
                            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                        />
                        <View  style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {this.props.navigation.navigate('BirdEdit', {bird:this.state.bird});}}>
                                <Text style={styles.buttonText}>Editer</Text>
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