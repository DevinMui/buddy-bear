import { useEffect, useRef, useState, useCallback } from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import Webcam from 'react-webcam'
import axios from 'axios'

const Background = styled.div`
    background: var(--primary-color);
    height: inherit;
    position: fixed;
    top: 0;
    width: 100%;
    max-height: 100vh;
    overflow: hidden;
`

const Paw = styled.img`
    position: fixed;
    height: 50vh;
    right: 0;
    bottom: 0;
`

const Preview = styled.div`
    height: 75vw;
    width: 75vw;
    padding: 0;
    position: fixed;
    bottom: 20%;
    right: 20%;
`

const CameraWarning = styled.div`
    margin: 1rem;
    opacity: 0.8;
    text-align: center;
`

export default function () {
    // Put some warnings here for rotation
    // text
    // camera
    // paw
    const camRef = useRef(null)
    const [img, setImg] = useState('')
    const [cameraActive, setCameraActive] = useState(false)
    const [isPortrait, setIsPortrait] = useState(true)

    useEffect(() => {
        const e = function () {
            console.log(window.orientation)
            if (window.orientation !== undefined)
                setIsPortrait(window.orientation % 180 === 0)
            setIsPortrait(window.innerHeight > window.innerWidth)
        }
        e()
        window.addEventListener('resize', e)
        return window.removeEventListener('resize', e)
    }, [])

    const capture = useCallback(() => {
        const imageSrc = camRef.current.getScreenshot()
        console.log(imageSrc)
        axios
            .post('/api/bears/ocr/', {
                file: imageSrc,
            })
            .then(
                (response) => {
                    console.log('it returned or something')
                    console.log(response)
                },
                (error) => {
                    console.log(error)
                }
            )
    }, [camRef, setImg])

    return (
        <Background>
            <div className="container" style={{ margin: '0 auto' }}>
                <Paw
                    src={require('./paw.svg').default}
                    style={{ visibility: isPortrait ? 'inherit' : 'hidden' }}
                />
                <div
                    style={{
                        paddingTop: '2rem',
                        paddingBottom: '2rem',
                        position: 'relative',
                        zIndex: 99,
                    }}
                >
                    <h1>Hello!</h1>
                    <h2>
                        {isPortrait
                            ? "Put me in your bear's paw."
                            : 'Rotate the phone to start reading.'}
                    </h2>
                    <div
                        className="card-i text-center mt-5"
                        onClick={() => window.location.reload()}
                        style={{ cursor: 'pointer' , visibility: isPortrait? 'hidden': 'inherit'}}
                    >
                        <h3 >Okay!</h3>
                    </div>
                </div>

                <div style={{ display: isPortrait ? 'block' : 'none' }}>
                    <Preview className="card-i bg-color d-flex justify-content-center align-items-center">
                        <Webcam
                            ref={camRef}
                            onUserMediaError={() => setCameraActive(false)}
                            onUserMedia={() => setCameraActive(true)}
                            videoConstraints={{
                                facingMode: 'environment',
                            }}
                        />
                        {cameraActive || (
                            <CameraWarning>
                                Please enable your camera to continue.
                            </CameraWarning>
                        )}
                    </Preview>
                </div>
                <Button
                    onClick={capture}
                    style={{
                        display: isPortrait ? 'block' : 'none',
                        position: 'fixed',
                        zIndex: 99,
                    }}
                >
                    Press to Take Screenshot
                </Button>
            </div>
        </Background>
    )
}
