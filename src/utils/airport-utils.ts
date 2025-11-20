
/**
 * @param timezone 
 * @returns

 */
export function getCityFromTimezone(timezone?: string): string {
    if (!timezone) return "";
    const parts = timezone.split("/");
    if (parts.length > 1) {
        return parts[parts.length - 1].replace(/_/g, " ");
    }
    return "";
}

