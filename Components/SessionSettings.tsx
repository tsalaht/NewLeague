import { View, Text, StyleSheet, Pressable, TouchableWithoutFeedback } from "react-native";
import { BlurView } from "expo-blur";
import Colors from "../Colors";
import fonts from "../fonts";
import { SvgXml } from "react-native-svg";
import { allIcons } from "../Views/alliconst";
import React, { useState, useRef, useCallback, useEffect } from "react";
import LinearButton2 from "./linearButton2";
import BottomSheet from "@gorhom/bottom-sheet";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/store";
import { 
  setWaveIcon, 
  setDocsIcon, 
  setRocketIcon, 
  setRappitIcon, 
  setTurtleIcon, 
  setSelectedLevel 
} from "../Store/sessionSettingsSlice";

interface SessionSettingsProps {
  visible: boolean;
  onClose: () => void;
}

export default function SessionSettings({ visible, onClose }: SessionSettingsProps) {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<any>(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [activeOption, setActiveOption] = useState<"instant" | "scheduled">("instant");
  const [activeOption2, setActiveOption2] = useState<"rocket" | "rappit" | "turtle">("rappit");

  // Retrieve icons and selectedLevel from Redux store
  const { waveIcon, docsIcon, rocketIcon, rappitIcon, turtleIcon, selectedLevel } = useSelector(
    (state: RootState) => state.sessionSettings
  );

  const openBottomSheet = useCallback(() => {
    setBottomSheetVisible(true);
    bottomSheetRef.current?.expand();
  }, []);

  const closeBottomSheet = useCallback(() => {
    setBottomSheetVisible(false);
    bottomSheetRef.current?.close();
  }, []);

  // Functions to generate SVG XML with correct fill color
  const getWaveSvgXml = (isActive: boolean) => {
    const fillColor = isActive ? "#FFFDFA" : "#262B33";
    return allIcons.wave.replace(/fill="white"/g, `fill="${fillColor}"`);
  };

  const getDocsSvgXml = (isActive: boolean) => {
    const fillColor = isActive ? "#FFFDFA" : "#262B33";
    return allIcons.docs.replace(/fill="#262B33"/g, `fill="${fillColor}"`);
  };

  const getRocketSvgXml = (isActive: boolean) => {
    const fillColor = isActive ? "#FFFDFA" : "#262B33";
    return allIcons.rocket.replace(/fill="#262B33"/g, `fill="${fillColor}"`);
  };

  const getRappitSvgXml = (isActive: boolean) => {
    const fillColor = isActive ? "#FFFDFA" : "#262B33";
    return allIcons.rappit2.replace(/fill="[^"]*"/g, `fill="${fillColor}"`);
  };

  const getTurtleSvgXml = (isActive: boolean) => {
    const fillColor = isActive ? "#FFFDFA" : "#262B33";
    return allIcons.turtle.replace(/fill="#262B33"/g, `fill="${fillColor}"`);
  };

  useEffect(() => {
    dispatch(setWaveIcon(getWaveSvgXml(activeOption === "instant")));
    dispatch(setDocsIcon(getDocsSvgXml(activeOption === "scheduled")));
    dispatch(setRocketIcon(getRocketSvgXml(activeOption2 === "rocket")));
    dispatch(setRappitIcon(getRappitSvgXml(activeOption2 === "rappit")));
    dispatch(setTurtleIcon(getTurtleSvgXml(activeOption2 === "turtle")));
  }, [dispatch]);

  // Update icons when activeOption changes
  useEffect(() => {
    dispatch(setWaveIcon(getWaveSvgXml(activeOption === "instant")));
    dispatch(setDocsIcon(getDocsSvgXml(activeOption === "scheduled")));
  }, [activeOption, dispatch]);

  // Update icons when activeOption2 changes
  useEffect(() => {
    dispatch(setRocketIcon(getRocketSvgXml(activeOption2 === "rocket")));
    dispatch(setRappitIcon(getRappitSvgXml(activeOption2 === "rappit")));
    dispatch(setTurtleIcon(getTurtleSvgXml(activeOption2 === "turtle")));
  }, [activeOption2, dispatch]);

  const handleLevelSelect = (level: string) => {
    dispatch(setSelectedLevel(level)); // Save level to Redux
    closeBottomSheet();
  };

  const handleSave = () => {
    // Save current state to Redux (already handled by useEffect and handleLevelSelect)
    onClose();
  };

  if (!visible) return null;

  const levels = ["مبتدئ", "متوسط", "متقدم", "محترف", "خبير", "نابغة"];

  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 8,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable onPress={onClose} style={StyleSheet.absoluteFill}>
        <BlurView
          intensity={100}
          blurReductionFactor={10}
          tint="dark"
          style={[StyleSheet.absoluteFill, { backgroundColor: "#0000003d" }]}
        />
      </Pressable>
      <View style={styles.editLugeContainer}>
        <Text
          style={{
            color: "#939599",
            fontFamily: fonts.almaraiRegular,
            fontSize: 14,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          إعدادات الجلسة
        </Text>
        <View style={{ flexDirection: "column", gap: 4 }}>
          <Text
            style={{
              fontFamily: fonts.almaraiRegular,
              color: Colors.DEFAULT_WHITE,
              fontSize: 10,
              textAlign: "right",
            }}
          >
            نوع الدوري
          </Text>
          <View
            style={{
              padding: 4,
              borderRadius: 8,
              backgroundColor: Colors.BACKGROUND_4,
              flexDirection: "row-reverse",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Pressable onPress={() => setActiveOption("instant")}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 8,
                  backgroundColor: activeOption === "instant" ? Colors.PRIMARY_600 : "transparent",
                  borderRadius: 8,
                  gap: 4,
                  width: 147.5,
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.almaraiRegular,
                    color: activeOption === "instant" ? Colors.DEFAULT_WHITE : Colors.BACKGROUND_3,
                    fontSize: 12,
                    textAlign: "right",
                  }}
                >
                  لعب حر
                </Text>
                <SvgXml xml={waveIcon || getWaveSvgXml(activeOption === "instant")} width={25} height={25} />
              </View>
            </Pressable>

            <Pressable onPress={() => setActiveOption("scheduled")}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 8,
                  backgroundColor: activeOption === "scheduled" ? Colors.PRIMARY_600 : "transparent",
                  borderRadius: 8,
                  gap: 4,
                  width: 147.5,
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.almaraiRegular,
                    color: activeOption === "scheduled" ? Colors.DEFAULT_WHITE : Colors.BACKGROUND_3,
                    fontSize: 12,
                    textAlign: "right",
                  }}
                >
                  لعب محدود
                </Text>
                <SvgXml xml={docsIcon || getDocsSvgXml(activeOption === "scheduled")} width={25} height={25} />
              </View>
            </Pressable>
          </View>
          <Text
            style={{
              fontFamily: fonts.almaraiRegular,
              color: Colors.DEFAULT_WHITE,
              fontSize: 10,
              textAlign: "right",
              marginTop: 12,
            }}
          >
            سرعة اللعب
          </Text>
          <View
            style={{
              padding: 4,
              borderRadius: 8,
              backgroundColor: Colors.BACKGROUND_4,
              flexDirection: "row-reverse",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Pressable onPress={() => setActiveOption2("rocket")}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 8,
                  backgroundColor: activeOption2 === "rocket" ? Colors.PRIMARY_600 : "transparent",
                  borderRadius: 8,
                  gap: 4,
                  width: 97,
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.almaraiRegular,
                    color: activeOption2 === "rocket" ? Colors.DEFAULT_WHITE : Colors.BACKGROUND_3,
                    fontSize: 12,
                    textAlign: "right",
                  }}
                >
                  5 ث
                </Text>
                <SvgXml xml={rocketIcon || getRocketSvgXml(activeOption2 === "rocket")} width={25} height={25} />
              </View>
            </Pressable>

            <Pressable onPress={() => setActiveOption2("rappit")}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 8,
                  backgroundColor: activeOption2 === "rappit" ? Colors.PRIMARY_600 : "transparent",
                  borderRadius: 8,
                  gap: 4,
                  width: 97,
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.almaraiRegular,
                    color: activeOption2 === "rappit" ? Colors.DEFAULT_WHITE : Colors.BACKGROUND_3,
                    fontSize: 12,
                    textAlign: "right",
                  }}
                >
                  10 ث
                </Text>
                <SvgXml xml={rappitIcon || getRappitSvgXml(activeOption2 === "rappit")} width={25} height={25} />
              </View>
            </Pressable>
            <Pressable onPress={() => setActiveOption2("turtle")}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 8,
                  backgroundColor: activeOption2 === "turtle" ? Colors.PRIMARY_600 : "transparent",
                  borderRadius: 8,
                  gap: 4,
                  width: 97,
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.almaraiRegular,
                    color: activeOption2 === "turtle" ? Colors.DEFAULT_WHITE : Colors.BACKGROUND_3,
                    fontSize: 12,
                    textAlign: "right",
                  }}
                >
                  30 ث
                </Text>
                <SvgXml xml={turtleIcon || getTurtleSvgXml(activeOption2 === "turtle")} width={25} height={25} />
              </View>
            </Pressable>
          </View>
          <Text
            style={{
              fontFamily: fonts.almaraiRegular,
              color: Colors.DEFAULT_WHITE,
              fontSize: 10,
              textAlign: "right",
              marginTop: 12,
            }}
          >
            مستوى اللعب
          </Text>
          <Pressable onPress={openBottomSheet}>
            <View style={styles.boxContainer}>
              <SvgXml xml={allIcons.botoomArrow} />
              <Text
                style={{
                  fontFamily: fonts.almaraiRegular,
                  color: Colors.DEFAULT_WHITE,
                  fontSize: 12,
                  textAlign: "right",
                }}
              >
                {selectedLevel}
              </Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.buttonsContainer}>
          <Pressable onPress={onClose}>
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
          <Pressable onPress={handleSave}>
            <View style={{ ...styles.buttons, height: 0, marginTop: 8 }}>
              <LinearButton2
                text="حفظ"
                textStyles={{ fontSize: 12, fontFamily: fonts.almaraiBold }}
                onPress={handleSave}
                containerStyle={{
                  width: "100%",
                }}
                linearStyle={{
                  width: "100%",
                  height: 40,
                  paddingVertical: 0,
                }}
              />
            </View>
          </Pressable>
        </View>
      </View>
      {isBottomSheetVisible && (
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
            snapPoints={["50%"]}
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
              <View>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#D9D9D9",
                    fontFamily: fonts.almaraiRegular,
                    textAlign: "right",
                    marginRight: 16,
                    marginBottom: 10,
                  }}
                >
                  ادنى مستوى مسموح له باللعب
                </Text>
              </View>
              {levels.map((level) => (
                <Pressable key={level} onPress={() => handleLevelSelect(level)}>
                  <View
                    style={{
                      ...styles.bottomSheetContent,
                      borderBottomWidth: level === levels[levels.length - 1] ? 0 : 1,
                    }}
                  >
                    <View style={styles.bottomSheetContentText}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: selectedLevel === level ? Colors.PRIMARY_600 : "white",
                          fontFamily: fonts.almaraiRegular,
                        }}
                      >
                        {level}
                      </Text>
                      <View style={{ width: 30 }}>
                        {selectedLevel === level && <SvgXml xml={allIcons.check} />}
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
              <View
                style={{ width: "100%", alignItems: "center", justifyContent: "center", marginTop: 16 }}
              ></View>
            </View>
          </BottomSheet>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  editLugeContainer: {
    flexDirection: "column",
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.BACKGROUND_5,
  },
  gameControl: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  tamsAndGames: {
    flexDirection: "column",
    gap: 4,
  },
  buttonsContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: 16,
    gap: 8,
  },
  buttons: {
    width: 149.5,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  boxContainer: {
    width: 307,
    height: 32.45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderRadius: 5.48,
    backgroundColor: Colors.BACKGROUND_4,
  },
  bottomSheetContent: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 16,
    alignItems: "center",
    flexDirection: "row-reverse",
    borderBottomWidth: 1,
    borderBottomColor: Colors.BACKGROUND_4,
  },
  bottomSheetContentText: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
});