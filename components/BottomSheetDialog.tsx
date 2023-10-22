import { Dimensions, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { ScrollView } from "react-native-gesture-handler";
import CustomBackdrop from "./CustomBackdrop";

const { height } = Dimensions.get("window");

interface BottomSheetDialogProps {
  visible: boolean;
  content: React.ReactNode;
  onDismiss: () => void;
}

const BottomSheetDialog = ({
  visible,
  content,
  onDismiss,
}: BottomSheetDialogProps) => {
  const insets = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const topMargin = useMemo(
    () => ({ maxHeight: height - insets.top }),
    [insets.top]
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <CustomBackdrop {...props} onPress={onDismiss} />
    ),
    [onDismiss]
  );

  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [visible]);

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      enableDynamicSizing
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      onDismiss={onDismiss}
      ref={bottomSheetModalRef}
      style={styles.sheetContainer}
      topInset={insets.top}
      handleComponent={null}
    >
      <BottomSheetView enableFooterMarginAdjustment>
        <View style={[styles.content, topMargin]}>
          <ScrollView bounces={false}>
            <View
              onStartShouldSetResponder={() => true}
              style={styles.modalContent}
            >
              {content}
            </View>
          </ScrollView>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default BottomSheetDialog;

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: "#FFF",
    borderRadius: 70,
    shadowColor: "rgba(0,0,0,0.25)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16.0,
    elevation: 24,
  },
  content: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
  },
  modalContent: {
    width: "100%",
    flexDirection: "column",
    padding: 24,
  },
});
