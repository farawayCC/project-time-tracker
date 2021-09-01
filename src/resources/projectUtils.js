import Project from './Project'


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

export const weekRestart = () => {
    const prevProjects = getProjects()
    for (const [key, project] of Object.entries(prevProjects)) {
        const debt = project.totalMinutes - project.currentMinutes
        project.debt += debt
        project.currentMinutes = 0
    }
    saveChanges(prevProjects)
}

export const addProject = (projectName, totalMinutes, alreadyWorked) => {
    const prevProjects = getProjects()
    if (!prevProjects[projectName]) {
        prevProjects[projectName] = new Project(projectName, totalMinutes, alreadyWorked || 0)
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

const compareProjects = (proj1, proj2) => {
    const obj1 = proj1[key].currentMinutes / proj1[key].totalMinutes
    const obj2 = proj2[key].currentMinutes / proj2[key].totalMinutes

    if (obj1 < obj2)
        return -1

    if (obj1 > obj2)
        return 1

    return 0
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
                const currentLeaderLevel = leastDeveloptProj.currentMinutes / leastDeveloptProj.totalMinutes
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

export const setLastSelectedProject = (projectName) => localStorage.setItem('lastSelectedProject', projectName)
