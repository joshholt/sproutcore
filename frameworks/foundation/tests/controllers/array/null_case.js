// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

"import package core_test";
var SC = require('index'); // load sproutcore/foundation

var content, controller, extra;

var TestObject = SC.Object.extend({
  title: "test",  
  toString: function() { return "TestObject(%@)".fmt(this.get("title")); }
});


// ..........................................................
// NULL VALUE
// 

module("SC.ArrayController - null_case", {
  setup: function() {
    content = null;
    controller = SC.ArrayController.create({ content: content });
    extra = TestObject.create({ title: "FOO" });
  },
  
  teardown: function() {
    controller.destroy();
  }
});

test("state properties", function() {
  equals(controller.get("hasContent"), false, 'c.hasContent');
  equals(controller.get("canRemoveContent"), false, "c.canRemoveContent");
  equals(controller.get("canReorderContent"), false, "c.canReorderContent");
  equals(controller.get("canAddContent"), false, "c.canAddContent");
});

test("addObject", function() {
  raises(function() {
    controller.addObject(extra);
  }, Error, "controller.addObject should throw exception");
});

test("removeObject", function() {
  raises(function() {
    controller.removeObject(extra);
  }, Error, "controller.addObject should throw exception");
});

test("basic array operations", function() {
  equals(controller.get("length"), 0, 'length should be empty');
  equals(controller.objectAt(0), undefined, "objectAt() should return undefined");
  
  raises(function() {
    controller.replace(0,1,[extra]);
  }, Error, 'replace() should throw an error since it is not editable');
});

test("arrangedObjects", function() {
  equals(controller.get("arrangedObjects"), controller, 'c.arrangedObjects should return receiver');
});

plan.run();
