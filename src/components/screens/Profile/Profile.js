import React from 'react';
import { Text, View, FlatList, TouchableOpacity, AsyncStorage, ScrollView, Image } from 'react-native';
import styles from './styles';
import firebase from 'firebase'
import  { BurgerMenu, Footer, Spinner } from '../../common'


export default class Profile extends React.Component{

    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params ? navigation.state.params.displayName : 'Mon profile' ),
        headerRight: <BurgerMenu navigation={navigation} />,
    });

    state = {
        user:{
            email: AsyncStorage.getItem('userEmail'),
            displayName:'',
            avatar:null,
        },
        myUid: null,
        loading:true

    };

    componentWillMount(){
        let me = firebase.auth().currentUser;
        this.setState({myUid:me.uid});

        if(this.props.navigation.state.params){
            let uid = this.props.navigation.state.params.uid;
            firebase.database().ref('/users/' + uid).once('value').then((snapshot)=>{
                let user = snapshot.val();
                this.setState({user});
            }).then(()=>this.setState({loading:false}));
        }else{
            let uid = me.uid;
            firebase.database().ref('/users/' + uid).once('value').then((snapshot)=>{
                let user = snapshot.val();
                this.setState({user});
            }).then(()=>this.setState({loading:false}));
        }
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
                            {this.state.user.avatar ? (
                                <Image
                                    style={styles.avatar}
                                    source={{uri: this.state.user.avatar}}
                                />
                            ):(
                                null
                            )}
                        </View>
                        <FlatList
                            data={[
                                {key: 'Nom : ' + this.state.user.displayName},
                                {key: 'Adresse email : ' + this.state.user.email},
                            ]}
                            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                        />
                        {(this.state.myUid === this.state.user.uid) &&(
                            <View  style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {this.props.navigation.navigate('EditProfile');}}>
                                    <Text style={styles.buttonText}>Editer</Text>
                                </TouchableOpacity>
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