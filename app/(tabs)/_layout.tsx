import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { router } from 'expo-router';
import { getAuth } from "firebase/auth";
import Button from '../../Components/Button';
import { auth } from '../../FirebaseConfig';


export default function TabsLayout() {
  getAuth().onAuthStateChanged((user) => {
    if(!user) router.replace('/');
  });

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "#a1a6ed", 
      headerStyle: {
        backgroundColor:'#214067'
      },
      headerShadowVisible: false,
      headerTintColor: '#fff',
      tabBarStyle: {
        backgroundColor:'#25292e',
      },
      headerRight: () => <Button label="Sair" theme="red" onPress={() => auth.signOut()} />
    }}>
      <Tabs.Screen 
        name="home"
        options = {{
          title: "Página inicial", 
          headerTitle: "Página inicial",
          tabBarIcon: ({focused, color}) => (
            <Ionicons 
              name = {focused ? 'home-sharp' : 'home-outline'}
              color = {color}
              size={24}/>
          ),
          headerLeft: () => <></>}}
      />
      
      <Tabs.Screen 
        name="about" 
        options = {{
          title: "Sobre", 
          headerTitle: "Sobre", 
          tabBarIcon: ({focused, color}) => (
            <Ionicons 
              name = {focused ? 'information-circle' : 'information-circle-outline'}
              color = {color}
              size={24}/>
          ),
        }}
      />

      <Tabs.Screen 
        name="cloud-to-do"
        options = {{
          title: "Tarefas", 
          headerTitle: "Tarefas", 
          tabBarIcon: ({focused, color}) => (
            <Ionicons
              name = {focused ? 'list-circle' : 'list-circle-outline'}
              color = {color}
              size={24}/>
          )
        }}
      />
    </Tabs>
  );
}
