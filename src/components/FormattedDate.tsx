import { format } from 'date-fns';

interface FormattedDateProps {
  date: Date;
}

export default function FormattedDate({ date }: FormattedDateProps) {
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return (
    <time dateTime={date.toISOString()}>{format(localDate, 'MMM d, yyyy')}</time>
  );
}
