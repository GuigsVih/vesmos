import React, { useState } from 'react';

import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Keyboard } from 'react-native';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { HelperText, TextInput } from 'react-native-paper';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import schema from './schema';
import { styles } from './styles';
import Logo from '../../../components/Logo';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import * as auth from '../../../core/redux/Auth';
import ErrorBadge from '../../../components/ErrorBadge';
import { login } from '../../../core/services/auth';
import { createYupErrorsObject } from '../../../core/helpers/createYupErrorsObject';

const INITIAL_DATA = {
    email: "",
    password: ""
}

export function LoginWithEmail({ loginAction, navigation }) {

    const [data, setData] = useState(INITIAL_DATA);
    const [loading, setLoading] = useState(false);
    const [error, setErrors] = useState(false);
    const [errorMessageBadge, setErrorMessageBadge] = useState(false);
    const [securityPassowrd, setSecurityPassword] = useState(true);

    const develop = () => {
        Alert.alert("", "Em desenvolvimento");
    }

    const signIn = async () => {
        setErrors({});
        setErrorMessageBadge(false);
        setLoading(true);
        try {
            await schema.validate(data, { abortEarly: false });
            const res = await login(data);
            loginAction(res.data.token);
            setLoading(false);
            navigation.navigate("Home");
        } catch (e) {
            setLoading(false);
            if (e.name === "ValidationError" && e.inner) {
                setErrors(createYupErrorsObject(e));
            } else {
                if (e?.response?.status === 401) {
                    setErrorMessageBadge("E-mail e/ou senha incorretos");
                } else {
                    setErrorMessageBadge("Erro ao realizar login. Tente novamente mais tarde");
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            <Logo />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
                <Text style={styles.helloAgain}>Que bom ver você por aqui ☺️</Text>
                {errorMessageBadge && <ErrorBadge message={errorMessageBadge} />}
                <Input
                    style={styles.input}
                    label={"Email"}
                    placeholder="Seu email"
                    value={data.email}
                    onChange={(email) => setData({ ...data, email: email })}
                    error={error?.email ? true : false}
                />
                {error?.email && (
                    <HelperText style={{ bottom: 10 }} type="error" visible={error?.email}>
                        {error.email}
                    </HelperText>
                )}
                <Input
                    style={styles.input}
                    label={"Senha"}
                    placeholder="Sua senha"
                    value={data.password}
                    rightIcon={
                        <TextInput.Icon
                            name={() => <Icon name={securityPassowrd ? 'eye-outline' : 'eye-off-outline'} color="#a8a8a8" type={'ionicon'} />}
                            onPress={() => setSecurityPassword(!securityPassowrd)}
                        />
                    }
                    onChange={(password) => setData({ ...data, password: password })}
                    security={securityPassowrd}
                    error={error?.password ? true : false}
                />
                {error?.password && (
                    <HelperText style={{ bottom: 10 }} type="error" visible={error?.password}>
                        {error.password}
                    </HelperText>
                )}
                <Button
                    title={"Entrar"}
                    onPress={signIn}
                    loading={loading}
                    disabled={loading}
                />
                <TouchableOpacity onPress={develop}>
                    <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
                </TouchableOpacity>
            </TouchableWithoutFeedback>
        </View>
    );
}

export default injectIntl(connect(null, auth.actions)(LoginWithEmail));