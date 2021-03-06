import { ConvertedTime,ConvertedTimes } from "./components";
import { render, } from "@testing-library/react";

test.skip('ConvertTime', () => {
    let primaryTime = "2021-03-10T14:30:00";
    let timeZone = "America/New_York"
    let { container } = render(<ConvertedTime {...{ primaryTime, timeZone }} />);
    expect(container).toMatchSnapshot();
});

test.skip('ConvertedTimes', () => {
    let primaryTime = "2021-03-10T14:30:00";
    let timeZones = ["America/New_York", "America/Los_Angeles"];
    let { container } = render(<ConvertedTimes {...{ primaryTime, timeZones }} />);
    expect(container).toMatchSnapshot();
});
