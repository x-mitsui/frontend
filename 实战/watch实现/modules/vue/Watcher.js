export class Watcher {
  constructor() {
    this.watchers = [];
  }

  addWatcher(vm, watcher, key) {
    this._addWatchProp({
      key,
      fn: watcher[key].bind(vm),
    });

    console.log(this.watchers);
  }

  invoke(key, newValue, oldValue) {
    this.watchers.map((item) => {
      if (item.key === key) {
        item.fn(newValue, oldValue);
      }
    });
  }

  _addWatchProp(watchProp) {
    this.watchers.push(watchProp);
  }
}
