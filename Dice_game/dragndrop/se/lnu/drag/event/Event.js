//--------------------------------------------------------------------------
// Public class
//--------------------------------------------------------------------------

/**
 *	Event Listener system that works in most browsers (Static)
 *
 *	@version    1.0
 *  @copyright  Copyright (c) 2009-2016.
 *  @license    Creative Commons (BY-NC-SA)
 *  @since      Sep 10, 2016
 *  @author     Henrik Andersen <henrik.andersen@lnu.se>	
 */
se.lnu.drag.event.Event = {

    //----------------------------------------------------------------------
    //  Public static methods
    //----------------------------------------------------------------------
    
    /**
     *	Creates an event listener for a specific element
     *
     *	@param	{element} May be an Element in a document, the Document itself, a Window, or any other object that supports events
     *	@param	{type}    String representing the event type to listen for
     *	@param	{handler} The object that receives a notification
     *
     *	@return {undefined}
     */
    addEventListener: function(element, type, handler) {
        if (element == undefined) return;
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    
    /**
     *  Removes an event listener from a specific element
     *
     *  @param  {element} May be an Element in a document, the Document itself, a Window, or any other object that supports events
     *  @param  {type}    String representing the event type to listen for
     *  @param  {handler} The object that receives a notification
     *
     *  @return {undefined}
     */
    removeEventListener: function(element, type, handler){
        if (element == undefined) return;
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
};