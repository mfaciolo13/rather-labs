import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

interface InputProps {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

const Input = ({ label, value, error, onChange, onBlur }: InputProps) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
      />
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
});
