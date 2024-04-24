interface PayPeriod {
    label: string;
    days: number;
  }
  
const payPeriods: PayPeriod[] = [
{ label: 'Monthly', days: 30 },       // Assuming 30 days in a month
{ label: 'Semi-Monthly', days: 15 },  // Semi-monthly is every 15 days
{ label: 'Bi-Weekly', days: 14 },      // Every 14 days for bi-weekly
{ label: 'Weekly', days: 7 },          // Every 7 days for weekly
];

export function generatePayPeriodDates(selectedPayPeriod: string) {

  const payPeriod = payPeriods.find(period => period.label === selectedPayPeriod);

  if (!payPeriod) {
      console.error("Invalid pay period selected.");
      return null;
  }

  const startDate = new Date(); // Today's date
  startDate.setDate(startDate.getDate() + 1); // Start from tomorrow

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + payPeriod.days - 1); // Calculate end date
  console.log(startDate)
  console.log(endDate)
  return {
      startDate: formatDateTime(startDate),
      endDate: formatDateTime(endDate),
  }
}
function formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }