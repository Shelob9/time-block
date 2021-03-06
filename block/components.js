import { DateTimePicker,BaseControl,SelectControl } from '@wordpress/components';
import { __experimentalGetSettings } from '@wordpress/date';
import allTimeZones from "./allTimeZones";
import  {
    findTimeZone, getZonedTime, 
} from 'timezone-support';
import { Button } from '@wordpress/components';

/**
 * Choose the primary time/date to convert from.
 * 
 * @see https://developer.wordpress.org/block-editor/components/date-time/ 
 */
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
            label={<strong>Primary Time</strong>}
            help="The actual time"
        >
            <DateTimePicker
                currentDate={ date }
                onChange={ ( date ) => onChange( date  ) }
                is12Hour={ is12HourTime }
            />
        </BaseControl>
    );
};

/**
 * Choose a timezone 
 */
export const TimeZoneChooser = ({value,onChange}) => {
    return (
        <SelectControl
            className={'time-block-timezone-select'}
            label={ 'Select Time Zone' }
            value={ value }
            onChange={ onChange}
            options={[{
                label: '',
                value:''
            },...allTimeZones] }
        />
    )
}

/**
 * 
 * @see https://dev.to/shelob9/how-to-immutably-update-an-array-in-typescript-54nm
 */
 const removeTimeZone = (timeZone,timeZones) => {
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
const addTimeZone = (timeZone,timeZones) => {
    const index = timeZones.findIndex((t => t === timeZone));
    if (-1 === index) {
      return [...timeZones, timeZone];
    }
    return [...timeZones.slice(0, index), timeZone, ...timeZones.slice(index + 1)]
}
export const TimeZoneSettings = ({timeZones,updateTimeZones}) => {
    return (
        <section>
            <>
                {timeZones && timeZones.map(timeZone => (
                    <div key={timeZone}>
                        <TimeZoneChooser
                            value={timeZone}
                            onChange={(newValue) => {
                                updateTimeZones(addTimeZone(newValue,
                                    removeTimeZone(timeZone, timeZone)
                                ))
                            }}
                        />
                         <Button
                            icon="minus"
                            label="Remove"
                            onClick={() => {
                                updateTimeZones(removeTimeZone(timeZone,timeZones))
                            }}
                        />
                    </div>
                    
                ))}
            </>
            <TimeZoneChooser
                value={''}
                onChange={(newValue) => {
                    updateTimeZones(addTimeZone(newValue,
                        timeZones
                    ))
                }}
            />
        </section>
    );
}

/**
 * Render a time in another timezone
 */
export const ConvertedTime = ({ primaryTime, timeZone }) => {
    const zoned = findTimeZone(timeZone);
    const zonedTime = getZonedTime(new Date(primaryTime), zoned);
    const { year, month, day, hours, minutes, seconds } = zonedTime
    return (
        <div>
            <span>
                {`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`}
            </span> - <span>
                {`${timeZone.split('/')[1].replace('_', ' ')}`}
            </span>
        </div>
    )
}

/**
 * Render one time in multiple timezones
 */
export const ConvertedTimes = ({ primaryTime, timeZones }) => {
    return (
        <div>
            {timeZones.map(timeZone => (<ConvertedTime key={timeZone} primaryTime={primaryTime} timeZone={timeZone}/>))}
        </div>
    )
}