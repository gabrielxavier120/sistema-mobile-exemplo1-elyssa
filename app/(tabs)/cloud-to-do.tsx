import Button from '@/Components/Button';
import { db } from '@/FirebaseConfig';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Platform } from 'react-native';

export default function CloudToDo(){
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState<any>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState<string>("");
    const auth = getAuth();
    const user = auth.currentUser;
    const todosCollection = collection(db, 'todos');


    const fetchNotes = async () => {
        if(user){
            const q = query(todosCollection, where("userId", "==", user.uid));
            const data = await getDocs(q);
            setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } else{
            console.log("O usuário não está logado");
        }
    };

    const addNote = async () => {
        if(user){
            await addDoc(todosCollection, { title, createdAt: new Date().toISOString(), completed: false, userId: user.uid });
            setTitle('');
            fetchNotes();
        } else{
            console.log("O usuário não está logado");
        }
    };

    const updateNote = async (id: string, completed: any) => {
        if (!db || editingId === null || !editingText.trim()) return ;
        
        const todoDoc = doc(db, 'todos', id);
        await updateDoc(todoDoc, { title: editingText.trim(), completed: !completed });

        setEditingId(null);
        setEditingText("");
        fetchNotes();
    };

    const deleteNote = async (id: string) => {
        if(!db) return ;

        const todoDoc = doc(db, 'todos', id);
        await deleteDoc(todoDoc);
        fetchNotes();
    };


    const formatDate = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleString();
    };

    
    if(Platform.OS == "web"){
        return (
            <ScrollView>
                <View style={{ padding: 20, marginTop: 50 }}>
                    <Text style={styles.text}>
                        Tarefas
                    </Text>

                    <TextInput
                        placeholder="Escreva uma tarefa"
                        value={title}
                        onChangeText={setTitle}
                        style={styles.input}
                    />

                    <View style={[styles.container, { padding: 40, marginTop: 10 }]}>
                        <Button onPress={addNote} theme="primary" label="Nova"/>
                    </View>

                    <FlatList
                        data={notes}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            const isEditing = editingId === item.id;

                            return (
                                <View style={styles.container}>

                                    {isEditing ? (
                                        <>
                                            <TextInput value={editingText} onChangeText={setEditingText} style={styles.input}/>
                                            <View style={{ flexDirection: "row", gap: 5 }}>
                                                <Button onPress={() => updateNote(item.id, item.completed)} theme="green" label="Salvar"/>
                                                <Button
                                                onPress={() => {
                                                    setEditingId(null);
                                                    setEditingText("");
                                                }}
                                                theme="red"
                                                label="Cancelar" />
                                            </View>
                                        </>
                                    ) : (
                                        <>
                                            <Text style={styles.text}>
                                                {item.title}
                                            </Text>

                                            <Text
                                                style={[styles.text, { color: "#777"}]}
                                            >
                                                {formatDate(item.createdAt)}
                                            </Text>

                                            <View style={{ flexDirection: "row", gap: 10 }}>
                                                <Button
                                                    onPress={() => {
                                                        setEditingId(item.id);
                                                        setEditingText(item.title);
                                                    }}
                                                    theme="green"
                                                    label="Editar"
                                                />
                                        
                                                <Button 
                                                    onPress={() => deleteNote(item.id)}
                                                    theme="red"
                                                    label="Excluir"
                                                />
                                            </View>
                                        </>
                                    )}
                                </View>
                            );
                        }}
                    />
                </View>
            </ScrollView>
        );
    } else{
        return (
            <View style={{ padding: 20, marginTop: 50 }}>
                <Text style={styles.text}>
                    Tarefas
                </Text>

                <TextInput
                    placeholder="Escreva uma tarefa"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />

                <View style={[styles.container, { padding: 40, marginTop: 10 }]}>
                    <Button onPress={addNote} theme="primary" label="Nova"/>
                </View>

                <FlatList
                    data={notes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        const isEditing = editingId === item.id;

                        return (
                            <View style={styles.container}>

                                {isEditing ? (
                                    <>
                                        <TextInput value={editingText} onChangeText={setEditingText} style={styles.input}/>
                                        <View style={{ flexDirection: "row", gap: 5 }}>
                                            <Button onPress={() => updateNote(item.id, item.completed)} theme="green" label="Salvar"/>
                                            <Button
                                            onPress={() => {
                                                setEditingId(null);
                                                setEditingText("");
                                            }}
                                            theme="red"
                                            label="Cancelar" />
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.text}>
                                            {item.title}
                                        </Text>

                                        <Text
                                            style={[styles.text, { color: "#777"}]}
                                        >
                                            {formatDate(item.createdAt)}
                                        </Text>

                                        <View style={{ flexDirection: "row", gap: 10 }}>
                                            <Button
                                                onPress={() => {
                                                    setEditingId(item.id);
                                                    setEditingText(item.title);
                                                }}
                                                theme="green"
                                                label="Editar"
                                            />
                                        
                                            <Button 
                                                onPress={() => deleteNote(item.id)}
                                                theme="red"
                                                label="Excluir"
                                            />
                                        </View>
                                    </>
                                )}
                            </View>
                        );
                    }}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        color:"#fff",
        
    },

    text:{
        color: "#342323",
        fontSize: 17, 
        marginBottom: 6, 
        padding:10,
    },

    input: {
        borderWidth: 1,
        borderColor: "#aaa",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    footerContainer:{
        flex:1/3,
        alignItems: "center",
    },
});