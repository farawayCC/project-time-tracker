import React, { useState, useEffect } from 'react'
import useInterval from '../resources/useInterval'
import { Grid, Button, Header } from 'semantic-ui-react'

const NormalTimerComponent = ({ workMinutePassed, workStateChanged }) => {

    const tickEvery = 1000

    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    const tick = () => {
        // Check if min passed
        const minPassed = (time / 1000) % 60 === 0
        const notJustStarted = time !== 0
        const validMinutePassed = minPassed && notJustStarted
        if (validMinutePassed)
            workMinutePassed()

        setTime(time + 1000)
    }

    useInterval(tick, isRunning ? tickEvery : null)

    const startOrPauseTimer = () => {
        setIsRunning(!isRunning)
        workStateChanged(!isRunning ? 'work' : 'rest')
        setTime(time + 1000)
    }

    const timerText = () => {
        const minutes = parseInt(time / (60_000))
        var seconds = (time - minutes * 60_000) / 1000
        if (seconds < 10) seconds = "0" + seconds
        return minutes + ":" + seconds;
    }

    const startPauseButtonIcon = () => isRunning ? 'pause' : 'play'

    return (
        <>
            <Grid.Column width='4'>
                <Header
                    size='huge'
                    style={{ color: '#fff' }}
                    content={timerText()}
                    floated='right'
                />
            </Grid.Column>
            <Grid.Column width='2'>
                <Button
                    inverted
                    circular
                    size='big'
                    icon={startPauseButtonIcon()}
                    onClick={startOrPauseTimer}
                />
            </Grid.Column>
        </>
    )
}

export default NormalTimerComponent