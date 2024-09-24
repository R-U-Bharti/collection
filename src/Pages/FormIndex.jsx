// As Reference
import React, { useEffect, useState } from 'react'
import FormOne from './FormOne'
import FormTwo from './FormTwo'
import FormThree from './FormThree'
import Stepper from '@/Components/Common/Stepper'
import AxiosInterceptors from '@/apis/AxiosInterceptor'
import { ApiHeader } from '@/apis/constants'
import { useNavigate, useParams } from 'react-router-dom'
import inquiryApi from '@/apis/inquiryApi'
import Loader from '@/Components/Common/Loader'
import toast from 'react-hot-toast'

const FormIndex = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const { fieldListApi, addApi, getDetailsApi } = inquiryApi()

  const [formIndex, setFormIndex] = useState(1)
  const [storeData, setStoreData] = useState(null)
  const [dataList, setDataList] = useState(null)
  const [loader, setLoader] = useState(false)
  const [customer, setCustomer] = useState(null)

  const styles = {
    buttonStyle: 'border border-zinc-300 w-max px-4 py-1 text-xs text-zinc-700 bg-zinc-100 hover:bg-zinc-200 cursor-pointer focus:outline-none select-none',
    submitButton: 'border border-green-500 w-max px-4 py-1 text-xs text-white bg-green-500 hover:bg-green-400 cursor-pointer focus:outline-none select-none',
    formStyle: 'mt-4 bg-white shadow-md rounded px-3 border py-4 w-full text-zinc-700 *:text-zinc-700 *:text-sm flex flex-wrap items-end gap-y-4 gap-x-5'
  }

  const nextFunWithStore = (data, page) => {
    setStoreData(prev => ({ ...prev, ...data }));
    if (page == -1) {
      submitFun(data)
    } else {
      setFormIndex(page)
    }
  }

  const fetchListFun = () => {
    !id && setLoader(true)
    AxiosInterceptors.get(fieldListApi, ApiHeader())
      .then((res) => {
        console.log('form field list: ', res)
        setDataList(res?.data)
      })
      .finally(() => setLoader(false))
  }

  const submitFun = (finalData) => {

    setLoader(true)

    let body = {
      user: storeData?.details?.customer ?? "",
      consignment_type: storeData?.details?.doBePoNo ?? "",

      pick_up_address: storeData?.address?.pickUpAddress ?? "",
      pick_up_contact: storeData?.address?.pickUpContactNo ?? "",

      nature_of_good: finalData?.shipment?.addDivision ?? "",
      commodity_type: finalData?.shipment?.addCluster ?? "",

    }

    console.log('Add contract form payload >> ', id ? ({ id: id, ...body }) : body)

    AxiosInterceptors.post(addApi, id ? ({ indend_id: id, ...body }) : body, ApiHeader())
      .then((res) => {
        toast.success(`Inquiry ${id ? "Updated" : "Added"} Successfully.`)
        navigate('/')
      })
      .catch(() => toast.error("Please try again later."))
      .finally(() => setLoader(false))

  }

  const feedData = (data) => {
    setStoreData({
      details: {

      },
      address: {

      },
      shipment: {

      }
    })
  }

  const fetchInquiryDetails = () => {
    setLoader(true)
    AxiosInterceptors.get(getDetailsApi(id), ApiHeader())
      .then((res) => {
        console.log('inquiry details: ', res)
        feedData(res?.data)
      })
      .finally(() => fetchListFun())
  }

  useEffect(() => {
    !id && fetchListFun()
    id && fetchInquiryDetails()
  }, [id])

  return (
    <>
      {loader && <Loader />}

      <Stepper formIndex={formIndex} options={{
        1: 'Truck Details',
        2: 'Address',
        3: 'Shipment Service'
      }} />

      <FormOne style={styles} dataList={dataList} data={storeData?.details ?? null} currentCustomer={obj => setCustomer(obj)} next={(values) => nextFunWithStore(values, 2)} prev={false} formIndex={formIndex} />
      <FormTwo style={styles} dataList={dataList} data={storeData?.address ?? null} customer={customer} next={(values) => nextFunWithStore(values, 3)} prev={() => setFormIndex(1)} formIndex={formIndex} />
      <FormThree loader={loader} style={styles} dataList={dataList} data={storeData?.shipment ?? null} next={(values) => nextFunWithStore(values, -1)} prev={() => setFormIndex(2)} formIndex={formIndex} />

    </>
  )
}

export default FormIndex