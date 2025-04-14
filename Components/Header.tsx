import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { ArrowRight2 } from "iconsax-react-native";
import Colors from "../Colors";
import fonts from "../fonts";
import { SvgXml } from "react-native-svg";
import { allIcons } from "../Views/alliconst";
interface HeaderProps {
  title: string;
  leftOptionText: string;
  rightOptionText: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftOptionText,
  rightOptionText,
  onLeftPress,
  onRightPress,
}) => {
  return (
    <BlurView intensity={5} tint="dark" style={styles.blurContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.optionButton}>
          <SvgXml xml={allIcons.dia2} />
          <Text style={{...styles.optionText,color:Colors.DEFAULT_WHITE}}>{leftOptionText}</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.optionButton}>
          <Text style={styles.optionText} onPress={onRightPress}>
            {rightOptionText}
          </Text>
          <ArrowRight2 size={16} color={Colors.BACKGROUND_3} />
        </View>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: Colors.BACKGROUND_3,
    alignItems: "center",
    justifyContent: "center",
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
    zIndex:999999999
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
  },
  optionButton: {
    flexDirection: "row",
    backgroundColor: Colors.BACKGROUND_5,
    borderRadius: 16,
    alignItems: "center",
    padding: 10,
    gap: 4,
  },
  optionText: {
    color: Colors.BACKGROUND_3,
    fontFamily: "Almarai_Regular",
  },
  titleContainer: {
    backgroundColor: Colors.NEUTRALS,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#0000004D",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6.8,
    elevation: 10,
  },
  title: {
    color: Colors.PRIMARY_600,
    fontFamily: fonts.almaraiRegular,
  },

});

export default Header;
