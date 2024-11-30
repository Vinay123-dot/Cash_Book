import React from 'react';
import PropTypes from "prop-types";
import { Select } from "antd";
import { useSelector } from 'react-redux';

const {Option} = Select;

const AntdSelectFilter = (props) => {
    const {
      onStatusChange,
      placeholder,
      options,
      value
    } = props;

    const onStatusFilterChange = (value) => onStatusChange?.(value);
    const caseSensitiveFilterOption = (input, option) => {
      return (option?.children ?? '').toLowerCase().includes(input.toLowerCase());
    };
    
    return (
        <Select
          showSearch
          className="w-full h-10"
          placeholder={placeholder}
          optionFilterProp="children"
          filterOption={caseSensitiveFilterOption}
          onChange={onStatusFilterChange}
        >
          {(options || []).map((eachOpt, i) => (
            <Option key={eachOpt.Id} value={eachOpt.MMS_Terminal_ID || eachOpt.Id}>
              {eachOpt.Type || eachOpt.Terminal}
            </Option>
          ))}
        </Select>
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
};

AntdSelectFilter.defaultProps = {
    message :"",
    customData : null,
};

