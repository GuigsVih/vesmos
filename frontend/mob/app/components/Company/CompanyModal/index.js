import React, { useState, useEffect } from 'react';

import Modal from "react-native-modal";
import { Image } from 'react-native-elements';
import { Caption, Divider } from 'react-native-paper';
import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native';

import { styles } from './styles';
import { env } from '../../../core/environment';
import { fetchCompanies } from '../../../core/services/company';

export default function CompanyModal({ visible, setVisible, handleCompany }) {

    const [companies, setCompanies] = useState([]);

    const getCompanies = async () => {
        try {
            const res = await fetchCompanies();
            setCompanies(res.data);
        } catch (e) {
            //
        }
    }

    useEffect(() => {
        if (visible) {
            getCompanies();
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
						<Text style={styles.title}>Instituição</Text>
                        {companies.length > 0 ? (
                            companies.map((data, index) => (
                                <TouchableOpacity key={index} onPress={() => handleCompany(data)} >
                                    <View style={{ marginTop: 20, marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={{uri: `${env.apiUrl}/${data.picture}`}} style={styles.bankImg} />
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
                                <Caption>Nenhuma instituição encontrada</Caption>
                            </View>
                        }
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}