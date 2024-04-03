import React from "react";
import { Select, Button, Input } from 'antd';
import { Options } from "../Constants";
import { SearchOutlined,EyeOutlined,DownloadOutlined } from '@ant-design/icons';

const prefix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );
const viewBtnPrefix = (
    <EyeOutlined
      style={{
        fontSize: 16,
        color: 'white',
      }}
    />
);

const dwnBtnPrefix = (
    <DownloadOutlined
      style={{
        fontSize: 16,
        color: 'white',
      }}
    />
)

const mainDiv = {
    display: "flex",
    flexWrap : "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop : 20,
    marginBottom : 20
}
const horizontalLine = {
    border: "2px #F4F6F9 bold"
};
const btnClr = {background: "#5A87B2",color:"white",display:'flex',alignItems:'center'};

const QuickBookTools = () => {
    return <>
        <hr style={horizontalLine} />
        <div style={mainDiv}>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={Options}

            />
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={Options}

            />
            <Input
                prefix = {prefix}
                placeholder="Search"
                style={{width: 200}}
            />
           
            <Button
                style= {btnClr}
            >
                {viewBtnPrefix}View
            </Button>

            <Button
               style= {btnClr}
            >
                {dwnBtnPrefix}Download
            </Button>

        </div>
    </>
}

export default QuickBookTools;