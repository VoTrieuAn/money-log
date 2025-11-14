import {
  createTransaction,
  getTransactionsById,
  updateTransaction,
} from "@/dbs";
import { Transaction } from "@/types/transaction.type";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { View, Text } from "react-native";
import { Button, RadioButton, TextInput } from "react-native-paper";
const TransactionFormScreen = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [formData, setFormData] = useState<Transaction>({} as Transaction);
  const [type, setType] = useState<"INCOME" | "EXPENSE">("INCOME");

  const router = useRouter();
  const db = useSQLiteContext();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (id) {
        getTransactionsById(db, Number(id)).then((data) => {
          setFormData(data);
          setType(data.type === "INCOME" ? "INCOME" : "EXPENSE");
        });
      }
      return () => {
        handleReset();
        (navigation as any).setParams({ id: undefined });
      };
    }, [id])
  );

  const handleSave = async () => {
    const payload: Transaction = {
      ...formData,
      type: type === "INCOME" ? "INCOME" : "EXPENSE",
    };

    if (!payload.title || !payload.amount || !payload.type) {
      return;
    }
    if (!id) {
      await createTransaction(db, payload);
    } else {
      await updateTransaction(db, payload);
    }
    handleReset();
    // Clear the id param from URL to prevent form from loading edit data on next visit
    router.navigate("/(tabs)/list");
  };

  const handleReset = () => {
    setFormData({
      title: "",
      amount: 0,
    } as Transaction);
    setType("INCOME");
  };

  return (
    <View className="flex flex-1 justify-center items-center">
      <View className="px-4 w-full gap-3">
        <Text className="text-lg text-blue-400 font-bold">{`${
          id ? "Chỉnh sửa" : "Thêm mới"
        }`}</Text>
        <TextInput
          label="Title"
          value={formData.title}
          onChangeText={(value) =>
            setFormData((prev) => ({
              ...prev,
              title: value,
            }))
          }
        />
        <TextInput
          label="Amount"
          value={`${formData.amount || 0}`}
          keyboardType="numeric"
          onChangeText={(value) =>
            setFormData((prev) => ({
              ...prev,
              amount: Number(value),
            }))
          }
        />
        <RadioButton.Group
          value={type}
          onValueChange={(value) => setType(value as "INCOME" | "EXPENSE")}
        >
          <Text className="text-lg">Type:</Text>
          <RadioButton.Item label="Income" value="INCOME" />
          <RadioButton.Item label="Expense" value="EXPENSE" />
        </RadioButton.Group>
        <Button mode="contained" onPress={handleSave}>
          {id ? "Cập nhật" : "Lưu"}
        </Button>
      </View>
    </View>
  );
};
export default TransactionFormScreen;
