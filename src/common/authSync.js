/**
 * Cross-tab & multi-device authentication synchronization utility
 * Provides instant real-time synchronization between browser tabs using BroadcastChannel & storage events,
 * and standard event helpers for session lifecycle management.
 */

const CHANNEL_NAME = "portfolio_admin_auth_sync";
const STORAGE_KEY = "portfolio_auth_sync_event";

let channel = null;
try {
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        channel = new BroadcastChannel(CHANNEL_NAME);
    }
} catch (e) {
    console.warn("BroadcastChannel initialization warning:", e);
}

/**
 * Broadcast an authentication event to all other open tabs/windows
 * @param {Object} event - { type: 'AUTH_LOGOUT' | 'AUTH_LOGIN' | 'SESSION_EXPIRED', message?: string, [key: string]: any }
 */
export const broadcastAuthEvent = (event) => {
    const payload = { ...event, timestamp: Date.now() };

    // 1. Broadcast via native BroadcastChannel (instant within the browser across tabs)
    if (channel) {
        try {
            channel.postMessage(payload);
        } catch (err) {
            console.warn("BroadcastChannel postMessage error:", err);
        }
    }

    // 2. Storage event fallback (triggers storage event in other tabs)
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        // Clean up shortly after to prevent storage clutter
        setTimeout(() => {
            try {
                if (localStorage.getItem(STORAGE_KEY) === JSON.stringify(payload)) {
                    localStorage.removeItem(STORAGE_KEY);
                }
            } catch (_) {}
        }, 1000);
    } catch (err) {
        console.warn("localStorage broadcast fallback error:", err);
    }
};

/**
 * Subscribe to authentication events originating from other tabs/windows
 * @param {Function} callback - (event) => void
 * @returns {Function} unsubscribe cleanup function
 */
export const subscribeAuthEvents = (callback) => {
    if (typeof window === "undefined" || !callback) return () => {};

    // 1. BroadcastChannel message listener
    const handleChannelMessage = (msgEvent) => {
        if (msgEvent?.data) {
            callback(msgEvent.data);
        }
    };

    if (channel) {
        channel.addEventListener("message", handleChannelMessage);
    }

    // 2. Storage event listener (fires in all other tabs when localStorage key changes)
    const handleStorageEvent = (storageEvent) => {
        if (storageEvent.key === STORAGE_KEY && storageEvent.newValue) {
            try {
                const parsed = JSON.parse(storageEvent.newValue);
                if (parsed) {
                    callback(parsed);
                }
            } catch (err) {
                console.warn("Error parsing storage sync payload:", err);
            }
        }
    };

    window.addEventListener("storage", handleStorageEvent);

    return () => {
        if (channel) {
            channel.removeEventListener("message", handleChannelMessage);
        }
        window.removeEventListener("storage", handleStorageEvent);
    };
};
