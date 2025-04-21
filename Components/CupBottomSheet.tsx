import React, { useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, Pressable, TouchableWithoutFeedback } from "react-native";
import { SvgXml } from "react-native-svg";
import BottomSheet from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import LinearButton2 from "../Components/linearButton2";
import fonts from "../fonts";
import Colors from "../Colors";
import { allIcons } from "../Views/alliconst";

interface CupBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function CupBottomSheet({ isVisible, onClose }: CupBottomSheetProps) {
      const [isModalVisible, setIsModalVisible] = useState(false);
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
              تصاميم الورق
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
              للجصول على المزيد من تصاميم الورق اشتريها من المتجر
            </Text>
            <View style={{ backgroundColor: Colors.BACKGROUND_4, paddingHorizontal: 17.07, height: '75%', paddingTop: 8, borderRadius: 8 }}>
              <View style={{ width: '100%', flexDirection: "row", gap: 8 }}>
                <Pressable onPress={() => {setSelectedCard('card1')
                        setIsModalVisible(true)
                }}>
                  <View style={{
                    width: 150.43,
                    height: 150.43,
                    backgroundColor: selectedCard === 'card1' ? "#6A6560" : Colors.BACKGROUND_5,
                    borderRadius: 14.72,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: selectedCard === 'card1' ? 3 : 0,
                    borderColor: selectedCard === 'card1' ? Colors.PRIMARY_700 : 'transparent'
                  }}>
                    <SvgXml xml={allIcons.cup} />
                    <View style={{width:135.71,backgroundColor:Colors.BACKGROUND_4,borderRadius:16,paddingVertical:2,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:4,marginTop:14.72}}>
                          <SvgXml xml={allIcons.dimond} />
<Text style={{ fontSize: 12, fontFamily: fonts.almaraiRegular ,color:"#ffff"}}>
500,000
</Text>
                    </View>
                  </View>
                </Pressable>
                <Pressable onPress={() => {setSelectedCard('card2')
                        setIsModalVisible(true)
                }}>
                  <View style={{
                    width: 150.43,
                    height: 150.43,
                    backgroundColor: selectedCard === 'card2' ? "#6A6560" : Colors.BACKGROUND_5,
                    borderRadius: 14.72,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: selectedCard === 'card2' ? 3 : 0,
                    borderColor: selectedCard === 'card2' ? Colors.PRIMARY_700 : 'transparent'
                  }}>
                    <SvgXml xml={allIcons.cup} />
                    <View style={{width:135.71,backgroundColor:Colors.BACKGROUND_4,borderRadius:16,paddingVertical:2,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:4,marginTop:14.72}}>
                          <SvgXml xml={allIcons.dimond} />
<Text style={{ fontSize: 12, fontFamily: fonts.almaraiRegular ,color:"#ffff"}}>
250,000
</Text>
                    </View>
                  </View>
                </Pressable>
              </View>
              <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Pressable onPress={() => {setSelectedCard('card3')
                    setIsModalVisible(true)
                }}>
                  <View style={{
                    width: 150.43,
                    height: 150.43,
                    backgroundColor: selectedCard === 'card3' ? "#6A6560" : Colors.BACKGROUND_5,
                    borderRadius: 14.72,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 8,
                    borderWidth: selectedCard === 'card3' ? 3 : 0,
                    borderColor: selectedCard === 'card3' ? Colors.PRIMARY_700 : 'transparent'
                  }}>
                    <SvgXml xml={allIcons.cup} />
                    <View style={{width:135.71,backgroundColor:Colors.BACKGROUND_4,borderRadius:16,paddingVertical:2,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:4,marginTop:14.72}}>
                          <SvgXml xml={allIcons.dimond} />
<Text style={{ fontSize: 12, fontFamily: fonts.almaraiRegular ,color:"#ffff"}}>
1,000,000
</Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
            <Pressable>
                <View style={{...styles.buttons,marginTop:8}}>
                  <LinearButton2
                    text="تأكيد"
                    textStyles={{ fontSize: 12, fontFamily: fonts.almaraiBold }}
                    onPress={() => {}}
                    containerStyle={{
                      width: "100%",
                      opacity: selectedCard ? 1 : 0.5
                    }}
                    linearStyle={{
                      width: "100%",
                      height: 40,
                      paddingVertical: 0,
                    }}
                  />
                </View>
              </Pressable>
              <Pressable onPress={()=>{
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
{ isModalVisible&&     <View
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
           
                  <SvgXml xml={allIcons.cup} />
                  <View style={styles.textsContainer}>
                    <Text
                      style={{
                        color: "#ffff",
                        fontFamily: fonts.almaraiRegular,
                        fontSize: 12,
                        textAlign: "center",
                      }}
                    >
                بطل بطولة عامة
                    </Text>
                    <View style={{width:307,height:90,backgroundColor:Colors.BACKGROUND_4,borderRadius:8,alignItems:'center',justifyContent:"center",paddingHorizontal:16}}>
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: fonts.almaraiBold,
                        fontSize: 14,
                        textAlign: "center",
                      }}
                    >
              جائزة الفوز ببوطلة [اسم البطولة] يمكنك وضع اسم الدوري لترى كيف يظهر الوصف
                    </Text>
                    </View>
                 
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
                      backgroundColor: "#B5B5B5B2",
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
              </View>}
    </>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 8,
    width: "100%",
    flexDirection: "row",
 justifyContent:'space-between',
    alignItems: "center",
    // gap: 16,

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