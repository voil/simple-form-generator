/**
 * Class for observer events form.
 */
export class ObserverEventsForm {
  /**
   * @var Object
   * Map for notifications events.
   */
  __observerMapOfNotifications = {};

  /**
   * Public method to attach event for notify.
   * @param String nameOfNotify
   * @param Function event
   */
  attachEvent(nameOfNotify = "", eventToFire = () => {}) {
    this.__observerMapOfNotifications[nameOfNotify] = eventToFire;
  }

  /**
   * Public method to check is attached event.
   * @param String nameOfEvent
   * @return Boolean
   */
  getAttachedEvent(nameOfEvent = "") {
    return this.__observerMapOfNotifications[nameOfEvent] || false;
  }

  /**
   * Public method for rise event.
   * @param String nameOfEvent
   * @return Function
   */
  riseEvent(nameOfEvent = "") {
    return this.__observerMapOfNotifications[nameOfEvent] || (() => {});
  }
}

window.ObserverEventsForm =
  window.ObserverEventsForm || new ObserverEventsForm();
