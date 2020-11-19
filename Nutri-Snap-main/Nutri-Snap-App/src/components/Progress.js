import React from 'react'
import {View,StyleSheet,Text,SafeAreaView} from 'react-native'
//import * as Progress from 'react-native-progress';
import { ProgressBar, Colors } from 'react-native-paper';
export default ({title,progress,max})=>{
    if(progress==0 || max==0){
        return (
            <SafeAreaView style={styles.container}>
              <ProgressBar style={styles.progress} progress={progress} color={"#ffa354"} /> 
                <Text style={styles.text}>{title} {progress}/{max}</Text>
            </SafeAreaView>
        ); 
    }
    return (
        <SafeAreaView style={styles.container}>
              {(progress/max>1) ?  <ProgressBar style={styles.progress} progress={progress} color={"#f71a0a"} />:<ProgressBar style={styles.progress} progress={(progress/max)} color={"#ffa354"} /> }
            <Text style={styles.text}>{title} {progress}/{max}</Text>
        </SafeAreaView>
    );
}

const styles=StyleSheet.create({
    text:{
        color: "#E88B3C",
        fontSize:20,
        marginHorizontal:10,
        alignSelf:'center'
    },
    progress:{
        width:360,
        height:40,
        borderRadius:50,
        alignSelf:'center'
    },
    container:{
        marginVertical:13,
    }
})
/*
export default ({title,progress,max})=>{
    return (
        <SafeAreaView>
            <Progress.bar progress={progress/max} width={300} />
            <Text>{title}   {progress}/{max}</Text>
        </SafeAreaView>
    );
}

*/