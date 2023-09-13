export const getRelativeTime = (date: Date | string): string => {
  const actualDate = typeof date === 'string' ? new Date(date) : date;
  const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'short' });
  const diff = actualDate.getTime() - Date.now();
  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diff / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diff / (1000 * 60));
  if (Math.abs(diffInDays) > 0) {
    return rtf1.format(diffInDays, 'day');
  }
  if (Math.abs(diffInHours) > 0) {
    return rtf1.format(diffInHours, 'hour');
  }
  if (Math.abs(diffInMinutes) > 0) {
    return rtf1.format(diffInMinutes, 'minute');
  }
  return 'now';
};
