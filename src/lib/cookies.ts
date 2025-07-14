/**
 * Get cookie value by name
 * @param name - Cookie name
 * @returns Cookie value or null if not found
 */
export function getCookie(name: string): string | null {
    try {
        // Normalize cookie name (case-insensitive comparison)
        const cookies = document.cookie.split(';');

        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');

            if (cookieName.toLowerCase() === name.toLowerCase()) {
                return cookieValue ? decodeURIComponent(cookieValue) : null;
            }
        }

        return null;
    } catch (error) {
        console.error('Error reading cookie:', error);
        return null;
    }
}

/**
 * Set cookie
 * @param name - Cookie name
 * @param value - Cookie value
 * @param days - Expiration in days
 */
export function setCookie(
    name: string,
    value: string,
    days: number = 7
): void {
    try {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
    } catch (error) {
        console.error('Error setting cookie:', error);
    }
}

/**
 * Delete cookie by name
 * @param name - Cookie name
 */
export function deleteCookie(name: string): void {
    try {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    } catch (error) {
        console.error('Error deleting cookie:', error);
    }
}