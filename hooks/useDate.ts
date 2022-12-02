import { useEffect, useState } from "react";

export function useDate(dateValue?: string | number | Date): {
  date: Date | undefined;
  now: Date | undefined;
  isoString: string | undefined;
} {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [now, setNow] = useState<Date | undefined>(undefined);
  const [isoString, setIsoString] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (dateValue && window) {
      setDate(new Date(dateValue));
      setNow(new Date());
      setIsoString(new Date(dateValue).toISOString());
    }
  }, [dateValue]);

  return { date, isoString, now };
}
