type Listener = () => void;

const listeners = new Set<Listener>();

export function subscribeAuthStore(listener: Listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function notifyAuthStore() {
  for (const listener of listeners) {
    listener();
  }
}

