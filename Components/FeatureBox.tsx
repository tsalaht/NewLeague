import { View, Text, StyleSheet, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import Colors from "../Colors";
import fonts from "../fonts";
import { allIcons } from "../Views/alliconst";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFeaturePrice } from "../Store/featurePriceSlice";

interface FeatureBoxProps {
  iconXml: string;
  title: string;
  subtitle: string;
  showButton?: boolean;
  buttonIconXml?: string;
  buttonText?: string;
  onPress?: () => void;
  onEdit?: (setActive: (value: boolean) => void) => void;
  pressed?: boolean;
  setPressed?: (value: boolean) => void;
}

export default function FeatureBox({
  iconXml,
  title,
  subtitle,
  showButton = false,
  buttonIconXml,
  buttonText,
  onPress,
  onEdit,
  pressed = false,
  setPressed,
}: FeatureBoxProps) {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const handlePriceButtonPress = () => {
    if (buttonText) {
      dispatch(addFeaturePrice(buttonText));
      if (setPressed) {
        setPressed(true);
      }
    }
  };

  return (
    <Pressable onPress={() => !showButton && setActive(true)}>
      <View style={styles.box}>
        {/* Show overlay only for boxes without button and when active */}
        {!showButton && active && (
          <View style={styles.acivateContainer}>
            <View style={{ marginTop: 20 }}>
              <SvgXml xml={allIcons.activate} />
            </View>
            <Pressable onPress={() => onEdit?.(setActive)}>
              <View style={styles.editButton}>
                <Text
                  style={{
                    color: Colors.PRIMARY_600,
                    fontFamily: fonts.almaraiBold,
                    textAlign: "center",
                    fontSize: 14,
                    marginTop: 3,
                  }}
                >
                  تعديل
                </Text>
              </View>
            </Pressable>
          </View>
        )}
        <SvgXml xml={iconXml} />
        <View style={styles.textsContainer}>
          <Text
            style={{
              color: "#ffff",
              fontFamily: fonts.almaraiBold,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: "#A5A5A7",
              fontFamily: fonts.almaraiRegular,
              fontSize: 10,
              textAlign: "center",
            }}
          >
            {subtitle}
          </Text>
          {showButton && buttonIconXml && buttonText && (
            <Pressable onPress={handlePriceButtonPress}>
              <View style={styles.boxButton}>
                <SvgXml xml={buttonIconXml} />
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: fonts.almaraiRegular,
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  {buttonText}
                </Text>
              </View>
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 143,
    height: 171,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.BACKGROUND_5,
    borderRadius: 16,
    position: "relative",
    overflow: "hidden",
  },
  boxButton: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.BACKGROUND_3,
    borderRadius: 8,
    paddingHorizontal: 38,
  },
  textsContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginTop: 8,
  },
  acivateContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#4d566679",
    zIndex: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    width: 102,
    height: 30,
    backgroundColor: Colors.BACKGROUND_4,
    borderRadius: 8,
    marginTop: 60,
  },
});