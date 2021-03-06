import { DateTimePicker,BaseControl,SelectControl } from '@wordpress/components';
import { __experimentalGetSettings } from '@wordpress/date';
import allTimeZones from "./allTimeZones";
import  {
    findTimeZone, getZonedTime, 
} from 'timezone-support';

 //https://developer.wordpress.org/block-editor/components/date-time/
export const PrimaryTimePicker = ({
   date,onChange 
}) => {
    const settings = __experimentalGetSettings();

    const is12HourTime = /a(?!\\)/i.test(
        settings.formats.time
            .toLowerCase() // Test only the lower case a
            .replace( /\\\\/g, '' ) // Replace "//" with empty strings
            .split( '' ).reverse().join( '' ) // Reverse the string and test for "a" not followed by a slash
    );
 
    return (
        <BaseControl
            id="primaryTime"
            label="Primary Time"
            help="Enter some text"
        >
            <DateTimePicker
                currentDate={ date }
                onChange={ ( date ) => onChange( date  ) }
                is12Hour={ is12HourTime }
            />
        </BaseControl>
    );
};

export const TimeZoneChooser = ({value,onChange}) => {
    return (
        <SelectControl
            label={ 'Select TimeZone' }
            value={ value }
            onChange={ onChange}
            options={ allTimeZones }
        />
    )
}



export const ConvertedTime = ({ primaryTime, timeZone }) => {
    function formatTime (date, timeZone) {
        const zoned = findTimeZone(timeZone);
        const zonedTime = getZonedTime(new Date(date), zoned);
        const { year, month, day, hours, minutes, seconds } = zonedTime
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    return (
        <div>
            <span>{formatTime(primaryTime, timeZone)}</span> - <span>{timeZone}</span>
        </div>
    )
}

export const ConvertedTimes = ({ primaryTime, timeZones }) => {
    return (
        <div>
            {timeZones.map(timeZone => (<ConvertedTime key={timeZone} primaryTime={primaryTime} timeZone={timeZone}/>))}
        </div>
    )

}