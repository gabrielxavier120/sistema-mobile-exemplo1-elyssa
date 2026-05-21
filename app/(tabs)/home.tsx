import { db } from '@/FirebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Button from "@/Components/Button";
import ModalMenu from "@/Components/ModalMenu";
import DropdownComponent from "@/Components/Dropdown";
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ImageViewer from "../../Components/ImageViewer";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

const PlaceholderImage = require("../../assets/images/icon.png");

export default function Index() {
  useEffect(() => {
    async function setUp(){
      try{
        const corDocRef = doc(db, 'cores', 'SelectedColor');

        const corSnap = await getDoc(corDocRef);
        if(!corSnap.exists()){
          await setDoc(corDocRef, { value: '#fffeff' });
        }
      } catch(error){
        console.log("Erro de inicialização do Firebase - ", error);
      }
    }

    setUp();
  }, []);

  const backgroundColor = useSharedValue("white");

  const data = [
    { label: 'Rosa', value: '#edb8d4' },
    { label: 'Azul', value: '#a5c9f4' },
    { label: 'Verde', value: '#d1fcd8' },
    { label: 'Branco', value: '#fffeff' },
    { label: 'Cinza', value: '#fffa'}

  ];

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const getSelectedColor = async () => {
    try{
      const corDocRef = doc(db, 'cores', 'SelectedColor');

      const corSnap = await getDoc(corDocRef);

      if(corSnap.exists()){
        backgroundColor.value = corSnap.data().value;
      } else{
        console.log("Cor não encontrada no banco");
      }
    } catch(error){
      console.log("Erro ao ler dado do Firebase - ", error);
    }
  };

  const pickImagesAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if(!result.canceled){
      setSelectedImage(result.assets[0].uri);
      console.log(result);
    } else{
      alert("Você não selecionou nenhuma imagem :")
    }
  }

  const onModalOpen = () => {
    setIsModalVisible(true);
  }

  const onModalClose = () => {
    setIsModalVisible(false);
  }

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: withTiming(backgroundColor.value, { duration: 400 }),
  }));

  getSelectedColor();

  return (
    <Animated.View style= {[styles.container, animatedStyles]}>
      <Text style={styles.text}>Página inicial</Text>
      <Animated.View style = {[styles.imageContainer, animatedStyles]}>
        <ImageViewer imgSource={selectedImage || PlaceholderImage} />
      </Animated.View>
      <View style = {styles.footerContainer}>
        <Button 
          onPress={pickImagesAsync}
          label="Escolha uma foto"
          theme= "primary"
        />
        <Button
          onPress={onModalOpen}
          label="Cheque sua lista"/>
      </View>
      <ModalMenu isVisible={isModalVisible} onClose={onModalClose}>
        <View>
          <DropdownComponent data={data} saveAt="SelectedColor" onChoose={getSelectedColor}></DropdownComponent>
        </View>
      </ModalMenu>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#a5c9f4",
  },
  text:{
    color: "342323",
  },
  imageContainer: {
    flex: 1,
  },
  link: {
    fontSize: 20,
    textDecorationLine: "underline",
    color:"#342323",
  },
  footerContainer:{
    flex:1/3,
    alignItems: "center",
  }
});
