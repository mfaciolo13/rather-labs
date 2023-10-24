import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

interface ButtonProps {
  filled?: boolean;
  isDisabled?: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

const Button = ({ filled, isDisabled, onPress, children }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        filled && styles.filled,
        isDisabled && styles.disabled,
      ]}
    >
      <Text style={filled && styles.textFilled}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 5,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  filled: {
    backgroundColor: "#383399",
    borderColor: "#383399",
  },
  textFilled: {
    color: "#fff",
  },
  disabled: {
    backgroundColor: "#ccc",
    borderColor: "#ccc",
  },
});
