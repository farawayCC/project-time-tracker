import React, { useState, useEffect, useRef } from 'react'
import { Button, Grid, Header } from 'semantic-ui-react'

const TimerComponent = ({ workMinutePassed, workStateChanged }) => {

    const getMaxTime = (isBreak) =>
        isBreak
            ? 7 * 60 * 1000
            : 25 * 60 * 1000

    const [time, setTime] = useState(getMaxTime(false))
    const [isRunnung, setIsRunning] = useState(false)
    const [isBreak, setIsBreak] = useState(false)

    const startOnModeChanged = true

    const tick = () => {
        // Check if min passed
        const minPassed = (time/1000) % 60 === 0
        const notJustStarted = time !== getMaxTime(isBreak)
        const validMinutePassed = minPassed && !isBreak && notJustStarted
        if (validMinutePassed)
            workMinutePassed()

        // Manipulate the time / switch the mode
        if (time > 0) {
            setTime(time - 1000)
        } else {
            setIsBreak(!isBreak)
            setTime(getMaxTime(isBreak))
            const notifObj = {
                title: !isBreak ? "Lets work a bit!" : "Have a break. U deserve it",
                body: !isBreak ? 'please...' : 'Yoohoo!'
            }
            window.ipcRenderer.send('notify', notifObj)
            alert(notifObj.title)
        }
    }

    useInterval(tick, isRunnung ? 1000 : null)

    useEffect(() => {
        workStateChanged(isBreak ? 'rest' : 'work')
    }, [isBreak])

    const startOrPauseTimer = () => {
        setIsRunning(!isRunnung)
        setTime(time - 1000)
    }

    const resetTimer = () => {
        setTime(getMaxTime(isBreak))
        setIsRunning(false)
    }

    const changeMode = () => {
        setIsBreak(!isBreak)
        setTime(getMaxTime(!isBreak) - 1000)
        setIsRunning(startOnModeChanged)
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
                <Header size='huge' style={{ color: '#fff' }}>{timerText()}</Header>
            </Grid.Column>
            <Grid.Column width='4'>
                <Button circular size='huge' icon={startPauseButtonIcon()} onClick={startOrPauseTimer} />
                <Button circular size='huge' icon='sync alternate' disabled={isResetButtonDisabled()} onClick={resetTimer} />
                <Button circular size='huge' icon={modeSwitcherIcon()} onClick={changeMode} />
            </Grid.Column>
        </>
    )
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default TimerComponent