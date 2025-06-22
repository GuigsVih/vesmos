import React from 'react';
import { Image } from 'react-native-elements';
import CofrinhoImg from '../../../assets/icon/cofrinho.png';

export default function Logo() {
    return (
        <Image source={CofrinhoImg}
        style={{ width: 100, height: 100, marginBottom: 30 }} />
    );
}