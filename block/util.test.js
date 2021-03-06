import { addTimeZone, removeTimeZone,handleTimeZoneChange} from './util';

test('adding timezone', () => {
    let timeZones = ["America/New_York", "America/Los_Angeles"];
    timeZones = addTimeZone('Salad',timeZones);
    expect(timeZones.length).toEqual(3);
    timeZones = addTimeZone('Salad',timeZones);
    expect(timeZones.length).toEqual(3);
});

test('removing timezone', () => {
    let timeZones = ["America/New_York", "America/Los_Angeles"];
    timeZones = removeTimeZone("America/New_York",timeZones);
    expect(timeZones.length).toEqual(1);
    timeZones = removeTimeZone('Salad',timeZones);
    expect(timeZones.length).toEqual(1);
});

test('Updating times', () => {
    let timeZones = ["America/New_York", "America/Los_Angeles"];
    timeZones = handleTimeZoneChange("America/New_York","America/Chicago",timeZones);
    expect(timeZones.length).toEqual(2);
    expect(timeZones.includes("America/Los_Angeles")).toBeTruthy();
    expect(timeZones.includes("America/Chicago")).toBeTruthy()
});