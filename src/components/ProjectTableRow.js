import { Button, Table, Header } from 'semantic-ui-react'
import * as utils from '../resources/utils'

export default (props) => {
    const id = props.name + props.totalMinutes
    return (
        <Table.Row>
            <Table.Cell style={{ paddingLeft: '1em' }}>
                {props.isSelected
                    ? <Header color='green' content='Selected' />
                    : <Button
                        basic
                        size='small'
                        color='grey'
                        floated='left'
                        content='Select'
                        onClick={() => props.selectProject(props.name)}
                    />
                }
            </Table.Cell>
            <Table.Cell>{props.name}</Table.Cell>
            <Table.Cell>{utils.minutesToHMString(props.currentMinutes)}</Table.Cell>
            <Table.Cell>{utils.minutesToHMString(props.totalMinutes)}</Table.Cell>
            {props.isEditing
                ? <Table.Cell style={{ padding: '1em' }}>
                    <Button
                        inverted
                        size='tiny'
                        color='red'
                        content='Delete'
                        onClick={() => props.removeProject(props.name)}
                    />
                </Table.Cell>
                : <Table.Cell></Table.Cell>
            }
        </Table.Row >
    )
}