import React from 'react'
import logo from '../logo.png'

export default function AppHeader() {
    return (
        <>
        <div className='logo'>
            <a href="/" rel='noreferrer' className='logo-link'>
                <img src={logo} alt="Simumatik" />
            </a>
        </div>
        </>
    )
}
