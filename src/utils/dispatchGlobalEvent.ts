const dispatchGlobalEvent = (
        eventName: string, {
        bubbles = false,
        cancelable = false,
        detail = {}
    } = {}) => {
    let event = null
    if (typeof window.event === 'function') {
        event = new CustomEvent(eventName, {
        bubbles,
        cancelable,
        detail
      });
    } else {
      event = document.createEvent('CustomEvent')
      event.initCustomEvent(eventName, bubbles, cancelable, detail);
    }
  
    window.dispatchEvent(event);

    return event;
}

export default dispatchGlobalEvent;