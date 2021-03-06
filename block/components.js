import { DateTimePicker,BaseControl,SelectControl } from '@wordpress/components';
import { __experimentalGetSettings } from '@wordpress/date';
import allTimeZones  from "./allTimeZones";
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

function convertTZ( date, timeZone) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone}));   
}

export const ConvertedTime = ({ date, timeZone }) => {
    let time = convertTZ(date, timeZone);
    return (
        <div>
            <span>{time}</span> - <span>{timeZone}</span>
        </div>
    )
}