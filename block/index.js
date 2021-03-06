
import { registerBlockType } from "@wordpress/blocks";
import { TimeZoneSettings,PrimaryTimePicker, ConvertedTimes, ConvertedTime } from "./components";
import { InspectorControls } from "@wordpress/block-editor";

let attributes = {
    primaryTime: {
        type: 'string',
        required: true,
        default: ''
    },
    timeZones: {
        type: 'array',
        required: false,
        default: [
            'America/New_York',
            'America/Los_Angeles'
        ]
    }
}




const Edit = ({ attributes, setAttributes }) => {
    let { primaryTime,timeZones } = attributes;
    let updatePrimaryTime = (primaryTime) => setAttributes({ primaryTime });
    let updateTimeZones = (timeZones) => setAttributes({timeZones});

    return (
        <div>
            <InspectorControls>
                <PrimaryTimePicker
                    date={primaryTime}
                    onChange={updatePrimaryTime}
                />
                <TimeZoneSettings
                    timeZones={timeZones}
                    updateTimeZones={updateTimeZones}
                />
            </InspectorControls>
            <div>
                {primaryTime ? (
                    <div>
                        <ConvertedTime
                            primaryTime={primaryTime}
                            timeZone={"America/New_York"}
                        />
                        {timeZones && 
                            <ConvertedTimes
                                primaryTime={primaryTime}
                                timeZones={timeZones}
                            />
                        }
                    </div>
                ) : (
                    <div>Choose Primary Time</div>
                )}
            </div>
        </div>
    )
}
registerBlockType( 'josh/time-block', {
    title: 'Time Block',
    description: 'Show time in multiple timezones',
    category: 'widgets',
    icon: 'smiley',
    supports: {
        html: false,
    },
    attributes,
    edit: Edit,
    save: ({attributes}) => {
        let { primaryTime, timeZones } = attributes;
        return (
            <ConvertedTimes
                primaryTime={primaryTime}
                timeZones={timeZones}
            />
        )
    },
} );