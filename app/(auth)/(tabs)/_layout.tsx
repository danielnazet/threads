import React from "react";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@clerk/clerk-expo";
import * as Haptics from "expo-haptics";

const styles = StyleSheet.create({
	createIconContainer: {
		backgroundColor: Colors.itemBackground,
		padding: 6,
		borderRadius: 8,
	},
});

const CreateTabIcon = ({
	color,
	size,
	focused,
}: {
	color: string;
	size: number;
	focused: boolean;
}) => {
	return (
		<View style={styles.createIconContainer}>
			<Ionicons
				name={focused ? "add" : "add-outline"}
				color={color}
				size={size}
			/>
		</View>
	);
};
const Layout = () => {
	const { signOut } = useAuth();
	const router = useRouter();
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarActiveTintColor: "#000",
			}}
		>
			<Tabs.Screen
				name="feed"
				options={{
					headerShown: false,
					title: "Home",
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? "home" : "home-outline"}
							color={color}
							size={size}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="search"
				options={{
					headerShown: false,
					title: "Search",
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? "search" : "search-outline"}
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="create"
				options={{
					title: "Create",
					tabBarIcon: ({ color, size, focused }) => (
						<CreateTabIcon
							color={color}
							size={size}
							focused={focused}
						/>
					),
				}}
				listeners={{
					tabPress: (e) => {
						e.preventDefault();
						Haptics.selectionAsync();
						router.push("/(modal)/create");
					},
				}}
			/>
			<Tabs.Screen
				name="favorites"
				options={{
					title: "Favorites",
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? "heart" : "heart-outline"}
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? "person" : "person-outline"}
							color={color}
							size={size}
						/>
					),
					headerRight: () => (
						<TouchableOpacity onPress={() => signOut()}>
							<Ionicons name="log-out" size={24} />
						</TouchableOpacity>
					),
				}}
			/>
			{/* Add more screens here */}
		</Tabs>
	);
};

export default Layout;