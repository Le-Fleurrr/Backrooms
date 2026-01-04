import React from 'react'
import { CircleUserRound, Mail, Lock } from 'lucide-react';

export const Account = () => {
    return (
        <div className="container">
            <div className="header">
                <div className="text">
                    <CircleUserRound />
                    Qeydiyyatdan Keçim
                </div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <Mail />
                    <input type="email" />
                </div>
                <div className="input">
                    <Lock />
                    <input type="password" />
                </div>
            </div>
            <div className="forgot-password">Şifrəni unutdum <span /></div>
            <div className="submit-container">
                <div className="submit">Qeydiyyatdan Keçim</div>
                <div className="submit">Daxil Olun</div>
            </div>
        </div>
    )
}