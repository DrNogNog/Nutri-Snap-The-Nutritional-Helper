import React,{useState,useEffect} from 'react'
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Button,
    Image,
    Dimensions,
    ScrollView,
    RefreshControl,
    View,
    ActivityIndicator
  } from 'react-native'
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import upload from '../api/upload';
import {AntDesign,FontAwesome} from "@expo/vector-icons";
// nutricam

const cameraScreen=({navigation})=>{
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef,setCameraRef]=useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isLoading,setLoading] = useState(false);
    const [error,setError]=useState(null);
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
    if (hasPermission === null) {
      return null;
    }
    if (hasPermission === false) {
      return <Text>For the app to work camera permissions are required</Text>;
    }
  
    apiReq=async (base64)=>{
     //   AsyncStorage.removeItem("foods");
     setError(null);
      var params = new URLSearchParams();
      params.append('image',base64);
      upload.post("/uploadImage",params)
      .then(async (response)=>{
        //console.log(response.data);
        setLoading(false);
        if(response.data["result"]!=undefined){
            const res=await AsyncStorage.getItem('foods');
            //console.log(res);
            var res2=JSON.parse(res);
            if(!res2){
                res2=[]
            }
            //console.log(response.data["result"]);
            res2.push(response.data["result"]);
          //  console.log(res2);
            await AsyncStorage.setItem('foods',JSON.stringify(res2));
            setLoading(false);
            navigation.navigate("home",{newEntry:true});
          //setData({type:response.data["result"]["type"],fruit:response.data["result"]["fruit"]})
        }else{
          //console.log(JSON.stringify(response));
          if(response.data["error"]!=undefined){
            setError(response.data["error"]);
          //  console.log("Error")
          }else{
            setError("An unknown error happened on the server");
            //console.log("Erro2");
          }
          //setData("There was a server error")
        }
        
       // return response.data;
      })
      .catch((error)=>{
        console.log(error);
        setError(error);
        setLoading(false);
        // return "error";
        
      })
      

    // setLoading(false);
      
    }
    if(isLoading){
      return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator size={"large"} />
            <Text>Please wait...</Text>
          </SafeAreaView>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={type} ref={ref => {
          setCameraRef(ref) ;
    }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              justifyContent: 'flex-end'
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end'
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
              if(cameraRef){
                const {base64} = await cameraRef.takePictureAsync(options={base64:true,quality:0});              
                 setLoading(true);
                 await apiReq(base64);
              }
            }}>
              <View style={{ 
                 borderWidth: 2,
                 borderRadius:"50%",
                 borderColor: 'white',
                 height: 50,
                 width:50,
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center'}}
              >
                <View style={{
                   borderWidth: 2,
                   borderRadius:"50%",
                   borderColor: 'white',
                   height: 40,
                   width:40,
                   backgroundColor: 'white'}} >
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
  
  const styles=StyleSheet.create({
      container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
      }
  });

  cameraScreen.navigationOptions={
    tabBarIcon: ({color,size})=>(
      <FontAwesome name="camera" size={30} color={"orange"} />
    ),
    tabBarOptions:{
      showLabel:false
    }
  }
  export default cameraScreen;