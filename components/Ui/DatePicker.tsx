import React from 'react'
//import {DatePicker as AntDatepicker} from 'antd'
//const  {MonthPicker: AntMonthPicker, RangePicker: AntRangePicker, WeekPicker: AntWeekPicker} = AntDatepicker;
import {Moment} from 'moment'
import {
    DatePickerMode,
    RangePickerPresetRange,
    RangePickerValue
} from "antd/lib/date-picker/interface";
import {TimePickerProps} from "antd/lib/time-picker";

declare interface DefaultPickerProps {
    defaultValue?: Moment;
    defaultPickerValue?: Moment;
    format?: string | string[];
    renderExtraFooter?: (mode: DatePickerMode) => React.ReactNode;
    value?: Moment;
    onChange?: (date: Moment | null, dateString: string) => void;
}

declare interface BasePickerProps {
    type: "default" | "Month" | "Range" | "Week";
    allowClear?: boolean;
    autoFocus?: boolean;
    className?: string;
    dateRender?: (current: Moment, today: Moment) => React.ReactNode;
    disabled?: boolean;
    disabledDate?: (current: Moment | undefined) => boolean;
    dropdownClassName?: string;
    getCalendarContainer?: (trigger: Element) => HTMLElement;
    locale?: string;
    mode?: DatePickerMode;
    open?: boolean;
    placeholder?: undefined;
    popupStyle?: React.CSSProperties;
    size?: 'large' | 'small' | 'default';
    suffixIcon?: React.ReactNode;
    onOpenChange?: (status: boolean) => void;
    onPanelChange?: (value: Moment | undefined, mode: DatePickerMode) => void;
}

declare interface DatePickerProps extends BasePickerProps, DefaultPickerProps {
    disabledTime?: (current: Moment | undefined) => {
        disabledHours?: () => number[];
        disabledMinutes?: () => number[];
        disabledSeconds?: () => number[];
    };
    showTime?: TimePickerProps | boolean;
    showToday?: boolean;
    value?: Moment;
    onOk?: (selectedTime: Moment) => void;
    onPanelChange?: (value: Moment | undefined, mode: DatePickerMode) => void;
}

declare interface MonthPickerProps extends BasePickerProps, DefaultPickerProps {
    monthCellContentRender?: (date: Moment, locale: any) => React.ReactNode;
}

declare interface WeekPickerProps extends BasePickerProps, DefaultPickerProps {}

declare interface RangePickerProps extends BasePickerProps, DefaultPickerProps {
    disabledTime?: (current: Moment | undefined, type: string) => {
        disabledHours?: () => number[];
        disabledMinutes?: () => number[];
        disabledSeconds?: () => number[];
    };
    ranges?: {
        [range: string]: RangePickerPresetRange;
    };
    separator?: React.ReactNode;
    showTime?: TimePickerProps | boolean;
    onCalendarChange?: (dates: RangePickerValue, dateStrings: [string, string]) => void;
    onOk?: (selectedTime: RangePickerPresetRange) => void;
}

export default function DatePicker (props: DatePickerProps | MonthPickerProps | WeekPickerProps | RangePickerProps) {
    if (props.type)
        return <div></div>;
    return <div></div>;
    /*switch (props.type) {
        case "default":
            return <AntDatepicker {...props}/>;
        case "Month":
            return <AntMonthPicker {...props}/>;
        case "Range":
            return <AntRangePicker {...props}/>;
        case "Week":
            return <AntWeekPicker {...props}/>;
    }*/
}