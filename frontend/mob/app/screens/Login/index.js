import React from 'react';
import { View } from 'react-native';
import { Image, Button, Icon, Text } from 'react-native-elements';
import GoogleImg from '../../../assets/icon/google.png';
import CofrinhoImg from '../../../assets/icon/cofrinho.png';
import { styles } from './styles';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Logo from '../../components/Logo';

export default function Login({ navigation }) {

	const develop = () => {
		Alert.alert("", "Em desenvolvimento...");
	}

	return (
		<View style={styles.container}>
			<Logo />
			<Text style={styles.welcome}>Bem-vindo de volta!</Text>
			<Button
				onPress={develop}
				icon={
					<Icon
						name="facebook"
						size={30}
						color="white"
					/>
				}
				title="Entrar com Facebook"
				buttonStyle={[styles.facebookButton, styles.containerButton]}
				titleStyle={styles.facebookTextButton}
			/>
			<Button
				onPress={develop}
				icon={
					<Image
						source={GoogleImg}
						style={{ width: 20, height: 20 }}
					/>
				}
				title="Entrar com Google"
				buttonStyle={[styles.googleButton, styles.containerButton]}
				titleStyle={styles.googleTextButton}
			/>
			<Button
				onPress={() => navigation.navigate("LoginWithEmail")}
				icon={
					<Icon
						name="mail"
						size={20}
						color="white"
					/>
				}
				title="Entrar com Email"
				buttonStyle={[styles.mailButton, styles.containerButton]}
				titleStyle={styles.mailTextButton}
			/>
			<TouchableOpacity onPress={() => navigation.navigate("CreateUser")}>
				<Text style={styles.createUser}>Criar conta</Text>
			</TouchableOpacity>
			<Text style={styles.termsTextAlign}>Ao utilizar o ..., você está de acordo com os nossos
				<TouchableOpacity onPress={develop}>
					<Text style={styles.terms}>Termos de Uso e Política de Privacidade</Text>
				</TouchableOpacity>
			</Text>
		</View>
	);
}