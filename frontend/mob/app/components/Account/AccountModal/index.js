import React, { useState, useEffect } from 'react';

import Modal from "react-native-modal";
import { Image } from 'react-native-elements';
import { Caption, Divider } from 'react-native-paper';
import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native';

import { styles } from './styles';
import { env } from '../../../core/environment';
import { fetchAccounts } from '../../../core/services/account';

export default function AccountModal({ visible, setVisible, handleAccount }) {

    const [accounts, setAccounts] = useState([]);

    const getAccounts = async () => {
        try {
            const res = await fetchAccounts();
            setAccounts(res.data);
        } catch (e) {
            //
        }
    }

    useEffect(() => {
        if (visible) {
            getAccounts();
        }
    }, [visible]);

    return (
        <>
            <Modal
                isVisible={visible}
                onDismiss={() => setVisible(false)}
                onBackButtonPress={() => setVisible(false)}
                onSwipeComplete={() => setVisible(false)}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                swipeDirection={['right', 'left']}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.content}>
						<Text style={styles.title}>Conta de pagamento</Text>
                        {accounts.length > 0 ? (
                            accounts.map((data, index) => (
                                <TouchableOpacity key={index} onPress={() => handleAccount(data)} >
                                    <View style={{ marginTop: 20, marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={{uri: `${env.apiUrl}/${data.imgUrl}`}} style={styles.bankImg} />
                                            <View style={{ marginLeft: 10, marginTop: 0 }}>
                                                <Text style={styles.name}>{data.name}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {index > 0 &&
                                        <Divider />
                                    }
                                </TouchableOpacity>
                            ))
                        ) :
                            <View style={styles.alignCenter}>
                                <Caption>Nenhuma conta encontrada</Caption>
                            </View>
                        }
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}