import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { BlurView } from "expo-blur";
import Colors from "../Colors";
import fonts from "../fonts";
import { allIcons } from "../Views/alliconst";
import FeatureBox from "./FeatureBox";
import { SvgXml } from "react-native-svg";
import { useState } from "react";

interface FeaturesProps {
  visible: boolean;
  onClose: () => void;
  onActivate?: (iconXml: string, title: string) => void;
  onRemove?: (title: string) => void;
}

export default function Features({ visible, onClose, onActivate, onRemove }: FeaturesProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeFeatureBox, setActiveFeatureBox] = useState<((value: boolean) => void) | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<{
    iconXml: string;
    title: string;
    subtitle: string;
  } | null>(null);
  const [pressedStates, setPressedStates] = useState<{
    [key: string]: boolean;
  }>({
    "كأس البطولة": false,
    "خلفية الجلسة": false,
    "لقب محدد": false,
    "احتفال بالفوز": false,
    "تصاميم الورق": false,
    "رسالة الدوري": false,
    "دردشة صوتية": false,
  });

  const handleEditPress = (
    setActive: (value: boolean) => void,
    iconXml: string,
    title: string,
    subtitle: string
  ) => {
    setIsModalVisible(true);
    setActiveFeatureBox(() => setActive);
    setSelectedFeature({ iconXml, title, subtitle });
  };

  const handleRemovePress = () => {
    setIsModalVisible(false);
    if (activeFeatureBox) {
      activeFeatureBox(false);
    }
    if (selectedFeature) {
      setPressedStates((prev) => ({
        ...prev,
        [selectedFeature.title]: false,
      }));
      if (onRemove) {
        onRemove(selectedFeature.title);
      }
    }
    setSelectedFeature(null);
  };

  const setPressed = (title: string, value: boolean) => {
    setPressedStates((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  if (!visible) return null;

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
      {isModalVisible && selectedFeature && (
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999999,
          }}
        >
          <BlurView
            intensity={100}
            blurReductionFactor={10}
            tint="dark"
            style={[StyleSheet.absoluteFill, { backgroundColor: "#39404d28" }]}
          />
          <View
            style={{
              backgroundColor: Colors.BACKGROUND_3,
              padding: 16,
              borderRadius: 16,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontFamily: fonts.almaraiRegular,
                fontSize: 14,
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              تعديل الميزة
            </Text>
            <SvgXml xml={selectedFeature.iconXml} />
            <View style={styles.textsContainer}>
              <Text
                style={{
                  color: "#ffff",
                  fontFamily: fonts.almaraiBold,
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                {selectedFeature.title}
              </Text>
              <Text
                style={{
                  color: "#A5A5A7",
                  fontFamily: fonts.almaraiRegular,
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                {selectedFeature.subtitle}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 16,
              }}
            >
              <Pressable onPress={handleRemovePress}>
                <View
                  style={{
                    width: 149.5,
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: Colors.DANGER_600,
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: Colors.DANGER_600,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    elevation: 6,
                  }}
                >
                  <Text
                    style={{
                      color: "#ffff",
                      fontFamily: fonts.almaraiBold,
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    إزالة
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={() => setIsModalVisible(false)}>
                <View
                  style={{
                    width: 149.5,
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: Colors.BACKGROUND_5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#ffff",
                      fontFamily: fonts.almaraiBold,
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    إغلاق
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
          <Pressable
            style={{ width: "100%", alignItems: "center", justifyContent: "center" }}
            onPress={() => setIsModalVisible(false)}
          >
            <View
              style={{
                width: "80%",
                height: 30,
                backgroundColor: "#39404d69",
                marginTop: 19.5,
                borderRadius: 32,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#ffff",
                  fontFamily: fonts.almaraiBold,
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                عودة
              </Text>
            </View>
          </Pressable>
        </View>
      )}

      <Pressable onPress={onClose} style={StyleSheet.absoluteFill}>
        <BlurView
          intensity={100}
          blurReductionFactor={10}
          tint="dark"
          style={[StyleSheet.absoluteFill, { backgroundColor: "#0000003d" }]}
        />
      </Pressable>
      <View style={styles.timeSetContainer}>
        <Text
          style={{
            color: "#ffff",
            fontFamily: fonts.almaraiRegular,
            fontSize: 14,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          إضافة مزايا للدوري
        </Text>

        <View style={styles.WinerContainer}>
          <ScrollView style={{ paddingBottom: 4 }} showsVerticalScrollIndicator={false}>
            <View style={styles.boxContainer}>
              <FeatureBox
                iconXml={allIcons.cup}
                title="كأس البطولة"
                subtitle="اختر كأس البطولة"
                onEdit={(setActive) =>
                  handleEditPress(setActive, allIcons.cup, "كأس البطولة", "اختر كأس البطولة")
                }
                onActivate={onActivate}
              />
              <FeatureBox
                iconXml={allIcons.chear2}
                title="خلفية الجلسة"
                subtitle="فعل خلفية الجلسة للاعبين"
                showButton={pressedStates["خلفية الجلسة"] ? false : true}
                buttonIconXml={allIcons.dimond}
                buttonText="2000"
                pressed={pressedStates["خلفية الجلسة"]}
                setPressed={(value) => setPressed("خلفية الجلسة", value)}
                onEdit={(setActive) =>
                  handleEditPress(
                    setActive,
                    allIcons.chear2,
                    "خلفية الجلسة",
                    "فعل خلفية الجلسة للاعبين"
                  )
                }
                onActivate={onActivate}
              />
            </View>
            <View style={styles.boxContainer}>
              <FeatureBox
                iconXml={allIcons.baner}
                title="لقب محدد"
                subtitle="الالقاب المسموح المشاركة بها"
                showButton={pressedStates["لقب محدد"] ? false : true}
                buttonIconXml={allIcons.dimond}
                buttonText="2000"
                pressed={pressedStates["لقب محدد"]}
                setPressed={(value) => setPressed("لقب محدد", value)}
                onEdit={(setActive) =>
                  handleEditPress(
                    setActive,
                    allIcons.baner,
                    "لقب محدد",
                    "الالقاب المسموح المشاركة بها"
                  )
                }
                onActivate={onActivate}
              />
              <FeatureBox
                iconXml={allIcons.winer}
                title="احتفال بالفوز"
                subtitle="احتفل بفريقك المفضل"
                showButton={pressedStates["احتفال بالفوز"] ? false : true}
                buttonIconXml={allIcons.dimond}
                buttonText="2000"
                pressed={pressedStates["احتفال بالفوز"]}
                setPressed={(value) => setPressed("احتفال بالفوز", value)}
                onEdit={(setActive) =>
                  handleEditPress(
                    setActive,
                    allIcons.winer,
                    "احتفال بالفوز",
                    "احتفل بفريقك المفضل"
                  )
                }
                onActivate={onActivate}
              />
            </View>
            <View style={styles.boxContainer}>
              <FeatureBox
                iconXml={allIcons.cards2}
                title="تصاميم الورق"
                subtitle="حدد تصاميم ورق الدوري"
                showButton={pressedStates["تصاميم الورق"] ? false : true}
                buttonIconXml={allIcons.dimond}
                buttonText="2000"
                pressed={pressedStates["تصاميم الورق"]}
                setPressed={(value) => setPressed("تصاميم الورق", value)}
                onEdit={(setActive) =>
                  handleEditPress(
                    setActive,
                    allIcons.cards2,
                    "تصاميم الورق",
                    "حدد تصاميم ورق الدوري"
                  )
                }
                onActivate={onActivate}
              />
              <FeatureBox
                iconXml={allIcons.letter}
                title="رسالة الدوري"
                subtitle="اكتب رسالتك لتظهر للجميع"
                showButton={pressedStates["رسالة الدوري"] ? false : true}
                buttonIconXml={allIcons.dimond}
                buttonText="2000"
                pressed={pressedStates["رسالة الدوري"]}
                setPressed={(value) => setPressed("رسالة الدوري", value)}
                onEdit={(setActive) =>
                  handleEditPress(
                    setActive,
                    allIcons.letter,
                    "رسالة الدوري",
                    "اكتب رسالتك لتظهر للجميع"
                  )
                }
                onActivate={onActivate}
              />
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 8,
              }}
            >
              <FeatureBox
                iconXml={allIcons.message}
                title="دردشة صوتية"
                subtitle="فعل الدردشة الصوتية للاعبين"
                showButton={pressedStates["دردشة صوتية"] ? false : true}
                buttonIconXml={allIcons.dimond}
                buttonText="2000"
                pressed={pressedStates["دردشة صوتية"]}
                setPressed={(value) => setPressed("دردشة صوتية", value)}
                onEdit={(setActive) =>
                  handleEditPress(
                    setActive,
                    allIcons.message,
                    "دردشة صوتية",
                    "فعل الدردشة الصوتية للاعبين"
                  )
                }
                onActivate={onActivate}
              />
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            marginTop: 28,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable style={{ width: "100%" }} onPress={onClose}>
            <View
              style={{
                width: "100%",
                backgroundColor: Colors.BACKGROUND_4,
                borderRadius: 8,
                paddingVertical: 8,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: fonts.almaraiBold,
                  textAlign: "center",
                  fontSize: 14,
                }}
              >
                عودة
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeSetContainer: {
    flexDirection: "column",
    padding: 12,
    borderRadius: 16,
    backgroundColor: Colors.BACKGROUND_5,
    width: "94%",
    height: "85%",
    marginTop: 110,
  },
  WinerContainer: {
    flexDirection: "column",
    width: 343,
    alignItems: "center",
    paddingHorizontal: 24.5,
    backgroundColor: Colors.BACKGROUND_4,
    borderRadius: 8,
    marginTop: 4,
    paddingVertical: 8,
    height: "82%",
  },
  boxContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  textsContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginTop: 8,
  },
});