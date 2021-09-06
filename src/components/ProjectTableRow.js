import { Button, Table, Header } from 'semantic-ui-react'
import * as utils from '../resources/utils'

export default (props) => {
    const id = props.name + props.totalMinutes
    const selectedCellStyle = { fontWeight: "bold", color: "black" }
    return (
        <Table.Row positive={props.isSelected}>
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
            <Table.Cell content={props.name} style={props.isSelected ? selectedCellStyle : null} />
            <Table.Cell content={utils.minutesToHMString(props.currentMinutes)} style={props.isSelected ? selectedCellStyle : null} />
            <Table.Cell content={utils.minutesToHMString(props.totalMinutes)} style={props.isSelected ? selectedCellStyle : null} />
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