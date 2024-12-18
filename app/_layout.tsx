import { Slot, useSegments, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@/utils/cache";
import { LogBox } from "react-native";
import {
	useFonts,
	DMSans_400Regular,
	DMSans_500Medium,
	DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { useEffect } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import * as Sentry from "@sentry/react-native";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
	unsavedChangesWarning: false,
});

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!clerkPublishableKey) {
	throw new Error(
		"Missing Publishable Key. please set EXPO PUBLIC CLERK in your env"
	);
}

LogBox.ignoreLogs(["Clerk: Clerk has been loaded with development keys."]);

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

Sentry.init({
	attachScreenshot: true,
	debug: true,
	dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
	tracesSampleRate: 1.0,
	_experiments: {
		profileSampleRate: 1.0,
		replaysSessionSampleRate: 1.0,
		replaysOnErrorSampleRate: 1.0,
	},
	integrations: [
		new Sentry.ReactNativeTracing({
			routingInstrumentation,
			enableNativeFramesTracking: true,
		}),
	],
});

//Prevent auto hide splash screen
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
	const [fontsLoaded] = useFonts({
		DMSans_400Regular,
		DMSans_500Medium,
		DMSans_700Bold,
	});

	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);
	useEffect(() => {
		if (!isLoaded) return;

		const inAuthGroup = segments[0] === "(auth)";

		if (isSignedIn && !inAuthGroup) {
			router.replace("/(auth)/(tabs)/feed");
		} else if (!isSignedIn && inAuthGroup) {
			router.replace("/(public)");
		}
	}, [isSignedIn]);
	return <Slot />;
};

const RootLayout = () => {
	return (
		<ClerkProvider
			publishableKey={clerkPublishableKey!}
			tokenCache={tokenCache}
		>
			<ClerkLoaded>
				<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
					<InitialLayout />
				</ConvexProviderWithClerk>
			</ClerkLoaded>
		</ClerkProvider>
	);
};

export default Sentry.wrap(RootLayout);
