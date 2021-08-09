import React from 'react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import "./App.css"

const App = () => {

    const [img, setImg] = useState(null)

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
            <div {...getRootProps()} className="drop-zone">
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
            <button>Upload</button>

            {img && (
                <div className="result">
                    <div className="img-container">
                        <img src={img} alt="/" />
                    </div>
                    <div className="text">
                        This image is not passport.
                    </div>
                </div>
            )}

        </div>
    )
}

export default App
