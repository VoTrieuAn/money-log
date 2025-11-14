import TransactionDeletedItem from "@/compoents/TransactionDeletedItem";
import { getAllTransactions, restoreTransaction } from "@/dbs";
import { Transaction } from "@/types/transaction.type";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { View, Text, FlatList } from "react-native";
const TransactionTrashScreen = () => {
  const db = useSQLiteContext();

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleFetchDb = async () => {
    getAllTransactions(db, 1).then((data) => {
      setTransactions(data);
    });
  };

  useFocusEffect(
    useCallback(() => {
      handleFetchDb();
    }, [])
  );

  const handleRestore = async (id: number) => {
    await restoreTransaction(db, id);
    handleFetchDb();
  };

  return (
    <View className="flex flex-1">
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionDeletedItem data={item} onRestore={handleRestore} />
        )}
      />
    </View>
  );
};
export default TransactionTrashScreen;
