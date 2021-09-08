import React, { useState } from 'react'
import { Button, Grid, Header, Checkbox } from 'semantic-ui-react'
import * as projUtils from '../resources/projectUtils'

const HeaderComponent = (props) => {
    const [writeDebt, setWriteDebt] = useState(false)
    const canRestartWeek = projUtils.canRestartWeek()
    return (
        <div id='header' style={{ padding: '.7em' }}>
            <Grid columns={3} >
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Button
                            basic
                            size='small'
                            onClick={() => props.editingToggled()}
                            content={props.isEditing ? 'Done Editing' : 'Edit'}
                        />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Header color='blue' as='h1' textAlign='center'>Projects List</Header>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        {props.isEditing ?
                            <Button
                                disabled={!canRestartWeek}
                                size='small'
                                icon='sync alternate'
                                onClick={() => props.weekRestart(writeDebt)}
                                content='Week Restart'
                            />
                            : null
                        }
                        {props.isEditing ?
                            <Checkbox
                                label='write debt'
                                checked={writeDebt}
                                onChange={() => setWriteDebt(!writeDebt)}
                            />
                            : null
                        }
                        <Button
                            floated='right'
                            size='massive'
                            onClick={() => props.playingToggled()}
                            icon={props.isPlaying ? 'pause' : 'play'}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default HeaderComponent