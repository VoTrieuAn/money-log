import TransactionItem from "@/compoents/TransactionItem";
import { deleteTransaction, getAllTransactions } from "@/dbs";
import { Transaction } from "@/types/transaction.type";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SegmentedButtons, TextInput } from "react-native-paper";
const TransactionListScreen = () => {
  const db = useSQLiteContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [titleSearch, setTitleSearch] = useState<string>("");
  const [typeSearch, setTypeSearch] = useState<"ALL" | "INCOME" | "EXPENSE">(
    "ALL"
  );

  const handleFetchDb = async () => {
    getAllTransactions(db, 0).then((data) => {
      setTransactions(data);
    });
  };

  useFocusEffect(
    useCallback(() => {
      handleFetchDb();
    }, [])
  );

  const handleSoftDelete = async (id: number) => {
    await deleteTransaction(db, id);
    handleFetchDb();
  };

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((item) => item.title.includes(titleSearch))
      .filter((item) =>
        typeSearch === "ALL" ? true : item.type === typeSearch
      );
  }, [titleSearch, typeSearch, transactions]);

  return (
    <View className="flex flex-1">
      <View className="px-4 gap-3">
        <Text className="text-xl">Tìm kiếm</Text>
        <TextInput
          label={"Title"}
          onChangeText={(value) => setTitleSearch(value)}
        />
        <SegmentedButtons
          value={typeSearch}
          onValueChange={(value: string) =>
            setTypeSearch(value as "ALL" | "INCOME" | "EXPENSE")
          }
          buttons={[
            { value: "ALL", label: "Tất cả" },
            { value: "INCOME", label: "Thu nhập" },
            { value: "EXPENSE", label: "Chi tiêu" },
          ]}
        />
      </View>
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionItem data={item} onDelete={handleSoftDelete} />
        )}
      />
    </View>
  );
};
export default TransactionListScreen;
