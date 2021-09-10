import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#623aa7",
    position: "absolute",
    marginTop: -60,
    shadowColor: "#803dc0",
    shadowRadius: 5,
    shadowOffset: { height: 10 },
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: "#FFFFFF"
  },
  secondaryButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff"
  },
});