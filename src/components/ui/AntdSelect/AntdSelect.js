import React from 'react';
import { Select } from "antd";
import { useSelector } from 'react-redux';


const AntdSelectFilter = (props) => {

    const { onStatusChange,placeholder,options,value:selectedValue } = props;

    const onStatusFilterChange = (value) => onStatusChange?.(value);

    const selectedFilter = options.find(
        (option) => option.value === selectedValue
    )
// console.log("OPTIONS",options)
// console.log("VALUE",selectedValue)
    return (
        <>
            <Select
                showSearch
                className = "w-full md:w-44"
                placeholder = {placeholder}
                optionFilterProp = "children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                // filterSort={(optionA, optionB) =>
                //     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                // }
                options = {options}
                onChange = {onStatusFilterChange}
            />
            <span className="text-blue-400 text-base font-normal ml-2 mt-2">
                {selectedFilter?.label}
            </span>
        </>
    )
}

export default AntdSelectFilter;