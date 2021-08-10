import { Button, Popconfirm, Tooltip } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

export default function AdjustScoreButton({ record, type, onAdjustConfirm, tooltipText }) {

    // Determine which icon to use
    const icon = type === 'win' ? <ArrowUpOutlined /> : (type === 'loss' ? <ArrowDownOutlined /> : '')

    function handleConfirm(e, id) {
        onAdjustConfirm(id, type)
    }

    function handleCancel(e) {
        
    }

    function handleOnClick(e) {

    }

    return (
        <>
            <Popconfirm 
                    title="Are you sure you want to adjust the score?"
                    onConfirm={(e)=> handleConfirm(e, record.key)}
                    onCancel={handleCancel}
                    okText="Yes"
                    cancelText="No"
                >
                <Tooltip title={tooltipText} zIndex={2}>
                    <Button type='link' icon={icon} onClick={handleOnClick} />
                </Tooltip>
            </Popconfirm>
        </>
    )
}
