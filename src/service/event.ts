// type any is used to avoid type error
export function subscribe(eventName: string, listener: any) {
  document.addEventListener(eventName, listener);
}

export function unsubscribe(eventName: string, listener: any) {
  document.removeEventListener(eventName, listener);
}

export function publish(eventName: string, data: any) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}
