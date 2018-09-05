import React from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import firebase from 'firebase'
import  { BurgerMenu, Footer, Spinner } from '../../common'


export default class AllMyCaptures extends React.Component{

    static navigationOptions = ({ navigation }) => ({
        title: 'Mes captures',
        headerRight: <BurgerMenu navigation={navigation} />,
    });

    state = {
        users:{},
        myCaptures:null,
        loading:true
    };

    componentWillMount(){
        firebase.database().ref('/users/').once('value').then((snapshot)=>{
            let users=[];
            snapshot.forEach((item)=>{
                users.push(item.val());
            });
            this.setState({users});
        })
        .then(()=>{
            let currentUser = firebase.auth().currentUser;
            firebase.database().ref('/birdBanding/').once('value').then((snapshot)=>{
                let myCaptures=[];
                snapshot.forEach((item)=>{
                    currentUser.uid === item.val().userId && myCaptures.push(item.val());
                });
                this.setState({myCaptures});
            })
            .then(()=>{
                this.setState({loading:false});
            })
        });

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
                        <FlatList
                            keyExtractor={ (item, index) => item.uid }
                            data={this.state.myCaptures}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('CaptureDetails', {bird:item})}>
                                    <View style={styles.birdContainer}>
                                        <Text style={styles.birdPart}>Nom : {item.name}</Text>
                                        <Text style={styles.birdPart}>Numero de bague : {item.bandNumber}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={styles.footerContainer}>
                        <Footer content={'© 2017 Closquet Eric'} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}