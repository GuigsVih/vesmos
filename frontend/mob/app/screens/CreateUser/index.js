import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Icon } from 'react-native-elements';
import schema from './schema';
import { HelperText, TextInput } from 'react-native-paper';
import { createYupErrorsObject } from '../../core/helpers/createYupErrorsObject';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';
import { createUser } from '../../core/services/user';
import Logo from '../../components/Logo';

const INITIAL_DATA = {
    name: "",
    email: "",
    password: "",
    confirmPassowrd: ""
};

const INITIAL_SECURITY = {
    password: true,
    confirmPassword: true
};

export default function CreateUser() {
    const [data, setData] = useState(INITIAL_DATA);
    const [error, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [security, setSecurity] = useState(INITIAL_SECURITY);

    const onHandle = async () => {
        setErrors({});
        setLoading(true);
        try {
            await schema.validate(data, { abortEarly: false });
            await createUser(data);
        } catch (e) {
            if (e.name === "ValidationError" && e.inner) {
                setErrors(createYupErrorsObject(e));
            }
        }
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Logo />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
                <Text style={styles.createAccountText}>Crie sua conta</Text>
                <Input
                    style={styles.input}
                    label={"Nome"}
                    placeholder="Digite seu nome"
                    value={data.name}
                    onChange={(name) => setData({ ...data, name: name })}
                    error={error?.name ? true : false}
                />
                {error?.name && (
                    <HelperText style={{ bottom: 10 }} type="error" visible={error?.name}>
                        {error.name}
                    </HelperText>
                )}
                <Input
                    style={styles.input}
                    label={"E-mail"}
                    placeholder="Digite seu e-mail"
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
                    placeholder="Digite sua senha"
                    value={data.password}
                    onChange={(password) => setData({ ...data, password: password })}
                    error={error?.password ? true : false}
                    security={security.password}
                    rightIcon={
                        <TextInput.Icon
                            name={() => <Icon name={security.password ? 'eye-outline' : 'eye-off-outline'} color="#a8a8a8" type={'ionicon'} />}
                            onPress={() => setSecurity({ ...security, password: !security.password })}
                        />
                    }
                />
                {error?.password && (
                    <HelperText style={{ bottom: 10 }} type="error" visible={error?.password}>
                        {error.password}
                    </HelperText>
                )}
                <Input
                    style={styles.input}
                    label={"Confirme a senha"}
                    placeholder="Digite sua senha"
                    value={data.confirmPassword}
                    onChange={(confirmPassword) => setData({ ...data, confirmPassword: confirmPassword })}
                    error={error?.confirmPassword ? true : false}
                    security={security.confirmPassword}
                    rightIcon={
                        <TextInput.Icon
                            name={() => <Icon name={security.confirmPassword ? 'eye-outline' : 'eye-off-outline'} color="#a8a8a8" type={'ionicon'} />}
                            onPress={() => setSecurity({ ...security, confirmPassword: !security.confirmPassword })}
                        />
                    }
                />
                {error?.confirmPassowrd && (
                    <HelperText style={{ bottom: 10 }} type="error" visible={error?.confirmPassowrd}>
                        {error.confirmPassowrd}
                    </HelperText>
                )}
                <Button
                    title={"Criar conta"}
                    onPress={() => onHandle()}
                    loading={loading}
                    disabled={loading}
                />
            </TouchableWithoutFeedback>
        </View>
    );
}