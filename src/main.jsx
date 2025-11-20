import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import ApexDashboard from './components/ApexDashboard'
import { Provider } from 'react-redux'
import { store } from './store/telemetry'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/test" element={<Test />} />
          <Route path="/apex" element={<ApexDashboard />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
