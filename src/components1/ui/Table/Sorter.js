import React from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const themeColor =  'indigo';
const primaryColorLevel = 600 ;

const Sorter = ({ sort }) => {

    const color = `text-${themeColor}-${primaryColorLevel}`;

    const renderSort = () => {
        if (typeof sort !== 'boolean') {
            return <FaSort />
        }
        return sort ? (
            <FaSortDown className={color} />
        ) : (
            <FaSortUp className={color} />
        )
    }

    return <div className="inline-flex">{renderSort()}</div>
}

export default Sorter;