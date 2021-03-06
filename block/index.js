
import { registerBlockType } from "@wordpress/blocks";
import { PrimaryTimePicker,TimeZoneChooser,ConvertedTimes } from "./components";
import { InspectorControls } from "@wordpress/block-editor";
import { useState } from "react";

  

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
//https://stackoverflow.com/a/54127122/1469799
//<ConvertedTime date={primaryTime} timeZone={"America/Los_Angeles"} />
const Edit = ({ attributes, setAttributes }) => {
    let [value, onChange] = useState();
    let { primaryTime,timeZones } = attributes;
    let setPrimaryTime = (primaryTime) => setAttributes({ primaryTime });
    return (
        <div>
            <InspectorControls>
                <PrimaryTimePicker
                    date={primaryTime}
                    onChange={setPrimaryTime}
                />
                <TimeZoneChooser {...{ value, onChange }}/>
            </InspectorControls>
            <div>
                {primaryTime ? (
                    <div>
                        <div>{primaryTime}</div>
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
    save: () => {
        return <div> Hello in Save.</div>;
    },
} );