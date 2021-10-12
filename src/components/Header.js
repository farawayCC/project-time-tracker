import React, { useState } from 'react'
import { Button, Grid, Header, Form } from 'semantic-ui-react'
import * as projUtils from '../resources/projectUtils'
import PomidoroTimerComponent from './PomidoroTimerComponent'
import NormalTimerComponent from './NormalTimerComponent'

const HeaderComponent = ({
    projects, isEditing, editingToggled, weekRestart,
    workMinutePassed, workStateChanged, selectedProjectName
}) => {

    const [writeDebt, setWriteDebt] = useState(false)
    const canRestartWeek = projUtils.canRestartWeek()
    const selectedProject = projects[selectedProjectName]

    /**
     * Idea here is to fill GridColums 4 width regarding Editing or not  
     * @returns isEditing ? (EmptyGridColimn width=4) : (GridColumn width=4 with BUtton and Checkbox)
     */
    const renderWeekRestartColumn = () => {
        if (!isEditing) {
            return (
                <Grid.Column width='4'>
                </Grid.Column>
            )
        } else {
            return (
                <>
                    <Grid.Column width='2'>
                        <Button
                            inverted
                            disabled={!canRestartWeek}
                            size='small'
                            icon='sync alternate'
                            onClick={() => weekRestart(writeDebt)}
                            content='Week Restart'
                        />
                    </Grid.Column>
                    <Grid.Column width='2'>
                        <Form inverted>
                            <Form.Checkbox
                                checked={writeDebt}
                                onChange={() => setWriteDebt(!writeDebt)}
                                label='write debt'
                            />
                        </Form>
                    </Grid.Column>
                </>
            )
        }
    }

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
                    {renderWeekRestartColumn()}
                    <Grid.Column width='4'>
                        <Header
                            inverted
                            color='blue'
                            as='h1'
                            textAlign='center'
                            content='Projects List'
                        />
                    </Grid.Column>
                    {selectedProject && selectedProject.isPomidorable
                        ? <PomidoroTimerComponent
                            workMinutePassed={() => workMinutePassed()}
                            workStateChanged={(newWorkState) => workStateChanged(newWorkState)}
                        />
                        : <NormalTimerComponent
                            workMinutePassed={() => workMinutePassed()}
                            workStateChanged={(newWorkState) => workStateChanged(newWorkState)}
                        />}

                </Grid.Row>
            </Grid>
        </div>
    )
}

export default HeaderComponent