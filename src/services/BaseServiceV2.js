import axios from 'axios';
import appConfig from "../configs/app.config";
import {
    REQUEST_HEADER_DEVICE_ID,
    REQUEST_HEADER_SESSION_TOKEN,
    REQUEST_HEADER_CHANNEL,
    REQUEST_HEADER_AUTH_TOKEN,
    REQUEST_HEADER_CONTENT_TYPE
} from "../constants/api.constant";
import { PERSIST_STORE_NAME } from "../constants/app.constant";
import deepParseJson from "../utils/deepParseJson";
// import store from '../store'
// import { onSessionExpired } from '../store/auth/sessionSlice'

const unauthorizedCode = [401, 403, 500]



const BaseServiceV2 = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
})

BaseServiceV2.interceptors.request.use(
    (config) => {
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
        const persistData = deepParseJson(rawPersistData)
        const deviceId = persistData.auth.session.deviceId
        const token = persistData.auth.session.token

        config.headers[REQUEST_HEADER_CHANNEL] = 14
        config.headers[REQUEST_HEADER_AUTH_TOKEN] = appConfig.authToken
        //config.headers[REQUEST_HEADER_CONTENT_TYPE] = 'multipart/form-data'

        if (deviceId) config.headers[REQUEST_HEADER_DEVICE_ID] = deviceId

        if (token) config.headers[REQUEST_HEADER_SESSION_TOKEN] = token;
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

BaseServiceV2.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error
        if (response && unauthorizedCode.includes(response.status)) {
            // store.dispatch(onSessionExpired())
        }

        return Promise.reject(error)
    }
)

export default BaseServiceV2