import {
    START_LOADER,
    STOP_LOADER,
    QUERY_RESPONSE
} from '../Constants'
import { ChatServices } from "../../Services";


export const ChatBoxAction = (payload,callback) => (dispatch) =>{   
    dispatch( { type:START_LOADER })    
    ChatServices.ChatBotService(payload)    
    .then((response) => {      
      dispatch({ type:QUERY_RESPONSE, payload:response.data })                
      callback()
      dispatch({ type:STOP_LOADER })      
    })    
}