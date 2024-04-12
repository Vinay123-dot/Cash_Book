// import React from 'react'
// import { useSelector } from 'react-redux'

// const options = [
//     { value: 1, label: 'Success' },
//     { value: 2, label: 'Failed' },
//     { value: 4, label: 'Refunded' },
//     { value: 3, label: 'Refund Initiated' },
//     { value: 5, label: 'Refund Failed' },
// ]


// const QuickBookStatusFilter = (props) => {
//     const { onStatusChange } = props

//     const filterData = useSelector(
//         (state) => state.quickbookStore.data.filterData
//     )

//     const onStatusFilterChange = (selected) => {
//         onStatusChange?.(selected?.value)
//     }

//     const selectedFilter = options.find(
//         (option) => option.value === filterData?.status
//     )

//     return (
//         <>
//             <Select
//                 showSearch
//                 className="w-full sm:w-80 md:w-60 lg:w-40"
//                 placeholder="Search to Select"
//                 optionFilterProp="children"
//                 filterOption={(input, option) => (option?.label ?? '').includes(input)}
//                 filterSort={(optionA, optionB) =>
//                     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
//                 }
//                 options={options}
//                 on
//             />
//             <span className="text-blue-400 text-base font-normal ml-2 mt-2">
//                 {selectedFilter?.label}
//             </span>
//         </>
//     )
// }

// export default QuickBookStatusFilter