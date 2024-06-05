import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

const Education: React.FC <{ setIsEducationFilled: (isFilled: boolean) => void }> = ({ setIsEducationFilled }) => {
    const [educations, setEducations] = useState('');

    useEffect(() => {
        if (educations) {
            setIsEducationFilled (true);
        } else {
            setIsEducationFilled (false);
        }
    }, [educations, setIsEducationFilled]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.container}>
            <View style={styles.inner}>
                <TextInput
                    placeholder="Учеба"
                    value={educations}
                    onChangeText={setEducations}
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

export default Education;