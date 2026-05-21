import { router } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from '../Components/Button';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../FirebaseConfig';

export default function index(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const signIn = async () => {
        try{
            const user = await signInWithEmailAndPassword(auth, email, password);

            if (user) router.replace('/(tabs)/home');
        } catch (error: any){
            console.log(error);
            alert('Falha ao logar: ' + error.message);
        }
    }

    const signUp = async () => {
        try{
            const user = await createUserWithEmailAndPassword(auth, email, password);

            if (user) router.replace('/(tabs)/home');
        } catch (error: any){
            console.log(error);
            alert('Falha ao criar conta: ' + error.message);
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>LogIn</Text>
            <TextInput style={styles.textInput} placeholder="email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.textInput} placeholder="senha" value={password} onChangeText={setPassword} secureTextEntry />
            <Button label="Logar" theme="primary" onPress={signIn} />
            <Button label="Criar conta" onPress={signUp} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#214067",
    },
    title: {
        fontSize: 28,
        marginBottom: 40,
        color: '#e7e8fcff',
        flex: 0.1
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E8EAF6',
        borderWidth: 2,
        borderRadius: 15,
        marginVertical: 15,
        paddingHorizontal: 25,
        fontSize: 16,
        color: '#3C4858',
        width: 320,
        height: 68,
    }
});
