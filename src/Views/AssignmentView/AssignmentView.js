import React from "react";
import { Badge, 
  Modal, 
  Button, 
  Form, 
  Row,  
  Col
  } from 'react-bootstrap';
import {  
  ChatBox,
  CodeEditor
} from '../../Components'
import './style.css'

class AssignmentView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      codebase: [{
        fileName: 'Ex.js',
        code_sample: `/* console.log('Hello JS') from Ex.js 
Source Code: https://github.com/babygame0ver/ai-playground */`
      }],
      activeTab: 0,
      modal: false,
      renameFileName: '',
      fileIndx: 0,
      newTabsSampleName: [
        'Google.js',
        'Facebook.js',
        'Twitter.js',
        'LinkedIn.js',
        'Spotify.js',
        'Paytm.js',
        'Zomato.js',
        'Swiggy.js',
        'Uber.js',
        'Ola.js',
      ]
    }
  }

  componentDidMount() {
    document.title = 'Assignment'
  }

  renameFileOpenModal = (index) => {
    this.setState({
      renameFileName: this.state.codebase[index]['fileName'],
      fileIndx: index
    })
    this.setState({
      modal: true
    })
  }

  changeFileName = (event) => {
    const { value } = event.target
    this.setState({
      renameFileName: value
    })
  }

  selectTabAndLoadCode = (activeTab) => {
    this.setState({
      activeTab
    })
  }

  handleCloseOnly = () => {
    this.setState({
      modal: false
    })
  }

  handleClose = () => {
    this.setState({
      modal: false
    })
    const codebase = Object.assign(this.state.codebase);
    const { renameFileName, fileIndx } = this.state
    codebase[fileIndx]['fileName'] = renameFileName
    this.setState({
      codebase
    })
  }

  randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createNewTab = () => {
    const newTabsSampleName = Object.assign(this.state.newTabsSampleName)
    let randomIndex = this.randomInteger(0, newTabsSampleName.length - 1);
    const fileName = newTabsSampleName[randomIndex]
    const codebase = Object.assign(this.state.codebase)
    codebase.push({
      fileName,
      code_sample: `/* console.log('Hello JS') from ${fileName}
Source Code: https://github.com/babygame0ver/ai-playground */ `
    })
    this.setState({
      codebase,
      activeTab : codebase.length - 1
    })
  }

  deleteTab = (index) => {
    const codebase = Object.assign(this.state.codebase)
    const newCodeBase = codebase.filter((code, fileIndex) => {
      return fileIndex != index
    })
    this.setState({
      codebase: newCodeBase,
      activeTab : newCodeBase.length - 1
    })

  }

  updateCodeBase = (index, value) => {
    const codebase = Object.assign(this.state.codebase);
    codebase[index]['code_sample'] = value
    this.setState({
      codebase
    })
  }

  render() {
    const { codebase, activeTab } = this.state
    return (
      <div>        
        <Row>
          <Modal show={this.state.modal} onHide={this.handleClose} size="sm">
            <Modal.Header closeButton>
              <Modal.Title>Rename File Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Control size="lg" type="text" onChange={this.changeFileName} value={this.state.renameFileName} placeholder="Large text" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCloseOnly}>
                Cancel
          </Button>
              <Button variant="primary" onClick={this.handleClose}>
                Rename
          </Button>
            </Modal.Footer>
          </Modal>
          <Col>
            <div className="row file-tabs">
              {this.state.codebase.map((file, fileIndex) => {
                return fileIndex === this.state.activeTab ?
                  <span key={fileIndex} className="file">
                    <Badge onClick={() => this.selectTabAndLoadCode(fileIndex)} onDoubleClick={() => this.renameFileOpenModal(fileIndex)} variant="success">
                      <h6>{file.fileName}  </h6>
                    </Badge> {fileIndex !== 0 ? <Button onClick={() => this.deleteTab(fileIndex)} size="sm">x</Button> : <></>}
                  </span> :
                  <span key={fileIndex} className="file">
                    <Badge onClick={() => this.selectTabAndLoadCode(fileIndex)} onDoubleClick={() => this.renameFileOpenModal(fileIndex)} variant="primary">
                      <h6>{file.fileName} </h6>
                    </Badge>
                    {fileIndex !== 0 ? <Button onClick={() => this.deleteTab(fileIndex)} size="sm">x</Button> : <></>}
                  </span>
              })}
              {this.state.codebase.length < 5 ? <span><Button variant="dark" onClick={this.createNewTab}>+</Button></span> : <></>}
            </div>
            <Row>
              <CodeEditor
                activeTab={this.state.activeTab}
                code={codebase[activeTab]['code_sample']}
                updateCodeBase={this.updateCodeBase}
              />
            </Row>
          </Col>
          <Col>
            <ChatBox />
          </Col>
        </Row>
        </div>
    );
  }
}

export default AssignmentView;
