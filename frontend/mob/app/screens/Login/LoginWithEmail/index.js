import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Keyboard } from 'react-native';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { HelperText, TextInput } from 'react-native-paper';
import Button from '../../../components/Button';
import ErrorBadge from '../../../components/ErrorBadge';
import Input from '../../../components/Input';
import Logo from '../../../components/Logo';
import { createYupErrorsObject } from '../../../core/helpers/createYupErrorsObject';
import { login } from '../../../core/services/auth';
import schema from './schema';
import { styles } from './styles';
import AsyncStorage from "@react-native-community/async-storage";

const INITIAL_DATA = {
    email: "",
    password: ""
}

export default function LoginWithEmail({ navigation }) {

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
        try {
            await schema.validate(data, { abortEarly: false });
            setLoading(true);
            const res = await login(data);
            await AsyncStorage.setItem('token', res.data.token);
            navigation.navigate("Home");
        } catch (e) {
            if (e.name === "ValidationError" && e.inner) {
                setErrors(createYupErrorsObject(e));
            } else {            
                console.log(e);    
                if (e?.response?.status === 400) {
                    setErrorMessageBadge("E-mail e/ou senha incorretos");
                } else {
                    setErrorMessageBadge("Erro ao realizar login. Tente novamente mais tarde");
                }
            }
        }
        setLoading(false);
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