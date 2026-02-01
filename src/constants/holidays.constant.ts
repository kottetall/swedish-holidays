export const weekdays = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 0,
} as const;

export const weekdaysInSwedish = {
  1: "måndag",
  2: "tisdag",
  3: "onsdag",
  4: "torsdag",
  5: "fredag",
  6: "lördag",
  0: "söndag",
} as const;

export const timeInMilliseconds = {
  SECOND: 1000,
  MINUTE: 1000 * 60,
  HOUR: 1000 * 60 * 60,
  DAY: 1000 * 60 * 60 * 24,
  WEEK: 1000 * 60 * 60 * 24 * 7,
} as const;

export const datePosition = {
  BEFORE: "before",
  AFTER: "after",
} as const;

export const holidayName = {
  NYARSDAGEN: "nyårsdagen",
  TRETTONDEDAG_JUL: "trettondedag jul",
  LANGFREDAGEN: "långfredagen",
  PASKDAGEN: "påskdagen",
  ANNANDAG_PASK: "annandag påsk",
  KRISTI_HIMMELSFARDSDAG: "kristi himmelsfärdsdag",
  FORSTA_MAJ: "första maj",
  PINGSTDAGEN: "pingstdagen",
  NATIONALDAGEN: "nationaldagen",
  MIDSOMMARDAGEN: "midsommardagen",
  ALLA_HELGONS_DAG: "alla helgons dag",
  JULDAGEN: "juldagen",
  ANNANDAG_JUL: "annandag jul",
  JULAFTON: "julafton",
  MIDSOMMARAFTON: "midsommarafton",
  NYARSAFTON: "nyårsafton",
} as const;
