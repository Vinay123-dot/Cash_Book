import React from 'react';
import { Select } from "antd";
import { useSelector } from 'react-redux';

const {Option} = Select;

const AntdSelectFilter = (props) => {

    const { onStatusChange,placeholder,options,value:selectedValue,message ="",customData = null } = props;

    const onStatusFilterChange = (value) => onStatusChange?.(value);

    const selectedFilter = options.find(
        (option) => option.value === selectedValue
    )

    const caseSensitiveFilterOption = (input, option) => {
        return (option?.children ?? '').toLowerCase().includes(input.toLowerCase());
    };

    return (
        <>
            <Select
                showSearch
                className = "w-full md:w-52 h-10"
                placeholder = {placeholder}
                optionFilterProp = "children"
                filterOption={caseSensitiveFilterOption}
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
            {
                customData ? <span className="text-blue-400 text-base font-normal ml-2">{customData}</span> :
                message  ?  <span className="text-base font-normal ml-2 mt-2" style={{color:"red"}} >{message}</span> :
                <span className="text-base font-normal ml-2 mt-2" style={{color:"red"}} > {(selectedFilter?.label || selectedFilter?.Type)}</span>
            }
         
        </>
    )
}

export default AntdSelectFilter;

