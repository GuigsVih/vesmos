import React, { useEffect } from 'react';

import { View, Image, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { styles } from './styles';
import Accounts from '../../components/HomeContainers/Accounts';
import DefaultUserIcon from '../../../assets/icon/user-icon.png';
import CreditCards from '../../components/HomeContainers/CreditCards';

export default function Home({ navigation }) {

    const isFocused = useIsFocused();

    useEffect(() => {
        const stackParent = navigation.dangerouslyGetParent();
        if (stackParent && isFocused) {
            stackParent.setOptions({
                headerRight: () => {
                    return <></>;
                }
            });
        }
    }, [isFocused]);

    return (
        <View>
            <View style={styles.welcomeContainer}>
                <Image source={DefaultUserIcon} style={styles.userImg} />
                <View style={{ alignSelf: "flex-end", marginBottom: 15 }}>
                    <Text style={styles.welcomeText}>Olá,</Text>
                    <Text style={styles.welcomeText}>Guilherme!</Text>
                </View>
            </View>
            <View style={{ marginTop: 15 }}>
                <CreditCards
                    focused={isFocused}
                    navigation={navigation}
                />
            </View>
            <View style={{ marginTop: 30 }}>
                <Accounts
                    focused={isFocused}
                    navigation={navigation}
                />
            </View>
        </View>
    );
}