"use client"
import { use, useState } from "react"
export default function Contact() {

    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState("");
    const handleInputs = (e) => {
        setInputs((state) => { return { ...state, [e.target.name]: e.target.value } })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(process.env.NEXT_PUBLIC_API_URI + '/enquery', {
            method: 'POST',
            body: JSON.stringify(inputs)
        })
            .then(res=> res.json())
            .then((res) => {
                setMessage(res.message);
                setInputs({});
                setTimeout(()=>{
                    setMessage("");
                },2000)
            })
    }

    return <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="flex items-center mb-4">
                <label htmlfor="name" className="w-1/4">Name:</label>
                <input type="text" name="name" onChange={handleInputs} id="name" value={inputs.name ?? ""} className="border rounded px-2 py-1 w-3/4 md:w-2/4" />
            </div>
            <div className="flex items-center mb-4">
                <label htmlfor="email" className="w-1/4">Email:</label>
                <input type="email" name="email" onChange={handleInputs} id="email" value={inputs.email ?? ""} className="border rounded px-2 py-1 w-3/4 md:w-2/4" />
            </div>
            <div classname="flex items-center mb-4">
                <label htmlfor="message" className="w-1/4 ">Message:</label>
                <textarea id="message" name="message" onChange={handleInputs} value={inputs.message ?? ""} className="border rounded px-2 py-1 w-2/4" rows="4"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
        {message && <p>{message}</p>}
    </main>
}