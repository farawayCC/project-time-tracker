import React, { useState, useEffect } from 'react'
import { Button, Grid, Header } from 'semantic-ui-react'

const HeaderComponent = (props) => {


    return (
        <div id='header' style={{ padding: '.7em' }}>
            <Grid columns={3} >
                <Grid.Row>
                    <Grid.Column width={5}>
                        <Button
                            basic
                            size='big'
                            onClick={() => props.editingToggled()}
                            content={props.isEditing ? 'Done Editing' : 'Edit'}
                        />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Header color='blue' as='h1' textAlign='center'>Projects List</Header>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Button
                            floated='right'
                            size='big'
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