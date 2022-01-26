import React, { useState } from 'react';

import { Keyboard, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { styles } from './styles';
import Input from '../../../components/Input';
import CurrencyInput from 'react-native-currency-input';
import Button from '../../../components/Button';

const DEFAULT_DATA = {
    nickname: "",
    value: null,
    closure: null,
    dueDate: null
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
                <View>
                    <View>
                        <Input
                            label={"Fechamento"}
                            mode={'outlined'}
                            value={data.closure}
                            onChange={(value) => setData({ ...data, closure: value })}
                        />
                        <Input
                            label={"Vencimento"}
                            mode={'outlined'}
                            value={data.dueDate}
                            onChange={(value) => setData({ ...data, dueDate: value })}
                        />
                    </View>
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