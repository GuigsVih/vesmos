import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

export default function SelectReleaseContainer({text}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}