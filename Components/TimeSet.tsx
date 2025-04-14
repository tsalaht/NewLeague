import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { BlurView } from "expo-blur";
import Colors from "../Colors";
import fonts from "../fonts";
import LinearButton2 from "./linearButton2";
import { useState, useRef } from "react";

interface TimeSetProps {
  visible: boolean;
  onClose: () => void;
  onSelectTime: (time: string) => void;
}

export default function TimeSet({ visible, onClose, onSelectTime }: TimeSetProps) {
  if (!visible) return null;

  const [selectedHour, setSelectedHour] = useState(6);
  const [selectedMinute, setSelectedMinute] = useState(34);

  const hourListRef = useRef<FlatList>(null);
  const minuteListRef = useRef<FlatList>(null);

  const ITEM_HEIGHT = 30; // Height of each item for snapping
  const VISIBLE_ITEMS = 5; // Total visible items (main + 2 above + 2 below)

  // Generate arrays for hours (0-23) and minutes (0-59)
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleConfirm = () => {
    const time = `${selectedHour.toString().padStart(2, "0")}:${selectedMinute
      .toString()
      .padStart(2, "0")}`;
    onSelectTime(time);
    onClose();
  };

  const renderItem = (
    { item, index }: { item: number; index: number },
    type: "hour" | "minute",
    selectedValue: number
  ) => {
    const isMain = item === selectedValue;
    const distance = Math.abs(item - selectedValue);
    const isVisible = distance <= 2; // Show main + 2 above + 2 below

    if (!isVisible) return <View style={{ height: ITEM_HEIGHT }} />;

    const textStyle = {
      fontFamily: isMain ? fonts.almaraiBold : fonts.almaraiRegular,
      color: isMain ? Colors.DEFAULT_WHITE : distance === 1 ? "#D9D9D9" : "#8C8C8C",
      fontSize: isMain ? 15 : distance === 1 ? 12 : 10,
      textAlign: "right" as const,
    };

    // For hours, append AM/PM (صباحاً/مساءً)
    const displayText =
      type === "hour"
        ? `${item.toString().padStart(2, "0")} ${item < 12 ? "AM" : "PM"}`
        : item.toString().padStart(2, "0");

    return (
      <View
        style={{
          height: ITEM_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
          paddingRight: type === "hour" ? 10 : 0, // Adjust for AM/PM text
        }}
      >
        <Text style={textStyle}>{displayText}</Text>
      </View>
    );
  };

  const handleScroll = (
    event: any,
    type: "hour" | "minute",
    setValue: (value: number) => void,
    data: number[]
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    if (index >= 0 && index < data.length) {
      setValue(data[index]);
    }
  };

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
          التاريخ والوقت
        </Text>
        <View style={styles.timeContainer}>
          <View style={styles.cloContainer}>
            <Text
              style={{
                fontFamily: fonts.almaraiBold,
                color: Colors.DEFAULT_WHITE,
                fontSize: 15,
                textAlign: "right",
              }}
            >
              دقيقة
            </Text>
            <FlatList
              ref={minuteListRef}
              data={minutes}
              renderItem={({ item, index }) =>
                renderItem({ item, index }, "minute", selectedMinute)
              }
              keyExtractor={(item) => `minute-${item}`}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate={0.85} // Smoother scrolling
              snapToAlignment="center"
              getItemLayout={(data, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
              onMomentumScrollEnd={(event) =>
                handleScroll(event, "minute", setSelectedMinute, minutes)
              }
              contentContainerStyle={{
                paddingVertical: (VISIBLE_ITEMS * ITEM_HEIGHT) / 2 - ITEM_HEIGHT / 2,
              }}
              initialScrollIndex={selectedMinute}
            />
          </View>
          <View style={{ width: 1, backgroundColor: Colors.DEFAULT_WHITE, height: "100%" }} />
          <View style={[styles.cloContainer, { width: 100 }]}> {/* Wider for AM/PM */}
            <Text
              style={{
                fontFamily: fonts.almaraiBold,
                color: Colors.DEFAULT_WHITE,
                fontSize: 15,
                textAlign: "right",
              }}
            >
              ساعة
            </Text>
            <FlatList
              ref={hourListRef}
              data={hours}
              renderItem={({ item, index }) => renderItem({ item, index }, "hour", selectedHour)}
              keyExtractor={(item) => `hour-${item}`}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate={0.85} // Smoother scrolling
              snapToAlignment="center"
              getItemLayout={(data, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
              onMomentumScrollEnd={(event) =>
                handleScroll(event, "hour", setSelectedHour, hours)
              }
              contentContainerStyle={{
                paddingVertical: (VISIBLE_ITEMS * ITEM_HEIGHT) / 2 - ITEM_HEIGHT / 2,
              }}
              initialScrollIndex={selectedHour}
            />
          </View>
        </View>
        <View style={{ marginTop: 28, width: "100%" }}>
          <LinearButton2
            text="تأكيد"
            textStyles={{ fontSize: 12, fontFamily: fonts.almaraiBold }}
            onPress={handleConfirm}
            containerStyle={{
              width: "100%",
              height: 40,
            }}
            linearStyle={{
              width: "100%",
              height: 40,
              paddingVertical: 0,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeSetContainer: {
    flexDirection: "column",
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.BACKGROUND_5,
    width: "80%",
  },
  timeContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    height: 150,
  },
  cloContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: 60,
  },
});