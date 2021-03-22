/**
 * This function removes extendedProps from a calendar event.
 * @param {Object} event CalendarEventInfo
 * @returns object
 */
export default function returnCleanCalObject(event) {
  const rawEvent = event.toPlainObject();
  const sanitizedEvent = { ...rawEvent.extendedProps, ...rawEvent };
  delete sanitizedEvent.extendedProps;
  return sanitizedEvent;
}
