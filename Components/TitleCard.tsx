import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import fonts from "../fonts";
import Colors from "../Colors";

interface TitleCardProps {
  id: string;
  svgIcon: string;
  title: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const TitleCard = ({ id, svgIcon, title, isSelected, onSelect }: TitleCardProps) => (
  <Pressable onPress={() => onSelect(id)}>
    <View
      style={{
        width: 150.43,
        height: 86.65,
        backgroundColor: isSelected ? "#6A6560" : Colors.BACKGROUND_5,
        borderRadius: 14.72,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: isSelected ? 3 : 0,
        borderColor: isSelected ? Colors.PRIMARY_700 : "transparent",
      }}
    >
      <View style={{ position: "relative" }}>
        <SvgXml xml={svgIcon} />
        <View style={{ position: "absolute", bottom: -9, left: -10 }}>
          {[-1, 0, 1].map((dx) =>
            [-1, 0, 2].map((dy) => {
              if (dx === 0 && dy === 0) return null;
              return (
                <Text
                  key={`${dx}-${dy}`}
                  style={{
                    position: "absolute",
                    left: dx,
                    top: dy,
                    fontSize: 23,
                    fontFamily: fonts.almaraiBold,
                    color: Colors.BACKGROUND_4,
                  }}
                >
                  {title}
                </Text>
              );
            })
          )}
          <Text
            style={{
              fontSize: 23,
              fontFamily: fonts.almaraiBold,
              color: Colors.PRIMARY_700,
              textShadowColor: Colors.PRIMARY_700,
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </View>
  </Pressable>
);

export default TitleCard;