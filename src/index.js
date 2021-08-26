import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import { Button, Grid, Segment } from 'semantic-ui-react'
import './index.css'

const Main = () => {
    const [reRenders, render] = useState(0)
    const [time, setTime] = useState(
        localStorage.getItem('local_time') ?
            parseInt(localStorage.getItem('local_time')) : 0
    ) //ms

    let x = setTimeout(() => {
        setTime(time + 1)
        console.log('qwe');
    }, 1000)
    if (localStorage.getItem('is_timer_going') == 'false') {
        clearTimeout(x)
        console.log("timer stopped");
    }

    let sec = time % 60
    let min = Math.round(time / 60) % 60
    let hours = Math.round(min / 60) % 60

    localStorage.setItem('local_time', time)
    return (
        <div id='timer'>
            <Segment>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column style={{ textAlign: 'center' }}>
                            <Button onClick={() => {
                                localStorage.setItem('is_timer_going', false)
                                clearTimeout(x)
                            }}>
                                <div style={{ width: '60px' }}>stop</div>
                            </Button>
                        </Grid.Column>

                        <Grid.Column style={{ textAlign: 'center', fontSize: '1.3em', marginTop: '0.5em' }}>
                            {hours}:{min}:{sec}
                        </Grid.Column>

                        <Grid.Column style={{ textAlign: 'center' }}>
                            <Button onClick={() => {
                                localStorage.setItem('is_timer_going', true)
                                render(reRenders + 1)
                            }}>
                                <div style={{ width: '60px' }}>continue</div>
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div id="bottom-button">
                    <Button onClick={() => {
                        localStorage.setItem(new Date(), time)
                        clearTimeout(x)
                        setTime(0)
                        render(0)
                    }}>finish working day</Button>
                </div>
            </Segment>
        </div>
    )
}

ReactDOM.render(<Main />, document.getElementById('root'))