import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function setCurrentDate(): string {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: '2-digit', 
  day: '2-digit', 
  hour: '2-digit', 
  minute: '2-digit', 
  second: '2-digit', 
  });
  return formattedDate;
}
export const handleReload = (seconds : number) => {
  return new Promise<void>((resolve) => {
    const intervalId = setInterval(() => {
      seconds -= 1;
      console.log(`Page will reload in ${seconds} seconds`);
      if (seconds === 0) {
        clearInterval(intervalId);
        resolve();
      }
    }, 1000);
  })
  .then(() => {
    console.log('Reloading page...');
    window.location.reload();
  });
};