'use strict';

var Tabs = ReactSimpleTabs;
var App = React.createClass({
  displayName: 'App',

  onMount: function onMount(selectedIndex, $selectedPanel, $selectedTabMenu) {
    console.log('on mount, showing tab ' + selectedIndex);
  },
  onBeforeChange: function onBeforeChange(selectedIndex, $selectedPanel, $selectedTabMenu) {
    console.log('before the tab ' + selectedIndex);
  },
  onAfterChange: function onAfterChange(selectedIndex, $selectedPanel, $selectedTabMenu) {
    console.log('after the tab ' + selectedIndex);
  },
  render: function render() {
    return React.createElement(
      Tabs,
      { tabActive: 2, onBeforeChange: this.onBeforeChange, onAfterChange: this.onAfterChange, onMount: this.onMount },
      React.createElement(
        Tabs.Panel,
        { title: 'Tab #1' },
        React.createElement(
          'h2',
          null,
          'Content #1'
        )
      ),
      React.createElement(
        Tabs.Panel,
        { title: 'Tab #2' },
        React.createElement(
          'h2',
          null,
          'Content #2'
        )
      ),
      React.createElement(
        Tabs.Panel,
        { title: 'Tab #3' },
        React.createElement(
          'h2',
          null,
          'Content #3'
        )
      ),
      React.createElement(
        Tabs.Menu,
        null,
        React.createElement(
          'button',
          null,
          'Search'
        )
      ),
      React.createElement(
        Tabs.Menu,
        null,
        function (opts) {
          return React.createElement(
            'div',
            null,
            'Active Tab is ',
            opts.tabActive
          );
        }
      )
    );
  }
});

ReactDOM.render(React.createElement(App, null), document.getElementById('tabs'));
