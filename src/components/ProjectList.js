import React, { useState, useEffect } from 'react'
import { Button, Grid, Table, Header } from 'semantic-ui-react'
import * as projUtils from '../resources/projectUtils'
import ProjectTableRow from './ProjectTableRow'
import NewProjectTableRow from './NewProjectTableRow'
import Project from '../resources/Project'


const ProjectList = (props) => {

    const editingTableRow = (forced) => {
        return (props.isEditing || forced
            ? <NewProjectTableRow
                addProject={(name, alreadyWorked, totalMinutes) => {
                    projUtils.addProject(name, alreadyWorked, totalMinutes)
                    props.rerender()
                }} />
            : null
        )
    }

    const renderProjectsTable = () => {
        const projectsCount = Object.keys(props.projects).length
        if (projectsCount != 0) {
            const internalRenderProjects = () => {
                if (props.projects) {
                    return Object.keys(props.projects).map((key, index) => {
                        const project = props.projects[key]
                        return (
                            <ProjectTableRow
                                key={index}
                                selectProject={(name) => props.selectProject(name)}
                                isEditing={props.isEditing}
                                isSelected={props.selectedProject === project.name}
                                project={project}
                                removeProject={(name) => {
                                    projUtils.removeProject(name)
                                    props.rerender()
                                }}
                            />
                        )
                    })
                } else {
                    console.log('Projects are null:', props.projects)
                }
            }
            return (
                <Table basic='very' unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>ProjectName</Table.HeaderCell>
                            <Table.HeaderCell>Current time</Table.HeaderCell>
                            <Table.HeaderCell>Total time</Table.HeaderCell>
                            {props.isEditing ? <Table.HeaderCell>Delete</Table.HeaderCell> : null}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {internalRenderProjects()}
                        {editingTableRow()}
                    </Table.Body>
                </Table >
            )
        } else {
            return (
                <Table basic='very' unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>ProjectName</Table.HeaderCell>
                            <Table.HeaderCell>Current time</Table.HeaderCell>
                            <Table.HeaderCell>Total time</Table.HeaderCell>
                            {props.isEditing ? <Table.HeaderCell>Delete</Table.HeaderCell> : null}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <ProjectTableRow
                            selectProject={(name) => props.selectProject(name)}
                            project={new Project('Example Project name', 4 * 600, 1200)}
                        />
                        {editingTableRow(true)}
                    </Table.Body>
                </Table>
            )
        }
    }

    return (
        <div>
            {renderProjectsTable()}
        </div>
    )
}

export default ProjectList