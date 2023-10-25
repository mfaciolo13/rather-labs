export const YEAR_DATE_TIME_FORMAT_OPTION: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

export const YEAR_DATE_FORMAT_OPTION: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

export const formatLocalDateString = (
  date: Date,
  format: Intl.DateTimeFormatOptions = YEAR_DATE_TIME_FORMAT_OPTION,
) => {
  return new Intl.DateTimeFormat("en-US", format).format(date);
};
