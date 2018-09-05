import React, {Component} from 'react';
import { View, TextInput, Text} from 'react-native';

import styles from './styles';

const TextInputAndLabel =  class TextInputAndLabel extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.label}>{this.props.label}</Text>
                <TextInput
                    ref={this.props.refInner}
                    autoFocus = {this.props.autoFocus}
                    returnKeyType = {this.props.returnKeyType}
                    onSubmitEditing={this.props.onSubmitEditing}
                    secureTextEntry={this.props.secureTextEntry}
                    placeholder={this.props.placeholder}
                    style={styles.input}
                    onChangeText={this.props.onChangeText}
                    autoCorrect={false}
                    autoCapitalize={this.props.autoCapitalize}
                    keyboardType={this.props.keyboardType}
                    value={this.props.value}
                />
            </View>
        );
    }
};
export {TextInputAndLabel};
