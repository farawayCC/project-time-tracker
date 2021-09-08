import { Button, Table, Header } from 'semantic-ui-react'
import * as utils from '../resources/utils'

export default (props) => {
    const id = props.project.name + props.project.totalMinutes
    const selectedCellStyle = { fontWeight: "bold", color: "black" }
    return (
        <Table.Row active={props.isSelected}>
            <Table.Cell style={{ paddingLeft: '1em' }}>
                {props.isSelected
                    ? <Header color='green' content='Selected' inver />
                    : <Button
                        basic
                        size='small'
                        color='grey'
                        floated='left'
                        content='Select'
                        onClick={() => props.selectProject(props.project.name)}
                    />
                }
            </Table.Cell>
            <Table.Cell content={props.project.name} style={props.isSelected ? selectedCellStyle : null} />
            <Table.Cell
                content={utils.minutesToHMString(props.project.currentMinutes - props.project.debt)}
                style={props.isSelected ? selectedCellStyle : null}
            />
            <Table.Cell
                content={utils.minutesToHMString(props.project.totalMinutes)}
                style={props.isSelected ? selectedCellStyle : null}
            />
            {props.isEditing
                ? <Table.Cell style={{ padding: '1em' }}>
                    <Button
                        inverted
                        size='tiny'
                        color='red'
                        content='Delete'
                        onClick={() => props.removeProject(props.project.name)}
                    />
                </Table.Cell>
                : <Table.Cell></Table.Cell>
            }
        </Table.Row >
    )
}