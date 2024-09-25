/*
README
----------------------------------------------------------------------------------------------
<!-- Column feature is common to all -->
let column = [
    <!-- This object is basic -->
    {
        Header: "", // Header name
        accessor: "id", // key
        Cell: ({cell}) => (cell.row.original.id) // Your cell | you can also add button here by wraping in <></>
        width: "%" // OPTIONAL, add width of cell
    },

    <!-- Accordion Column -->
    {
        Header: "",
        accessor: "id", // optional when more is true
        Cell: ({cell}) => cell.row.original.id,
        more: true // pass it true, if you want this header as accordion row
        width: "%" // OPTIONAL, add width of cell
    },
    {
        Header: "",
        accessor: "id", // optional when more is true
        Cell: ({cell}) => <></>, // Create your screen here
        more: true // pass it true when you want this header as accordion row
        screen: true // pass it true when you want to create screen to accordion
        width: "%" // OPTIONAL, add width of cell
    },
    .....
    .....
    .....
    .....
]

<Table 
    dataList={dataList} 
    heading="List Heading" 
    columns={column} 
    exportStatus={true} // pass it true, when you want export buttons
    more={true} // pass it true when you want accordion column
/>
*/

import React, { useMemo, useState, useEffect } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { CSVLink } from "react-csv";
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver';
import blank from './blankTable.png'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { IoIosArrowDropdown } from 'react-icons/io';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Pagination from './Pagination';

