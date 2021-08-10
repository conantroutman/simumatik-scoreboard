import { useState, useEffect } from 'react'
import './App.less'

// Components
import AppHeader from './Components/AppHeader'
import Scoreboard from './Components/Scoreboard'

// Ant Design
import { Layout, message, Row, Col } from 'antd'

// UUID
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'scoreboard.participants'

function App() {
  const { Header, Footer, Content } = Layout

  const [participants, setParticipants] = useState([])

  useEffect(() => {
    document.title = 'Scoreboard'
  }, [])

  // Load participants from local storage.
  useEffect(() => {
    const storedParticipants = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedParticipants) setParticipants(storedParticipants)
  }, [])

  // Save participants to local storage.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(participants))
  }, [participants])



  /**
  * Adds a new participant to the scoreboard.
  *
  * @param {string} name The name of the participant.
  */
  function addParticipant(name) {
    // Input validation
    if (name === '') return

    // key = id
    setParticipants(prevParticipants => {
      return [...prevParticipants, { name: name, key: uuidv4(),  wins: 0, losses: 0 }]
    })

    message.success(`${name} added!`)
  }

  /**
  * Removes a participant from the scoreboard.
  *
  * @param {number} id The ID of the participant.
  */
  function deleteParticipant(id, name) {
    const newParticipants = participants.filter(participant => participant.key !== id)
    setParticipants(newParticipants)
    message.success(`Removed ${name}`)
  }



  /**
  * Increments the number of wins or losses by 1 for the participant with the given ID.
  *
  * @param {number} id The ID of the participant.
  * @param {string} type Determines whether wins or losses should be adjusted. Must be either 'win' or 'loss'.
  */
  function adjustScore(id, type) {
    const newParticipants = [...participants]
    const participant = newParticipants.find(participant => participant.key === id)

    // Increment wins/losses.
    if (type === 'win') {
      participant.wins++
    }
    else if (type === 'loss') {
      participant.losses++
    }
    else {
      // Do nothing if the parameter is invalid.
      return
    }

    setParticipants(sortParticipants(newParticipants))
  }



  /**
  * Takes a list of participants and sorts it by score.
  *
  * @param {array} participantsToSort The array of participants to sort.
  * @return {array} The sorted array of participants.
  */
  function sortParticipants(participantsToSort) {
    //const sortedParticipants = participants.sort((a, b) => ((a.wins - a.losses) > (b.wins - b.losses) ? 1 : ((b.wins - b.losses) > (a.wins - a.losses) ? -1 : 0)))
    
    const sortedParticipants = participantsToSort.sort((a, b) => {

      // Compare wins-losses
      if ((a.wins - a.losses) < (b.wins - b.losses)) {
        return 1
      }
      else if ((a.wins - a.losses) > (b.wins - b.losses)) {
        return -1
      }
      // If the total score is equal, prioritze the participant with the most total wins.
      else {

        if (a.wins < b.wins) {
          return 1
        }
        else if (a.wins > b.wins) {
          return -1
        }
        else return 0

      }
    })
    return sortedParticipants
  }

  return (
    <div className="App" style={{ overflowX: 'hidden' }}>
      <Layout>
        <Header style={{ backgroundColor:'#fff' }}>
          <AppHeader />
        </Header>
        <Content style={{ margin: '32px 0' }}>
          <Row style={{ marginLeft: '0', marginRight: '0' }}>
            <Col xs={{ span: 24 }} xl={{ span: 12, offset: 6 }}>
              <Scoreboard participants={participants} onAdjustScore={adjustScore} onDelete={deleteParticipant} onAddParticipant={addParticipant}></Scoreboard>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <p>Created by <a href='https://github.com/conantroutman' target='_blank' rel='noreferrer'>John Söderberg</a></p>
        </Footer>
      </Layout>

    </div>
  );
}

export default App;
