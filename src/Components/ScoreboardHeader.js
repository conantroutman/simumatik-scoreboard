import React from 'react'
import { Typography } from 'antd'
import AddParticipantButton from './AddParticipantButton'

const { Title } = Typography

export default function ScoreboardHeader({ onAddParticipant }) {

    return (
        <div className='scoreboard-header' style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <Title style={{ float: 'left' }}>Scoreboard</Title>
            <AddParticipantButton onAddParticipant={onAddParticipant} style={{ float: 'right' }}></AddParticipantButton>
        </div>
    )
}
