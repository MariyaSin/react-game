import React from 'react';
import './styles/records.css';

import Storage from '../../utils/Storage';
import Item from './Item';

export default function RecordsPage() {
    let recordsData = Storage.GetData('Game-RecordsData');
    if (recordsData !== null) recordsData.sort((a, b) => a.failure < b.failure ? 1 : -1);

    return (
        <div className="records-page__container">
            <div className="records-header__container">
                <span>level</span> 
                <span>Time</span>
                <span>Failures</span>
            </div>
            {
                recordsData !== null ? 
                <div>
                    <Item data={recordsData[0]} />
                    <Item data={recordsData[1]} />
                    <Item data={recordsData[2]} />
                    <Item data={recordsData[3]} />
                    <Item data={recordsData[4]} />
                    <Item data={recordsData[5]} />
                </div>:
                <p>Tere is has not data yet</p>
            }
        </div>
    )
}