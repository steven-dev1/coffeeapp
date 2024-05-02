'use client'

import { Toaster } from 'react-hot-toast'

const ToasterProvider = () => {
  return (
    <Toaster toastOptions={{
        success: {
          style: {
            border: '1.5px solid green'
          },
        },
        error: {
          style: {
            border: '1.5px solid red'
          },
        },
      }}/>
  )
}

export default ToasterProvider