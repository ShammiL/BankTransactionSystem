import React from 'react'
import { Link } from 'react-router-dom'

export default function dashpage() {
    return (
        <div>
            <p>Succefully Done</p>
            <Link to={'/'}>
                <button onClick={e => { }}>Back</button>
            </Link>
        </div>
    )
}
