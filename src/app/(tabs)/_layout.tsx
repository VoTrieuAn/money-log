import { Tabs } from "expo-router";
import { Icon } from "react-native-paper";
const TabLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="list"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              size={24}
              source={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="form"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              size={24}
              source={focused ? "list-box" : "list-box-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="trash"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              size={24}
              source={focused ? "trash-can" : "trash-can-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              size={24}
              source={focused ? "profile" : "profile-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabLayout;
