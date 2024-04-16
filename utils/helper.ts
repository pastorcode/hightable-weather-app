const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours || 12;

    // Pad single digit minutes and seconds with leading zero
    const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const paddedSeconds = seconds < 10 ? '0' + seconds : seconds;

    // Combine hours, minutes, seconds, and AM/PM into the desired format
    const currentTime = hours + ':' + paddedMinutes + ':' + paddedSeconds + ' ' + ampm;

    return currentTime;
}

export {getCurrentTime}