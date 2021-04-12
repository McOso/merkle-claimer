import Head from 'next/head'
import { Container, Row, Card, Button, Alert } from 'react-bootstrap'
import React, { useState } from 'react'
import { ChainId, useEthers } from '@usedapp/core'
import { Claim } from '../lib/Claim'
import { ToastContainer } from 'react-toastify';

export default function Home() {
  const [show, setShow] = useState(false)
  const { activateBrowserWallet, deactivate, account, chainId } = useEthers()

  if (!show && account && chainId !== ChainId.Mainnet && chainId !== ChainId.Rinkeby){
    setShow(true)
  }else if (show && (chainId === ChainId.Mainnet || chainId === ChainId.Rinkeby) || (show && !account)){
    setShow(false)
  }

  return (
    <Container className="md-container">
      <Head>
        <title>PT Merkle Claimer</title>
      </Head>
      <Container>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {show ? (
            <Alert variant="danger">
              <Alert.Heading>Unsupported Network</Alert.Heading>
              <p>
                Please connect to Mainnet or Rinkeby.
              </p>
            </Alert>
          ) : null
        }
        <h1 className="text-light">
          Merkle Claimer
        </h1>
        {account ? (
              <Button onClick={() => deactivate()}>Disconnect</Button>
            ) : (
              <Button variant="secondary" onClick={() => activateBrowserWallet()}>Connect</Button>
            )}
        <Container>
          <Row className="justify-content-md-between">
            <Card className="lg-card">
              <Card.Body>
                <Card.Title>Claim your POOL tokens</Card.Title>
                <Card.Text>
                  Connect and claim
                </Card.Text>
                {account ? (
                    <Claim />
                    ) : (
                    <Button variant="secondary" block onClick={() => activateBrowserWallet()}>Connect</Button>
                    )}
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </Container>

      <footer className="cntr-footer">

      </footer>
    </Container>
  )
}