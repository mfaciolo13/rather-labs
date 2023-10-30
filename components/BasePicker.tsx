import { Picker as RNPicker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  label: string;
  value: string;
  error?: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

const BasePicker = ({ label, value, error, options, onChange }: Props) => {
  if (!options?.length) {
    return null;
  }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <RNPicker selectedValue={value} onValueChange={onChange}>
        {options.map((option) => {
          return (
            <RNPicker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          );
        })}
      </RNPicker>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default BasePicker;

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 8,
  },
});
