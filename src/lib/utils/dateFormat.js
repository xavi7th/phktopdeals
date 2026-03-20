/**
 * Format timestamp to 12-hour format with UTC precision
 * @param {string | number | Date} timestamp
 * @param {boolean} showUTC - Whether to show UTC timezone indicator
 * @returns {string} Formatted time string (e.g., "3:45 PM" or "3:45 PM UTC")
 */
export function formatMessageTime(timestamp, showUTC = false) {
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    return "";
  }

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const twelveHour = hours % 12 || 12;
  const paddedMinutes = minutes.toString().padStart(2, "0");

  let result = `${twelveHour}:${paddedMinutes} ${ampm}`;

  if (showUTC) {
    const utcOffset = -date.getTimezoneOffset();
    const utcHours = Math.floor(utcOffset / 60);
    const utcMins = utcOffset % 60;
    const sign = utcHours >= 0 ? "+" : "";
    result += ` UTC${sign}${utcHours}:${utcMins.toString().padStart(2, "0")}`;
  }

  return result;
}

/**
 * Format timestamp for message list grouping
 * @param {string | number | Date} timestamp
 * @returns {string} Formatted date string (e.g., "Today", "Yesterday", or "Mar 14")
 */
export function formatMessageDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();

  if (isNaN(date.getTime())) {
    return "";
  }

  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffDays = Math.floor((nowOnly - dateOnly) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
}
