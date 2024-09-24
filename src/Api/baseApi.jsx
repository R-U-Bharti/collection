/*
Readme
------------------------------------------
import { apiList } from '@/Api/baseApi'
const {apiFirst, apiSecond} = apiList()
*/

import { baseUrl } from "./apiConstants";

export default function baseApi() {

    let apiList = {
        apiFirst: `${baseUrl}base/api/first`, //post
        apiSecond: `${baseUrl}base/api/second`, //get
    }

    return apiList;
}