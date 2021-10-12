import Project from './Project'
import moment from 'moment'

export const addMinutes = (projectName, minutesCount) => {
    const prevProjects = getProjects()
    if (prevProjects[projectName]) {
        prevProjects[projectName].currentMinutes += minutesCount
        saveChanges(prevProjects)
        return true
    } else {
        return false
    }
}

export const canRestartWeek = () => {
    const lastRestart = localStorage.getItem('lastRestart')
    if (!lastRestart) return true
    var days = moment().diff(lastRestart, "days");
    return days > 5
}

export const weekRestart = (writeDebt) => {
    const prevProjects = getProjects()
    for (const [key, project] of Object.entries(prevProjects)) {
        if (writeDebt)
            project.debt += project.totalMinutes - project.currentMinutes
        project.currentMinutes = 0
    }
    saveChanges(prevProjects)
    localStorage.setItem('lastRestart', moment())
}

export const addProject = (projectName, totalMinutes, alreadyWorked) => {
    const prevProjects = getProjects()
    if (!prevProjects[projectName]) {
        prevProjects[projectName] =
            new Project(projectName, totalMinutes, alreadyWorked || 0)
        saveChanges(prevProjects)
    }
}

export const removeProject = (projectName) => {
    const prevProjects = getProjects()
    prevProjects[projectName] = undefined
    saveChanges(prevProjects)
}

export const changeProjectName = (oldProjectName, newProjectName) => {
    const prevProjects = getProjects()
    const project = prevProjects[oldProjectName]
    project.name = newProjectName
    prevProjects[newProjectName] = project
    prevProjects[oldProjectName] = undefined
    saveChanges(prevProjects)
}

export const getProjects = () => {
    return JSON.parse(localStorage.getItem('projects')) || {}
}

const saveChanges = (prevProjects) => {
    localStorage.setItem('projects', JSON.stringify(prevProjects))
}

export const getLastSelectedProject = () => {
    var result = localStorage.getItem('lastSelectedProject') || ''
    const projects = getProjects()
    //if the selected project exists no more
    if (!projects[result])
        result = ''

    if (result === '') {
        // Select the least developed project
        const projectsCount = Object.keys(projects).length
        if (projectsCount > 1) {
            var leastDeveloptProj = new Project('-1', 1, 1)
            Object.keys(projects).map((key, index) => {
                const proj = projects[key]
                const developLevel = proj.currentMinutes / proj.totalMinutes
                const currentLeaderLevel =
                    leastDeveloptProj.currentMinutes / leastDeveloptProj.totalMinutes
                if (developLevel < currentLeaderLevel)
                    leastDeveloptProj = proj
            })
            result = leastDeveloptProj.name
        } else if (projectsCount == 1) {
            for (var key in projects)
                result = projects[key].name
        }
    }
    return result
}

export const setLastSelectedProject = (projectName) =>
    localStorage.setItem('lastSelectedProject', projectName)

export const setIsPomidorable = (projectName, isPomidorable) => {
    const prevProjects = getProjects()
    const project = prevProjects[projectName]
    project.isPomidorable = isPomidorable
    prevProjects[projectName] = project
    saveChanges(prevProjects)
}