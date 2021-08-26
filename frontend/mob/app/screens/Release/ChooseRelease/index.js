import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import SelectReleaseContainer from '../../../components/SelectReleaseContainer';

export default function ChooseRelease() {
    return (
        <View style={styles.container}>
            <SelectReleaseContainer text={"Despesa"}/>
            <SelectReleaseContainer text={"Receita"}/>
            <SelectReleaseContainer text={"Transferência"}/>
        </View>
    );
}