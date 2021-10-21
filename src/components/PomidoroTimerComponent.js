import React, { useState, useEffect, useRef } from 'react'
import { Button, Grid, Header } from 'semantic-ui-react'
import useInterval from '../resources/useInterval'

const PomidoroTimerComponent = ({ workMinutePassed, workStateChanged }) => {

    // Settings
    const startOnModeChanged = true
    const tickEvery = 1000
    const restMins = 7
    const workMins = 25

    const getMaxTime = (isBreak) =>
        isBreak
            ? restMins * 60 * 1000
            : workMins * 60 * 1000

    const [time, setTime] = useState(getMaxTime(false))
    const [isRunnung, setIsRunning] = useState(false)
    const [isBreak, setIsBreak] = useState(false)


    const tick = () => {
        // Check if min passed
        const minPassed = (time / 1000) % 60 === 0
        const notJustStarted = time !== getMaxTime(isBreak)
        const validMinutePassed = minPassed && !isBreak && notJustStarted
        if (validMinutePassed)
            workMinutePassed()

        // Manipulate the time / switch the mode
        if (time > 0) {
            setTime(time - 1000)
        } else {
            // Should be switched
            console.log('isBreak:', isBreak)
            const prevIsBreak = isBreak

            // Display change
            workStateChanged(!prevIsBreak ? 'rest' : 'work')
            const notifObj = {
                title: prevIsBreak ? "Lets work a bit!" : "Have a break. U deserve it",
                body: prevIsBreak ? 'please...' : 'Yoohoo!'
            }
            window.ipcRenderer.send('notify', notifObj)
            alert(notifObj.title)

            // Actually change the data
            setTime(getMaxTime(!prevIsBreak))
            setIsBreak(!isBreak)
        }
    }

    useInterval(tick, isRunnung ? tickEvery : null)

    const startOrPauseTimer = () => {
        setIsRunning(!isRunnung)
        setTime(time - 1000)
    }

    const resetTimer = () => {
        setIsRunning(false)
        setTime(getMaxTime(isBreak))
    }

    const changeMode = () => {
        setIsBreak(!isBreak)
        setTime(getMaxTime(!isBreak) - 1000)
        setIsRunning(startOnModeChanged)
        workStateChanged(!isBreak ? 'rest' : 'work')
    }

    const timerText = () => {
        const minutes = parseInt(time / (60_000))
        var seconds = (time - minutes * 60_000) / 1000
        if (seconds < 10) seconds = "0" + seconds
        return minutes + ":" + seconds;
    }

    const startPauseButtonIcon = () => isRunnung ? 'pause' : 'play'
    const isResetButtonDisabled = () => time === getMaxTime(isBreak)
    const modeSwitcherIcon = () => isBreak ? 'industry' : 'coffee'

    return (
        <>
            <Grid.Column width='2'>
                <Header
                    size='huge'
                    style={{ color: '#fff' }}
                    content={timerText()}
                />
            </Grid.Column>
            <Grid.Column width='4'>
                <Button
                    circular
                    size='huge'
                    icon={startPauseButtonIcon()}
                    onClick={startOrPauseTimer}
                />
                <Button
                    circular
                    size='huge'
                    icon='sync alternate'
                    disabled={isResetButtonDisabled()}
                    onClick={resetTimer}
                />
                <Button
                    circular
                    size='huge'
                    icon={modeSwitcherIcon()}
                    onClick={changeMode}
                />
            </Grid.Column>
        </>
    )
}

export default PomidoroTimerComponent