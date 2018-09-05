import React from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import firebase from 'firebase'
import  { BurgerMenu, Footer, Spinner } from '../../common'


export default class Members extends React.Component{

    static navigationOptions = ({ navigation }) => ({
        title: 'Membres',
        headerRight: <BurgerMenu navigation={navigation} />,
    });

    state = {
        users:{},
        loading:true
    };

    componentWillMount(){
        firebase.database().ref('/users/').once('value').then((snapshot)=>{
            let users=[];
            snapshot.forEach((item)=>{
                users.push(item.val());
            });
            this.setState({users});
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
                        <FlatList
                            keyExtractor={ (item, index) => item.uid }
                            data={this.state.users}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Profile', {uid:item.uid,displayName:item.displayName})}>
                                    <Text style={styles.user}>{item.displayName}</Text>
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