import React, { useState } from 'react';

import { Text, View } from 'react-native';
import { Caption } from 'react-native-paper';
import { Image } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from './styles';
import AccountModal from '../AccountModal';
import Bradesco from '../../../../assets/icon/banks/bradesco.png';
import { env } from '../../../core/environment';

export default function AccountSelect({ onSelect }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [account, setAccount] = useState();

    const handleAccount = (data) => {
        setAccount(data);
        onSelect(data.id);
        setModalVisible(false);
    }

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={[styles.container, { padding: account && Object.keys(account).length > 0 ? 9 : 15}]}>
                    <View style={{ flexDirection: 'row' }}>
                        {account && Object.keys(account).length > 0 ?
                            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 5 }}>
                                <Image source={{ uri: `${env.apiUrl}/${account.imgUrl}`}} style={styles.bankImg} />
                                <Caption style={styles.accountName}>{account.name}</Caption>
                            </View>
                            :
                            <>
                                <Text style={styles.text}>Conta de pagamento</Text>
                                <View style={styles.toEnd}>
                                    <AntDesign style={{ marginTop: 4 }} name="down" size={15} color="#737373" />
                                </View>
                            </>
                        }
                    </View>
                </View>
            </TouchableOpacity>
            <AccountModal
                visible={modalVisible}
                setVisible={setModalVisible}
                handleAccount={handleAccount}
            />
        </>
    );
}