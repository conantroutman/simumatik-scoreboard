import { useState } from 'react'
import { Table, Avatar, Space  } from 'antd'
import { CloseOutlined, ArrowUpOutlined, ArrowDownOutlined, UserOutlined } from '@ant-design/icons'
import ScoreboardHeader from './ScoreboardHeader'
import AdjustScoreButton from './AdjustScoreButton'
import RemoveParticipantButton from './RemoveParticipantButton'

export default function Scoreboard({ participants, onAdjustScore, onDelete, onAddParticipant }) {

    const [currentPage, setCurrentPage] = useState(1)

    // Column configuration for table
    const columns = [
        {
            title: '#',
            key: 'index',
            width: 40,
            align: 'right',
            render: (text, record, index) => (
                // Display ranking. First get position in array, then add +10 per page (10 is max per page)
                (index + 1) + ((currentPage - 1) * 10)
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <Space>
                    <Avatar size="small" icon={<UserOutlined />} />
                    {record.name}
                </Space>
                
            )
        },
        {
            title: 'Wins',
            dataIndex: 'wins',
            key: 'wins',
            width: 40,
            align: 'right'
        },
        {
            title: 'Losses',
            dataIndex: 'losses',
            key: 'wins',
            width: 40,
            align: 'right'
        },
        {
            title: () => (<ArrowUpOutlined />),
            key: 'increase',
            width: 40,
            align: 'center',
            fixed: 'right',
            render: (text, record) => (
                <AdjustScoreButton record={record} type='win' onAdjustConfirm={onAdjustScore} tooltipText='Increment wins.' />
            )
        },
        {
            title: () => (<ArrowDownOutlined />),
            key: 'decrease',
            width: 40,
            align: 'center',
            fixed: 'right',
            render: (text, record) => (
                <AdjustScoreButton record={record} type='loss' onAdjustConfirm={onAdjustScore} tooltipText='Increment losses.' />
            )
        },
        {
            title: () => (<CloseOutlined />),
            key: 'delete',
            align: 'center',
            width: 40,
            fixed: 'right',
            render: (text, record) => (
                <RemoveParticipantButton record={record} onConfirm={onDelete} />
            )
        }
    ]

    // Used for calculating which ranking to display
    function handleOnChange(pagination) {
        setCurrentPage(pagination.current)
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={participants}
                title={() => <ScoreboardHeader onAddParticipant={onAddParticipant} />}
                size='medium'
                tableLayout='auto'
                style={{ width: '100%' }}
                onChange={handleOnChange}
                scroll={{ scrollToFirstRowOnChange: true, x: 'calc(100% - (40px * 3))' }}
            />
        </>
    )
}
