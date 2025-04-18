import { View, Text, StyleSheet, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import Colors from "../Colors";
import fonts from "../fonts";
import { SvgXml } from "react-native-svg";
import { allIcons } from "../Views/alliconst";
import { useState, useEffect } from "react";
import LinearButton2 from "./linearButton2";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/store";
import { setSelectedTeam, setSelectedGame } from "../Store/leagueSettingsSlice";

interface LeagueSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onSave?: (team: string, game: string) => void;
}

export default function LeagueSettingsModal({ visible, onClose, onSave }: LeagueSettingsModalProps) {
  const dispatch = useDispatch();
  const [activeOption, setActiveOption] = useState<"instant" | "scheduled">("instant");
  const [isGamesDropdownOpen, setIsGamesDropdownOpen] = useState<boolean>(false);
  const [isPlayersDropdownOpen, setIsPlayersDropdownOpen] = useState<boolean>(false);
  const [selectedGame, setLocalSelectedGame] = useState<string>("قهوة واحدة"); // Renamed to avoid conflict
  const [selectedTeam, setLocalSelectedTeam] = useState<string>("8 (16 لاعب)");
  const [countdown, setCountdown] = useState<string>("");
  const selectedTime = useSelector((state: RootState) => state.time.selectedTime);

  // Function to calculate countdown
  const calculateCountdown = () => {
    if (!selectedTime) {
      setCountdown("لم يتم تحديد وقت");
      return;
    }

    const [hours, minutes] = selectedTime.split(":").map(Number);
    const now = new Date();
    const selectedDate = new Date();
    selectedDate.setHours(hours, minutes, 0, 0);

    if (selectedDate < now) {
      selectedDate.setDate(selectedDate.getDate() + 1);
    }

    const diffMs = selectedDate.getTime() - now.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(diffSeconds / (3600 * 24));
    const hoursLeft = Math.floor((diffSeconds % (3600 * 24)) / 3600);
    const minutesLeft = Math.floor((diffSeconds % 3600) / 60);

    let countdownText = "";
    if (days > 0) {
      countdownText = `بعد ${days} يوم${days > 1 ? "أيام" : ""}`;
    } else if (hoursLeft > 0) {
      countdownText = `بعد ${hoursLeft} ساعة${hoursLeft > 1 ? "" : ""}`;
    } else if (minutesLeft > 0) {
      countdownText = `بعد ${minutesLeft} دقيقة${minutesLeft > 1 ? "دقائق" : ""}`;
    } else {
      countdownText = "يبدأ الآن";
    }

    setCountdown(countdownText);
  };

  // Update countdown every minute and when selectedTime or activeOption changes
  useEffect(() => {
    if (activeOption === "scheduled") {
      calculateCountdown();
      const interval = setInterval(calculateCountdown, 60000);
      return () => clearInterval(interval);
    } else {
      setCountdown("");
    }
  }, [selectedTime, activeOption]);

  const getClockSvgXml = (isActive: boolean) => {
    const strokeColor = isActive ? "#FFFDFA" : "#262B33";
    return allIcons.clock2.replace('stroke="#FFFDFA"', `stroke="${strokeColor}"`);
  };

  const getAgendaSvgXml = (isActive: boolean) => {
    const fillColor = isActive ? "#FFFDFA" : "#262B33";
    return allIcons.agenda.replace('fill="#262B33"', `fill="${fillColor}"`);
  };

  const handleSave = () => {
    const gameNumber:any = selectedGame === "قهوة واحدة" ? 1 : 3;
    dispatch(setSelectedTeam(selectedTeam));
    dispatch(setSelectedGame(gameNumber)) // Dispatch Redux action
    onSave?.(selectedTeam, selectedGame); // Pass both team and game
    onClose();
  };

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
      <View style={styles.editLugeContainer}>
        <Text
          style={{
            color: "#fff",
            fontFamily: fonts.almaraiRegular,
            fontSize: 14,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          إعدادات الدوري
        </Text>
        <View style={{ flexDirection: "column", gap: 4 }}>
          <Text
            style={{
              fontFamily: fonts.almaraiRegular,
              color: Colors.DEFAULT_WHITE,
              fontSize: 10,
              textAlign: "right",
            }}
          >
            نوع الدوري
          </Text>
          <View
            style={{
              padding: 4,
              borderRadius: 8,
              backgroundColor: Colors.BACKGROUND_4,
              flexDirection: "row-reverse",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Pressable onPress={() => setActiveOption("instant")}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 8,
                  backgroundColor:
                    activeOption === "instant" ? Colors.PRIMARY_600 : "transparent",
                  borderRadius: 8,
                  gap: 4,
                  width: 147.5,
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.almaraiRegular,
                    color:
                      activeOption === "instant"
                        ? Colors.DEFAULT_WHITE
                        : Colors.BACKGROUND_3,
                    fontSize: 12,
                    textAlign: "right",
                  }}
                >
                  فوري (خلال 15 دقيقة)
                </Text>
                <SvgXml
                  xml={getClockSvgXml(activeOption === "instant")}
                  width={25}
                  height={25}
                />
              </View>
            </Pressable>
            <Pressable onPress={() => setActiveOption("scheduled")}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 8,
                  backgroundColor:
                    activeOption === "scheduled" ? Colors.PRIMARY_600 : "transparent",
                  borderRadius: 8,
                  gap: 4,
                  width: 147.5,
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.almaraiRegular,
                    color:
                      activeOption === "scheduled"
                        ? Colors.DEFAULT_WHITE
                        : Colors.BACKGROUND_3,
                    fontSize: 12,
                    textAlign: "right",
                  }}
                >
                  {activeOption === "scheduled" && countdown
                    ? `مجدول (${countdown})`
                    : "مجدول"}
                </Text>
                <SvgXml
                  xml={getAgendaSvgXml(activeOption === "scheduled")}
                  width={25}
                  height={25}
                />
              </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.gameControl}>
          <View style={styles.tamsAndGames}>
            <Text
              style={{
                fontFamily: fonts.almaraiRegular,
                color: Colors.DEFAULT_WHITE,
                fontSize: 10,
                textAlign: "right",
              }}
            >
              المباريات
            </Text>
            <View style={{ position: "relative" }}>
              <Pressable
                onPress={() => setIsGamesDropdownOpen(!isGamesDropdownOpen)}
              >
                <View style={styles.boxContainer}>
                  {isGamesDropdownOpen ? (
                    <SvgXml xml={allIcons.topAroow} />
                  ) : (
                    <SvgXml xml={allIcons.botoomArrow} />
                  )}
                  <Text
                    style={{
                      fontFamily: fonts.almaraiRegular,
                      color: Colors.DEFAULT_WHITE,
                      fontSize: 12,
                      textAlign: "right",
                    }}
                  >
                    {selectedGame}
                  </Text>
                </View>
              </Pressable>
              {isGamesDropdownOpen && (
                <View style={styles.dropdownContainer}>
                  <Pressable
                    onPress={() => {
                      setLocalSelectedGame("قهوة واحدة"); // Use renamed setter
                      setIsGamesDropdownOpen(false);
                    }}
                  >
                    <View style={styles.dropItems}>
                      <Text style={styles.dropdownItemText}>قهوة واحدة</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setLocalSelectedGame("الأفضل من 3 قهوات"); // Use renamed setter
                      setIsGamesDropdownOpen(false);
                    }}
                  >
                    <View style={styles.dropItems}>
                      <Text style={styles.dropdownItemText}>الأفضل من 3 قهوات</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setLocalSelectedGame("قهوة واحدة النهائي: الأفضل من 3"); // Use renamed setter
                      setIsGamesDropdownOpen(false);
                    }}
                  >
                    <View style={styles.dropItems}>
                      <Text style={styles.dropdownItemText}>
                        قهوة واحدة النهائي: الأفضل من 3
                      </Text>
                    </View>
                  </Pressable>
                </View>
              )}
            </View>
          </View>

          <View style={styles.tamsAndGames}>
            <Text
              style={{
                fontFamily: fonts.almaraiRegular,
                color: Colors.DEFAULT_WHITE,
                fontSize: 10,
                textAlign: "right",
              }}
            >
              عدد الفرق
            </Text>
            <View style={{ position: "relative" }}>
              <Pressable
                onPress={() => setIsPlayersDropdownOpen(!isPlayersDropdownOpen)}
              >
                <View style={styles.boxContainer}>
                  {isPlayersDropdownOpen ? (
                    <SvgXml xml={allIcons.topAroow} />
                  ) : (
                    <SvgXml xml={allIcons.botoomArrow} />
                  )}
                  <Text
                    style={{
                      fontFamily: fonts.almaraiRegular,
                      color: Colors.DEFAULT_WHITE,
                      fontSize: 12,
                      textAlign: "right",
                    }}
                  >
                    {selectedTeam}
                  </Text>
                </View>
              </Pressable>
              {isPlayersDropdownOpen && (
                <View style={styles.dropdownContainer}>
                  <Pressable
                    onPress={() => {
                      setLocalSelectedTeam("4 (8 لاعب)");
                      setIsPlayersDropdownOpen(false);
                    }}
                  >
                    <View style={styles.dropItems}>
                      <Text style={styles.dropdownItemText}>4 (8 لاعب)</Text>
                    </View>
                  </Pressable>
                  <Pressable
                   onPress={() => {
                      setLocalSelectedTeam("8 (16 لاعب)");
                      setIsPlayersDropdownOpen(false);
                    }}
                  >
                    <View style={styles.dropItems}>
                      <Text style={styles.dropdownItemText}>8 (16 لاعب)</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setLocalSelectedTeam("16 (32 لاعب)");
                      setIsPlayersDropdownOpen(false);
                    }}
                  >
                    <View style={styles.dropItems}>
                      <Text style={styles.dropdownItemText}>16 (32 لاعب)</Text>
                    </View>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <Pressable onPress={onClose}>
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
          <Pressable>
            <View style={{ ...styles.buttons, height: 0, marginTop: 8 }}>
              <LinearButton2
                text="إنشاء دوري"
                textStyles={{ fontSize: 12, fontFamily: fonts.almaraiBold }}
                onPress={handleSave}
                containerStyle={{
                  width: "100%",
                }}
                linearStyle={{
                  width: "100%",
                  height: 40,
                  paddingVertical: 0,
                }}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  editLugeContainer: {
    flexDirection: "column",
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.BACKGROUND_5,
  },
  gameControl: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  tamsAndGames: {
    flexDirection: "column",
    gap: 4,
  },
  boxContainer: {
    width: 149.5,
    height: 32.45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderRadius: 5.48,
    backgroundColor: Colors.BACKGROUND_4,
  },
  dropdownContainer: {
    position: "absolute",
    top: -110,
    right: 0,
    width: 149.5,
    backgroundColor: Colors.BACKGROUND_4,
    borderRadius: 5.48,
    zIndex: 10,
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 6,
    flexDirection: "column",
    gap: 4,
  },
  dropdownItemText: {
    fontFamily: fonts.almaraiRegular,
    color: Colors.PRIMARY_500,
    fontSize: 12,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: 16,
    gap: 8,
  },
  buttons: {
    width: 149.5,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  dropItems: {
    backgroundColor: Colors.BACKGROUND_5,
    borderRadius: 8,
    paddingVertical: 4,
  },
});