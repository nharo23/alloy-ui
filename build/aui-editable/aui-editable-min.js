AUI.add("aui-editable",function(c){var g=c.Lang,i=g.String,a=g.isFunction,d=c.getClassName,e="hover",k="editable",b=d(k,"editing"),f=d(k,e),h="contentBox";var j=c.Component.create({NAME:k,ATTRS:{cancelButton:{valueFn:function(){var l=this;return{id:"cancel",icon:"circle-close",handler:{context:l,fn:l.cancel}};}},contentText:{value:"",setter:function(m){var l=this;m=g.trim(m);l._toText(m);return m;}},formatInput:{value:null,validator:a},formatOutput:{value:null,validator:a},node:{setter:function(m){var l=c.one(m);if(!l){c.error("AUI.Editable: Invalid Node Given: "+m);}return l;}},eventType:{value:"click"},renderTo:{value:document.body,setter:function(n){var l=this;var m;if(n=="node"){m=l.get(n);}else{m=c.one(n);}if(!m){c.error("AUI.Editable: Invalid renderTo Given: "+n);}return m;}},saveButton:{valueFn:function(){var l=this;return{id:"save",icon:"circle-check",handler:{context:l,fn:l.save}};}},icons:{value:[]},inputType:{value:"text",setter:function(m){var l=this;if(m!="text"&&m!="textarea"){m=c.Attribute.INVALID_VALUE;}return m;}},visible:{value:false}},UI_ATTRS:["node"],prototype:{initializer:function(){var l=this;l._uiSetNode(l.get("node"));l._createEvents();},renderUI:function(){var l=this;var m=l.get(h);var o=l.get("inputType");var q={};var n=l.get("icons");if(n!==false){var s=l.get("cancelButton");var p=l.get("saveButton");if(s!==false){n.push(s);}if(p!==false){n.push(p);}q.icons=n;}if(o!="text"){c.mix(q,{field:{autoSize:true},fieldWidget:c.Textarea});}var r=new c.Combobox(q).render(m);l._comboBox=r;l.inputNode=r.get("node");},bindUI:function(){var l=this;var m=l.get(h);var o=l.get("node");var n=l.inputNode;n.on("keypress",l._onKeypressEditable,l);l.after("contentTextChange",l._syncContentText);m.swallowEvent("click");c.getDoc().after("click",l._afterFocusedChangeEditable,l);},syncUI:function(){var l=this;var m=l.get("node").get("innerHTML");m=m.replace(/\n|\r/gim,"");m=g.trim(m);m=l._toText(m);l._setInput(m);l.set("contentText",m,{initial:true});},cancel:function(){var l=this;l.fire("cancel");},save:function(m){var l=this;l.fire("save");},_afterFocusedChangeEditable:function(m){var l=this;l.fire("stopEditing",l.get("visible"));},_createEvents:function(){var l=this;l.publish("startEditing",{bubbles:true,defaultFn:l._defStartEditingFn,emitFacade:true,queable:false});l.publish("stopEditing",{bubbles:true,defaultFn:l._defStopEditingFn,emitFacade:true,queable:false});l.publish("save",{bubbles:true,defaultFn:l._defSaveFn,emitFacade:true,queable:false});l.publish("cancel",{bubbles:true,defaultFn:l._defCancelFn,emitFacade:true,queable:false});},_defCancelFn:function(m){var l=this;l.fire("stopEditing",false);},_defStartEditingFn:function(l){var s=this;var p=s.get("boundingBox");var o=s.get("node");var q=s.inputNode;var m=o.get("offsetHeight");var r=o.get("offsetWidth");s.show();o.addClass(b);var t=o.getXY();p.setStyles({height:m+"px",left:t[0]+"px",top:t[1]+"px",width:r+"px"});var n=s._comboBox._field;n.set("width",r);n.fire("adjustSize");q.focus();q.select();},_defStopEditingFn:function(n,m){var l=this;l.hide();l.get("node").removeClass(b);if(m){l.set("contentText",l.inputNode.get("value"));}else{l._setInput(l.get("contentText"));}},_defSaveFn:function(m){var l=this;l.fire("stopEditing",true);},_onKeypressEditable:function(m){var l=this;if(m.isKey("ESC")){m.preventDefault();l.cancel();}else{if(m.isKey("ENTER")&&(l.get("inputType")=="text")){l.save();}}},_onMouseEnterEditable:function(m){var l=this;l.get("node").addClass(f);},_onMouseLeaveEditable:function(m){var l=this;l.get("node").removeClass(f);},_setInput:function(n){var l=this;var m=l.get("formatInput");if(m){n=m.call(l,n);}else{n=l._toText(n);}l.inputNode.set("value",i.unescapeEntities(n));},_setOutput:function(n){var m=this;var l=m.get("formatOutput");if(l){n=l.call(m,n);}else{n=m._toHTML(n);}m.get("node").set("innerHTML",n);},_startEditing:function(m){var l=this;if(!l.get("rendered")){l.render(l.get("renderTo"));}l.fire("startEditing");m.halt();},_syncContentText:function(n){var l=this;if(!n.initial){var m=n.newVal;l._setInput(m);l._setOutput(m);}},_toHTML:function(m){var l=this;return String(m).replace(/\n/gim,"<br/>");},_toText:function(m){var l=this;m=String(m);m=m.replace(/<br\s*\/?>/gim,"\n");m=m.replace(/(<\/?[^>]+>|\t)/gim,"");return m;},_uiSetNode:function(n){var l=this;if(l._mouseEnterHandler){l._mouseEnterHandler.detach();}if(l._mouseLeaveHandler){l._mouseLeaveHandler.detach();}if(l._interactionHandler){l._interactionHandler.detach();}var m=l.get("eventType");l._mouseEnterHandler=n.on("mouseenter",l._onMouseEnterEditable,l);l._mouseLeaveHandler=n.on("mouseleave",l._onMouseLeaveEditable,l);l._interactionHandler=n.on(m,l._startEditing,l);}}});c.Editable=j;},"@VERSION@",{requires:["aui-base","aui-form-combobox"],skinnable:true});