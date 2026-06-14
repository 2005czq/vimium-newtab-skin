export type Clock = {
  hours: string;
  minutes: string;
  seconds: string;
  dateLabel: string;
};

const pad2 = (value: number) => String(value).padStart(2, "0");
const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

export function getClock(date = new Date()): Clock {
  return {
    hours: pad2(date.getHours()),
    minutes: pad2(date.getMinutes()),
    seconds: pad2(date.getSeconds()),
    dateLabel: `${date.getFullYear()}年${pad2(date.getMonth() + 1)}月${pad2(date.getDate())}日 ${weekdays[date.getDay()]}`,
  };
}

export function getGreeting(name: string, date = new Date()): string {
  const hour = date.getHours();

  if (hour >= 5 && hour < 11) return `早上好，${name}`;
  if (hour >= 11 && hour < 14) return `中午好，${name}`;
  if (hour >= 14 && hour < 18) return `下午好，${name}`;
  if (hour >= 18 && hour < 23) return `晚上好，${name}`;
  return `夜深了，${name}`;
}

export function scheduleOnSecond(callback: () => void): () => void {
  let timer: number | undefined;

  const tick = () => {
    callback();
    const now = Date.now();
    timer = window.setTimeout(tick, 1000 - (now % 1000) + 12);
  };

  tick();

  return () => {
    if (timer !== undefined) window.clearTimeout(timer);
  };
}
