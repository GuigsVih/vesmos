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
    error,
    underlineColor = "transparent",
    multiline,
    numberOfLines,
    keyboardType,
    render,
    theme
    }) {
    return (
        <TextInput
            style={style}
            underlineColor={underlineColor}
            dense={true}
            label={label}
            placeholder={placeholder}
            right={rightIcon}
            value={value}
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={onChange}
            keyboardType={keyboardType}
            secureTextEntry={security}
            error={error}
            multiline={multiline}
            numberOfLines={numberOfLines}
            render={render}
            theme={theme}
        />
    );
}