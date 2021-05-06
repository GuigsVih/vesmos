import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Keyboard } from 'react-native';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Logo from '../../../components/Logo';
import { styles } from './styles';

export default function LoginWithEmail({ navigation }) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [securityPassowrd, setSecurityPassword] = useState(true);
    
    const develop = () => {
        Alert.alert("", "Em desenvolvimento");
    }

    const signIn = () => {
        navigation.navigate("Home");
    }

    return (
        <View style={styles.container}>
            <Logo />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
                <Text style={styles.helloAgain}>Que bom ver você por aqui ☺️</Text>
                <Input
                    style={styles.input}
                    label={"Email"}
                    placeholder="Seu email"
                    value={email}
                    onChange={(email) => setEmail(email)}
                />
                <Input
                    style={styles.input}
                    label={"Senha"}
                    placeholder="Sua senha"
                    value={password}
                    rightIcon={
                        <TextInput.Icon
                            name={() => <Icon name={securityPassowrd ? 'eye-outline' : 'eye-off-outline'} color="#a8a8a8" type={'ionicon'}/>}
                            onPress={() => setSecurityPassword(!securityPassowrd)}
                        />
                    }
                    onChange={(password) => setPassword(password)}
                    security={securityPassowrd}
                />
                <Button 
                    title={"Entrar"}
                    onPress={signIn}
                />
                <TouchableOpacity onPress={develop}>
                    <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
                </TouchableOpacity>
            </TouchableWithoutFeedback>
        </View>
    );
}