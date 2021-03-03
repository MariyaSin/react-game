import React, { useState } from 'react';
import './styles/settings.css'

import Storage from '../../utils/Storage';

export default function SettingsPage() {
    let hotKeys = Storage.GetData('HotKeys');

    const [jump, setJump] = useState(hotKeys.jump);
    const [shortJump, setShortJump] = useState(hotKeys.shortJump);
    const [back, setBack] = useState(hotKeys.back);
    const [faster, setFaster] = useState(hotKeys.faster);
    const [pause, setPause] = useState(hotKeys.pause);

    const handler = (e, action) => {
        hotKeys[action] = e.code;
        Storage.SetData('HotKeys', hotKeys);
    }

    return (
        <div className="settings-page__container">
            <div className="settings__item">
                <span>Jump: {jump}</span>
                <input onKeyPress={(e) => {handler(e, 'jump'); setJump(e.code)}}></input>
            </div>
            <div className="settings__item">
                <span>Short jump: {shortJump}</span>
                <input onKeyPress={(e) => {handler(e, 'shortJump'); setShortJump(e.code)}}></input>
            </div>
            <div className="settings__item">
                <span>Pull back: {back}</span>
                <input onKeyPress={(e) => {handler(e, 'back'); setBack(e.code)}}></input>
            </div>
            <div className="settings__item">
                <span>Faster: {faster}</span>
                <input onKeyPress={(e) => {handler(e, 'faster'); setFaster(e.code)}}></input>
            </div>
            <div className="settings__item">
                <span>Pause: {pause}</span>
                <input onKeyPress={(e) => {handler(e, 'pause'); setPause(e.code)}}></input>
            </div>
        </div>
    )
}