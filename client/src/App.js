import { saveAs } from 'file-saver'
import axios from 'axios'
import { useState } from 'react'

const App = () => {
    const [state, setState] = useState({
        name: 'Adrian',
        receiptId: 0,
        price1: 0,
        price2: 0,
    })

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const createAndDownloadPdf = () => {
        axios
            .post('/create-pdf', state)
            .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' })

                saveAs(pdfBlob, 'newPdf.pdf')
            })
    }

    return (
        <div className="App">
            <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleChange}
                value={state.name}
            />
            <input
                type="number"
                placeholder="Receipt ID"
                name="receiptId"
                onChange={handleChange}
                value={state.receiptId}
            />
            <input
                type="number"
                placeholder="Price 1"
                name="price1"
                onChange={handleChange}
                value={state.price1}
            />
            <input
                type="number"
                placeholder="Price 2"
                name="price2"
                onChange={handleChange}
                value={state.price2}
            />
            <button onClick={createAndDownloadPdf}>Download PDF</button>
        </div>
    )
}

export default App
