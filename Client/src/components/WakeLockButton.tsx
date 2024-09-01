import { ActionIcon } from "@mantine/core";
import { signal } from "@preact/signals";
import { Lock, LockOpen } from "lucide-react";
import toast from "react-hot-toast";
import { globalState } from "../context/GlobalState";
import { widthSizeObj } from "../utils/commonUtils";

const isWakeLockAvailable = "wakeLock" in navigator || "keepAwake" in screen;

// eslint-disable-next-line no-undef
let wakeLockObj: WakeLockSentinel | null = null;
const isWakeLockLoading = signal(false);

const toggleWakeLock = () => {
	if ("wakeLock" in navigator) {
		if (wakeLockObj) {
			wakeLockObj.release();
			wakeLockObj = null;
			globalState.isWakeLock.value = false;
		} else {
			isWakeLockLoading.value = true;
			navigator.wakeLock
				.request("screen")
				.then((wakeLock) => {
					wakeLockObj = wakeLock;
					isWakeLockLoading.value = false;

					wakeLockObj.addEventListener("release", () => {
						toast("Automatic screen lock enabled", { icon: "🔓" });
						wakeLockObj = null;
					});

					globalState.isWakeLock.value = true;
					toast("Automatic screen lock disabled", { icon: "🔒" });
				})
				.catch((err) => {
					console.error(err);
					isWakeLockLoading.value = false;
					toast("Error while trying to keep screen locked on", { icon: "❌" });
				});
		}
	} else if ("keepAwake" in screen) {
		screen.keepAwake = !screen.keepAwake;
		globalState.isWakeLock.value = !!screen.keepAwake;
		if (screen.keepAwake) toast("Automatic screen lock disabled", { icon: "🔒" });
		else toast("Automatic screen lock enabled", { icon: "🔓" });
	}
};

/**
 * The wake lock button
 * @returns the button to toggle the wake lock
 */
export const WakeLockButton = () => (
	<>
		{isWakeLockAvailable && (
			<ActionIcon loading={isWakeLockLoading.value} pb={1}>
				{globalState.isWakeLock.value ? (
					<Lock onClick={toggleWakeLock} width={widthSizeObj(3.5, 6)} />
				) : (
					<LockOpen onClick={toggleWakeLock} width={widthSizeObj(3.5, 6)} />
				)}
			</ActionIcon>
		)}
	</>
);
