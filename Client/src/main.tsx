import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { legacy_createStore } from "redux"
import { Provider } from "react-redux"
import appReducer from './Redux/appReducer.tsx'
import { HashRouter } from 'react-router-dom'
const store = legacy_createStore(appReducer)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>

  </React.StrictMode>,
)

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')
// // Use contextBridge
// window.ipcRenderer.on('main-process-message', (_event, message) => {
//   console.log("hello")


// })
