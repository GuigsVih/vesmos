import React from 'react';
import { styles } from './styles';
import { Button as ElementsButton } from 'react-native-elements';

export default function Button({onPress, title, loading, disabled}) {
    return (        
        <ElementsButton
        onPress={onPress}
        title={title}
        buttonStyle={[styles.button, styles.containerButton]}
        titleStyle={styles.textButton}
        loading={loading}
        disabled={disabled}
    />
    );
}