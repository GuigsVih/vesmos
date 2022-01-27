import React, { useState } from 'react';

import { Keyboard, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { styles } from './styles';
import Input from '../../../components/Input';
import CurrencyInput from 'react-native-currency-input';
import Button from '../../../components/Button';
import AccountSelect from '../../../components/Account/AccountSelect';
import schema from './schema';
import { createYupErrorsObject } from '../../../core/helpers/createYupErrorsObject';
import { createRequestErrorObject } from '../../../core/helpers/createRequestErrorObject';
import CustomSnackbar from '../../../components/CustomSnackbar';
import { HelperText } from 'react-native-paper';
import { createCreditCard } from '../../../core/services/creditCard';
import { useEffect } from 'react';

const DEFAULT_DATA = {
    name: "",
    creditLimit: null,
    closure: null,
    dueDate: null,
    accountId: ""
}

export default function CreateCreditCard({ navigation }) {

    const [data, setData] = useState(DEFAULT_DATA);
    const [loading, setLoading] = useState(false);
    const [borderColor, setBorderColor] = useState('rgba(0, 0, 0, 0.54)');
    const [snackbarType, setSnackbarType] = useState();
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [errors, setErrors] = useState([]);

    const onFocus = () => {
        setBorderColor("#731cef")
    }

    const onBlur = () => {
        setBorderColor("rgba(0, 0, 0, 0.54)");
    }

    const create = async () => {
        setLoading(true);
        setErrors([]);
        try {
            await schema.validate(data, { abortEarly: false });
            await createCreditCard(data);
            navigation.navigate("BottomMenu");
        } catch (e) {
            if (e.name === "ValidationError" && e.inner) {
                setErrors(createYupErrorsObject(e));
            } else if (e?.response?.status == 400) {
                setErrors(createRequestErrorObject(e.response.data));
            } else {
                setSnackbarType("error");
                setSnackbarVisible(true);
            }
        }
        setLoading(false);
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Text style={styles.title}>Criar cartão de crédito</Text>
                <View style={styles.container}>
                    <Input
                        label={"Apelido"}
                        mode={'outlined'}
                        value={data.name}
                        onChange={(value) => setData({ ...data, name: value })}
                    />
                    {errors?.name && (
                        <HelperText type="error" visible={errors?.name}>
                            {errors?.name}
                        </HelperText>
                    )}
                    <CurrencyInput
                        placeholder={"Limite"}
                        value={data.creditLimit}
                        selectionColor={'#731cef'}
                        onChangeValue={(value) => setData({ ...data, creditLimit: value })}
                        prefix="R$ "
                        delimiter="."
                        separator=","
                        precision={2}
                        minValue={0}
                        onBlur={() => onBlur()}
                        onFocus={() => onFocus()}
                        style={[styles.currencyInput, { borderColor: borderColor, borderWidth: borderColor == '#731cef' ? 2 : 1 }]}
                    />
                    {errors?.creditLimit && (
                        <HelperText type="error" visible={errors?.creditLimit}>
                            {errors?.creditLimit}
                        </HelperText>
                    )}
                    <View style={{ marginTop: 15 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 150 }}>
                                <Input
                                    label={"Fechamento"}
                                    mode={'outlined'}
                                    value={data.closure}
                                    keyboardType={'number-pad'}
                                    onChange={(value) => setData({ ...data, closure: value })}
                                />
                                {errors?.closure && (
                                    <HelperText type="error" visible={errors?.closure}>
                                        {errors?.closure}
                                    </HelperText>
                                )}
                            </View>
                            <View style={{ width: 150, marginLeft: 52 }}>
                                <Input
                                    label={"Vencimento"}
                                    mode={'outlined'}
                                    value={data.dueDate}
                                    keyboardType={'number-pad'}
                                    onChange={(value) => setData({ ...data, dueDate: value })}
                                />
                                {errors?.dueDate && (
                                    <HelperText type="error" visible={errors?.dueDate}>
                                        {errors?.dueDate}
                                    </HelperText>
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <AccountSelect
                            onSelect={(value) => setData({ ...data, accountId: value })}
                        />
                        {errors?.accountId && (
                            <HelperText type="error" visible={errors?.accountId}>
                                {errors?.accountId}
                            </HelperText>
                        )}
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
            <CustomSnackbar
                visible={snackbarVisible}
                setVisible={setSnackbarVisible}
                type={snackbarType}
                style={{ marginBottom: 30 }}
                message={'Erro ao criar cartão de crédito'}
            />
        </View>
    );
}