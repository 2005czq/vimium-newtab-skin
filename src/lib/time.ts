export type Clock = {
  hours: string;
  minutes: string;
  seconds: string;
  dateLabel: string;
};

const pad2 = (value: number) => String(value).padStart(2, "0");
const weekdays = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];

export function getClock(date = new Date()): Clock {
  return {
    hours: pad2(date.getHours()),
    minutes: pad2(date.getMinutes()),
    seconds: pad2(date.getSeconds()),
    dateLabel: `${pad2(date.getMonth() + 1)}/${pad2(date.getDate())}/${date.getFullYear()} ${weekdays[date.getDay()]}`,
  };
}

export function getGreeting(name: string, date = new Date()): string {
  const hour = date.getHours();

  if (hour >= 5 && hour < 11) return `Good morning, ${name}.`;
  if (hour >= 11 && hour < 18) return `Good afternoon, ${name}.`;
  if (hour >= 18 && hour < 23) return `Good evening, ${name}.`;
  return `It's late, ${name}.`;
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
