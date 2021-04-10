import '../assets/styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { ChainId, DAppProvider } from '@usedapp/core'

function MyApp({ Component, pageProps }) {
    return (
        <React.StrictMode>
            <DAppProvider>
                <Component {...pageProps} />
            </DAppProvider>
        </React.StrictMode>
    )
}

export default MyApp