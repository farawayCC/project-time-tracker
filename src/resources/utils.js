export const minutesToHMString = (minutes) => {
    if (minutes === 0) return '0 min'
    var negative = false
    if (minutes < 0) {
        negative = true
        minutes *= -1
    }
    var mins = Number(minutes);
    var h = Math.floor(mins / 60);
    var min = Math.floor(mins % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
    var mDisplay = min > 0 ? min + (min === 1 ? " min" : " mins") : "";
    return negative
        ? '- ' + hDisplay + mDisplay
        : hDisplay + mDisplay;
}