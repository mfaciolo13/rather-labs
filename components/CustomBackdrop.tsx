import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

const CustomBackdrop = ({ onPress, style }: CustomBackdropProps) => {
  const OPACITY = 0.3;
  // styles
  const containerStyle: StyleProp<ViewStyle> = useMemo(
    () => [
      style,
      {
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        opacity: OPACITY,
      },
    ],
    [style],
  );

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={OPACITY}
    />
  );
};

type CustomBackdropProps = BottomSheetBackdropProps & {
  onPress: () => void;
};

export default CustomBackdrop;
