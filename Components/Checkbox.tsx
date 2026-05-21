import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    checked: boolean;
    onPress?: () => void;
}

export default function Button({ checked, onPress }: Props){
    return(
        <View style = {styles.container}>
            <Pressable 
                style = {[
                    styles.checkBoxBase,
                    {
                        backgroundColor: checked ? '#77ec75' : '#fff',
                        borderColor: checked ? '#77ec75' : '#25292e'
                    }
                ]}
                onPress={onPress}
            >
                {
                    checked && (<FontAwesome name="check" size={14} color="#25292e" />)
                }
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
    },
    checkBoxBase: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    }
});