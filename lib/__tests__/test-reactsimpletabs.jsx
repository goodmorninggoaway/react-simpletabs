'use strict';

/**
 * Verifies if a given rendered component
 * actually contains all of the props exposed on
 * PropTypes, which seems to be a best pratice.
 * @param  {ReactComponent} renderedComponent
 * @return {bool}
 */
function usedPropsAreInPropTypes (renderedComponent) {
  var propTypes = Object.keys(renderedComponent.constructor.propTypes);

  return !Object.keys(renderedComponent.props).filter(function (elem) {
    return !~propTypes.indexOf(elem);
  }).length;
};

describe('Tabs', function() {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var TU = require('react-addons-test-utils');
  var Tabs = require('../react-simpletabs.jsx');

  it('should be sane', function() {
    expect(Tabs).toBeDefined();
  });

  it('should throw if no children panels passed to Tabs', function() {
    expect(function () {
      TU.renderIntoDocument(<Tabs></Tabs>);
    }).throws;
  });

  it('be renderable if panels passed to tabs', function() {
    var instance = TU.renderIntoDocument(
      <Tabs><Tabs.Panel></Tabs.Panel></Tabs>
    );

    expect(TU.isCompositeComponent(instance)).toBe(true);
  });

  it('should instantiate propTypes correctly', function() {
    var instance = TU.renderIntoDocument(
      <Tabs><Tabs.Panel></Tabs.Panel></Tabs>
    );

    expect(!!usedPropsAreInPropTypes(instance)).toBe(true);
  });

  describe('when passed className as props', function () {
    it('should render extra className correctly', function() {
      var instance = TU.renderIntoDocument(
        <Tabs className="extra-class"><Tabs.Panel></Tabs.Panel></Tabs>
      );

      expect(function () {
        TU.findRenderedDOMComponentWithClass(instance, 'React-SimpleTabs--tabs extra-class');
      }).not.toThrow();
    });

    it('should render className as object correctly', function() {
      var instance = TU.renderIntoDocument(
        <Tabs className={{ tabs2: true }}><Tabs.Panel></Tabs.Panel></Tabs>
      );

      expect(function () {
        TU.findRenderedDOMComponentWithClass(instance, 'tabs3');
      }).toThrow();

      expect(function () {
        TU.findRenderedDOMComponentWithClass(instance, 'React-SimpleTabs--tabs tabs2');
      }).not.toThrow();
    });

    it('should render className as array correctly', function() {
      var instance = TU.renderIntoDocument(
        <Tabs className={['extra-class']}><Tabs.Panel></Tabs.Panel></Tabs>
      );

      expect(function () {
        TU.findRenderedDOMComponentWithClass(instance, 'React-SimpleTabs--tabs extra-class');
      }).not.toThrow();

    });
  });

  describe('regarding its functionality,', function() {
    it('show only one panel at a time, multiple tabs', function() {
      var instance = TU.renderIntoDocument(
        <Tabs>
          <Tabs.Panel><h1>1</h1></Tabs.Panel>
          <Tabs.Panel><h1>2</h1></Tabs.Panel>
        </Tabs>
      );

      expect(TU.scryRenderedDOMComponentsWithTag(instance, 'li').length).toEqual(2);
      expect(function () {
        TU.findRenderedDOMComponentWithClass(instance, 'React-SimpleTabs--is-active');
      }).not.toThrow();
    });

    it('show the first panel if no active passed', function() {
      var instance = TU.renderIntoDocument(
        <Tabs>
          <Tabs.Panel title='item1'>content1</Tabs.Panel>
          <Tabs.Panel title='item2'>content2</Tabs.Panel>
        </Tabs>
      );

      var menuItem = TU.findRenderedDOMComponentWithClass(instance, 'React-SimpleTabs--tabs-menu-item React-SimpleTabs--is-active');
      var panel = TU.findRenderedDOMComponentWithClass(instance, 'React-SimpleTabs--tab-panel');

      expect(panel.children[0].innerHTML).toEqual('content1');
      expect(menuItem.children[0].innerHTML).toEqual('item1');
    });

    it('show the second panel if tabActive == 2', function() {
      var instance = TU.renderIntoDocument(
        <Tabs tabActive={2}>
          <Tabs.Panel title='item1'>content1</Tabs.Panel>
          <Tabs.Panel title='item2'>content2</Tabs.Panel>
        </Tabs>
      );

      var menuItem = TU.findRenderedDOMComponentWithClass(instance, 'React-SimpleTabs--tabs-menu-item React-SimpleTabs--is-active');
      var panel = TU.findRenderedDOMComponentWithClass(instance, 'React-SimpleTabs--tab-panel');

      expect(panel.children[0].innerHTML).toEqual('content2');
      expect(menuItem.children[0].innerHTML).toEqual('item2');
    });

    it('changes the tabActive if it receives new props', function(){
      var find = TU.findRenderedDOMComponentWithClass;
      var instance = ReactDOM.render(
        <Tabs tabActive={2}>
          <Tabs.Panel title='item1'>content1</Tabs.Panel>
          <Tabs.Panel title='item2'>content2</Tabs.Panel>
        </Tabs>, document.body
      );
      var menuItem = find(instance, 'React-SimpleTabs--tabs-menu-item React-SimpleTabs--is-active');
      var panel = find(instance, 'React-SimpleTabs--tab-panel');
      expect(panel.children[0].innerHTML).toEqual('content2');
      expect(menuItem.children[0].innerHTML).toEqual('item2');
      instance = ReactDOM.render(
        <Tabs tabActive={1}>
          <Tabs.Panel title='item1'>content1</Tabs.Panel>
          <Tabs.Panel title='item2'>content2</Tabs.Panel>
        </Tabs>, document.body
      );
      menuItem = find(instance, 'React-SimpleTabs--tabs-menu-item React-SimpleTabs--is-active');
      panel = find(instance, 'React-SimpleTabs--tab-panel');
      expect(panel.children[0].innerHTML).toEqual('content1');
      expect(menuItem.children[0].innerHTML).toEqual('item1');
    });

    it('Renders Menu content after the tabs', function(){
      var find = TU.findRenderedDOMComponentWithClass;
      var instance = ReactDOM.render(
        <Tabs tabActive={2}>
          <Tabs.Panel title='item1'>content1</Tabs.Panel>
          <Tabs.Panel title='item2'>content2</Tabs.Panel>
          <Tabs.Menu>
            <div className="boomboxer">Tiger</div>
          </Tabs.Menu>
        </Tabs>, document.body
      );
      var menuItem = find(instance, 'boomboxer');
      expect(menuItem.innerHTML).toEqual('Tiger');
    });

    it('Renders FaaC in Menu after the tabs, passing current tab index', function(){
      var find = TU.findRenderedDOMComponentWithClass;
      var instance = ReactDOM.render(
        <Tabs tabActive={2}>
          <Tabs.Panel title='item1'>content1</Tabs.Panel>
          <Tabs.Panel title='item2'>content2</Tabs.Panel>
          <Tabs.Menu>
            {opts => <div className="boomboxer">{opts.tabActive}</div>}
          </Tabs.Menu>
        </Tabs>, document.body
      );

      var menuItem = find(instance, 'boomboxer');
      expect(menuItem.innerHTML).toEqual('2');
    });
  });

  describe('onBeforeChange', function(){
    var sim = TU.Simulate;
    var scryClass = TU.scryRenderedDOMComponentsWithClass;
    var currentPanelText = function(comp){
      return scryClass(comp, 'React-SimpleTabs--tab-panel')[0].textContent;
    };

    it('calls the function and then changes the tab', function(){
      var indexes = [];
      var spy = function(i){ indexes.push(i) };
      var c = TU.renderIntoDocument(
        <Tabs onBeforeChange={spy}>
          <Tabs.Panel title='item1'>content1</Tabs.Panel>
          <Tabs.Panel title='item2'>content2</Tabs.Panel>
        </Tabs>
      );
      var tabsClickable = scryClass(c, 'React-SimpleTabs--tabs-menu-item').map(function(li){
        return li.firstChild; //anchor with the click handler
      });
      sim.click(tabsClickable[1]);
      expect(currentPanelText(c)).toEqual('content2');
      sim.click(tabsClickable[1]);
      expect(currentPanelText(c)).toEqual('content2');
      sim.click(tabsClickable[0]);
      expect(currentPanelText(c)).toEqual('content1');
      expect(indexes).toEqual([2,2,1]);
    });

    it('cancels the click by returning false', function(){
      var cancel = function(){return false};
      var c = TU.renderIntoDocument(
        <Tabs tabActive={2} onBeforeChange={cancel}>
          <Tabs.Panel title='item1'>content1</Tabs.Panel>
          <Tabs.Panel title='item2'>content2</Tabs.Panel>
        </Tabs>
      );
      var tabsClickable = scryClass(c, 'React-SimpleTabs--tabs-menu-item').map(function(li){
        return li.firstChild; //anchor with the click handler
      });
      expect(currentPanelText(c)).toEqual('content2');
      sim.click(tabsClickable[0]);
      expect(currentPanelText(c)).toEqual('content2');
    });
  });
});
