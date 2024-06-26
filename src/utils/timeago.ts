export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - date.getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (seconds >= 5) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}
