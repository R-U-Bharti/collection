import { useFormik } from 'formik'
import * as yup from 'yup'
import Select from 'react-select'
import { useEffect, useState } from 'react'

const LoopForm = () => {

    const [list, setList] = useState([])

    // YOUR FIELDS
    const fields = [
        { name: "driverName", label: "Driver Name", type: 'text', placeholder: "", required: false },
        { name: "operatorType", label: "Operator Type", type: 'react-select', placeholder: "Select Mobile Operator", required: false, options: list },
        { name: "licenseType", label: "License Type", type: 'select', placeholder: "", required: false, optionValue: "id", optionView: 'label', data: list },
        { name: "driverPic", label: "Driver Pic", type: 'file', placeholder: "", required: false },
    ]

    const validationSchema = yup.object().shape({
        mobileNo: yup.string().matches(/^[0-9]{10}$/)
    })

    const formik = useFormik({
        initialValues: {

        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            submitFun(values)
        }
    })

    const submitFun = (values) => {
        console.log(values)
    }

    const handleChange = (name, obj) => {
        formik.setFieldValue(name, obj?.value)
    }

    const handleFileChange = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];

    }

    const renderFields = (elem) => {

        switch (elem.type) {
            case 'react-select': {
                return <Select onChange={(obj) => handleChange(elem.name, obj)} value={'useState'} placeholder={elem?.placeholder} name={elem?.name} className={(formik.errors[elem.name] && formik.touched[elem.name]) ? 'fieldError2' : ''} options={elem?.options} />
            };

            case 'select': {
                return <select value={formik.values[elem.name]} name={elem?.name} className={(formik.errors[elem.name] && formik.touched[elem.name]) ? 'fieldError' : 'fieldStyle'}>
                    {elem?.placeholder && <option selected value="">{elem?.placeholder}</option>}
                    {
                        elem?.data?.map((item, index) =>
                            <option key={index} value={item[elem?.optionValue]}>{item[elem?.optionView]}</option>
                        )
                    }
                </select>
            };

            case 'file': {
                return <input value={formik.values[elem.name]} onChange={e => handleFileChange(e)} type="file" name={elem?.name} className={(formik.errors[elem.name] && formik.touched[elem.name]) ? 'fieldError' : 'fieldStyle'} id="" />
            };

            default: {
                return <input value={formik.values[elem.name]} type={elem?.type} name={elem?.name} className={(formik.errors[elem.name] && formik.touched[elem.name]) ? 'fieldError' : 'fieldStyle'} id="" placeholder={elem?.placeholder} />
            }
        }
    }

    useEffect(() => {

        setList(() => {
            return dataList?.allList.map((elem) => new Object({ label: elem.to_company__company_name, value: elem.to_company }))
        })

        if (prefillData) {
            for (let key in formik.initialValues) {
                formik.setFieldValue(key, prefillData[key])
            }
        }

        if (dataList && prefillData) {
            let cd = dataList?.all_customer?.filter(item => item?.to_company == prefillData?.customer)
            setCustomer({ label: cd[0]?.label, value: cd[0]?.value })
        }

    }, [dataList, prefillData])

    return (
        <>
            <form onSubmit={formik.handleSubmit} onChange={formik.handleChange} className={`${style?.formStyle} animate__animated animate__slideInRight animate__faster ${formIndex == 1 ? "flex" : 'hidden'}`}>

                {
                    fields?.map((elem, index) =>
                        <div key={index} className='fieldWrap w-full md:w-[32%]'>
                            <label htmlFor={elem?.name} className={`labelStyle ${elem?.required && "asterisk"}`}>{elem?.label}:</label>
                            {renderFields(elem)}
                        </div>
                    )
                }

                <div className='flex justify-end w-full'>
                    <button className={style?.buttonStyle} type='submit'>Next</button>
                </div>
            </form>
        </>
    )
}

export default LoopForm