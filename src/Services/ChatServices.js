import * as axios from 'axios'
import { BACKEND_URL } from './config'

export const ChatBotService = (payload) => {
    return axios.post(BACKEND_URL, payload)
}

