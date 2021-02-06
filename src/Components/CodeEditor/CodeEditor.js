import React from "react";
import Editor from "@monaco-editor/react";
import './style.css';

class CodeEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      code: '',
      activeTab: 0
    }
  }

  componentDidMount() {
    this.setState({
      code: this.props.code,
      activeTab: this.props.activeTab
    })
  }

  editorDidMount(editor, monaco) {
    editor.focus();
  }


  componentDidUpdate(prevProps) {    
    if (prevProps.code !== this.props.code) {
      this.setState({ code: this.props.code, activeTab: this.props.activeTab });
    }
  }

  updateCodeBase = (value,event) => {
    this.props.updateCodeBase(this.state.activeTab,value)
  }

  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: false
    };

    return (
      <Editor
        height="500px"
        width="700px"
        theme={"vs-dark"}
        defaultLanguage="javascript"
        defaultValue={this.state.code}
        value={this.state.code}
        onChange={this.updateCodeBase}
      />
    );
  }
}

export default CodeEditor;
