import React from 'react';
import ManageObjects from './ManageObjects'
import { stream_entries } from '../config'
import { lecture_entries } from '../config'

function Manage(props) {
    return <div className="container" style={{marginTop: 50}}>
        <div className="row">
            <div className="col-sm-6">
                <ManageObjects name="streams" formEntries={stream_entries} />
            </div>
            <div className="col-sm-6">
                <ManageObjects name="lectures" formEntries={lecture_entries} />
            </div>
        </div>
    </div>
}

export default Manage;