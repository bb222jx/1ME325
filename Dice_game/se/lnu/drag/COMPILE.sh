java -jar compiler.jar \
--language_in ECMASCRIPT5 \
--js "./scope/Manifest.js" \
--js "./event/Event.js" \
--js "./geom/Point.js" \
--js "./object/Draggable.js" \
--js "./system/Main.js" \
--js "./scope/Alias.js" \
--js_output_file "./build/src/js/DragnDrop.js"