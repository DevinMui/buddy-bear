import { useEffect, useRef, useState, useCallback } from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import Webcam from 'react-webcam'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Speech from 'speak-tts'
import io from 'socket.io-client'

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
    const socket = io.connect()
    const camRef = useRef(null)
    const [img, setImg] = useState('')
    const [cameraActive, setCameraActive] = useState(false)
    const [isPortrait, setIsPortrait] = useState(true)
    const [currFile, setCurrFile] = useState({
        isRecording: false,
        file: null,
    })
    const [recorder, setRecorder] = useState(null)
    const [speech, setSpeech] = useState(null)
    const [speechResults, setSpeechResults] = useState('')
    const [ocrResults, setOcrResults] = useState('')
    const [interim, setInterim] = useState('')

    const [butt, setButt] = useState(false)
    const [tts, setTts] = useState(null)

    useEffect(() => {
        if (speech) return
        let speechRecognition = window.SpeechRecognition
        // eslint-disable-next-line
        if (!speechRecognition) speechRecognition = webkitSpeechRecognition
        if (!speechRecognition) toast('Error loading speech recognition.')
        const recognition = new speechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.onresult = function (event) {
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    // console.log('final', event.results[i][0].transcript)
                    setSpeechResults(
                        speechResults + event.results[i][0].transcript
                    )
                } else {
                    // console.log('interim', event.results[i][0].transcript)
                    setInterim(event.results[i][0].transcript)
                }
            }
        }
        recognition.start()
        setSpeech(recognition)
    })

    useEffect(() => {
        const e = function () {
            console.log(window.orientation)
            if (window.orientation !== undefined)
                setIsPortrait(window.orientation % 180 === 0)
            setIsPortrait(window.innerHeight > window.innerWidth)
        }
        //socket shiz
        socket.on('scan', () => {
            // either with send()
            console.log('socket on')
        })

        if (!recorder) setRecorder(new MicRecorder({ bitRate: 128 }))
        e()
        window.addEventListener('resize', e)
        return window.removeEventListener('resize', e)
    }, [])

    const record = () => {
        const error = () => {
            setCurrFile({ file: null, isRecording: false })
        }
        if (!recorder) return error()
        if (!currFile.isRecording) {
            recorder
                .start()
                .then(() => setCurrFile({ file: null, isRecording: true }))
                .catch(error)
            // Clear speech results
            setSpeechResults('')
            setInterim('')
        } else {
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
                    console.log(speechResults + ' ' + interim)
                    let c = {
                        expected: ocrResults,
                        recorded: speechResults + ' ' + interim,
                    }
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

                    setCurrFile({
                        file: null,
                        isRecording: false,
                    })
                    // const player = new Audio(URL.createObjectURL(file))
                    // player.play()
                })
                .catch(error)
        }
    }

    function recordingToggle() {
        setButt(false)
        if (currFile.isRecording) {
            //is recording
            console.log('end recording')
            record()
        } else {
            console.log('start recording')
            setCurrFile({ file: null, isRecording: false })
            record()
        }
    }

    function join() {
        socket.emit('join', { id: 0 })
    }

    function giveReward() {
        socket.emit('reward', { id: 1 })
    }

    const capture = useCallback(() => {
        const imageSrc = camRef.current.getScreenshot()
        console.log(imageSrc)
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
                        const e = response.data.data[0].description
                        console.log(e)
                        // will throw an exception if not browser supported
                        ;(function () {
                            const speech = new Speech()
                            if (!speech.hasBrowserSupport()) {
                                // returns a boolean
                                console.log('no tts supprot')
                                return // toast('Error initializing text-to-speech')
                            }
                            setTts(speech)
                            speech
                                .init()
                                .then(() => {
                                    // The "data" object contains the list of available voices and the voice synthesis params
                                    console.log('init ok')
                                    // toast('Error initializing text-to-speech')
                                })
                                .catch((e) => {
                                    console.error(
                                        'An error occured while initializing : ',
                                        e
                                    )
                                })
                            setButt(true)
                            speech.speak({
                                text: e,
                                listeners: {
                                    onend: recordingToggle,
                                },
                            })
                        })()
                        setOcrResults(e)
                    } catch (e) {}
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
                    class="card-i"
                    onClick={capture}
                    style={{
                        display: judge ? 'none' : 'block',
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        zIndex: 99,
                    }}
                    disabled={butt}
                >
                    Simulate Bear Pat
                </Button>

                <Button
                    onClick={recordingToggle}
                    style={{
                        display: 'none',
                        position: 'fixed',
                        zIndex: 99,
                    }}
                >
                    Record
                </Button>

                <Button
                    onClick={giveReward}
                    class="card-i"
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
