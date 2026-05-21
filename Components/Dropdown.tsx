import { db } from '@/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type Props = {
  data: {label:string; value:string}[];
  saveAt: string;
  onChoose?: () => void;
};


export default function DropdownComponent({data, saveAt, onChoose}: Props){
    const [value, setValue] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    
    const update = async (value:string) =>{
        const corDocRef = doc(db, 'cores', saveAt);
        await setDoc(corDocRef, { value: value }, { merge: true });
    }     

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: '#214067' }]}>
            
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#214067'  }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Selecione" : '...'}
          searchPlaceholder="Selecione"
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            update(item.value);
            onChoose?.();
          }
        
        }
          
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#214067',
      padding: 16,
    },
    dropdown: {
      height: 50,
      backgroundColor: '#fffeff',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: '#fffeff',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });