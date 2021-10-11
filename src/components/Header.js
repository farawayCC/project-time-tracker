import React, { useState } from 'react'
import { Button, Grid, Header, Checkbox } from 'semantic-ui-react'
import * as projUtils from '../resources/projectUtils'
import TimerComponent from './TimerComponent'

const HeaderComponent = ({
    isEditing, editingToggled, weekRestart, workMinutePassed, workStateChanged
}) => {

    const [writeDebt, setWriteDebt] = useState(false)
    const canRestartWeek = projUtils.canRestartWeek()

    return (
        <div id='header' style={{ padding: '.7em' }}>
            <Grid columns='equal'>
                <Grid.Row>
                    <Grid.Column width='2'>
                        <Button
                            inverted
                            basic
                            size='small'
                            onClick={() => editingToggled()}
                            content={isEditing ? 'Done Editing' : 'Edit'}
                        />
                    </Grid.Column>
                    <Grid.Column width='4'>
                        {isEditing ?
                            <Button
                                inverted
                                disabled={!canRestartWeek}
                                size='small'
                                icon='sync alternate'
                                onClick={() => weekRestart(writeDebt)}
                                content='Week Restart'
                            />
                            : null
                        }
                        {isEditing ?
                            <Checkbox
                                label='write debt'
                                checked={writeDebt}
                                onChange={() => setWriteDebt(!writeDebt)}
                            />
                            : null
                        }
                    </Grid.Column>
                    <Grid.Column width='4'>
                        <Header inverted color='blue' as='h1' textAlign='center' content='Projects List' />
                    </Grid.Column>
                    <TimerComponent workMinutePassed={() => workMinutePassed()} workStateChanged={(newWorkState) => workStateChanged(newWorkState)} />
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default HeaderComponent