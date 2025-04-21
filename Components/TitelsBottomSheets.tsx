import React, { useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, Pressable, TouchableWithoutFeedback, ScrollView } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import LinearButton2 from "../Components/linearButton2";
import TitleCard from "./TitleCard";
import fonts from "../fonts";
import Colors from "../Colors";
import { allIcons } from "../Views/alliconst";

interface TitelsBottomSheetsProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function TitelsBottomSheets({ isVisible, onClose }: TitelsBottomSheetsProps) {
  const bottomSheetRef = useRef<any>(null);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  // Sample card data
  const cardData = [
    { id: "card1", title: "مخضرم", svgIcon: allIcons.title },
    { id: "card2", title: "مخضرم", svgIcon: allIcons.title },
    { id: "card3", title: "مخضرم", svgIcon: allIcons.title },
    { id: "card4", title: "مخضرم", svgIcon: allIcons.title },
    { id: "card5", title: "مخضرم", svgIcon: allIcons.title },
    { id: "card6", title: "مخضرم", svgIcon: allIcons.title },
    { id: "card7", title: "مخضرم", svgIcon: allIcons.title },
    { id: "card8", title: "مخضرم", svgIcon: allIcons.title },
  ];

  const toggleCardSelection = useCallback((id: string) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  }, []);

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
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerIndicator} />
          </View>
          
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>اختر الألقاب</Text>
            <Text style={styles.subtitleText}>اللاعب الحاصل على أحد الألقاب يمكنه المشاركة</Text>
            
            <View style={styles.scrollContainer}>
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.cardsContainer}>
                  {cardData.map((card) => (
                    <TitleCard
                      key={card.id}
                      id={card.id}
                      svgIcon={card.svgIcon}
                      title={card.title}
                      isSelected={selectedCards.includes(card.id)}
                      onSelect={toggleCardSelection}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.buttonsContainer}>
              <Pressable>
                <View style={[styles.button, styles.confirmButton]}>
                  <LinearButton2
                    text="تأكيد"
                    textStyles={{ fontSize: 12, fontFamily: fonts.almaraiBold }}
                    onPress={() => {}}
                    containerStyle={{
                      width: "100%",
                      opacity: selectedCards.length > 0 ? 1 : 0.5,
                    }}
                    linearStyle={{
                      width: "100%",
                      height: 40,
                      paddingVertical: 0,
                    }}
                  />
                </View>
              </Pressable>
              <Pressable onPress={closeBottomSheet}>
                <View style={[styles.button, styles.backButton]}>
                  <Text style={styles.buttonText}>عودة</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 32,
    flex: 1,
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  headerIndicator: {
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
  },
  contentContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    color: "#D9D9D9",
    fontFamily: fonts.almaraiBold,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 12,
    color: "#D9D9D9",
    fontFamily: fonts.almaraiRegular,
    textAlign: "center",
    marginRight: 12,
    marginBottom: 10,
  },
  scrollContainer: {
    backgroundColor: Colors.BACKGROUND_4,
    borderRadius: 8,
    flex: 1,
    marginBottom: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
    justifyContent: "center",
  },
  cardsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    marginTop: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: 167.7,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButton: {
    marginTop: 8,
  },
  backButton: {
    backgroundColor: Colors.BACKGROUND_4,
  },
  buttonText: {
    fontFamily: fonts.almaraiBold,
    color: Colors.DEFAULT_WHITE,
    fontSize: 12,
  },
});