export default class Project {
    constructor(name, totalMinutes, alreadyWorked) {
        this.name = name
        this.totalMinutes = totalMinutes
        this.currentMinutes = alreadyWorked || 0
        this.debt = 0
        this.isPomidorable = true
    }
}