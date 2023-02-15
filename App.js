import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { theme } from "./color";
import AsyncStorage from "@react-native-async-storage/async-storage";
// string 형태로만 저장가능. 브라우저의 local storage 처럼 작동
import { Fontisto } from "@expo/vector-icons";

const STORAGE_KEY = "@toDos";
const STATE_KEY = "@state";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  // tap start
  const travel = () => {
    setWorking(false);
    saveTab(false);
  };
  const work = () => {
    setWorking(true);
    saveTab(true);
  };
  const saveTab = async (toSave) => {
    const newWorking = {
      Working: toSave,
    };
    await AsyncStorage.setItem(STATE_KEY, JSON.stringify(newWorking));
  };
  const loadTab = async () => {
    const s = await AsyncStorage.getItem(STATE_KEY);
    s ? setWorking(JSON.parse(s).Working) : null;
  };
  // tab load

  const onChangeText = (event) => setText(event);
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    // console.log(toSave);
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    if (s) {
      setToDos(JSON.parse(s));
    }
    // console.log(JSON.parse(s))
    // parse === string을 javaScriptObj 로 만들어줌
  };
  const addToDo = async () => {
    if (text === "") {
      return;
    }
    //save to do
    const newToDos = { ...toDos, [Date.now()]: { text, working } }; // 세개의 Object를 결합함
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  const deleteToDo = (key) => {
    Alert.alert("알림", "할 일을 삭제하시겠습니까?", [
      {
        text: "확인",
        style: "destructive",
        // onPress : 웹으로 따졌을때 onClick 와 같은것
        onPress: async () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          await saveToDos(newToDos);
        },
      },
      { text: "취소" },
    ]);
    return;
  };
  useEffect(() => {
    loadToDos();
    loadTab();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.gray }}
          >
            할일
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.gray,
            }}
          >
            여행
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onSubmitEditing={addToDo}
          onChangeText={onChangeText}
          returnKeyType="done"
          value={text}
          placeholder={working ? "할 일을 적어주세요." : "어디에 가고 싶나요?"}
          style={styles.input}
        />
        <ScrollView>
          {Object.keys(toDos).map((key) =>
            toDos[key].working === working ? (
              <View style={styles.toDo} key={key}>
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
                <TouchableOpacity onPress={() => deleteToDo(key)}>
                  <Fontisto name="trash" size={18} color="white" />
                </TouchableOpacity>
              </View>
            ) : null
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 35,
    fontWeight: "600",
    color: "white",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});
