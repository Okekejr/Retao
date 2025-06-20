import * as Calendar from "expo-calendar";

export const addReturnDateToCalendar = async (title: string, dueDate: Date) => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Calendar permission not granted");
  }

  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
  );

  const defaultCalendar =
    calendars.find(
      (cal) =>
        cal.allowsModifications &&
        cal.accessLevel === Calendar.CalendarAccessLevel.OWNER
    ) || (await Calendar.getDefaultCalendarAsync());

  const calendarId = defaultCalendar.id;

  await Calendar.createEventAsync(calendarId, {
    title: `Return item: ${title}`,
    startDate: dueDate,
    endDate: new Date(dueDate.getTime() + 30 * 60 * 1000),
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    notes: "This is the due date the item is to be returned.",
  });
};
