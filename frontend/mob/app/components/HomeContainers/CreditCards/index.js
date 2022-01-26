import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Caption, Divider } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';
import { currencyFormat } from '../../../core/helpers/format';
import NuBank from '../../../../assets/icon/banks/nubank.png';
import Bradesco from '../../../../assets/icon/banks/bradesco.png';
import { fetchCreditCardsUsage } from '../../../core/services/creditCard';
import Button from '../../Button';

export default function CreditCards({ focused, navigation }) {

    const [creditCards, setCreditCards] = useState([]);

    const getCreditCardsUsage = async () => {
        try {
            const res = await fetchCreditCardsUsage();
            setCreditCards(res.data);
        } catch (e) {
            //
        }
    }

    useEffect(() => {
        focused && getCreditCardsUsage();
    }, [focused]);

    return (
        <View style={{ marginLeft: 30, marginRight: 30 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>Cartões de crédito</Text>
                    <View style={styles.createCardContainer}>
                        {creditCards.length > 0 &&
                            <TouchableOpacity onPress={() => navigation.navigate("CreateCreditCard")}>
                                <View style={styles.createCardButton}>
                                    <AntDesign name="plus" size={13} color="#fff" />
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <Divider />
                <View style={{ margin: 20 }}>
                    {creditCards.length > 0 ?
                        creditCards.map((creditCard, idx) => (
                            <React.Fragment key={idx}>
                                {idx > 0 ? <Divider /> : <></>}
                                <View style={idx > 0 ? { marginTop: 10 } : { marginBottom: 15 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={idx > 0 ? NuBank : Bradesco} style={styles.bankImg} />
                                            <View style={{ marginLeft: 12 }}>
                                                <Caption>{creditCard.accountNickname}</Caption>
                                                <Text>{creditCard.name}</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 10, marginLeft: 20 }}>
                                            <Text style={[styles.limit, { marginBottom: 5 }]}>Total: {currencyFormat(creditCard.creditLimit)}</Text>
                                            <Text style={styles.limit}>
                                                Utilizado: <Text style={{ color: "#ff525a" }}>
                                                    {currencyFormat(creditCard.limitUsed)}
                                                </Text>
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </React.Fragment>
                        ))
                        : <View>
                            <Caption
                                style={{ textAlign: "center" }}>
                                Você não possui cartões cadastrados. Clique no botão abaixo para criar um cartão!
                            </Caption>
                            <Button
                                title={"Criar cartão"}
                                titleStyle={{ marginRight: 50 }}
                                buttonStyle={{ padding: 7, marginTop: 20 }} 
                            />
                        </View>}
                </View>
            </View>
        </View>
    )
}