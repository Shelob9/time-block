import  {
    findTimeZone, getZonedTime, 
} from 'timezone-support';

jQuery(function ($) {
    const seperator = 'at';
    console.log(findTimeZone);
    const nodes = document.querySelectorAll('.wpem-event-date-time-text');

    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeZoneString = browserTimeZone.replace('_', ' ',).replace('/', '/ ');
    if (nodes && nodes.length) {
        nodes.forEach(node => {
            let timeString = node.innerHTML.replace(seperator, '').replace('(', '').replace(')', '');
            console.log(timeString);
            const zoned = findTimeZone(browserTimeZone);
            const zonedTime = getZonedTime(new Date(timeString), zoned);
            const { year, month, day, hours, minutes, seconds } = zonedTime;
            node.innerHTML = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} (${timeZoneString})`;


        });
    }
});

