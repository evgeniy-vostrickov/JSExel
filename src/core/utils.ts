/**
* @param {HTMLElementEventMap} eventName
* @return {string}
*/
export function capitalize(eventName: keyof HTMLElementEventMap) {
  return eventName.charAt(0).toUpperCase() + eventName.slice(1)
}
