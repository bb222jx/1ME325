//--------------------------------------------------------------------------
// Public class
//--------------------------------------------------------------------------

/**
 *  ...
 *
 *  @version    1.0
 *  @copyright  Copyright (c) 2009-2016.
 *  @license    Creative Commons (BY-NC-SA)
 *  @since      Sep 10, 2016
 *  @author     Henrik Andersen <henrik.andersen@lnu.se>
 */
se.lnu.drag.system.Main = (function() {

    //----------------------------------------------------------------------
    // Strict mode
    //----------------------------------------------------------------------

    "use strict";

    //----------------------------------------------------------------------
    // Public properties
    //----------------------------------------------------------------------
    
    /**
     *  ...
     *
     *  @type {Array}
     */
    this.position = new se.lnu.drag.geom.Point();

    //----------------------------------------------------------------------
    // Internal properties
    //----------------------------------------------------------------------
    
    /**
     *  ...
     *
     *  @type {Array}
     */
    this.m_elements = [];

    //----------------------------------------------------------------------
    // Bootstrap
    //----------------------------------------------------------------------

    this.m_initPosition();
});

//--------------------------------------------------------------------------
// Public prototype methods
//--------------------------------------------------------------------------

/**
 *  ...
 *
 *  @return {undefined}
 */
se.lnu.drag.system.Main.prototype.add = function(element, hotspot) {
    var d = new se.lnu.drag.object.Draggable(element, hotspot);
    this.m_elements.push(d);

    return d;
};

/**
 *  ...
 *
 *  @return {undefined}
 */
se.lnu.drag.system.Main.prototype.remove = function(element, hotspot) {
    hotspot = hotspot || element;
    if (element != undefined)  {
        for (var i = 0; i < this.m_elements.length; i++) {
            if (this.m_elements[i].m_element == element && this.m_elements[i].m_hotspot == hotspot) {
                this.m_elements[i].dispose();
                this.m_elements.splice(i, 1);
                return true;
            }
        }
    }

    return false;
};

/**
 *  ...
 *
 *  @return {undefined}
 */
se.lnu.drag.system.Main.prototype.removeAll = function() {
    while (this.m_elements.length > 0) {
        this.m_elements[0].dispose();
        this.m_elements.splice(0, 1);
    }
};

//--------------------------------------------------------------------------
// Internal prototype methods
//--------------------------------------------------------------------------

/**
 *  ...
 *
 *  @return {undefined}
 */
se.lnu.drag.system.Main.prototype.m_init = function() {
    this.m_initPosition();
};

/**
 *  ...
 *
 *  @return {undefined}
 */
se.lnu.drag.system.Main.prototype.m_initPosition = function() {
    var _this = this;
    se.lnu.drag.event.Event.addEventListener(document, "mousemove", function(event) {
    	_this.m_updatePosition(event);
    });
};

/**
 *  ...
 *
 *  @return {undefined}
 */
se.lnu.drag.system.Main.prototype.m_updatePosition = function(event) {
	if (event == undefined) return;
    this.position.x = event.clientX;
    this.position.y = event.clientY;

    for (var i = 0; i < this.m_elements.length; i++) {
        var d = this.m_elements[i];
        if (d.active === true) {
            d.setPosition(this.position);
        }
    }
};