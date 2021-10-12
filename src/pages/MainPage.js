import React, { useState, useEffect } from 'react'
import HeaderComponent from '../components/Header'
import ProjectList from '../components/ProjectList'
import * as projUtils from '../resources/projectUtils'

const MainPage = () => {
    const [selectedProjectName, setSelectedProject] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [projects, setProjects] = useState({})
    const [appBackgroundColor, setAppBackgroundColor] = useState('#000022')

    const initValues = () => {
        setProjects(projUtils.getProjects())
        setSelectedProject(projUtils.getLastSelectedProject())
    }

    useEffect(() => {
        initValues()
    }, [])

    const recordWorkMinute = () => {
        projUtils.addMinutes(selectedProjectName, 1)
        setProjects(projUtils.getProjects())
    }

    const setupBackgroundColor = (newWorkState) => {
        switch (newWorkState) {
            case 'work':
                setAppBackgroundColor('#0C1B33')
                break;
            case 'rest':
                setAppBackgroundColor('#005E7C')
                break;
            default:
                setAppBackgroundColor('#0C1B33') //000022
                break;
        }
    }

    return (
        <div className='App' style={{ background: appBackgroundColor }} >
            <HeaderComponent
                projects={projects}
                selectedProjectName={selectedProjectName}
                isEditing={isEditing}
                editingToggled={() => setIsEditing(!isEditing)}
                weekRestart={(writeDebt) => {
                    projUtils.weekRestart(writeDebt)
                    initValues()
                }}
                workMinutePassed={() => recordWorkMinute()}
                workStateChanged={(newWorkState) => setupBackgroundColor(newWorkState)}
            />
            <ProjectList
                projects={projects}
                selectProject={(name) => {
                    setSelectedProject(name)
                    projUtils.setLastSelectedProject(name)
                }}
                selectedProjectName={selectedProjectName}
                isEditing={isEditing}
                rerender={() => initValues()}
            />
        </div>
    )
}

export default MainPage