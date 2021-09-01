import React, { useState, useEffect } from 'react'
import HeaderComponent from '../components/Header'
import ProjectList from '../components/ProjectList'
import * as projUtils from '../resources/projectUtils'

const MainPage = () => {
    const [timer, setTimer] = useState(-1)
    const [selectedProject, setSelectedProject] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [projects, setProjects] = useState({})

    const initValues = () => {
        setProjects(projUtils.getProjects())
        setSelectedProject(projUtils.getLastSelectedProject())
    }

    useEffect(() => {
        initValues()

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (timer) clearInterval(timer)

        if (isPlaying) {
            // Turned on
            const isDev = false
            if (selectedProject !== '') {
                const newTimer = setInterval(() => {
                    projUtils.addMinutes(selectedProject, 1)
                    setProjects(projUtils.getProjects())
                }, isDev ? 500 : 60 * 1000)
                setTimer(newTimer)
            }
        }

        return () => clearInterval(timer)
    }, [isPlaying, selectedProject])

    return (
        <div className='App'>
            <HeaderComponent
                isPlaying={isPlaying}
                isEditing={isEditing}
                editingToggled={() => setIsEditing(!isEditing)}
                playingToggled={() => setIsPlaying(!isPlaying)}
            />
            <ProjectList
                projects={projects}
                selectProject={(name) => {
                    setSelectedProject(name)
                    projUtils.setLastSelectedProject(name)
                }}
                selectedProject={selectedProject}
                isEditing={isEditing}
                rerender={() => initValues()}
            />
        </div>
    )
}

export default MainPage