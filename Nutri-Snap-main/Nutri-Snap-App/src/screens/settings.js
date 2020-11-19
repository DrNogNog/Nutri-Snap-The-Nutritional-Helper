import React, { useState, useMemo } from 'react';
import {StyleSheet,View,Text,Switch,Button,Alert,ScrollView,FlatList,SafeAreaView,} from 'react-native';
import {FontAwesome} from "@expo/vector-icons";
const DATA = [
  {
    id: 1,
    title: 'Toggle Night Mode',
  },
  {
    id: 2,
    title: 'Remind me to take a break',
  },
  {
    id: 3,
    title: "Remind me when it's bedtime",
  },
];

const initialState = DATA.map(() => false);
const App = () => {

//Plus and minus
  const [enabledSwitches, setEnabledSwitches] = useState({});
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState(' Stars')
    function decrementCount(){
        setCount(prevCount => prevCount - 1)
        setTheme(" Stars, Stop! It hurts.")
    }
    function incrementCount(){
        setCount(prevCount => prevCount + 1)
        setTheme(" Stars, Yay! Keep going!")
    }
//Plus and minus

  return (

    <>
      <View style={styles.container}>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              active={!!enabledSwitches[item.id]}
              onChange={() =>
                setEnabledSwitches((switches) => {
                  return { ...switches, [item.id]: !switches[item.id] };
                })
              }
            />
          )}
          ListHeaderComponent={<Header />}
        />
      </View>
      
      <View style = {styles.container}>
                <Button onClick = {decrementCount} title={"-"} />
                <Text> {count} </Text>
                <Text>{theme}</Text>
                <Button onClick = {incrementCount} title={"+"} />
     </View>
     
      <View>
        <Button
          title="Clear Search History"
          color="#6fb6f0"
          onPress={() => Alert.alert('Food History Has Been Cleared!')}
        />
      </View>
      <View>
        <Button
          title="Logout"
          color="#6fb6f0"
          onPress={() => Alert.alert('Successfully Logged Out!')}
        />
      </View>
    </>
  );
};

function Item({ title, active, onChange }) {
  return (
    <View>
      <Text style={styles.text}> {title} </Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor="#f5dd4b"
        ios_backgroundColor="#3e3e3e"
        value={active}
        onValueChange={onChange}
      />
    </View>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headertext}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '300',
  },
  headertext: {
    fontSize: 30,
    fontWeight: '300',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
});
App.navigationOptions={
  tabBarIcon: ({color,size})=>(
    <FontAwesome name="gear" size={40} color="orange" />
  ),
  tabBarOptions:{
    showLabel:false
  }
}


export default App;
