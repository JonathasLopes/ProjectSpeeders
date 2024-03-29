import { Fragment } from "react";
import Router from "./Router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Router />
    </Fragment>
  )
}

export default App;
