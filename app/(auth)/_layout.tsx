import React from "react";
import { Stack } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Layout = () => {
	const router = useRouter();
	return (
		<Stack
			screenOptions={{
				contentStyle: {
					backgroundColor: "white",
				},
				headerShadowVisible: false,
			}}
		>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen
				name="(modal)/create"
				options={{
					presentation: "modal",
					title: "New Thread",
					headerRight: () => (
						<TouchableOpacity>
							<Ionicons
								name="ellipsis-horizontal"
								size={30}
								color="black"
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen
				name="(modal)/edit-profile"
				options={{
					presentation: "modal",
					title: "Edit Profile",
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.dismiss()}>
							<Text>Cancel</Text>
						</TouchableOpacity>
					),
				}}
			/>
		</Stack>
	);
};

export default Layout;
