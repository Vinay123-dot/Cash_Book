import React, { useState,useEffect } from "react";
import { Select,Input } from 'antd';
import { Options } from "../../Constants";
import CButton from "../../ComponentsTest/Button";
import { viewBtnPrefix,dwnBtnPrefix,searchPrefix} from "Prefixes/QuickBookToolsPrefix";




const QuickBookTools = () => {

  return  <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-5 gap-2 md:gap-8 py-4 px-10">
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
                prefix = {searchPrefix}
                placeholder="Search"
                style={{width: 200}}
            />
            <CButton
              onClick={()=>console.log("clicked View")}
            >
              {viewBtnPrefix} View
            </CButton>
            <CButton onClick={()=>console.log("clicked Download")}>
              {dwnBtnPrefix} Download
            </CButton>

        </div>
   
   
}

export default QuickBookTools;