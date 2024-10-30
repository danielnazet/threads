import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import {
	Text,
	View,
	StyleSheet,
	Image,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Index() {
	const { startOAuthFlow } = useOAuth({
		strategy: "oauth_facebook",
	});
	const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
		strategy: "oauth_google",
	});

	const data = useQuery(api.users.getAllUsers);
	console.log("Index data", data);

	const handleFacebookLogin = async () => {
		try {
			const { createdSessionId, setActive } = await startOAuthFlow();
			console.log("Created session ID: ", createdSessionId);
			if (createdSessionId) {
				setActive!({ session: createdSessionId });
			}
		} catch (error) {
			console.error(error);
		}
	};
	const handleGoogleLogin = async () => {
		try {
			const { createdSessionId, setActive } =
				await startGoogleOAuthFlow();
			console.log("Created session ID: ", createdSessionId);
			if (createdSessionId) {
				setActive!({ session: createdSessionId });
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<View style={styles.container}>
			<Image
				style={styles.loginImage}
				source={require("../../assets/images/login.png")}
			/>
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.title}>
					How would You like to use Threades?
				</Text>
				<View style={styles.loginButtonContainer}>
					<TouchableOpacity
						onPress={handleFacebookLogin}
						style={styles.loginButton}
					>
						<View style={styles.loginButtonContent}>
							<Image
								source={require("../../assets/images/instagram_icon.webp")}
								style={styles.loginButtonIcon}
							/>
							<Text style={styles.loginButtonText}>
								Continue with Instagram
							</Text>
							<Ionicons
								name="chevron-forward"
								size={24}
								color={Colors.border}
							></Ionicons>
						</View>
						<Text style={styles.loginButtonSubtitle}>
							Log in or create a Threads profile with your
							Instagram account.
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={handleGoogleLogin}
						style={styles.loginButton}
					>
						<View style={styles.loginButtonContent}>
							<Text style={styles.loginButtonText}>
								Continue with Google
							</Text>
							<Ionicons
								name="chevron-forward"
								size={24}
								color={Colors.border}
							></Ionicons>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.loginButton}>
						<View style={styles.loginButtonContent}>
							<Text style={styles.loginButtonText}>
								Use without a profile
							</Text>
							<Ionicons
								name="chevron-forward"
								size={24}
								color={Colors.border}
							></Ionicons>
						</View>
						<Text style={styles.loginButtonSubtitle}>
							You can browse Threats without a profile but won't
							be able to post.
						</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text style={styles.switchAccountButtonText}>
							Switch Account
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 20,
		alignItems: "center",
		backgroundColor: Colors.background,
	},
	loginImage: {
		width: "100%",
		height: 350,
		resizeMode: "cover",
	},
	title: {
		fontFamily: "DMSans_700Bold",
		fontSize: 19,
	},
	loginButton: {
		backgroundColor: "#FFF",
		padding: 20,
		borderRadius: 8,
		borderWidth: StyleSheet.hairlineWidth,
	},
	loginButtonContainer: {
		gap: 20,
	},
	loginButtonContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	loginButtonIcon: {
		width: 40,
		height: 40,
	},
	loginButtonSubtitle: {
		fontFamily: "DMSans_400Regular",
		fontSize: 15,
		marginTop: 5,
		color: "#acacac",
	},
	loginButtonText: {
		fontFamily: "DMSans_500Medium",
		fontSize: 16,
		flex: 1,
	},
	switchAccountButtonText: {
		fontSize: 14,
		color: Colors.border,
		alignSelf: "center",
	},
});
