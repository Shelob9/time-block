import { DateTimePicker } from '@wordpress/components';
import { __experimentalGetSettings } from '@wordpress/date';
import { withState } from '@wordpress/compose';
 //https://developer.wordpress.org/block-editor/components/date-time/
export const PrimaryTimePicker = withState( {
    date: new Date(),
} )( ( { date, setState } ) => {
    const settings = __experimentalGetSettings();
    const is12HourTime = /a(?!\\)/i.test(
        settings.formats.time
            .toLowerCase() // Test only the lower case a
            .replace( /\\\\/g, '' ) // Replace "//" with empty strings
            .split( '' ).reverse().join( '' ) // Reverse the string and test for "a" not followed by a slash
    );
 
    return (
        <DateTimePicker
            currentDate={ date }
            onChange={ ( date ) => setState( { date } ) }
            is12Hour={ is12HourTime }
        />
    );
} );