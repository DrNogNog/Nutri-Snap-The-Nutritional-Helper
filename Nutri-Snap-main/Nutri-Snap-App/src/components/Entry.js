import React from 'react'
import {View,Text,StyleSheet} from 'react-native'


export default ({food,calories})=>{
    return (
        <View style={styles.container}>
        <Text style={styles.text}>You ate a {food} which is {Math.round(calories)} calories!</Text>
        </View>
    )

};


const styles=StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        marginVertical:20
    },
    text:{
        fontSize:17,
        marginVertical:10
    }
});