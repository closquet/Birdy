import React, {Component} from 'react'
import { View, Text, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import styles from './styles'
import firebase from 'firebase'
import { Spinner, TextInputAndLabel, Footer, BurgerMenu } from '../../common'

export default class BirdEdit extends Component{

    static navigationOptions = ({ navigation }) => ({
        headerRight: <BurgerMenu navigation={navigation} />,
        headerMode: 'screen'
    });

    state = {
        name: '',
        age: '', // in year
        bandType: '',
        bandNumber: '',
        firstbanding: '', //"oui" or "non"
        how: '',
        mass: '', // in gramme
        sex: '', // "m" or "f"
        when: '', // aaaa-mm-jj
        where: '', // place name
        longitude: '',
        latitude: '',
        wingspan: '', //in cm
        loadind:true
    };

    register = () => {
        if(true){
            this.setState({loading:true});
            let birdUid = this.props.navigation.state.params.bird.uid;
            firebase.database().ref('birdBanding/' + birdUid).update({
                age: this.state.age,
                bandType: this.state.bandType,
                bandNumber: this.state.bandNumber,
                firstbanding: this.state.firstbanding,
                how: this.state.how,
                mass: this.state.mass,
                name: this.state.name,
                sex: this.state.sex,
                when: this.state.when,
                where: this.state.where,
                geo: {
                    longitude:this.state.longitude,
                    latitude:this.state.latitude
                },
                wingspan: this.state.wingspan,
            })
            .then(()=>{
                this.onRegisterSuccess();
            })
            .catch((error)=>{
                this.setState({loading:false});
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log('BirdEdit/register error : ' + errorCode + ' : ' + errorMessage);
                alert(errorMessage);
            });
        }
    };

    onRegisterSuccess = () =>{
        this.setState({loading:false});
        console.log('bird edit success');
        alert('Capture éditée');
        this.props.navigation.navigate('AllMyCaptures');
        ToastAndroid.show('Bien enregistré', ToastAndroid.SHORT);
    };

    componentWillMount(){
        let bird = this.props.navigation.state.params.bird;
        this.setState({
            name: bird.name,
            age: bird.age,
            bandType: bird.bandType,
            bandNumber: bird.bandNumber,
            firstbanding: bird.firstbanding,
            how: bird.how,
            mass: bird.mass,
            sex: bird.sex,
            when: bird.when,
            where: bird.where,
            longitude:bird.geo.longitude,
            latitude:bird.geo.latitude,
            wingspan: bird.wingspan,
            loadind:true
        });
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
                                        returnKeyType={'next'}
                                        ref={ref => this.customInput10 = ref}
                                        refInner="innerTextInput10"
                                        onSubmitEditing={() => this.customInput11.refs.innerTextInput11.focus()}
                                        label='Date de capture'
                                        value={this.state.when}
                                        onChangeText={ when => this.setState({when}) }/>
                                </View>
                                <View style={styles.field}>
                                    <TextInputAndLabel
                                        returnKeyType={'next'}
                                        ref={ref => this.customInput11 = ref}
                                        refInner="innerTextInput11"
                                        onSubmitEditing={() => this.customInput12.refs.innerTextInput12.focus()}
                                        label='Longitude'
                                        keyboardType={'numeric'}
                                        value={this.state.longitude}
                                        onChangeText={ longitude => this.setState({longitude}) }/>
                                </View>
                                <View style={styles.field}>
                                    <TextInputAndLabel
                                        returnKeyType={'next'}
                                        ref={ref => this.customInput12 = ref}
                                        refInner="innerTextInput12"
                                        onSubmitEditing={() => this.customInput13.refs.innerTextInput13.focus()}
                                        label='Latitude'
                                        keyboardType={'numeric'}
                                        value={this.state.latitude}
                                        onChangeText={ latitude => this.setState({latitude}) }/>
                                </View>
                                <View style={styles.field}>
                                    <TextInputAndLabel
                                        ref={ref => this.customInput13 = ref}
                                        refInner="innerTextInput13"
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
