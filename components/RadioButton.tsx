import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface RadioButtonProps {
  value: string;
  label: string;
  error?: string;
  options: { key: string; text: string }[];
  onChange: (value: string) => void;
}

const RadioButton = ({
  value,
  label,
  error,
  options,
  onChange,
}: RadioButtonProps) => {
  const [selectedOption, setSelectedOption] = useState(value);

  const handleSelectOption = (key: string) => {
    setSelectedOption(key);
  };

  if (!options?.length) {
    return null;
  }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        {options.map((option) => {
          const isSelected = selectedOption === option.key;

          return (
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: isSelected ? "#383399" : "transparent",
                },
              ]}
              key={option.key}
              onPress={() => {
                handleSelectOption(option.key);
                onChange(option.key);
              }}
            >
              <Text
                style={[
                  styles.text,
                  { color: isSelected ? "#fff" : "#383399" },
                ]}
              >
                {option.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
  },
  container: {
    flexDirection: "row",
    columnGap: 12,
  },
  button: {
    borderColor: "#383399",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    minWidth: 80,
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 8,
  },
});
