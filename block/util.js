/**
 * 
 * @see https://dev.to/shelob9/how-to-immutably-update-an-array-in-typescript-54nm
 */
 export const removeTimeZone = (timeZone,timeZones) => {
    const index = timeZones.findIndex((t) => timeZone === t);
  if (-1 === index) {
    return timeZones;
  }
  return [...timeZones.slice(0, index), ...timeZones.slice(index + 1)];
}

/**
 * 
 * @see https://dev.to/shelob9/how-to-immutably-update-an-array-in-typescript-54nm
 */
export const addTimeZone = (timeZone,timeZones) => {
    const index = timeZones.findIndex((t => t === timeZone));
    if (-1 === index) {
      return [...timeZones, timeZone];
    }
    return [...timeZones.slice(0, index), timeZone, ...timeZones.slice(index + 1)]
}

export const handleTimeZoneChange = (removeZone, newZone, timeZones) => {
    timeZones = removeTimeZone(removeZone, timeZones);
    return addTimeZone( newZone,timeZones);
}