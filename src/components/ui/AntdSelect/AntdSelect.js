import React from 'react';
import { Select } from "antd";
import { useSelector } from 'react-redux';

const {Option} = Select;

const AntdSelectFilter = (props) => {

    const { onStatusChange,placeholder,options,value:selectedValue,message ="" } = props;

    const onStatusFilterChange = (value) => onStatusChange?.(value);

    const selectedFilter = options.find(
        (option) => option.value === selectedValue
    )


    return (
        <>
            <Select
                showSearch
                className = "w-full md:w-44"
                placeholder = {placeholder}
                optionFilterProp = "children"
                filterOption={(input, option) => (option?.Type ?? '').includes(input)}
                // filterSort={(optionA, optionB) =>
                //     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                // }
                onChange = {onStatusFilterChange}
            >
                {(options || []).map((eachOpt, i) => (
                            <Option key={i} value={eachOpt.Id}>
                                {eachOpt.Type || eachOpt.Terminal}
                            </Option>
                ))}
            </Select>
            <span className="text-blue-400 text-base font-normal ml-2 mt-2">
                { message? message :(selectedFilter?.label || selectedFilter?.Type)}
            </span>
        </>
    )
}

export default AntdSelectFilter;

