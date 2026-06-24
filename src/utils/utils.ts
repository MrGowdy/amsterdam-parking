export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function set9AMTime() {
  const d = new Date();
  d.setHours(9, 0, 0, 0);
  return d;
}