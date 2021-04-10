import Head from 'next/head'
import { Container, Row, Card, Button } from 'react-bootstrap'
import React from 'react'
import { useEthers } from '@usedapp/core'
import { Claim } from '../lib/Claim'
import { ToastContainer } from 'react-toastify';

export default function Home() {
  const { activateBrowserWallet, deactivate, account } = useEthers()

  return (
    <Container className="md-container">
      <Head>
        <title>Merkle Claimer</title>
        <link rel="icon" href="/favicon-32x32.png" />
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
        <h1>
          Welcome to Merkle Claimer!
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