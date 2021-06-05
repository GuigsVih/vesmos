import React from 'react';
import { View, Text } from "react-native";
import { styles } from './styles';

export default function ErrorBadge({message}) {
    return (
        <View style={[styles.container, styles.danger]}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}