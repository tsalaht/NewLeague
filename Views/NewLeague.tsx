import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import styles from "./Styles/Index";
import Colors from "../Colors";
import fonts from "../fonts";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { SvgXml } from "react-native-svg";
import { BlurView } from "expo-blur";
import { allIcons } from "./alliconst";
import Header from "../Components/Header";
import LinearButton2 from "../Components/linearButton2";
import LeagueSettingsModal from "../Components/LeagueSettingsModal";
import TimeSet from "../Components/TimeSet"; 
import SessionSettings from "../Components/SessionSettings";
import FirstWiner from "../Components/FirstWiner";
import Features from "../Components/Features";
import Money from "../Components/Money";
import LeagueSettingsModal2 from "../Components/LeagueSettingsModal2";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import CardsBottomSheets from "../Components/CardsBottomSheets";
import SessionBottomSheet from "../Components/SessionBottomSheet";
import CupBottomSheet from "../Components/CupBottomSheet";
import TitelsBottomSheets from "../Components/TitelsBottomSheets";
import MessageBottomSheets from "../Components/MessageBottomSheets";

export default function NewLeague() {
  const bottomSheetRef = useRef<any>(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isBottomSheetVisible2, setBottomSheetVisible2] = useState(false);
  const [isBottomSheetVisible3, setBottomSheetVisible3] = useState(false);
  const [isBottomSheetVisible4, setBottomSheetVisible4] = useState(false);
  const [isBottomSheetVisible5, setBottomSheetVisible5] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModal2Visible, setIsModal2Visible] = useState<boolean>(false);
  const [isTimeSetVisible, setIsTimeSetVisible] = useState<boolean>(false);
  const [isSessiontVisible, setIsSessiontVisible] = useState<boolean>(false);
  const [isFirstWinerVisible, setIsFirstWinerVisible] = useState<boolean>(false);
  const [isFFeaturesVisible, setIsFeaturesVisible] = useState<boolean>(false);
  const [isMoneyVisible, setIsMoneyVisible] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>("خلال 15 دقيقة");
  const [activeFeatures, setActiveFeatures] = useState<
    { iconXml: string; title: string }[]
  >([]);
  const { selectedTeam, selectedGame } = useSelector((state: RootState) => state.leagueSettings);
  const numberOfPlayers = selectedTeam ? selectedTeam.split(" ")[0] : "16";
  const prizeAmount = useSelector((state: RootState) => state.firstWinner.prizeAmount);
  const totalPrice = useSelector((state: RootState) => state.featurePrice.totalPrice);
  const openBottomSheet = useCallback(() => {
    setBottomSheetVisible(true);
  }, []);
  const openBottomSheet2 = useCallback(() => {
    setBottomSheetVisible2(true);
  }, []);
  const openBottomSheet3 = useCallback(() => {
    setBottomSheetVisible3(true);
  }, []);
  const openBottomSheet4 = useCallback(() => {
    setBottomSheetVisible4(true);
  }, []);
  const openBottomSheet5 = useCallback(() => {
    setBottomSheetVisible5(true);
  }, []);
  
  const closeBottomSheet = useCallback(() => {
    setBottomSheetVisible(false);
  }, []);
  const closeBottomSheet2 = useCallback(() => {
    setBottomSheetVisible2(false);
  }, []);
  const closeBottomSheet3 = useCallback(() => {
    setBottomSheetVisible3(false);
  }, []);
  const closeBottomSheet4 = useCallback(() => {
    setBottomSheetVisible4(false);
  }, []);
  const closeBottomSheet5 = useCallback(() => {
    setBottomSheetVisible5(false);
  }, []);
  const { waveIcon, docsIcon, rocketIcon, rappitIcon, turtleIcon, selectedLevel } = useSelector(
    (state: RootState) => state.sessionSettings
  );
  let gameSpeed = '10 ث';
  let gameSpeedIcon = allIcons.rappit2.replace(/fill="[^"]*"/g, `fill="${"#DC9F46"}"`);
  if (rocketIcon.includes('fill="#FFFDFA"')) {
    gameSpeed = '5 ث';
    gameSpeedIcon = allIcons.rocket.replace(/fill="[^"]*"/g, `fill="${"#DC9F46"}"`);
  } else if (turtleIcon.includes('fill="#FFFDFA"')) {
    gameSpeed = '30 ث';
    gameSpeedIcon = allIcons.turtle.replace(/fill="[^"]*"/g, `fill="${"#DC9F46"}"`);
  }
  const isWaveActive = waveIcon.includes('fill="#FFFDFA"');
  const gameType = isWaveActive ? 'لعب حر' : 'لعب محدود';
  const gameTypeIcon = isWaveActive ? allIcons.leftarrow : allIcons.docs.replace(/fill="#262B33"/g, `fill="${"#DC9F46"}"`);
  
  return (
    <View style={styles.viewContainer}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/plagin.png")}
        resizeMode="cover"
        imageStyle={{
          opacity: 0.1,
        }}
      >
        <Header
          title="إنشاء دوري عام"
          leftOptionText={`1478`}
          rightOptionText="عودة"
          onRightPress={() => console.log("Return pressed")}
        />
        <View
          style={{
            paddingHorizontal: 8,
            marginTop: 10,
            flexDirection: "column",
            gap: 8,
            flex: 1,
          }}
        >
          <View style={styl.container}>
            <Text
              style={{
                color: Colors.DEFAULT_WHITE,
                fontFamily: fonts.almaraiRegular,
                textAlign: "right",
                fontSize: 10,
              }}
            >
              اسم الدوري
            </Text>
            <TextInput
              placeholder="اسم الدوري"
              style={styl.inputText}
              placeholderTextColor={"#616671"}
            />
            <View style={styl.isideContainer}>
              <View style={styl.cards}>
                <Text
                  style={{
                    fontFamily: fonts.almaraiRegular,
                    color: Colors.DEFAULT_WHITE,
                    fontSize: 10,
                    textAlign: "right",
                  }}
                >
                  إعدادات الجلسة
                </Text>
                <Pressable onPress={() => setIsSessiontVisible(true)}>
                  <View style={styl.controlButtons}>
                    <Pressable>
                      <View style={styl.iconsContainer}>
                        <SvgXml xml={gameTypeIcon} />
                      </View>
                    </Pressable>
                    <Pressable>
                      <View style={styl.iconsContainer}>
                        <SvgXml xml={gameSpeedIcon} />
                      </View>
                    </Pressable>
                    <Pressable>
                      <View
                        style={{
                          backgroundColor: "#CD7F32",
                          borderRadius: 4,
                          width: 34,
                          height: 19,
                          alignItems: "center",
                          justifyContent: "center",
                          shadowColor: "#000000",
                          shadowOffset: { width: 0, height: 3 },
                          shadowOpacity: 0.6,
                          shadowRadius: 3,
                          elevation: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 8,
                            fontFamily: fonts.almaraiRegular,
                            color: Colors.DEFAULT_WHITE,
                          }}
                        >
                          {selectedLevel}
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                </Pressable>
              </View>
              <View style={styl.cards}>
                <Text
                  style={{
                    fontFamily: fonts.almaraiRegular,
                    color: Colors.DEFAULT_WHITE,
                    fontSize: 10,
                    textAlign: "right",
                  }}
                >
                  إعدادات الدوري
                </Text>
                <Pressable>
                  <View style={styl.controlButtons}>
                    <Pressable onPress={() => setIsTimeSetVisible(true)}>
                      <View style={styl.iconsContainer}>
                        <SvgXml xml={allIcons.clock} />
                      </View>
                    </Pressable>
                    <Pressable onPress={() => setIsModalVisible(true)}>
                      <View style={styl.iconsContainer}>
                        <SvgXml xml={allIcons.chear} />
                        <Text
                          style={{
                            fontFamily: fonts.almaraiRegular,
                            color: Colors.PRIMARY_700,
                            fontSize: 10,
                            textAlign: "right",
                          }}
                        >
                          {numberOfPlayers}
                        </Text>
                      </View>
                    </Pressable>
                    <Pressable onPress={() => setIsModal2Visible(true)}>
                      <View style={styl.iconsContainer}>
                        <SvgXml xml={allIcons.smallcards} />
                        <Text
                          style={{
                            fontFamily: fonts.almaraiRegular,
                            color: Colors.PRIMARY_700,
                            fontSize: 10,
                            textAlign: "right",
                          }}
                        >
                          {selectedGame}
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                </Pressable>
              </View>
            </View>
            <View style={styl.addContainer}>
              <Text
                style={{
                  color: Colors.DEFAULT_WHITE,
                  fontFamily: fonts.almaraiRegular,
                  textAlign: "right",
                  fontSize: 10,
                }}
              >
                جائزة الدوري
              </Text>
              <Pressable>
                {prizeAmount !== "0" ? (
                  <View
                    style={{
                      ...styl.addCards,
                      backgroundColor: Colors.BACKGROUND_3,
                      borderRadius: 5.48,
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Text
                        style={{
                          color: "#939599",
                          fontFamily: fonts.almaraiRegular,
                          textAlign: "right",
                          fontSize: 12,
                        }}
                      >
                        {prizeAmount} جوهرة للمركز الأول
                      </Text>
                      <SvgXml xml={allIcons.dimond} />
                    </View>
                    <Pressable onPress={() => setIsFirstWinerVisible(true)}>
                      <SvgXml xml={allIcons.edit2} />
                    </Pressable>
                  </View>
                ) : (
                  <View
                    style={{
                      ...styl.addCards,
                      backgroundColor: Colors.BACKGROUND_3,
                      borderRadius: 5.48,
                    }}
                  >
                    <Pressable onPress={() => setIsFirstWinerVisible(true)}>
                      <SvgXml xml={allIcons.add} />
                    </Pressable>
                    <Text
                      style={{
                        color: "#939599",
                        fontFamily: fonts.almaraiRegular,
                        textAlign: "right",
                        fontSize: 12,
                      }}
                    >
                      أضف قيمة جائزة المركز الأول
                    </Text>
                    <SvgXml xml={allIcons.dimond} />
                  </View>
                )}
              </Pressable>
              <Pressable>
                <View style={{ ...styl.addCards, borderRadius: 5.48 }}>
                  <SvgXml xml={allIcons.add} />
                  <Text
                    style={{
                      color: "#939599",
                      fontFamily: fonts.almaraiRegular,
                      textAlign: "right",
                      fontSize: 12,
                    }}
                  >
                    أضف قيمة جائزة المركز الثاني
                  </Text>
                </View>
              </Pressable>
            </View>
            <View style={styl.thirdContainer}>
              <View style={styl.addIconeContainer}>
                <Pressable onPress={() => setIsFeaturesVisible(true)}>
                  <SvgXml xml={allIcons.add2} />
                </Pressable>
              </View>
              <View style={styl.textContainer}>
                {activeFeatures.length > 0 ? (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ flexDirection: "row" }}
                    contentContainerStyle={{
                      alignItems: "center",
                      paddingHorizontal: 8,
                      gap: 24,
                    }}
                  >
                    {activeFeatures.map((feature, index) => (
                      <Pressable key={index} onPress={() => {
                        if (feature.title === "كأس البطولة") {
                          openBottomSheet3(); 
                        }else if(feature.title === "لقب محدد"){
                          openBottomSheet4(); 
                        }else if(feature.title === "رسالة الدوري"){
                          openBottomSheet5(); 
                        }
                      }}>
                        <View
                          style={{
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 4,
                            backgroundColor: Colors.BACKGROUND_5,
                            width: 73,
                            height: 80,
                            borderRadius: 8,
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <View
                            style={{
                              position: "absolute",
                              top: -1,
                              right: -1,
                              borderBottomLeftRadius: 6,
                              backgroundColor: "#929292",
                              width: 15,
                              height: 15,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <SvgXml xml={allIcons.edit} />
                          </View>
                          <SvgXml xml={feature.iconXml} width={36} height={37} />
                          <Text
                            style={{
                              color: Colors.DEFAULT_WHITE,
                              fontFamily: fonts.almaraiBold,
                              fontSize: 6.63,
                              textAlign: "center",
                            }}
                          >
                            {feature.title}
                          </Text>
                        </View>
                      </Pressable>
                    ))}
                  </ScrollView>
                ) : (
                  <Text
                    style={{
                      color: "#939599",
                      fontFamily: fonts.almaraiBold,
                      textAlign: "right",
                      fontSize: 14,
                    }}
                  >
                    ميز الدوري الخاص بك بإضافات حصرية
                  </Text>
                )}
              </View>
            </View>
            <View style={{ ...styl.thirdContainer }}>
              <Pressable style={styl.box} onPress={openBottomSheet}>
                <View style={styl.box}>
                  <Text
                    style={{
                      color: "#939599",
                      fontFamily: fonts.almaraiRegular,
                      fontSize: 10,
                    }}
                  >
                    ورق الدوري
                  </Text>
                  <SvgXml xml={allIcons.twoCards} />
                </View>
              </Pressable>
              <Pressable onPress={openBottomSheet2}>
                <View style={styl.box}>
                  <Text
                    style={{
                      color: "#939599",
                      fontFamily: fonts.almaraiRegular,
                      fontSize: 10,
                    }}
                  >
                    خلفية الجلسة
                  </Text>
                  <SvgXml xml={allIcons.bigCard} />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
        <BlurView
          intensity={5}
          tint="dark"
          style={{ ...styl.blurContainer2 }}
        >
          <View style={{ width: "100%", padding: 10 }}>
            <View
              style={{
                width: "100%",
                padding: 8,
                backgroundColor: Colors.BACKGROUND_5,
                borderRadius: 16,
              }}
            >
              <View style={styl.results}>
                <View style={styl.resultsLine}>
                  <View
                    style={{ gap: 4, flexDirection: "row", alignItems: "center" }}
                  >
                    <SvgXml xml={allIcons.dimond} />
                    <Text
                      style={{
                        color: Colors.DEFAULT_WHITE,
                        fontFamily: fonts.almaraiRegular,
                        fontSize: 12,
                      }}
                    >
                      {prizeAmount}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: "#D9D9D9",
                      fontFamily: fonts.almaraiRegular,
                      fontSize: 12,
                    }}
                  >
                    رسوم تنظيم الدوري
                  </Text>
                </View>
                <View style={styl.resultsLine}>
                  <View
                    style={{ gap: 4, flexDirection: "row", alignItems: "center" }}
                  >
                    <SvgXml xml={allIcons.dimond} />
                    <Text
                      style={{
                        color: Colors.DEFAULT_WHITE,
                        fontFamily: fonts.almaraiRegular,
                        fontSize: 12,
                      }}
                    >
                      {totalPrice}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: "#D9D9D9",
                      fontFamily: fonts.almaraiRegular,
                      fontSize: 12,
                    }}
                  >
                    الجوائز والمزايا المضافة
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: Colors.DEFAULT_WHITE,
                    borderRadius: 5.48,
                  }}
                />
                <View style={styl.resultsLine}>
                  <View
                    style={{ gap: 4, flexDirection: "row", alignItems: "center" }}
                  >
                    <SvgXml xml={allIcons.dimond} />
                    <Text
                      style={{
                        color: Colors.DEFAULT_WHITE,
                        fontFamily: fonts.almaraiRegular,
                        fontSize: 12,
                      }}
                    >
                      {+totalPrice + +prizeAmount}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: Colors.DEFAULT_WHITE,
                      fontFamily: fonts.almaraiBold,
                      fontSize: 12,
                    }}
                  >
                    مجموع الجواهر المطلوبة
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 8, width: "100%" }}>
                <LinearButton2
                  text="إنشاء دوري"
                  textStyles={{ fontSize: 12, fontFamily: fonts.almaraiBold }}
                  onPress={() => setIsMoneyVisible(true)}
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
        </BlurView>

        <LeagueSettingsModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
        <TimeSet
          visible={isTimeSetVisible}
          onClose={() => setIsTimeSetVisible(false)}
          onSelectTime={(time) => setSelectedTime(time)}
        />
        <SessionSettings
          visible={isSessiontVisible}
          onClose={() => setIsSessiontVisible(false)}
        />
        <FirstWiner
          visible={isFirstWinerVisible}
          onClose={() => setIsFirstWinerVisible(false)}
        />
       <Features
          visible={isFFeaturesVisible}
          onClose={() => setIsFeaturesVisible(false)}
          onActivate={(iconXml: string, title: string) => {
            setActiveFeatures((prev) => {
              if (prev.some((feature) => feature.title === title)) {
                return prev;
              }
              return [...prev, { iconXml, title }];
            });
          }}
          onRemove={(title: string) => {
            setActiveFeatures((prev) => prev.filter((feature) => feature.title !== title));
          }}
        />
        <Money
          visible={isMoneyVisible}
          onClose={() => setIsMoneyVisible(false)}
        />
        <LeagueSettingsModal2
          visible={isModal2Visible}
          onClose={() => setIsModal2Visible(false)}
        />
        <CardsBottomSheets
          isVisible={isBottomSheetVisible}
          onClose={closeBottomSheet}
        />
        <SessionBottomSheet
          isVisible={isBottomSheetVisible2}
          onClose={closeBottomSheet2}
        />
        <CupBottomSheet
          isVisible={isBottomSheetVisible3}
          onClose={closeBottomSheet3}
        />
        <TitelsBottomSheets
          isVisible={isBottomSheetVisible4}
          onClose={closeBottomSheet4}
        />
        <MessageBottomSheets
          isVisible={isBottomSheetVisible5}
          onClose={closeBottomSheet5}
        />
      </ImageBackground>
    </View>
  );
}

