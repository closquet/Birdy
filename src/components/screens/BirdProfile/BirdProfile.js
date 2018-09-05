import React from 'react';
import { Text, View, FlatList, ScrollView, Image } from 'react-native';
import styles from './styles';
import firebase from 'firebase'
import  { BurgerMenu, Footer, Spinner, SoundPlayer } from '../../common'

export default class BirdProfile extends React.Component{

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.communname,
        headerRight: <BurgerMenu navigation={navigation} />,
    });

    state = {
        bird:{
            behavior : '',
            birdhouse : '',
            communname : '',
            description : '',
            family : '',
            food : '',
            image : '',
            lifespan : '',
            map : '',
            mass : 18,
            name : '',
            nidification : '',
            // sound : '',
            uid : '',
            wingspan : ''
        },
        loading:true
    };

    componentWillMount(){
        let uid = this.props.navigation.state.params.uid;
        firebase.database().ref('/encyclopedia/' + uid).once('value').then((snapshot)=>{
            let bird = snapshot.val();
            this.setState({bird});
        }).then(()=>this.setState({loading:false}));
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
                            <Image
                                style={styles.image}
                                source={{uri: this.state.bird.image}}
                            />
                        </View>
                        <FlatList
                            data={[
                                {key: 'Nom latin : ', content: this.state.bird.name},
                                {key: 'Description : ', content: this.state.bird.description},
                                {key: 'Comportement  : ', content: this.state.bird.behavior},
                                {key: 'Habitats  : ', content: this.state.bird.birdhouse},
                                {key: 'Famille : ', content: this.state.bird.family},
                                {key: 'Alimentation : ', content: this.state.bird.food},
                                {key: 'Durée de vie : ', content: this.state.bird.lifespan + ' années'},
                                {key: 'Poids : ', content: this.state.bird.mass + ' g'},
                                {key: 'nidification : ', content: this.state.bird.nidification},
                                {key: 'Taille  : ', content: this.state.bird.wingspan + ' cm'},
                            ]}
                            renderItem={({item}) => <View><Text style={styles.key}>{item.key}</Text><Text style={styles.item}>{item.content}</Text></View>}
                        />
                        <Text style={styles.repartition}>Répartition</Text>
                        <View style={styles.imgContainer}>
                            <Image
                                style={styles.map}
                                source={{uri: this.state.bird.map}}
                            />
                        </View>
                    <SoundPlayer uid={this.state.bird.uid} />
                    </View>
                        <View style={styles.footerContainer}>
                            <Footer content={'© 2017 Closquet Eric'} />
                        </View>
                </ScrollView>
            </View>
        );
    }
}