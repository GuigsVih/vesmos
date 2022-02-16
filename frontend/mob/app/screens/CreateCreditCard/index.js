import React, { useState } from 'react';

import { HelperText } from 'react-native-paper';
import { Keyboard, ScrollView, TouchableWithoutFeedback, StatusBar, Text, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';

import schema from './schema';
import { styles } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CustomSnackbar from '../../components/CustomSnackbar';
import { createCreditCard } from '../../core/services/creditCard';
import AccountSelect from '../../components/Account/AccountSelect';
import { createYupErrorsObject } from '../../core/helpers/createYupErrorsObject';
import { createRequestErrorObject } from '../../core/helpers/createRequestErrorObject';

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
        <>
            <StatusBar
                backgroundColor="#623aa7"
                barStyle={'light-content'}>
            </StatusBar>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Criar cartão de crédito</Text>
                    </View>
                    <ScrollView style={styles.formContainer} contentContainerStyle={{ flexGrow: 1, marginTop: 40 }}>
                        <Input
                            label={"Apelido"}
                            value={data.name}
                            style={styles.input}
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
                            placeholderTextColor={"#747474"}
                            style={[styles.currencyInput, { borderColor: borderColor, borderWidth: borderColor == '#731cef' ? 2 : 0 }]}
                        />
                        {errors?.creditLimit && (
                            <HelperText type="error" visible={errors?.creditLimit}>
                                {errors?.creditLimit}
                            </HelperText>
                        )}
                        <View style={{ marginTop: 15, marginLeft: 40 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: 150 }}>
                                    <Input
                                        label={"Fechamento"}
                                        style={{ backgroundColor: "#f6f6f6" }}
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
                                <View style={{ width: 150, marginLeft: 30 }}>
                                    <Input
                                        label={"Vencimento"}
                                        style={{ backgroundColor: "#f6f6f6" }}
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
                        <View style={styles.accountContainer}>
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
                    </ScrollView>
                    <CustomSnackbar
                        visible={snackbarVisible}
                        setVisible={setSnackbarVisible}
                        type={snackbarType}
                        style={{ marginBottom: 30 }}
                        message={'Erro ao criar cartão de crédito'}
                    />
                </View>
            </TouchableWithoutFeedback>
        </>
    );
}