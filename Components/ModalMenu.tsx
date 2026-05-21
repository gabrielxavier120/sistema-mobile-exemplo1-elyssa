import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { PropsWithChildren } from 'react';
import { Modal, Pressable, Text, View, StyleSheet } from 'react-native';

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>

export default function ModalMenu({ isVisible, children, onClose }: Props){
    return (
        <View>
            <Modal animationType="slide" transparent={true} visible={isVisible}>
                <View style={styles.modalContent}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Gerencie suas cores</Text>
                        <Pressable onPress={onClose}>
                            <MaterialIcons name="close" color='#fff' size={22} />
                        </Pressable>
                    </View>
                    {children}
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        height: '65%',
        width: '100%',
        backgroundColor: '#214067',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
    },
    titleContainer: {
        height: '16%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 16,
    },
});