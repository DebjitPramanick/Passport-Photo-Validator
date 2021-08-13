import React from 'react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import "./App.css"
import axios from 'axios'

const BASE_URL = 'https://prdjckb5i3.execute-api.us-east-2.amazonaws.com/Prod/passportphoto'

const App = () => {

    const [img, setImg] = useState(null)
    const [isPerson, setIsPerson] = useState()
    const [loading, setLoading] = useState(false)

    const uploadImage = async () => {
        setLoading(true)
        await axios.post(BASE_URL, {
            photo: img
        }).then(res => {
            let data = JSON.parse(res.data.body)
            if (data.FaceDetails.length < 1 || data.FaceDetails.length > 1) {
                setIsPerson(false)
            }
            else if (data.FaceDetails.length === 1) {
                setIsPerson(true)
            }
            setLoading(false)
        })
    }

    const reset = () => {
        setImg('')
        setIsPerson()
    }

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]
        var reader = new FileReader();
        reader.onloadend = function () {
            setImg(reader.result)
        }
        reader.readAsDataURL(file);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div className="container">
            <div className="header">Passport Photo Validator</div>
            {!img && (
                <div {...getRootProps()} className="drop-zone">
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </div>
            )}


            {img && (
                <div className="result">
                    <div className="img-container">
                        <img src={img} alt="/" />
                    </div>
                    <div className="text">
                        <div className="btn-container">
                            <button onClick={uploadImage}
                                disabled={loading}>
                                {!loading ? 'Verify'
                                    : 'Loading...'}
                            </button>

                            <button onClick={reset}
                                disabled={loading}>
                                Remove Photo
                            </button>
                        </div>
                        {!loading && isPerson === true ? (
                            <p className="green">It is a valid photo.</p>
                        ) : !loading && isPerson === false ? <p className="red">It is an invalid photo.</p>
                            : null}
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
