import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplachScreen from './app/pages/SplachScreen';
import HomeScreen from './app/pages/HomeScreen';
import { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ContactScreen from './app/pages/ContactScreen';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App(){
  const [isShowSplach, setIsShowSplach] = useState(true); 

  useEffect(()=>{
    setTimeout(()=>{
      setIsShowSplach(false);
    }, 2000, []);
  });
  return <>{isShowSplach ? <SplachScreen /> : 
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({ color,size })=>(
          <Entypo name="link" size={24} color="black" />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? 'black' : 'darkgrey' }}></Text>
        )
      }}/>
      <Tab.Screen name="Contact" component={ContactScreen} options={{
        tabBarIcon: ({ color,size })=>(
          <MaterialCommunityIcons name="gmail" size={24} color="black" />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? 'black' : 'darkgrey' }}></Text>
        )
      }}/>
    </Tab.Navigator>
  </NavigationContainer>}</>;
}

const styles = StyleSheet.create({
  container : {
    paddingBottom:1000
  }
})
