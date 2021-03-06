
import React from "react";
import { registerBlockType } from "@wordpress/blocks";
import { PrimaryTimePicker } from "./components";
//Start axe in development.
//@see https://www.npmjs.com/package/@axe-core/react
if (process.env.NODE_ENV !== 'production') {
    const axe = require('@axe-core/react');
    axe(React, ReactDOM, 1000);
}

let attributes = {
    primaryTime: {
        type: 'string',
        required: true,
        default: ''
    }
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
    edit: ({ attributes }) => {
        const { primaryTime } = attributes;
        return <div>
            <PrimaryTimePicker />
        </div>;
    },
 
    save: () => {
        return <div> Hello in Save.</div>;
    },
} );