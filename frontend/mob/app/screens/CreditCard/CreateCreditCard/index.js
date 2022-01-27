import React, { useState } from 'react';

import { Keyboard, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { styles } from './styles';
import Input from '../../../components/Input';
import CurrencyInput from 'react-native-currency-input';
import Button from '../../../components/Button';
import AccountSelect from '../../../components/Account/AccountSelect';

const DEFAULT_DATA = {
    nickname: "",
    value: null,
    closure: null,
    dueDate: null,
    accountId: null
}

export default function CreateCreditCard() {

    const [data, setData] = useState(DEFAULT_DATA);
    const [loading, setLoading] = useState(false);
    const [borderColor, setBorderColor] = useState('rgba(0, 0, 0, 0.54)');

    const onFocus = () => {
        setBorderColor("#731cef")
    }

    const onBlur = () => {
        setBorderColor("rgba(0, 0, 0, 0.54)");
    }

    const create = () => {
        setLoading(true);
        setLoading(false);

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Text style={styles.title}>Criar cartão de crédito</Text>
            <View style={styles.container}>
                <Input
                    label={"Apelido"}
                    mode={'outlined'}
                    value={data.nickname}
                    onChange={(value) => setData({ ...data, nickname: value })}
                />
                <CurrencyInput
                    placeholder={"Limite"}
                    value={data.value}
                    selectionColor={'#731cef'}
                    onChangeValue={(value) => setData({ ...data, value: value })}
                    prefix="R$ "
                    delimiter="."
                    separator=","
                    precision={2}
                    minValue={0}
                    onBlur={() => onBlur()}
                    onFocus={() => onFocus()}
                    style={[styles.currencyInput, { borderColor: borderColor, borderWidth: borderColor == '#731cef' ? 2 : 1 }]}
                />
                <View style={{ marginTop: 15 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Input
                            label={"Fechamento"}
                            mode={'outlined'}
                            value={data.closure}
                            keyboardType={'number-pad'}
                            style={{ width: 150 }}
                            onChange={(value) => setData({ ...data, closure: value })}
                        />
                        <Input
                            label={"Vencimento"}
                            mode={'outlined'}
                            value={data.dueDate}
                            keyboardType={'number-pad'}
                            style={{ width: 150, marginLeft: 52 }}
                            onChange={(value) => setData({ ...data, dueDate: value })}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <AccountSelect                     
						onSelect={(value) => setData({ ...data, accountId: value })}
                    />
                </View>
                <Button
                    title={"Salvar"}
                    loading={loading}
                    disabled={loading}
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ marginRight: 10 }}
                    onPress={create}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}