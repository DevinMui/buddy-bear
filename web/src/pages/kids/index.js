import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition'
import { useEffect, useRef, useState, useCallback } from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import Webcam from 'react-webcam'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Speech from 'speak-tts'
import socket from '../../socket'

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
const MicRecorder = require('mic-recorder-to-mp3')

export default function Kid() {
    // Put some warnings here for rotation
    // text
    // camera
    // paw
    const { id, judge } = useParams()
    const camRef = useRef(null)
    const [img, setImg] = useState('')
    const [cameraActive, setCameraActive] = useState(false)
    const [isPortrait, setIsPortrait] = useState(true)
    const [recorder, setRecorder] = useState(new MicRecorder({ bitRate: 128 }))
    const [ocrResults, setOcrResults] = useState('')
    const { transcript, resetTranscript } = useSpeechRecognition()

    const [butt, setButt] = useState(false)
    const [tts, setTts] = useState(new Speech())

    useEffect(() => {
        tts.init()
    }, [])

    useEffect(() => {
        SpeechRecognition.startListening({ continuous: true })
    }, [])

    useEffect(() => {
        const e = function () {
            console.log(window.orientation)
            if (window.orientation !== undefined)
                setIsPortrait(window.orientation % 180 === 0)
            setIsPortrait(window.innerHeight > window.innerWidth)
        }
        e()
    }, [])

    console.log(transcript)
    const record = () => {
        console.log('t', transcript)
        if (!recorder) return console.log('no recorder')
        try {
            recorder
                .stop()
                .getMp3()
                .then(([buffer, blob]) => {
                    // do what ever you want with buffer and blob
                    // Example: Create a mp3 file and play

                    const file = new File(buffer, `page-${uuid()}.mp3`, {
                        type: blob.type,
                        lastModified: Date.now(),
                    })
                    console.log(file)
                    // Grab speech results
                    let c = {
                        expected: ocrResults,
                        recorded: transcript,
                    }
                    console.log('c', c)
                    const d = new FormData()
                    d.append('audio', file)
                    d.append('text', JSON.stringify(c))

                    axios.post(`/api/books/${id}/pages`, d).then(
                        (response) => {
                            console.log('it returned or something')
                            console.log(response)
                        },
                        (error) => {
                            console.log(error)
                        }
                    )

                    // const player = new Audio(URL.createObjectURL(file))
                    // player.play()
                })
                .catch((e) => console.error(e))
        } catch (e) {
            console.log(e)
        }
        recorder
            .start()
            .then(() => {
                console.log('started')
                resetTranscript()
            })
            .catch((e) => console.log(e))
        // Clear speech results

        setButt(false)
    }

    function join() {
        socket.emit('join', { id: 0 })
    }

    function giveReward() {
        socket.emit('reward', { id: 1 })
    }

    const capture = useCallback(() => {
        const imageSrc = camRef.current.getScreenshot()
        if (tts) tts.cancel()
        axios
            .post('/api/bears/ocr/', {
                file: imageSrc,
            })
            .then(
                (response) => {
                    try {
                        console.log(response)
                        console.log('it returned or something')
                        const e = response.data.data[0]
                            ? response.data.data[0].description
                            : ''
                        console.log(e)
                        // will throw an exception if not browser supported
                        if (e) {
                            setButt(true)
                            tts.speak({
                                text: e,
                                listeners: {
                                    onend: () => record(),
                                },
                            })
                        } else {
                            record()
                        }
                        setOcrResults(e)
                    } catch (e) {
                        console.log(e)
                    }
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
                        style={{
                            cursor: 'pointer',
                            visibility: isPortrait ? 'hidden' : 'inherit',
                        }}
                    >
                        <h3>Okay!</h3>
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
                        display: judge ? 'none' : 'block',
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        zIndex: 99,
                    }}
                    disabled={false && butt}
                >
                    Simulate Bear Pat
                </Button>

                <Button
                    onClick={giveReward}
                    style={{
                        display: judge ? 'none' : 'block',
                        position: 'fixed',
                        zIndex: 99,
                        right: 0,
                        top: 0,
                        borderColor: 'transparent',
                        color: 'var(--text-color)',
                        background: 'var(--primary-color)',
                    }}
                >
                    All done!
                </Button>
            </div>
        </Background>
    )
}
