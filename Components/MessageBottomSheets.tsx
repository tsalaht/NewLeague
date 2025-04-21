import React, { useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, Pressable, TouchableWithoutFeedback, TextInput } from "react-native";
import { SvgXml } from "react-native-svg";
import BottomSheet from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import LinearButton2 from "../Components/linearButton2";
import fonts from "../fonts";
import Colors from "../Colors";
import { allIcons } from "../Views/alliconst";

interface MessageBottomSheetsProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function MessageBottomSheets({ isVisible, onClose }: MessageBottomSheetsProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageText, setMessageText] = useState(""); // New state for text input
  const bottomSheetRef = useRef<any>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const closeBottomSheet = useCallback(() => {
    onClose();
    bottomSheetRef.current?.close();
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <>
      <BlurView
        intensity={100}
        blurReductionFactor={10}
        tint="dark"
        style={[StyleSheet.absoluteFill, { backgroundColor: "#0000003d" }]}
      />
      <TouchableWithoutFeedback onPress={closeBottomSheet}>
        <View style={StyleSheet.absoluteFillObject} />
      </TouchableWithoutFeedback>
      <BottomSheet
        ref={bottomSheetRef}
        handleComponent={null}
        snapPoints={["65%"]}
        onClose={closeBottomSheet}
        backgroundStyle={{
          backgroundColor: Colors.BACKGROUND_5,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        }}
      >
        <View style={{ width: "100%", paddingVertical: 32 }}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: Colors.BACKGROUND_4,
                borderRadius: 31,
                paddingHorizontal: 21,
                gap: 4.33,
                top: -25,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 6,
              }}
            ></View>
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#D9D9D9",
                fontFamily: fonts.almaraiBold,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              رسالة الدوري
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#D9D9D9",
                fontFamily: fonts.almaraiRegular,
                textAlign: "center",
                marginRight: 12,
                marginBottom: 10,
              }}
            >
              اكتب رسالة الدوري
            </Text>
            <View style={{ backgroundColor: Colors.BACKGROUND_4, paddingHorizontal: 17.07, height: 161, padding: 16, borderRadius: 8 }}>
              <TextInput
                placeholder="رسالة الدوري"
                placeholderTextColor={Colors.BACKGROUND_3}
                style={{ fontFamily: fonts.almaraiRegular, color: 'white' }}
                value={messageText}
                onChangeText={(text) => setMessageText(text)}
                maxLength={150} // Enforce maximum length
                multiline // Allow multiple lines if needed
              />
            </View>
            <View style={{ width: "100%", alignItems: 'flex-start' }}>
              <Text
                style={{
                  fontSize: 12,
                  color: "#D9D9D9",
                  fontFamily: fonts.almaraiRegular,
                  textAlign: "left",
                }}
              >
                {messageText.length}/150
              </Text>
            </View>
            <View style={{ width: "100%", alignItems: 'center',marginBottom:150 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#ffff",
                  fontFamily: fonts.almaraiRegular,
                  textAlign: "center",
                }}
              >
             هذه الرسالة ستظهر في مباريات الدوري
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <Pressable>
                <View style={{ ...styles.buttons, marginTop: 8 }}>
                  <LinearButton2
                    text="تأكيد"
                    textStyles={{ fontSize: 12, fontFamily: fonts.almaraiBold }}
                    onPress={() => {}}
                    containerStyle={{
                      width: "100%",
                      opacity: messageText.length!== 0 ? 1 : 0.5
                    }}
                    linearStyle={{
                      width: "100%",
                      height: 40,
                      paddingVertical: 0,
                    }}
                  />
                </View>
              </Pressable>
              <Pressable onPress={() => {
                closeBottomSheet()
              }}>
                <View style={{ ...styles.buttons, backgroundColor: Colors.BACKGROUND_4 }}>
                  <Text
                    style={{
                      fontFamily: fonts.almaraiBold,
                      color: Colors.DEFAULT_WHITE,
                      fontSize: 12,
                    }}
                  >
                    عودة
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
          <View
            style={{ width: "100%", alignItems: "center", justifyContent: "center", marginTop: 16 }}
          ></View>
        </View>
      </BottomSheet>

    </>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
  },
  buttons: {
    width: 167.7,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  textsContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginTop: 8,
  },
});