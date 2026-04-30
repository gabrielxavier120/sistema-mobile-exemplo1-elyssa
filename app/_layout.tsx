import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light"/>
      <Stack screenOptions={{
        headerShadowVisible:false,
        headerTintColor:'#fff',
        headerStyle:{
          backgroundColor:'#214067'
        },
   
      }}>
        <Stack.Screen name="index" options={{
          headerShown: false,
        }}/>

        <Stack.Screen name="(tabs)"
          options = {{
            headerShown: false,
          }}
        />
    
        <Stack.Screen name = "not-found"/>
      </Stack>
    </>
  )
}
