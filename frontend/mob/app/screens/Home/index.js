import React, { useState, useEffect } from 'react';

import { View, Image, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { styles } from './styles';
import { me } from '../../core/services/auth';
import Accounts from '../../components/HomeContainers/Accounts';
import DefaultUserIcon from '../../../assets/icon/user-icon.png';
import CreditCards from '../../components/HomeContainers/CreditCards';

const DEFAULT_DATA = {
    name: "",
    img: ""
}

export default function Home({ navigation }) {

    const isFocused = useIsFocused();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);

    const getUser = async () => {
        setLoading(true);
        try {
            const res = await me()
            setUser(res.data);
        } catch (e) {

        }
        setLoading(false);
    }

    useEffect(() => {
        const stackParent = navigation.dangerouslyGetParent();
        if (stackParent && isFocused) {
            getUser();
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
                {!loading ?
                    <>
                        <Image source={DefaultUserIcon} style={styles.userImg} />
                        <View style={{ alignSelf: "flex-end", marginBottom: 15 }}>
                            <Text style={styles.welcomeText}>Olá,</Text>
                            <Text style={styles.welcomeText}>{user?.name && user.name.split(" ")[0]}!</Text>
                        </View>
                    </>
                    :
                    <></>
                }
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