const Table = (props) => {

    const [toggle, setToggle] = useState('')

    const columns = useMemo(() => props.columns, [props?.columns])
    const data = useMemo(() => props.dataList, [props.dataList])

    const exportStatus = props?.exportStatus ?? false;

    useEffect(() => {
        setPageSize(10)
    }, [])

    const {
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        setGlobalFilter
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    }, useGlobalFilter, useSortBy, usePagination)

    const { globalFilter, pageIndex, pageSize } = state

    const generatePDF = (headers, data, text = "text", declarationContent) => {
        const doc = new jsPDF();
        doc.setFontSize(12);

        const pageWidth = doc.internal.pageSize.width;
        const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const xCoordinate = (pageWidth - textWidth) / 2;

        doc.text(text, xCoordinate, 10);

        doc.autoTable({
            head: [headers],
            body: data,
            startY: 20,
        });


        doc.save(`${text}.pdf`);
    };

    const makeExportFun = () => {

        let data = props?.dataList?.map((elem, index) => {
            // Map over the columns for each element in dataList
            const rowData = props?.columns?.map((col, columnIndex) => {

                var value;

                if (col?.option && col?.option?.length > 0) {
                    // console.log('tables data column data: ', col?.option, elem[col?.accessor])

                    const matchingOption = col?.option?.find(option => option.hasOwnProperty(elem[col?.accessor]));

                    // console.log('tables data matching option ', matchingOption)

                    if (matchingOption) {
                        value = matchingOption[elem[col?.accessor]];
                    } else {
                        value = elem[col?.accessor]
                    }
                } else {
                    value = elem[col?.accessor]
                }

                // console.log('making values: ', value)

                return col?.Header.toLowerCase() != "action" && { [col?.Header]: col?.accessor ? value : index + 1 };
            });

            // console.log('appending row data: ', rowData)

            // Combine rowData for each element into a single object
            return Object.assign({}, ...rowData);
        });

        return data;
    };

    const exportToExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(blob, props?.heading ? `${props?.heading}.xlsx` : 'DataList.xlsx');
    }

    const exportToPdf = () => {
        const headers = props?.columns?.filter(item => item?.Header.toLowerCase() != "action")?.map((elem) => elem?.Header)
        const data = props?.dataList?.map(elem => {
            return props?.columns?.filter(item => item?.Header.toLowerCase() != "action")?.map((col) => {
                // return ad[elem?.accessor];

                var value;

                if (col?.option && col?.option?.length > 0) {
                    // console.log('tables data column data: ', col?.option, elem[col?.accessor])

                    const matchingOption = col?.option?.find(option => option.hasOwnProperty(elem[col?.accessor]));

                    // console.log('tables data matching option ', matchingOption)

                    if (matchingOption) {
                        value = matchingOption[elem[col?.accessor]];
                    } else {
                        value = elem[col?.accessor]
                    }
                } else {
                    value = elem[col?.accessor]
                }

                return value;
            })
        });

        generatePDF(headers, data, props?.heading || 'Data List');
    }

    const actionButtonStyle = ' rounded-lg text-sm w-max px-3 py-1 cursor-pointer focus:outline-none select-none'

    const toggleData = (key) => {
        if (key === toggle) {
            setToggle('')
        } else {
            setToggle(key)
        }
    }

    return (
        <div className='bg-white rounded-xl p-2 border-2'>
            <div className="w-full text-zinc-600 border text-sm p-3 mb-2 rounded-xl flex md:flex-row flex-col gap-y-2 md:justify-between md:items-center tableStyle bg-[#F6F7FB]">

                <h1 className='text-2xl font-[600] pl-1'>{props?.heading || "All List"}</h1>
                {
                    Array.isArray(props?.dataList) && props?.dataList?.length > 0 &&
                    <div className='w-full md:w-[50%] flex justify-end'>
                        <div className={`w-full relative md:w-[50%] flex items-center gap-2 ${exportStatus && ' mr-4'}`}>
                            <input className='border-2 rounded-lg py-1.5 w-full pl-8 pr-2 focus:outline-none focus:border-gray-400' type="search" placeholder='Search...' value={globalFilter || ''} onChange={e => setGlobalFilter(e.target.value)} />
                            <span className='absolute left-3 text-zinc-600'><FaMagnifyingGlass /></span>
                        </div>
                        {exportStatus &&
                            <div className='flex gap-2 items-center border-l-2 border-l-zinc-300 pl-4'>
                                <button className={actionButtonStyle + ' bg-violet-500 text-white hover:bg-violet-600'}>
                                    <CSVLink className='' data={makeExportFun()}>CSV</CSVLink>
                                </button>
                                <button className={actionButtonStyle + ' bg-blue-500 text-white hover:bg-blue-600'} onClick={() => exportToExcel(makeExportFun())}>Excel</button>
                                <button className={actionButtonStyle + ' bg-teal-500 text-white hover:bg-teal-600'} onClick={() => exportToPdf()}>PDF</button>
                            </div>}
                    </div>
                }
            </div>

            <div className="w-full tableStyle">

                <div className="md:block hidden w-full overflow-auto  border-2 rounded-xl">
                    <table {...getTableBodyProps()} className="w-full" style={{ overflowX: 'auto' }}>
                        <thead className='bg-[#F6F7FB] border-b-2' style={{ width: '100%' }}>
                            {
                                headerGroups?.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()} style={{ width: '100%' }}>
                                        {
                                            headerGroup.headers.map((column) => {
                                                return !column.more && <th className='w-full text-zinc-700 font-semibold text-sm text-start p-3' {...column.getHeaderProps(column.getSortByToggleProps())} style={{ width: column?.render('width') ? column?.render('width') : 'auto', cursor: 'pointer' }} >
                                                    <div className='flex items-center justify-between'>
                                                        {column.render('Header')}
                                                        <div className='text-sm flex flex-col items-center bg-white rounded-full'>
                                                            <span className={column.isSorted && column.isSortedDesc ? 'text-zinc-500' : 'text-zinc-200'}><FaCaretUp /></span>
                                                            <span className={column.isSorted && !column.isSortedDesc ? 'text-zinc-500' : 'text-zinc-200'}><FaCaretDown /></span>
                                                        </div>
                                                    </div>
                                                </th>
                                            })
                                        }
                                    </tr>
                                ))
                            }

                        </thead>
                        <tbody {...getTableBodyProps()} className="">
                            {!props?.loader ? <>{
                                Array.isArray(props?.dataList) && props?.dataList?.length > 0 ?
                                    <>
                                        {page?.map((row) => {
                                            prepareRow(row)
                                            return <>
                                                <tr {...row.getRowProps()} className="">
                                                    {row?.cells?.map((cell, index) => {
                                                        return !cell.render("Cell").props.column.more && <td {...cell.getCellProps()} className="p-3 border-b-2 bg-white text-zinc-600 text-sm">
                                                            <div className='flex items-center gap-1'>
                                                                {(props?.more && index === 0) && <span className={`text-zinc-800 cursor-pointer select-none pr-1 transition-all duration-300 text-xl ${toggle == row?.id && " -scale-y-100"}`} onClick={() => toggleData(row?.id)}><IoIosArrowDropdown /></span>}
                                                                {cell.render('Cell')}
                                                            </div>
                                                        </td>
                                                    })}
                                                </tr>
                                                {toggle === row?.id && <tr {...row.getRowProps()} className="w-full">
                                                    <td colSpan={props.columns.filter(item => !item.more).length} className='bg-white border-b-2 p-3 text-sm'>
                                                        <div className="bg-slate-50 w-full rounded-xl border py-1">
                                                            {row?.cells?.map((mor) => {
                                                                return mor.render("Cell").props.column.more == true && !mor.render("Cell").props.column.screen && <>
                                                                    <div className={`grid grid-cols-12 py-1.5 px-3`}>
                                                                        <div className='col-span-3 text-zinc-600 font-[500]'>{mor.render("Cell").props.column?.Header}:</div>
                                                                        <div className='col-span-9 font-[500]'>{mor.render('Cell')}</div>
                                                                    </div>
                                                                </>
                                                            })}
                                                            {row?.cells?.map((mor) => {
                                                                return mor.render("Cell").props.column.more == true && mor.render("Cell").props.column.screen == true && <>
                                                                    {mor.render('Cell')}
                                                                </>
                                                            })}
                                                        </div>
                                                    </td>
                                                </tr>}
                                            </>
                                        })}
                                    </>

                                    :
                                    <tr className="bg-white">
                                        <td className='border bg-white w-full text-sm text-zinc-600' colSpan={props?.columns?.length}>
                                            <div className="bg-white flex flex-col items-center justify-center py-2">
                                                <img src={blank} alt="" />
                                                <div className="blank_text">No Data Available</div>
                                            </div>
                                        </td>
                                    </tr>
                            }</> :
                                <>
                                    <tr className="bg-white">
                                        <td className='border bg-gray-200 w-full text-sm text-zinc-600' colSpan={props?.columns?.length}>
                                            <div className="w-full flex flex-col gap-2 p-2">
                                                <div className='animate w-full h-9 border' />
                                                <div className='animate w-full h-9 border' />
                                                <div className='animate w-full h-9 border' />
                                                <div className='animate w-full h-9 border' />
                                                <div className='animate w-full h-9 border' />
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            }
                        </tbody>
                    </table>
                </div>

                {!props?.loader ? <>{
                    Array.isArray(props?.dataList) && props?.dataList?.length > 0 ?
                        <>
                            <div className='md:hidden flex flex-col gap-4'>
                                {
                                    page?.map((row, index) => {
                                        return (
                                            <div key={index} className="border-2 rounded-xl p-3 shadow-[0px_0px_10px_rgba(0,0,0,0.1)] bg-white flex flex-col gap-2 text-sm">
                                                {props?.columns?.map((column, index) => <div key={index} className="flex gap-2">
                                                    <span className="font-semibold">{column?.Header}: </span>
                                                    <div className="font-normal">
                                                        {row?.cells[index].render('Cell')}
                                                    </div>
                                                </div>
                                                )}
                                            </div>
                                        )
                                    }
                                    )
                                }
                            </div>
                        </>
                        :
                        <>
                            <div className="md:hidden bg-white flex flex-col items-center justify-center py-2 text-zinc-600 border shadow-[0px_0px_10px_rgba(0,0,0,0.1)] text-sm">
                                <img src={blank} alt="" />
                                <div className="blank_text">No Data Available</div>
                            </div>
                        </>
                }</> :
                    <div className="md:hidden bg-gray-200 flex flex-col gap-2 items-center justify-center p-2 text-zinc-600 text-sm">
                        <div className='animate w-full h-[180px] border-2' />
                        <div className='animate w-full h-[180px] border-2' />
                        <div className='animate w-full h-[180px] border-2' />
                    </div>
                }

                {Array.isArray(props?.dataList) && props?.dataList?.length > 0 &&
                    <>
                        <div className='px-4 pt-5 pb-3 w-full flex md:flex-row flex-col md:items-center gap-y-2 justify-between'>
                            <div className='text-sm text-zinc-500'>
                                Showing {(pageIndex * parseInt(pageSize)) + 1} to {((pageIndex + 1) * parseInt(pageSize) > props?.dataList?.length ? props?.dataList?.length : ((pageIndex + 1) * parseInt(pageSize)))} of {props?.dataList?.length} records
                            </div>

                            <Pagination
                                totalPages={pageOptions.length ?? 1}
                                jump={val => gotoPage(parseInt(val) - 1)}
                                next={nextPage}
                                prev={previousPage}
                            />

                            <div className='text-sm text-zinc-500 flex items-center gap-1'>
                                Items per page <select className="border-2 px-2 py-1.5 rounded-xl bg-slate-50 text-zinc-600 focus:outline-none focus:border-slate-400" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                                    {[5, 10, 25, 50].map((pageSize) => (
                                        <option key={pageSize} value={pageSize}>
                                            {pageSize}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Table