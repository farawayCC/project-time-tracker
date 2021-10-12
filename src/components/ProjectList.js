import React, { useState, useEffect } from 'react'
import { Button, Grid, Table, Header } from 'semantic-ui-react'
import * as projUtils from '../resources/projectUtils'
import ProjectTableRow from './ProjectTableRow'
import NewProjectTableRow from './NewProjectTableRow'
import Project from '../resources/Project'


const ProjectList = ({ isEditing, rerender, projects, selectedProjectName, selectProject }) => {

    const editingTableRow = (forced) => {
        return (isEditing || forced
            ? <NewProjectTableRow
                addProject={(name, alreadyWorked, totalMinutes) => {
                    projUtils.addProject(name, alreadyWorked, totalMinutes)
                    rerender()
                }} />
            : null
        )
    }

    const renderProjectsTable = () => {
        const projectsCount = Object.keys(projects).length
        if (projectsCount != 0) {
            const internalRenderProjects = () => {
                if (projects) {
                    return Object.keys(projects).map((key, index) => {
                        const project = projects[key]
                        return (
                            <ProjectTableRow
                                key={index}
                                selectProject={(name) => selectProject(name)}
                                isEditing={isEditing}
                                isSelected={selectedProjectName === project.name}
                                project={project}
                                removeProject={(name) => {
                                    projUtils.removeProject(name)
                                    rerender()
                                }}
                                rerender={() => rerender()}
                            />
                        )
                    })
                } else {
                    console.log('Projects are null:', projects)
                }
            }
            return (
                <Table basic='very' unstackable inverted>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>Project Name</Table.HeaderCell>
                            <Table.HeaderCell>Current time</Table.HeaderCell>
                            <Table.HeaderCell>Total time</Table.HeaderCell>
                            {isEditing ? <Table.HeaderCell>Is Pomidorrable</Table.HeaderCell> : null}
                            {isEditing ? <Table.HeaderCell>Delete</Table.HeaderCell> : null}
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
                <Table basic='very' unstackable inverted>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>Project Name</Table.HeaderCell>
                            <Table.HeaderCell>Current time</Table.HeaderCell>
                            <Table.HeaderCell>Total time</Table.HeaderCell>
                            {isEditing ? <Table.HeaderCell>Is Pomidorrable</Table.HeaderCell> : null}
                            {isEditing ? <Table.HeaderCell>Delete</Table.HeaderCell> : null}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <ProjectTableRow
                            selectProject={(name) => selectProject(name)}
                            project={new Project('Example Project name', 4 * 600, 1200)}
                            rerender={() => { }}
                        />
                        {editingTableRow(true)}
                    </Table.Body>
                </Table>
            )
        }
    }

    const componentStyle = {
        width: '100%',
        height: '85vh',
        top: '6em',
        position: 'absolute',
        bottom: '0px',
        overflow: 'auto'
    }

    return (
        <div style={componentStyle}>
            {renderProjectsTable()}
        </div>
    )
}

export default ProjectList