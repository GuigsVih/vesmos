import React, { useState } from 'react';

import CurrencyInput from 'react-native-currency-input';
import { Keyboard, ScrollView, StatusBar, Text, TouchableWithoutFeedback, View } from 'react-native';

import schema from './schema';
import { styles } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Picker from '../../components/Picker';
import { createAccount } from '../../core/services/account';
import CompanySelect from '../../components/Company/CompanySelect';
import { createYupErrorsObject } from '../../core/helpers/createYupErrorsObject';
import { createRequestErrorObject } from '../../core/helpers/createRequestErrorObject';
import { HelperText } from 'react-native-paper';
import CustomSnackbar from '../../components/CustomSnackbar';

const DEFAULT_DATA = {
    companyId: "",
    balance: null,
    nickname: "",
    type: ""
}

const TYPES = {
    "CURRENT": "Corrente",
    "SAVINGS": "Poupança"
}

export default function CreateAccount({ navigation }) {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(DEFAULT_DATA);
    const [snackbarType, setSnackbarType] = useState();
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [borderColor, setBorderColor] = useState('rgba(0, 0, 0, 0.54)');

    const create = async () => {
        setLoading(true);
        setErrors([]);
        try {
            await schema.validate(data, { abortEarly: false });
            await createAccount(data);
            navigation.navigate("BottomMenu")
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

    const onFocus = () => {
        setBorderColor("#731cef")
    }

    const onBlur = () => {
        setBorderColor("rgba(0, 0, 0, 0.54)");
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
                        <Text style={styles.title}>Criar conta bancária</Text>
                    </View>
                    <ScrollView style={styles.formContainer} contentContainerStyle={{ flexGrow: 1, margin: 50, marginBottom: 0 }}>
                        <CompanySelect
                            onSelect={(value) => setData({ ...data, companyId: value })}
                        />
                        {errors?.companyId && (
                            <HelperText style={{ marginTop: 8 }} type="error" visible={errors?.companyId}>
                                {errors?.companyId}
                            </HelperText>
                        )}
                        <Input
                            label={"Apelido"}
                            value={data.nickname}
                            style={{ marginTop: 7 }}
                            mode={"outlined"}
                            onChange={(value) => setData({ ...data, nickname: value })}
                        />
                        {errors?.nickname && (
                            <HelperText style={{ marginTop: 8 }} type="error" visible={errors?.nickname}>
                                {errors?.nickname}
                            </HelperText>
                        )}
                        <CurrencyInput
                            placeholder={"Saldo inicial"}
                            value={data.balance}
                            selectionColor={'#731cef'}
                            onChangeValue={(value) => setData({ ...data, balance: value })}
                            prefix="R$ "
                            delimiter="."
                            separator=","
                            precision={2}
                            minValue={0}
                            onBlur={() => onBlur()}
                            onFocus={() => onFocus()}
                            style={[styles.currencyInput, { borderColor: borderColor, borderWidth: borderColor == '#731cef' ? 2 : 1 }]}
                        />
                        {errors?.balance && (
                            <HelperText style={{ marginTop: 8 }} type="error" visible={errors?.balance}>
                                {errors?.balance}
                            </HelperText>
                        )}
                        <View style={{ marginTop: 13 }}>
                            <Picker
                                label={"Tipo da conta"}
                                value={data.type}
                                setValue={(value) => setData({ ...data, type: value })}
                                items={TYPES}
                                style={{ marginTop: 10 }}
                            />
                        </View>
                        {errors?.type && (
                            <HelperText style={{ marginTop: 8 }} type="error" visible={errors?.type}>
                                {errors?.type}
                            </HelperText>
                        )}
                        <Button
                            title={"Salvar"}
                            loading={loading}
                            disabled={loading}
                            buttonStyle={styles.buttonStyle}
                            titleStyle={{ marginRight: 45 }}
                            onPress={create}
                        />
                    </ScrollView>
                    <CustomSnackbar
                        visible={snackbarVisible}
                        setVisible={setSnackbarVisible}
                        type={snackbarType}
                        style={{ marginBottom: 30 }}
                        message={'Erro ao criar conta bancária'}
                    />
                </View>
            </TouchableWithoutFeedback>
        </>
    );
}