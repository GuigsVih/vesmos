import React from 'react';
import { styles } from './styles';
import { Button as ElementsButton } from 'react-native-elements';

export default function Button({onPress, title, loading, disabled, buttonStyle, titleStyle }) {
    return (        
        <ElementsButton
        onPress={onPress}
        title={title}
        buttonStyle={[ styles.button, styles.containerButton, buttonStyle]}
        titleStyle={[styles.textButton, titleStyle]}
        loading={loading}
        disabled={disabled}
    />
    );
}