// import moment from 'moment-hijri';

export const urduDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export const urduMonths = [
  'محرم',
  'صفر',
  'ربیع الاول',
  'ربیع الثانی',
  'جمادی الاول',
  'جمادی الثانی',
  'رجب',
  'شعبان',
  'رمضان',
  'شوال',
  'ذوالقعدہ',
  'ذوالحجہ',
];

export const dayMap = [
  { label: 'SUN', value: '1' },
  { label: 'MON', value: '2' },
  { label: 'TUE', value: '3' },
  { label: 'WED', value: '4' },
  { label: 'THU', value: '5' },
  { label: 'FRI', value: '6' },
  { label: 'SAT', value: '7' },
];

export const formatDays = (dayString) => {
  if (!dayString) return '';

  return dayString
    .split('')
    .map((val) => dayMap.find((d) => d.value === val)?.label)
    .filter(Boolean)
    .join(', ');
};

// export const formatDate = (date, format = 'DD-MM-YYYY') => {
//   if (!date) return '';
//   return moment(date).format(format);
// };

export const formatDateForInput = (dateStr) => {
  const monthMap = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };

  const [day, monthAbbr, year] = dateStr.split('-');
  const month = monthMap[monthAbbr];
  return `${year}-${month}-${day.padStart(2, '0')}`;
};

export const formatTime = (timeStr) => {
  return timeStr?.replace(':', '') || '';
};

export const formatTimeTo12Hour = (timeStr) => {
  if (!timeStr) return '';

  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  const options = { hour: 'numeric', minute: '2-digit', hour12: true };
  return date.toLocaleTimeString('en-US', options);
};

export const formatMilitaryTime = (hhmm) => {
  if (!hhmm || hhmm.length !== 4) return '';

  const hours = parseInt(hhmm.slice(0, 2), 10);
  const minutes = parseInt(hhmm.slice(2), 10);

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

// export const formatMilitaryTimeForInput = (hhmm) => {
//   if (!hhmm || hhmm.length !== 4) return '';
//   const hours = hhmm.slice(0, 2);
//   const minutes = hhmm.slice(2, 4);
//   return `${hours}:${minutes}`;
// };

export const formatMilitaryTimeForInput = (hhmm) => {
  if (!hhmm) return '';
  
  const formattedTime = formatMidnightTime(hhmm);

  if (formattedTime.length === 4) {
    const hours = formattedTime.slice(0, 2);
    const minutes = formattedTime.slice(2, 4);
    return `${hours}:${minutes}`;
  }
  
  return '';
};

export const convertToIslamicDate = (date, format = 'YYYY-MM-DD') => {
  if (!date) return '';

  const urduMonths = [
    'محرم',
    'صفر',
    'ربیع الاول',
    'ربیع الثانی',
    'جمادی الاول',
    'جمادی الثانی',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذوالقعدہ',
    'ذوالحجہ',
  ];

  // if (!moment(date, format, true).isValid()) {
  //   console.warn('Invalid date input:', date);
  //   return '';
  // }

  // const hijriDate = moment(date, format);

  if (!hijriDate.isValid()) {
    console.warn('Failed to convert to Hijri date:', date);
    return '';
  }

  const hijriYear = hijriDate.iYear();
  const hijriMonth = hijriDate.iMonth();
  const hijriDay = hijriDate.iDate();

  const islamicDate = `${hijriDay} ${urduMonths[hijriMonth]} ${hijriYear} ھجری`;

  return islamicDate;
};

export const convertToHijriDate = (date, format = 'YYYY-MM-DD') => {
  if (!date) return '';

  const urduMonths = [
    'محرم',
    'صفر',
    'ربیع الاول',
    'ربیع الثانی',
    'جمادی الاول',
    'جمادی الثانی',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذوالقعدہ',
    'ذوالحجہ',
  ];

  // if (!moment(date, format, true).isValid()) {
  //   console.warn('Invalid date input:', date);
  //   return '';
  // }

  const toUrduNumerals = (num) => {
    const urduDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/[0-9]/g, (d) => urduDigits[d]);
  };

  // const hijriDate = moment(date, format);

  if (!hijriDate.isValid()) {
    console.warn('Failed to convert to Hijri date:', date);
    return '';
  }

  const hijriYear = hijriDate.iYear();
  const hijriMonth = hijriDate.iMonth();
  const hijriDay = hijriDate.iDate();

  const islamicDate = `${toUrduNumerals(hijriDay)} ${urduMonths[hijriMonth]} ${toUrduNumerals(hijriYear)} ھجری`;

  return islamicDate;
};

export const numbertoUrduDigits = (number) => {
  return number.toString().replace(/[0-9]/g, (digit) => urduDigits[parseInt(digit)]);
};

export const formatDateWithDay = (date) => {
  if (!date) return '';
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };

  const formatted = new Date(date).toLocaleDateString('en-GB', options);
  return formatted.replace(/(\d{2}) (\w+) (\d{4})/, '$1 $2, $3'); // optional: adds a comma after the month
};

export const formatDateTimeForInput = (dateTimeStr) => {
  if (!dateTimeStr) return '';

  const [datePart, timePart] = dateTimeStr.split(' ');
  const [day, month, year] = datePart.split('-');

  return `${year}-${month}-${day}T${timePart}`;
};

export const formatToYMD = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-'); // Assuming "DD-MM-YYYY"
  if (parts.length === 3) {
    const [dd, mm, yyyy] = parts;
    return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
  }
  return dateStr;
};

export const formatCurrency = (value) => {
  if (value >= 1_000_000_000) return `PKR ${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `PKR ${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `PKR ${(value / 1_000).toFixed(1)}K`;
  return `PKR ${value}`;
};

export const convertToYMD = (dateStr) => {
  const [day, month, year] = dateStr.split("-");
  return `${year}-${month}-${day}`;
};

export const formatMidnightTime = (time) => {
  if (!time) return time;
  const timeStr = String(time);
  return timeStr.length === 3 ? `0${timeStr}` : timeStr;
};