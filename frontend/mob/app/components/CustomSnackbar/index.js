import React from 'react';
import { Snackbar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

const TYPE_STYLES = {
    "error": {
        "backgroundColor": "#f8d7da",
        "textColor": "#842029"
    },
    "success": {
        "backgroundColor": "#d1e7dd",
        "textColor": "#0f5132"
    }
}
export default function CustomSnackbar({ type = "error", visible, setVisible, message, style }) {
    return (
        <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            action={{
                label: <AntDesign name="close" size={24} color={TYPE_STYLES[type]["textColor"]} />,
                onPress: () => {
                    setVisible(false)
                },
            }}
            style={{ backgroundColor: TYPE_STYLES[type]["backgroundColor"], ...style }}
            theme={{ colors: { surface: TYPE_STYLES[type]["textColor"], accent: TYPE_STYLES[type]["backgroundColor"] } }}>
            {message}
        </Snackbar>
    );
}