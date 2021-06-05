import React from 'react';
import { Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function Input({ 
    style, 
    label, 
    placeholder, 
    rightIcon, 
    onChange,
    value,
    security,
    error
    }) {
    return (
        <TextInput
            style={style}
            underlineColor="transparent"
            dense={true}
            label={label}
            placeholder={placeholder}
            right={rightIcon}
            value={value}
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={onChange}
            secureTextEntry={security}
            error={error}
        />
    );
}