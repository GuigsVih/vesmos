import React, { useState } from 'react';

import { Text, View } from 'react-native';
import { Caption } from 'react-native-paper';
import { Image } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from './styles';
import CompanyModal from '../CompanyModal';
import { env } from '../../../core/environment';

export default function CompanySelect({ onSelect }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [company, setCompany] = useState();

    const handleCompany = (data) => {
        setCompany(data);
        onSelect(data.id);
        setModalVisible(false);
    }

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={[styles.container, { padding: 15}]}>
                    <View style={{ flexDirection: 'row' }}>
                        {company && Object.keys(company).length > 0 ?
                            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 5 }}>
                                <Image source={{ uri: `${env.apiUrl}/${company.picture}`}} style={styles.bankImg} />
                                <Caption style={styles.companyName}>{company.name}</Caption>
                            </View>
                            :
                            <>
                                <Text style={styles.text}>Instituição</Text>
                                <View style={styles.toEnd}>
                                    <AntDesign style={{ marginTop: 4 }} name="down" size={15} color="#737373" />
                                </View>
                            </>
                        }
                    </View>
                </View>
            </TouchableOpacity>
            <CompanyModal
                visible={modalVisible}
                setVisible={setModalVisible}
                handleCompany={handleCompany}
            />
        </>
    );
}