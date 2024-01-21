//--------------------------------------------------------------------------
// Strict mode
//--------------------------------------------------------------------------

"use strict";

//--------------------------------------------------------------------------
// Public class
//--------------------------------------------------------------------------

/**
 *  Represents a point in two-dimensional environment (x and y)
 *
 *  @version    1.0
 *  @copyright  Copyright (c) 2009-2016.
 *  @license    Creative Commons (BY-NC-SA)
 *  @since      Sep 10, 2016
 *  @author     Henrik Andersen <henrik.andersen@lnu.se>
 */
se.lnu.drag.geom.Point = (function(x, y) {

    //----------------------------------------------------------------------
    // Public properties
    //----------------------------------------------------------------------
    
    /**
     *  Position in the x-direction (Default: 0)
     *
     *  @type {Number}
     */
    this.x = x || 0;

    /**
     *  Position in the y-direction (Default: 0)
     *
     *  @type {Number}
     */
    this.y = y || 0;
});