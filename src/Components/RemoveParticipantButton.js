import React from 'react'
import { Button, Popconfirm, Tooltip } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

export default function RemoveParticipantButton({ record, onConfirm }) {
    return (
        <>
            <Popconfirm 
                title={() => `Are you sure you want to remove ${record.name} from the scoreboard?`}
                onConfirm={()=> onConfirm(record.key, record.name)}
                okText="Yes"
                cancelText="No"
                placement='topRight'
            >
                <Tooltip
                    placement='topRight'
                    title={() => `Remove ${record.name} from the scoreboard.`}
                    zIndex={2}
                >
                    <Button type='link' icon={<CloseOutlined />} danger={true} />
                </Tooltip>
            </Popconfirm>
        </>
    )
}
