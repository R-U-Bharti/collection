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
    },

    <!-- Accordion Column -->
    {
        Header: "",
        accessor: "id", // optional when more is true
        Cell: ({cell}) => cell.row.original.id,
        more: true // pass it true, if you want this header as accordion row
    },
    {
        Header: "",
        accessor: "id", // optional when more is true
        Cell: ({cell}) => <></>, // Create your screen here
        more: true // pass it true when you want this header as accordion row
        screen: true // pass it true when you want to create screen to accordion
    },
    .....
    .....
    .....
    .....
]

const[refresh, setRefresh] = useState(0) // change this value to refresh the table

<BackendTable 
    api={your_api}
    heading="List Heading" 
    refresh={refresh}
    columns={column} 
    exportStatus={true} // OPTIONAL, pass it true, when you want export buttons
    more={true} // pass it true when you want accordion column
    getData={tableData => yourFunction(tableData)} // OPTIONAL, if you want table data
/>
*/

import React, { useEffect, useState } from 'react'
import TableBp from './TableBp'
import AxiosInterceptors from '@/apis/AxiosInterceptor'
import { ApiHeader } from '@/apis/constants'

const BackendTable = (props) => {

    const [perPageCount, setperPageCount] = useState(10)
    const [pageCount, setpageCount] = useState(1)
    const [currentPage, setcurrentPage] = useState(1)
    const [lastPage, setlastPage] = useState(1)
    const [totalCount, settotalCount] = useState(0)
    const [errorState, seterrorState] = useState(false)
    const [dataList, setdataList] = useState([])
    const [loader, setloader] = useState(false)
    const [exportLoader, setExportLoader] = useState(false)
    const [allData, setAllData] = useState([])
    const [exportType, setExportType] = useState('')

    const fetchData = () => {
        seterrorState(false)
        setloader(true)

        let url;

        if (props?.param) {
            url = `${props?.api}?${props?.param}&draw=1&page=${pageCount}&length=${perPageCount}`;
        } else {
            url = `${props?.api}?draw=1&page=${pageCount}&length=${perPageCount}`;
        }

        AxiosInterceptors.get(url, ApiHeader())
            .then((res) => {
                console.log(`Table Response for ${url}:`, res)
                setdataList(res?.data?.data ?? [])
                settotalCount(res?.data?.recordsTotal ?? 0)
                setlastPage(() => {
                    if (res?.data?.recordsTotal % perPageCount == 0) {
                        return Math.ceil(res?.data?.recordsTotal / perPageCount)
                    } else {
                        return Math.ceil(res?.data?.recordsTotal / perPageCount)
                    }
                })
                if (typeof (props.getData) == 'function') {
                    props.getData(res?.data)
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setdataList([])
                settotalCount(0)
                seterrorState(true)
            }).
            finally(() => {
                setloader(false)
                seterrorState(false)
            })

    }

    // 👉 Function 2 👈
    const nextPageFun = () => {
        setpageCount(currentPage + 1)
        setcurrentPage(currentPage + 1)
    }

    // 👉 Function 3 👈
    const prevPageFun = () => {
        setpageCount(currentPage - 1)
        setcurrentPage(currentPage - 1)
    }

    // 👉 Function 4 👈
    const perPageFun = (val) => {

        let checkPage = parseInt(totalCount / val)
        let checkPageRemainder = parseInt(totalCount % val)

        if (checkPageRemainder == 0) {
            checkPage < currentPage && setpageCount(checkPage)
            setperPageCount(val)
            return
        }

        if (checkPageRemainder != 0) {
            (checkPage + 1) < currentPage && setpageCount(checkPage + 1)
            setperPageCount(val)
            return
        }

    }

    // 👉 Function 5 👈
    const firstPageFun = () => {
        setpageCount(1)
        setcurrentPage(1)
    }

    // 👉 Function 6 👈
    const lastPageFun = () => {
        setpageCount(lastPage)
        setcurrentPage(lastPage)
    }

    // 👉 Function 7 👈
    const gotoPageFun = (val) => {
        setpageCount(parseInt(val))
        setcurrentPage(parseInt(val))
    }

    // 👉 Calling Function 1 on Data change 👈
    useEffect(() => {
        if (parseInt(props?.refresh) > 0) {
            setpageCount(1)
            setperPageCount(10)
            fetchData()
        }

    }, [props?.refresh])

    // 👉 Calling Function 1 when page no. or data per page change 👈
    useEffect(() => {
        setloader(true)
        fetchData()
    }, [pageCount, perPageCount, currentPage])

    const exportFun = (type) => {

        setExportType(type)

        setExportLoader(true)

        let url = `${props?.api}?draw=1&start=1&length=0`;

        AxiosInterceptors.get(url, ApiHeader())
            .then((res) => {
                console.log('table: ', res)
                setAllData(res?.data?.data ?? [])
            })
            .catch((error) => {
                console.log('Table error getting all data: ', error)
            }).
            finally(() => {
                setExportLoader(false)
            })
    }

    return (
        <>

            {/* 👉 When error occured 👈 */}
            {errorState &&
                <div className="bg-red-100 border border-red-400 text-red-700 pl-4 pr-16 py-3 rounded relative text-center" role="alert">
                    <strong className="font-bold">Sorry! </strong>
                    <span className="block sm:inline">Some error occured while fetching list. Please try again later.</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    </span>
                </div>
            }

            {/* 👉 Listtable 👈 */}
            <TableBp
                dataList={dataList}
                columns={props?.columns}
                totalCount={totalCount}
                lastPage={lastPage}
                currentPage={currentPage}
                exportStatus={props?.exportStatus}
                exportFun={(type) => exportFun(type)}
                exportType={exportType}
                exportLoader={exportLoader}
                allData={allData}
                goFirst={firstPageFun}
                goLast={lastPageFun}
                nextPage={nextPageFun}
                prevPage={prevPageFun}
                perPageC={perPageFun}
                gotoPage={(val) => gotoPageFun(val)}
                perPageCount={perPageCount}
                heading={props?.heading}
                loader={loader}
                more={props?.more ?? false}
            />

        </>
    )
}

export default BackendTable