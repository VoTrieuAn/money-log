import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
const profile = () => {
  return (
    <View className="flex flex-1 items-center px-4 py-4">
      <View className="w-full gap-3 ">
        <Text className="text-xl font-bold text-blue-400">
          Thông tin sinh viên
        </Text>
        <TextInput label={"Họ và tên"} value="Võ Triều An" />
        <TextInput label={"MSSV"} value="22657391" />
        <TextInput label={"Lớp HP"} value="DHKTPM18ATT" />
      </View>
    </View>
  );
};
export default profile;
