// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/**
  The global bundle methods. See also: lib/boostrap.rhtml
*/
SC.mixin(/** @scope SC */ {
  
  
  /**
    @property
    @default NO
    @type {Boolean}
    
    If YES, log bundle loading.
  */
  logBundleLoading: NO,
  
  /**
    Returns YES is bundleName is loaded; NO if bundleName is not loaded or
    no information is available.
    
    @param bundleName {String}
    @returns {Boolean}
  */
  bundleIsLoaded: function(bundleName) {
    return tiki.require.ready(bundleName);
  },
  
  /**
    Dynamically load bundleName if not already loaded. Call the target and 
    method with any given arguments.
    
    @param bundleName {String}
    @param target {Function} 
    @param method {Function}
  */
  loadBundle: function(bundleName, target, method) {
    
    console.warn("SC.loadBundle is deprecated.  Use Tiki's require.ensure() instead");
    
    var idx, len;
    if (method === undefined && SC.typeOf(target) === SC.T_FUNCTION) {
      method = target;
      target = null;
    }

    
    var args = SC.A(arguments).slice(3);
    
    if (target && (method===undefined)) {
      method = target;
      target = this; 
    }
    
    var handler = function() {
      
      if (SC.T_STRING === typeof target) {
        target = SC.objectForPropertyPath(target);
      }
      
      if (SC.T_STRING === typeof method) {
        method = SC.objectForPropertyPath(method, target);
      }

      // invoke callback only if it exists...
      if (target && (SC.T_STRING === typeof method)) method = target[method];

      if (!method) throw "could not find callback for load";
      SC.RunLoop.begin();
      method.apply(target, args);
      SC.RunLoop.end();
      
      handler = target = method = null; // cleanup memory
    };
    
    var loader = this;
    tiki.addReadyListener(function() {
      var canonicalId = tiki.canonicalPackageId(bundleName);
      if (!canonicalId) throw "Bundle "+bundleName+" unknown";
      tiki.ensurePackage(canonicalId, function(err) {
        if (err) throw "Could not load bundle "+bundleName+": "+err;
        handler.call(loader);
      });
    });
  }
  
});
