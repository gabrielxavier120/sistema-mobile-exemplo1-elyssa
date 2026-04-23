import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
  <Tabs screenOptions={{tabBarActiveTintColor:
    "#a1a6ed", headerStyle:{
        backgroundColor:'#214067'
    },
    headerShadowVisible:false,
    headerTintColor:'#fff',
    tabBarStyle:{
        backgroundColor:'#214067',
    },
  }}>
    <Tabs.Screen name="index"
      options = {{headerTitle: "Página inicial",
        tabBarIcon:({focused,color})=> (<Ionicons name = {focused? 'home-sharp': 'home-outline'}
          color = {color}
          size={24}/>
        ),  
        headerLeft: () => <></>}}
    />
    <Tabs.Screen name="local-to-do"
      options = {{headerTitle: "Tarefas Local", tabBarIcon: ({ focused, color}) => 
        (<Ionicons name = {focused? 'checkmark-circle': 'checkmark-circle-outline'}
          color = {color}
          size = {24}
        />)}}
    />
    <Tabs.Screen name="about" 
      options = {{headerTitle: "Sobre", tabBarIcon:({focused,color})=> (<Ionicons name = {focused? 'information-circle': 'information-circle-outline'}
        color = {color}
        size={24}/>)
      }}
    />
  </Tabs>

  );
}
