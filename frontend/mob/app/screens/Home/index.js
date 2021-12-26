import React, { useEffect } from 'react';

import { useIsFocused } from '@react-navigation/native';
import CreditCards from '../../components/HomeContainers/CreditCards';
import { View } from 'react-native';

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
        <View style={{ marginTop: 30 }}>
            <CreditCards />
        </View>
    );
}