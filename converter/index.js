import  {
    findTimeZone, getZonedTime, 
} from 'timezone-support';

jQuery(function ($) {
    if ('object' !== typeof window.TIMEBLOCK || ! TIMEBLOCK.query) {
        return;
    }
    const seperator = TIMEBLOCK.seperator ? TIMEBLOCK.seperator : '';
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeZoneString = browserTimeZone.replace('_', ' ',).replace('/', '/ ');

    function replace(nodes) {
        if (nodes && nodes.length) {
            nodes.forEach(node => {
                let timeString = node.innerHTML.replace(seperator, '').replace('(', '').replace(')', '');
                const zoned = findTimeZone(browserTimeZone);
                const zonedTime = getZonedTime(new Date(timeString), zoned);
                const { year, month, day, hours, minutes, seconds } = zonedTime;
                node.innerHTML = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} (${timeZoneString})`;
            });
        }
    }
    replace(document.querySelectorAll(TIMEBLOCK.query))
    $(document).ajaxComplete(function () {
        replace(document.querySelectorAll(TIMEBLOCK.query))

    });
});

