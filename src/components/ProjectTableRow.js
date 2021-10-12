import React, { useState } from 'react'
import { Button, Table, Header, Checkbox, Form } from 'semantic-ui-react'
import * as utils from '../resources/utils'
import * as projUtils from '../resources/projectUtils'

export default ({ project, isSelected, selectProject, isEditing, removeProject, rerender }) => {
    const [isPomidorable, setIsPomidorable] = useState(project.isPomidorable)
    const selectedCellStyle = { fontWeight: "bold", color: "black" }

    return (
        <Table.Row active={isSelected}>
            <Table.Cell style={{ paddingLeft: '1em' }}>
                {isSelected
                    ? <Header color='green' content='Selected' inverted />
                    : <Button
                        basic
                        size='small'
                        color='grey'
                        floated='left'
                        content='Select'
                        onClick={() => selectProject(project.name)}
                    />
                }
            </Table.Cell>
            <Table.Cell content={project.name} style={isSelected ? selectedCellStyle : null} />
            <Table.Cell
                content={utils.minutesToHMString(project.currentMinutes - project.debt)}
                style={isSelected ? selectedCellStyle : null}
            />
            <Table.Cell
                content={utils.minutesToHMString(project.totalMinutes)}
                style={isSelected ? selectedCellStyle : null}
            />
            {isEditing
                ? <Table.Cell style={{ padding: '1em' }}>
                    <Form inverted={!isSelected}>
                        <Form.Checkbox
                            checked={isPomidorable}
                            onChange={() => {
                                setIsPomidorable(!isPomidorable)
                                projUtils.setIsPomidorable(project.name, !isPomidorable)
                                rerender()
                            }}
                            label='Is pomidorable'
                        />
                    </Form>
                </Table.Cell>
                : <Table.Cell></Table.Cell>
            }
            {isEditing
                ? <Table.Cell style={{ padding: '1em' }}>
                    <Button
                        inverted
                        size='tiny'
                        color='red'
                        content='Delete'
                        onClick={() => removeProject(project.name)}
                    />
                </Table.Cell>
                : <Table.Cell></Table.Cell>
            }
        </Table.Row >
    )
}