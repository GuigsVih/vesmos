import React from "react";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";

export default function ModalConfirm({ visible, handle, hideDialog, title, message }) {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{message}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancelar</Button>
                    <Button onPress={handle}>Sim</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}