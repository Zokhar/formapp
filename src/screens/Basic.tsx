import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Basic: React.FC<{ setIsBasicFilled: (isFilled: boolean) => void }> = ({ setIsBasicFilled })=> {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fatherName, setFatherName] = useState('');


    useEffect(() => {
        if (firstName && lastName && fatherName) {
            setIsBasicFilled (true);
        } else {
            setIsBasicFilled (false);
        }
    }, [firstName, lastName, fatherName, setIsBasicFilled]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.container}>
            <View style={styles.inner}>
                <TextInput
                    placeholder="Имя"
                    value={firstName}
                    onChangeText={setFirstName}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Фамилия"
                    value={lastName}
                    onChangeText={setLastName}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Отчество"
                    value={fatherName}
                    onChangeText={setFatherName}
                    style={styles.input}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default Basic;