const styl = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  container: {
    width: "100%",
    flexDirection: "column",
    gap: 4,
    borderRadius: 16,
    backgroundColor: Colors.BACKGROUND_4,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 8,
  },
  inputText: {
    backgroundColor: Colors.BACKGROUND_3,
    borderRadius: 5.48,
    width: "100%",
    height: 38,
    paddingHorizontal: 16,
    paddingTop: 8,
    fontFamily: fonts.almaraiBold,
    color: "white",
    fontSize: 13,
  },
  isideContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "right",
    width: "100%",
    marginTop: 8,
  },
  cards: {
    flexDirection: "column",
    gap: 4,
  },
  controlButtons: {
    flexDirection: "row-reverse",
    width: 157.5,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderRadius: 5.48,
    borderColor: Colors.BACKGROUND_3,
    backgroundColor: Colors.BACKGROUND_5,
  },
  iconsContainer: {
    flexDirection: "row-reverse",
    gap: 2,
    alignItems: "center",
  },
  addContainer: {
    marginTop: 8,
    flexDirection: "column",
    gap: 4,
    width: "100%",
  },
  addCards: {
    width: "100%",
    gap: 8,
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  thirdContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row-reverse",
    gap: 4,
  },
  textContainer: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_3,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    height: 90,
    borderRadius: 5.48,
  },
  addIconeContainer: {
    backgroundColor: Colors.BACKGROUND_3,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    height: 90,
    borderRadius: 5.48,
  },
  box: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    borderRadius: 5.48,
    width: 161,
    justifyContent: "center",
    paddingTop: 4,
    backgroundColor: Colors.BACKGROUND_3,
    height: 117,
    flex: 1,
  },
  blurContainer2: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: Colors.BACKGROUND_3,
    alignItems: "center",
    justifyContent: "center",
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  results: {
    backgroundColor: Colors.BACKGROUND_3,
    borderRadius: 5.48,
    width: "100%",
    flexDirection: "column",
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultsLine: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});