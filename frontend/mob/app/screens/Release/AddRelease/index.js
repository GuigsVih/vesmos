import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Input from '../../../components/Input';
import { styles } from './styles';
import { TextInputMask } from 'react-native-masked-text'
import { ScrollView } from 'react-native-gesture-handler';

export default function AddRelease() {

    const [value, setValue] = useState(0);
    const [moneyRef, setMoneyRef] = useState();

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps={'never'}>
            <Input
                multiline={false}
                underlineColor={""}
                keyboardType={"numeric"}
                style={{ height: 150, fontSize: 50, textAlign: "right" }}
                theme={{ fonts: { regular: { fontFamily: 'CircularStd-Book' } } }}
                render={props => (
                    <TextInputMask
                        {...props}
                        type={'money'}
                        options={{
                            precision: 2,
                            separator: ',',
                            delimiter: '.',
                            unit: '',
                            suffixUnit: ''
                        }}
                        value={value}
                        onChangeText={(formated) => {
                            setValue(formated);
                        }}
                        ref={(ref) => setMoneyRef(ref)}
                    />
                )}
            />
            <Input label={"Descrição"} style={{ marginTop: 20 }} />
            <Input label={"Categoria"} style={{ marginTop: 20 }} />
        </ScrollView>
    );
}