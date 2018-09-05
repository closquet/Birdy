import React from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import firebase from 'firebase'
import  { BurgerMenu, Footer, Spinner } from '../../common'


export default class Encyclopedia extends React.Component{

    static navigationOptions = ({ navigation }) => ({
        title: 'Encyclopedie',
        headerRight: <BurgerMenu navigation={navigation} />,
    });

    state = {
        birds:{},
        loading:true
    };

    componentWillMount(){
        firebase.database().ref('/encyclopedia/').once('value').then((snapshot)=>{
            let birds=[];
            snapshot.forEach((item)=>{
                birds.push(item.val());
            });
            this.setState({birds});
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
                            data={this.state.birds}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('BirdProfile', {uid:item.uid,communname:item.communname})}>
                                    <Text style={styles.bird}>{item.communname}</Text>
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