// Components/TimeSet.tsx
import { View, Text, StyleSheet, Pressable,TextInput } from "react-native";
import { BlurView } from "expo-blur";
import Colors from "../Colors"; 
import fonts from "../fonts";
import LinearButton2 from "./linearButton2";
import { allIcons } from "../Views/alliconst";
import { SvgXml } from "react-native-svg";
interface FirstWiner {
  visible: boolean;
  onClose: () => void;
}

export default function TimeSet({ visible, onClose }: FirstWiner) {
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
 الجائزة الأولى
        </Text>
        <Text
                       style={{
                         fontFamily: fonts.almaraiRegular,
                         color: Colors.DEFAULT_WHITE,
                         fontSize: 10,
                         textAlign: "right",
                         marginTop:16
                       }}
                     >
                  حدد جائزة المركز الأول
                     </Text>
                     <View style={styles.inputContainer}>
        <SvgXml xml={allIcons.dimond} />
<TextInput placeholder="7000" style={styles.inputStyle} placeholderTextColor={'#616671'}/>

</View>
                      <View style={{ marginTop: 28, width: "100%" }}>
                        <LinearButton2
                          text="تأكيد"
                          textStyles={{ fontSize: 12, fontFamily: fonts.almaraiBold }}
                          onPress={onClose}
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
    width: "85%", 
  },
 
  inputContainer:{
    flexDirection:'row',
    width:307,
    height:48,
    alignItems:'center',
    paddingHorizontal: 16,
    backgroundColor:Colors.BACKGROUND_4,
    borderRadius:4,
    marginTop:4

  },
  inputStyle:{
    backgroundColor:'transparent',
    flex:1,
    fontFamily:fonts.almaraiRegular,
    fontSize:14,
    color:'white',
    textAlign:'right'
  }
});