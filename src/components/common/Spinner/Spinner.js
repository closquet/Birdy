import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const Spinner = ()=>{
    return(
        <View>
            <ActivityIndicator color={'#027691'} size={100}/>
        </View>
    )
};
export {Spinner};