import React, { createContext, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
const FontContext = createContext(false);
import { store } from "./Store/store";
import NewLeague from "./Views/NewLeague";
import { NavigationContainer } from '@react-navigation/native';
export const useFont = () => useContext(FontContext);
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  let [fontsLoaded] = useFonts({
    Almarai_Regular: require("./assets/fonts/Almarai/Almarai-Regular.ttf"),
    Almarai_Bold: require("./assets/fonts/Almarai/Almarai-Bold.ttf"),
    Almarai_Light: require("./assets/fonts/Almarai/Almarai-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
       <NavigationContainer>
      <FontContext.Provider value={fontsLoaded}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <StatusBar style="auto" />
  
          
          <NewLeague />

        </View>
        </GestureHandlerRootView>
      </FontContext.Provider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
