import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
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
		</Stack>
	);
};

export default Layout;
