import {TimeZoneSettings} from "./components";
import { render,act,fireEvent } from "@testing-library/react";
import { useState } from 'react';

describe('TimeZoneSettings', () => {
    it.skip('matches snapshot', () => {
        let timeZones = ["America/New_York", "America/Los_Angeles"];
        let { container } = render(
            <TimeZoneSettings
                timeZones={timeZones}
                updateTimeZones={jest.fn()}
            />
        );
        expect(container).toMatchSnapshot(); 
    });

    it('Updates value', () => {
        let timeZones = ["America/New_York", "America/Los_Angeles"];
        let Test = () => {
            let [_timeZones, onChange] = useState(timeZones);
            return <TimeZoneSettings
                timeZones={_timeZones}
                updateTimeZones={onChange}
            />
        }
        
        let { container } = render(
            <Test />
        );
        let selectors = container.querySelectorAll('.time-block-timezone-select select');
        expect(selectors.length).toEqual(3);
        expect(selectors[0].value).toEqual(timeZones[0])
        expect(selectors[1].value).toEqual(timeZones[1])
        
        act(() => {
            fireEvent.change(selectors[0], {
                target: {
                    value: 'America/Chicago'
                }
            })
        });
        selectors = container.querySelectorAll('.time-block-timezone-select select');
        expect(selectors.length).toEqual(3);
        expect(selectors[0].value).toEqual('America/Chicago')
        expect(selectors[1].value).toEqual(timeZones[1])
    });

});