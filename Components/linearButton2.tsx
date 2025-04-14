import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle, View } from 'react-native';
import { ReactNode } from 'react';
import Colors from '../Colors';
import { SvgXml } from 'react-native-svg';

interface BasicProps {
  onPress: () => void;
  containerStyle?: ViewStyle;
  linearStyle?: ViewStyle;
  textStyles?: TextStyle;
  disabled?: boolean;
  insetShadowContainerStyle?: ViewStyle;
  iconXml?: string;
}

interface ChildrenProps extends BasicProps {
  children: ReactNode;
}

interface TextProps extends BasicProps {
  text: string;
}

export default function LinearButton(props: TextProps | ChildrenProps) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[styles.container, props.containerStyle]}
      onPress={props.onPress}
    >
      <LinearGradient
        style={[styles.linear, props.linearStyle]}
        colors={[Colors.PRIMARY_600, '#FFAF36']}
        start={{ x: 0, y: 0 }} // Top
        end={{ x: 0, y: 1 }}   // Bottom
      >
        <View style={styles.contentWrapper}>
          {props.iconXml && (
            <SvgXml xml={props.iconXml} width={18} height={18} style={styles.icon} />
          )}
          {'children' in props ? (
            props.children
          ) : (
            <Text style={[styles.text, props.textStyles]}>{props.text}</Text>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linear: {
    width: '100%',
    borderRadius: 6,
    paddingVertical: 10,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.DEFAULT_WHITE,
    fontFamily: 'Almarai_Bold',
    fontSize: 12,
    textAlign: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow for iOS
    shadowColor: Colors.PRIMARY_600,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    // Elevation for Android
    elevation: 6,
  },
  contentWrapper: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6.59,
  },
  icon: {
    marginRight: 8,
  },
});