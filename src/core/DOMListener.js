import {capitalize} from '@core/utils';

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(
            `Method ${method} isn't implemented in ${this.name || ''} Component`
        );
      }
      this[method] = this[method].bind(this);
      // The same as addEventListener
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      console.log('removeDOM', method);
      this.$root.off(listener, this[method]);
    });
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
