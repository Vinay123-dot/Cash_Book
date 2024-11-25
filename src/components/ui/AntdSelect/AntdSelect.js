import React from 'react';
import PropTypes from "prop-types";
import { Select } from "antd";

const {Option} = Select;

const AntdSelectFilter = (props) => {

    const {
      onStatusChange,
      placeholder,
      options,
      value: selectedValue,
      message = "",
      customData = null,
      showMessage = true,
    } = props;

    const onStatusFilterChange = (value) => onStatusChange?.(value);

    const selectedFilter = options.find(
        (option) => option.value === selectedValue
    )

    const caseSensitiveFilterOption = (input, option) => {
        return (option?.children ?? '').toLowerCase().includes(input.toLowerCase());
    };

    const displayMessage = () => {
        if(customData){
            return <span className="text-blue-400 text-base font-normal ml-2">
            {customData}
          </span>
        } else if(message){
            return <span className="text-base font-normal ml-2 mt-2 text-red-700">
                {message}
            </span>
        } else {
            return <span
            className="text-base font-normal ml-2 mt-2"
            style={{ color: "red" }}
          >
            {" "}
            {selectedFilter?.label || selectedFilter?.Type}
          </span>
        }
    };
    
    return (
      <>
        <Select
          showSearch
          className="w-full md:w-48 lg:w-40 xl:w-44 h-10"
          placeholder={placeholder}
          optionFilterProp="children"
          filterOption={caseSensitiveFilterOption}
          onChange={onStatusFilterChange}
        >
          {(options || []).map((eachOpt, i) => (
            <Option key={eachOpt.Id} value={eachOpt.Id}>
              {eachOpt.Type || eachOpt.Terminal}
            </Option>
          ))}
        </Select>
        {showMessage && displayMessage()}
      </>
    );
}

export default AntdSelectFilter;

AntdSelectFilter.propTypes = {
    onStatusChange : PropTypes.func,
    placeholder : PropTypes.string,
    options : PropTypes.array,
    value : PropTypes.number,
    message : PropTypes.string,
    customData : PropTypes.string,
    showMessage : PropTypes.bool
};

AntdSelectFilter.defaultProps = {
    message :"",
    customData : null,
    showMessage : true 
};

