import { Button, StyleSheet, Text, View } from "react-native";
import * as Sentry from "@sentry/react-native";

const Page = () => {
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Text>this is feed page</Text>
			<Button
				title="test error"
				onPress={() => Sentry.captureException(new Error("Test Error"))}
			/>
		</View>
	);
};

export default Page;

const styles = StyleSheet.create({});
