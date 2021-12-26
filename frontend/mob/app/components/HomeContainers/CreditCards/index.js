import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';
import Bradesco from '../../../../assets/icon/banks/bradesco.png';
import { fetchCreditCardsUsage } from '../../../core/services/creditCard';

export default function CreditCards() {

    const [creditCards, setCreditCards] = useState([]);

    const getCreditCards = async () => {
        try {
            const res = await fetchCreditCardsUsage();
            console.log(res.data);
        } catch (e) {
            //
        }
    }

    useEffect(() => {
        getCreditCards();
    }, []);

    return (
        <View style={{ marginLeft: 30, marginRight: 30 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>Cartões de crédito</Text>
                    <View style={styles.createCardContainer}>
                        <TouchableOpacity>
                            <View style={styles.createCardButton}>
                                <AntDesign name="plus" size={13} color="#fff" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Divider />
                <View style={{ margin: 20 }}>
                    {creditCards.length > 0 && Object.keys(creditCards).map((creditCard, idx) => {
                        
                    })}
                    <Image source={Bradesco} style={styles.bankImg} />
                </View>
            </View>
        </View>
    )
}