import { useState, useRef } from 'react'
import { Button, Modal, Input, message, Tooltip } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'

export default function AddParticipantButton({ onAddParticipant }) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [participantName, setParticipantName] = useState('')
    const participantNameRef = useRef()

    function showModal() {
        setIsModalVisible(true)
    }

    function closeModal() {
        // Clear input
        setParticipantName('')

        // Close modal
        setIsModalVisible(false)
    }

    function submitName() {

        // Input validation
        if (participantName === '') {
            message.warning('Please enter a name')
            return
        }
        onAddParticipant(participantName)

        closeModal()
    }

    function handleCancel() {
        closeModal()
    }

    function handleOnChange() {
        const input = participantNameRef.current.input.value
        setParticipantName(input)
    }

    return (
        <>
            <Tooltip title='Add a participant.' zIndex={2}>
                <Button type='primary' onClick={showModal} style={{ marginTop: 16 }}><UserAddOutlined />Add Participant</Button>
            </Tooltip>

            <Modal
                title='Add Participant'
                visible={isModalVisible}
                onOk={submitName}
                onCancel={handleCancel}
                destroyOnClose={true}           // Need this for autoFocus to work everytime on input
            >
                <Input
                    size='large'
                    placeholder='Name' 
                    type="text" 
                    onPressEnter={submitName} 
                    onChange={handleOnChange} 
                    ref={participantNameRef} 
                    value={participantName} 
                    autoFocus={true}
                />
            </Modal>
        </>
    )
}
