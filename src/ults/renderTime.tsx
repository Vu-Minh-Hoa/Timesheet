export const renderTime = (time: Date): string => {
  return new Date(time).toLocaleString('vi', {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit'
  });
};

export const getHour = (time: number): string => {
  if (time === 0) return '00 : 00';
  return `${Math.floor(time / 60)
    .toString()
    .padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;
};
