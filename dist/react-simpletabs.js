/*!
 * 
 *  React Simpletabs - Just a simple tabs component built with React
 *  @version v0.8.1
 *  @link https://github.com/pedronauck/react-simpletabs
 *  @license MIT
 *  @author Pedro Nauck (https://github.com/pedronauck)
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactSimpleTabs"] = factory(require("react"));
	else
		root["ReactSimpleTabs"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(2);

	if (true) {
	  __webpack_require__(3);
	}

	var Tabs = React.createClass({
	  displayName: 'Tabs',
	  propTypes: {
	    className: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.string, React.PropTypes.object]),
	    tabActive: React.PropTypes.number,
	    onMount: React.PropTypes.func,
	    onBeforeChange: React.PropTypes.func,
	    onAfterChange: React.PropTypes.func,
	    children: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.element]).isRequired
	  },
	  getDefaultProps: function getDefaultProps() {
	    return { tabActive: 1 };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      tabActive: this.props.tabActive
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var index = this.state.tabActive;
	    var $selectedPanel = this.refs['tab-panel'];
	    var $selectedMenu = this.refs['tab-menu-' + index];

	    if (this.props.onMount) {
	      this.props.onMount(index, $selectedPanel, $selectedMenu);
	    }
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    if (newProps.tabActive && newProps.tabActive !== this.props.tabActive) {
	      this.setState({ tabActive: newProps.tabActive });
	    }
	  },
	  render: function render() {
	    var className = classNames('React-SimpleTabs--tabs', this.props.className);
	    return React.createElement(
	      'div',
	      { className: className },
	      this._getMenuItems(),
	      this._getSelectedPanel()
	    );
	  },
	  setActive: function setActive(index, e) {
	    e.preventDefault();

	    var onAfterChange = this.props.onAfterChange;
	    var onBeforeChange = this.props.onBeforeChange;
	    var $selectedPanel = this.refs['tab-panel'];
	    var $selectedTabMenu = this.refs['tab-menu-' + index];

	    if (onBeforeChange) {
	      var cancel = onBeforeChange(index, $selectedPanel, $selectedTabMenu);
	      if (cancel === false) {
	        return;
	      }
	    }

	    this.setState({ tabActive: index }, function () {
	      if (onAfterChange) {
	        onAfterChange(index, $selectedPanel, $selectedTabMenu);
	      }
	    });
	  },
	  _children: function _children() {
	    if (!this.props.children) {
	      throw new Error('Tabs must contain at least one Tabs.Panel');
	    }

	    return React.Children.toArray(this.props.children);
	  },
	  _getMenuItems: function _getMenuItems() {
	    var _this = this;

	    var $menuItems = this._children().map(function ($panel) {
	      return typeof $panel === 'function' ? $panel() : $panel;
	    }).filter(function ($panel) {
	      return $panel;
	    }).map(function ($panel, index) {
	      var ref = 'tab-menu-' + (index + 1);
	      var title = $panel.props.title;
	      var classes = classNames('React-SimpleTabs--tabs-menu-item', _this.state.tabActive === index + 1 && 'React-SimpleTabs--is-active');

	      return React.createElement(
	        'li',
	        { ref: ref, key: index, className: classes },
	        React.createElement(
	          'a',
	          { onClick: _this.setActive.bind(_this, index + 1) },
	          title
	        )
	      );
	    });

	    return React.createElement(
	      'nav',
	      { className: 'React-SimpleTabs--tabs-navigation' },
	      React.createElement(
	        'ul',
	        { className: 'React-SimpleTabs--tabs-menu' },
	        $menuItems
	      )
	    );
	  },
	  _getSelectedPanel: function _getSelectedPanel() {
	    var index = this.state.tabActive - 1;
	    var $panel = this._children()[index];

	    return React.createElement(
	      'article',
	      { ref: 'tab-panel', className: 'React-SimpleTabs--tab-panel' },
	      $panel
	    );
	  }
	});

	Tabs.Panel = React.createClass({
	  displayName: 'Panel',
	  propTypes: {
	    title: React.PropTypes.string.isRequired,
	    children: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.element]).isRequired
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      this.props.children
	    );
	  }
	});

	module.exports = Tabs;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;