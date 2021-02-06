import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form } from 'react-bootstrap'
import './style.css'
import { ChatBoxAction } from '../../StateContainer'

class ChatBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      conversations: [],
      count: 0
    }
  }

  handleOnChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  updateQueryResponseCallBack = () => {
    const { query, count } = this.props.query_response;
    let conversations = Object.assign(this.state.conversations)
    conversations[count]['bot'] = query
    this.setState({
      conversations
    })
  }

  chatWithBot = (event) => {
    /* Network Calls will happen here. */
    event.preventDefault()
    const { query, count, conversations } = this.state
    conversations.push({
      human: query,
      bot: '...'
    }) // Marking the response as waiting to be from the bot side to process.
    this.setState({
      query: '',
      count: count + 1,
      conversations
    })

    // submitting data to track the conversations with the bot and human response.
    const count_payload = {
      query,
      count
    }
    let data = JSON.stringify(count_payload)
    const payload = {
      "code": `(function expire (pa) { return pa;})('${data}')`
    }
    this.props.ChatBoxAction(payload, this.updateQueryResponseCallBack)
  }

  render() {
    return (
      <div >
        <div className="row">
          <div className="col-lg-10">
            <div className="chatbox-conversation">
              {
                this.state.conversations.map((conversation, counter) => {
                  return <div key={counter} className="conversation" >
                    <ul className="single-conversation">
                      <li>
                        <div className="row">
                          <div className="col-5">
                            <div className="query human">
                              <span>
                                <i class="far fa-user human-icon"></i>
                                <span class="human-conversation"> {conversation.human}  </span>
                              </span>
                            </div>
                          </div>
                          <div className="col-7">
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div className="col-7">
                          </div>
                          <div className="col-5">
                            <div className="query bot">
                              <span>
                                {conversation.bot}
                                <span> <i class="fas fa-robot bot-icon"></i>
                                </span></span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                })
              }
              <div style={{ float: "left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-10">
            <Form onSubmit={this.chatWithBot} method="post">
              <Form.Group  >
                <Form.Control autoComplete={"off"} name="query" size="small" type="text" value={this.state.query} placeholder="Type Message here" onChange={this.handleOnChange} />
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ChatBoxAction
  },
    dispatch)
}

const mapStateToProps = state => ({
  query_response: state.ChatReducer.query_response
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
