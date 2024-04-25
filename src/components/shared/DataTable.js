import React, {
    forwardRef,
    useMemo,
    useRef,
    useEffect,
    useState,
    useImperativeHandle,
} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Table from '../ui/Table';
import Pagination from "../ui/Pagination/Pagination";
import Loading from './Loading';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'

const { Tr, Th, Td, THead, TBody, Sorter } = Table;

// const IndeterminateCheckbox = (props) => {
//     const {
//         indeterminate,
//         onChange,
//         onCheckBoxChange,
//         onIndeterminateCheckBoxChange,
//         ...rest
//     } = props

//     const ref = useRef(null)

//     useEffect(() => {
//         if (typeof indeterminate === 'boolean') {
//             ref.current.indeterminate = !rest.checked && indeterminate
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [ref, indeterminate])

//     const handleChange = (e) => {
//         onChange(e)
//         onCheckBoxChange?.(e)
//         onIndeterminateCheckBoxChange?.(e)
//     }

//     return (
//         <Checkbox
//             className="mb-0"
//             ref={ref}
//             onChange={(_, e) => handleChange(e)}
//             {...rest}
//         />
//     )
// }

const DataTable = forwardRef((props, ref) => {
    const {
        columns: columnsProp,
        data,
        loading,
        onCheckBoxChange,
        onIndeterminateCheckBoxChange,
        onPaginationChange,
        onSort,
        selectable,
        pagingData,
    } = props

    const { pageSize, pageIndex, total } = pagingData

    const [sorting, setSorting] = useState(null)

    const handleCheckBoxChange = (checked, row) => {
        if (!loading) {
            onCheckBoxChange?.(checked, row)
        }
    }

    const handleIndeterminateCheckBoxChange = (checked, rows) => {
        if (!loading) {
            onIndeterminateCheckBoxChange?.(checked, rows)
        }
    }

    const handlePaginationChange = (page) => {
        if (!loading) {
            onPaginationChange?.(page)
        }
    }

    useEffect(() => {
        if (Array.isArray(sorting)) {
            const sortOrder =
                sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : ''
            const id = sorting.length > 0 ? sorting[0].id : ''
            onSort?.({ order: sortOrder, key: id })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorting])

    // const hasOldColumnMetaKey = columnsProp.some(
    //     (col) => col.Header || col.accessor || col.Cell
    // )

    // const finalColumns = useMemo(() => { //commented this because of nto using checkbox
    //     const columns = columnsProp

    //     if (selectable) {
    //         return [
    //             {
    //                 id: 'select',
    //                 header: ({ table }) => (
    //                     <IndeterminateCheckbox
    //                         checked={table.getIsAllRowsSelected()}
    //                         indeterminate={table.getIsSomeRowsSelected()}
    //                         onChange={table.getToggleAllRowsSelectedHandler()}
    //                         onIndeterminateCheckBoxChange={(e) => {
    //                             handleIndeterminateCheckBoxChange(
    //                                 e.target.checked,
    //                                 table.getRowModel().rows
    //                             )
    //                         }}
    //                     />
    //                 ),
    //                 cell: ({ row }) => (
    //                     <IndeterminateCheckbox
    //                         checked={row.getIsSelected()}
    //                         disabled={!row.getCanSelect()}
    //                         indeterminate={row.getIsSomeSelected()}
    //                         onChange={row.getToggleSelectedHandler()}
    //                         onCheckBoxChange={(e) =>
    //                             handleCheckBoxChange(
    //                                 e.target.checked,
    //                                 row.original
    //                             )
    //                         }
    //                     />
    //                 ),
    //             },
    //             ...columns,
    //         ]
    //     }
    //     return columns
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [columnsProp, selectable])
    const finalColumns = useMemo(() => {
        const columns = columnsProp

        if (selectable) {
            return [...columns,]
        }
        return columns
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columnsProp, selectable])

    const table = useReactTable({
        data,
        // columns: hasOldColumnMetaKey ? [] : finalColumns,
        columns:  finalColumns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        manualSorting: true,
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    })

    const resetSorting = () => {
        table.resetSorting()
    }

    const resetSelected = () => {
        table.toggleAllRowsSelected(false)
    }

    useImperativeHandle(ref, () => ({
        resetSorting,
        resetSelected,
    }))

    // if (hasOldColumnMetaKey) {
    //     const message =
    //         'You are using old react-table v7 column config, please use v8 column config instead, refer to our demo or https://tanstack.com/table/v8'

    //     if (process.env.NODE_ENV === 'development') {
    //         console.warn(message)
    //     }

    //     return <Alert>{message}</Alert>
    // }

    return (
        <Loading loading={loading} type="cover">
            <Table>
                <THead className="z-10 sticky top-0">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        style={{
                                            maxWidth: 100,
                                        }}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={classNames(
                                                    header.column.getCanSort() &&
                                                        'cursor-pointer select-none point',
                                                    loading &&
                                                        'pointer-events-none'
                                                )}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {header.column.getCanSort() && (
                                                    <Sorter
                                                        sort={header.column.getIsSorted()}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {!loading && data.length === 0 ? (
                        <Tr>
                            <Td colSpan="10">
                                <h6 className=" font-medium text-center pt-2" style={{ color: "#5A87B2" }}>
                                    No record found
                                </h6>
                            </Td>
                        </Tr>
                    ) : !loading && data.length > 0 ? (
                        table
                            .getRowModel()
                            .rows.slice(0, pagingData.pageSize)
                            .map((row) => {
                                return (
                                    <Tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <Td
                                                    key={cell.id}
                                                    style={{
                                                        maxWidth: 50,
                                                        
                                                    }}
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </Td>
                                            )
                                        })}
                                    </Tr>
                                )
                            })
                    ) : null}
                </TBody>
            </Table>
             <div className="flex  items-center justify-end">
                <Pagination
                    // pageSize={pageSize}
                    // currentPage={pageIndex}
                    // total={total}
                    // onChange={handlePaginationChange}
                    pageSize={10}
                    currentPage={10}
                    total={100}
                    onChange={handlePaginationChange}
                />
            </div> 
        </Loading>
    )
})

DataTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    loading: PropTypes.bool,
    onCheckBoxChange: PropTypes.func,
    onIndeterminateCheckBoxChange: PropTypes.func,
    onPaginationChange: PropTypes.func,
    onSelectChange: PropTypes.func,
    onSort: PropTypes.func,
    pageSizes: PropTypes.arrayOf(PropTypes.number),
    selectable: PropTypes.bool,
    pagingData: PropTypes.shape({
        total: PropTypes.number,
        pageIndex: PropTypes.number,
        pageSize: PropTypes.number,
    }),
}

DataTable.defaultProps = {
    pageSizes: [10, 25, 50, 75, 100],
    pagingData: {
        total: 0,
        pageIndex: 0,
        pageSize: 10,
    },
    data: [],
    columns: [],
    selectable: false,
    loading: false,
}

export default DataTable