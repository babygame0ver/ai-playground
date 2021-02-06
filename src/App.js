import './App.css';
import { Routes } from './Routes'
import { Provider } from 'react-redux';
import store from './StateContainer/Store';
import {Header} from '../src/Components'
import {
  Container,
} from 'react-bootstrap';
function App() {
  return (
    <Provider store={store}>
      <Header />
      <Container fluid>
        <Routes />
      </Container>
    </Provider>
  );
}

export default App;
