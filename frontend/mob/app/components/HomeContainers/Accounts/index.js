import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Caption, Divider } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';
import NuBank from '../../../../assets/icon/banks/nubank.png';
import Bradesco from '../../../../assets/icon/banks/bradesco.png';
import { currencyFormat } from '../../../core/helpers/format';
import { fetchAccountsUsage } from '../../../core/services/account';
import Button from '../../Button';

const ACCOUNT_TYPE = {
    "CURRENT": "Conta corrente",
    "SAVINGS": "Conta poupança"
}
export default function Accounts({ focused }) {

    const [accounts, setAccounts] = useState([]);

    const getAccountsUsage = async () => {
        try {
            const res = await fetchAccountsUsage();
            setAccounts(res.data);
        } catch (e) {
            //
        }
    }

    useEffect(() => {
        focused && getAccountsUsage();
    }, [focused]);

    return (
        <View style={{ marginLeft: 30, marginRight: 30 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>Contas bancárias</Text>
                    <View style={styles.createAccountContainer}>
                        {accounts.length > 0 && <TouchableOpacity>
                            <View style={styles.createAccountButton}>
                                <AntDesign name="plus" size={13} color="#fff" />
                            </View>
                        </TouchableOpacity>
                        }
                    </View>
                </View>
                <Divider />
                <View style={{ margin: 20 }}>
                    {accounts.length > 0 ?
                        accounts.map((account, idx) => (
                            <React.Fragment key={idx}>
                                {idx > 0 ? <Divider /> : <></>}
                                <View style={idx > 0 ? { marginTop: 10 } : { marginBottom: 15 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <Image source={idx > 0 ? NuBank : Bradesco} style={styles.bankImg} />
                                        </View>
                                        <View style={{ marginLeft: 12 }}>
                                            <Caption>{ACCOUNT_TYPE[account.accountType]}</Caption>
                                            <Text>{account.nickname}</Text>
                                        </View>
                                        <View style={styles.alignBalance}>
                                            <Text style={styles.balanceText}>
                                                {currencyFormat(account.balance)}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </React.Fragment>
                        ))
                        : <View>
                            <Caption
                                style={{ textAlign: "center" }}>
                                Você não possui contas bancárias cadastradas. Clique no botão abaixo para criar uma conta!
                            </Caption>
                            <Button
                                title={"Criar conta"}
                                titleStyle={{ marginRight: 50 }}
                                buttonStyle={{ padding: 7, marginTop: 20 }}
                            />
                        </View>}
                </View>
            </View>
        </View>
    )
}