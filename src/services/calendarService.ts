export interface CalendarEventDetails {
  title: string;
  description: string;
  location: string;
  startDate: string; // YYYY-MM-DD
  startTime?: string | null; // HH:mm (if available)
  timeDescription?: string;
  timezone?: string;
}

export function generateGoogleCalendarUrl(details: CalendarEventDetails): string {
  const { title, description, location, startDate, startTime, timeDescription } = details;

  let datesParam: string;

  if (startTime) {
    // Format YYYYMMDDTHHmmSS
    const dateClean = startDate.replace(/-/g, '');
    const timeClean = startTime.replace(/:/g, '') + '00';
    // Assume 3 hours duration
    const startHour = parseInt(startTime.split(':')[0], 10);
    const endHour = (startHour + 3).toString().padStart(2, '0');
    const endTimeClean = `${endHour}${startTime.split(':')[1]}00`;
    datesParam = `${dateClean}T${timeClean}/${dateClean}T${endTimeClean}`;
  } else {
    // All-day format: YYYYMMDD/YYYYMMDD
    const dateClean = startDate.replace(/-/g, '');
    const nextDateObj = new Date(startDate);
    nextDateObj.setDate(nextDateObj.getDate() + 1);
    const nextDateClean = nextDateObj.toISOString().slice(0, 10).replace(/-/g, '');
    datesParam = `${dateClean}/${nextDateClean}`;
  }

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: datesParam,
    details: `${description}${timeDescription ? `\nTiming: ${timeDescription}` : ''}`,
    location: location,
    ctz: details.timezone || 'Asia/Kolkata',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(details: CalendarEventDetails): void {
  const { title, description, location, startDate, startTime, timeDescription } = details;

  let dtStart: string;
  let dtEnd: string;

  const dateClean = startDate.replace(/-/g, '');

  if (startTime) {
    const timeClean = startTime.replace(/:/g, '') + '00';
    const startHour = parseInt(startTime.split(':')[0], 10);
    const endHour = (startHour + 3).toString().padStart(2, '0');
    const endTimeClean = `${endHour}${startTime.split(':')[1]}00`;
    dtStart = `DTSTART;TZID=Asia/Kolkata:${dateClean}T${timeClean}`;
    dtEnd = `DTEND;TZID=Asia/Kolkata:${dateClean}T${endTimeClean}`;
  } else {
    // All day
    const nextDateObj = new Date(startDate);
    nextDateObj.setDate(nextDateObj.getDate() + 1);
    const nextDateClean = nextDateObj.toISOString().slice(0, 10).replace(/-/g, '');
    dtStart = `DTSTART;VALUE=DATE:${dateClean}`;
    dtEnd = `DTEND;VALUE=DATE:${nextDateClean}`;
  }

  const now = new Date();
  const dtStamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `wedding-${dateClean}-${Date.now()}@islamic-wedding-invite`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Shahid Anwar & Nasreen Parween//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    dtStart,
    dtEnd,
    `SUMMARY:${title.replace(/[,;]/g, ' ')}`,
    `DESCRIPTION:${(description + (timeDescription ? ` - ${timeDescription}` : '')).replace(/\n/g, '\\n')}`,
    `LOCATION:${location.replace(/[,;]/g, ' ')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'wedding-invitation-shahid-nasreen.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
