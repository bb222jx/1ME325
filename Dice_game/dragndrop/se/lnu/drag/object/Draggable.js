//--------------------------------------------------------------------------
// Strict mode
//--------------------------------------------------------------------------

"use strict";

//--------------------------------------------------------------------------
// Public class
//--------------------------------------------------------------------------

/**
 *  Manages one or more DOM elements in order to make them draggable
 *
 *  @version    1.0
 *  @copyright  Copyright (c) 2009-2016.
 *  @license    Creative Commons (BY-NC-SA)
 *  @since      Sep 10, 2016
 *  @author     Henrik Andersen <henrik.andersen@lnu.se>
 */
se.lnu.drag.object.Draggable = (function(element, hotspot) {

	//----------------------------------------------------------------------
    // Public properties
    //----------------------------------------------------------------------

    /**
     *  Whether someone is dragging the object or not
     *
     *  @type {Boolean}
     */
	this.active = false;

    //----------------------------------------------------------------------
    // Internal properties
    //----------------------------------------------------------------------

    /**
     *  Reference to the element which is draggable
     *
     *  @type {DOMElement}
     */
    this.m_element = element || null;

    /**
     *  Reference to the element that enables drag-and-drop functionality
     *
     *  @type {DOMElement}
     */
    this.m_hotspot = hotspot || this.m_element;

    /**
     *  Represents the object's original position
     *
     *  @type {se.lnu.drag.geom.Point}
     */
    this.m_origin = new se.lnu.drag.geom.Point();

    /**
     *  Represents the offset that exists between the mouse pointer 
     *  and the object
     *
     *  @type {se.lnu.drag.geom.Point}
     */
    this.m_offset = new se.lnu.drag.geom.Point();

    //----------------------------------------------------------------------
    // Public instance methods
    //----------------------------------------------------------------------

    /**
     *  Activated when the drag-and-drop functionality begins. Overwrite to 
     *  create own functionality
     *
     *  @return {undefined}
     */
    this.onDrag = function(event) {
        this.m_element.style.opacity = 0.8;
        this.m_element.style.zIndex = Math.floor(new Date().getTime()/1000);
        this.m_element.style.cursor = "move";
    }

    /**
     *  Activated when the element moves
     *
     *  @return {undefined}
     */
    this.onMove = function(draggable, oldPosition) {
        //@NOTE: OVERRIDE
    }

    /**
     *  Activated when the drag-and-drop functionality ends. Overwrite to 
     *  create own functionality
     *
     *  @return {undefined}
     */
    this.onDrop = function(event) {
        this.m_element.style.opacity = 1.0;
        this.m_element.style.cursor = "auto";
    }

    //----------------------------------------------------------------------
    // Bootstrap
    //----------------------------------------------------------------------

    /**
	 *  Enables method acting as a (secondary) constructor
	 */
    this.m_init();
});

//--------------------------------------------------------------------------
// Public prototype methods
//--------------------------------------------------------------------------

/**
 *  Destroys the object and frees obtained memory
 *
 *  @return {undefined}
 */
se.lnu.drag.object.Draggable.prototype.dispose = function() {
    //@NOTE: HACK SOLUTION - LACK OF PROPER EVENT SYSTEM
    if (this.m_hotspot != undefined) {
        var clone = this.m_hotspot.cloneNode(true);
        this.m_hotspot.parentNode.replaceChild(clone, this.m_hotspot);
    }
};

/**
 *  Calculates and sets the element's current position
 *
 *  @param {se.lnu.drag.geom.Point} Desired position of the element
 *
 *  @return {undefined}
 */
se.lnu.drag.object.Draggable.prototype.setPosition = function(position) {
    if (this.m_element == null) return;
    this.m_element.style.left  = ((this.m_offset.x + position.x) - this.m_origin.x) + "px";
    this.m_element.style.top   = ((this.m_offset.y + position.y) - this.m_origin.y) + "px";
    if (typeof this.onMove == 'function') this.onMove(this);
};

//--------------------------------------------------------------------------
// Internal prototype methods
//--------------------------------------------------------------------------

/**
 *  Secondary constructor method
 *
 *  @return {undefined}
 */
se.lnu.drag.object.Draggable.prototype.m_init = function() {
	this.m_initEvent();
};

/**
 *  Creates necessary event listeners
 *
 *  @return {undefined}
 */
se.lnu.drag.object.Draggable.prototype.m_initEvent = function() {
	var that = this;
	se.lnu.drag.event.Event.addEventListener(this.m_hotspot, "mousedown", function(event){that.m_onMouseDown(event)});
	se.lnu.drag.event.Event.addEventListener(this.m_hotspot, "mouseup",   function(event){that.m_onMouseUp(event)});
};

/**
 *  Activated at the start of the drag-and-drop functionality
 *
 *  @param {MouseEvent} ...
 *
 *  @return {undefined}
 */
se.lnu.drag.object.Draggable.prototype.m_onMouseDown = function(event) {
	event.preventDefault ? event.preventDefault() : (event.returnValue = false);
	this.active = true;
	this.m_origin.x = event.clientX;
	this.m_origin.y = event.clientY;
	this.m_offset.x = parseInt(this.m_element.style.left) || 0;
	this.m_offset.y = parseInt(this.m_element.style.top)  || 0;
	if (typeof this.onDrag == 'function') this.onDrag(event);
};

/**
 *  Activated at the end of the drag-and-drop functionality
 *
 *  @param {MouseEvent} ...
 *
 *  @return {undefined}
 */
se.lnu.drag.object.Draggable.prototype.m_onMouseUp = function(event) {
	event.preventDefault ? event.preventDefault() : (event.returnValue = false);
	this.active = false;
    if (typeof this.onDrop == 'function') this.onDrop(event);
};