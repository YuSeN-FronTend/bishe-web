function addZero(count:any) {
    return count < 10 ? `0${count}` : count;
}
export function isToday(time:any) {
    const currentDate = new Date(); // 当前日期
    const targetDate = new Date(time * 1000); // 通过时间戳创建 Date 对象
    if(currentDate.getFullYear() === targetDate.getFullYear() &&
    currentDate.getMonth() === targetDate.getMonth() &&
    currentDate.getDate() === targetDate.getDate()) {
        return `${targetDate.getHours()}:${addZero(targetDate.getMinutes())}`
    } else {
        return `${targetDate.getFullYear()}-${addZero(targetDate.getMonth() + 1)}-${addZero(targetDate.getDate())}`
    }
}
