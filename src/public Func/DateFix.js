function formatDate(dateString) {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
  
    const timeDifference = Math.abs(currentDate - inputDate);
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  
    if (minutesAgo < 60) {
      return `${minutesAgo} Minutes Ago`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo} Hours Ago`;
    } else {
      const formattedDate = `${inputDate.getDate()}/${inputDate.getMonth() + 1} ${formatAMPM(
        inputDate
      )}`;
      return formattedDate;
    }
  }
  
  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be displayed as 12
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${hours}:${minutes}${ampm}`;
  }
  

  
export default formatDate;