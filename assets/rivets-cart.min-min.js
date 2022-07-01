(function(){function t(t,i,n,r){return new e(t,i,n,r)}function e(t,e,n,r){this.options=r||{},this.options.adapters=this.options.adapters||{},this.obj=t,this.keypath=e,this.callback=n,this.objectPath=[],this.update=this.update.bind(this),this.parse(),i(this.target=this.realize())&&this.set(!0,this.key,this.target,this.callback)}function i(t){return"object"==typeof t&&null!==t}function n(t){throw new Error("[sightglass] "+t)}t.adapters={},e.tokenize=function(t,e,i){var n,r,s=[],o={i:i,path:""};for(n=0;n<t.length;n++)r=t.charAt(n),~e.indexOf(r)?(s.push(o),o={i:r,path:""}):o.path+=r;return s.push(o),s},e.prototype.parse=function(){var i,r,s=this.interfaces();s.length||n("Must define at least one adapter interface."),~s.indexOf(this.keypath[0])?(i=this.keypath[0],r=this.keypath.substr(1)):(void 0===(i=this.options.root||t.root)&&n("Must define a default root adapter."),r=this.keypath),this.tokens=e.tokenize(r,s,i),this.key=this.tokens.pop()},e.prototype.realize=function(){var t,e=this.obj,n=!1;return this.tokens.forEach((function(r,s){i(e)?(void 0!==this.objectPath[s]?e!==(t=this.objectPath[s])&&(this.set(!1,r,t,this.update),this.set(!0,r,e,this.update),this.objectPath[s]=e):(this.set(!0,r,e,this.update),this.objectPath[s]=e),e=this.get(r,e)):(!1===n&&(n=s),(t=this.objectPath[s])&&this.set(!1,r,t,this.update))}),this),!1!==n&&this.objectPath.splice(n),e},e.prototype.update=function(){var t,e;(t=this.realize())!==this.target&&(i(this.target)&&this.set(!1,this.key,this.target,this.callback),i(t)&&this.set(!0,this.key,t,this.callback),e=this.value(),this.target=t,(this.value()instanceof Function||this.value()!==e)&&this.callback())},e.prototype.value=function(){return i(this.target)?this.get(this.key,this.target):void 0},e.prototype.setValue=function(t){i(this.target)&&this.adapter(this.key).set(this.target,this.key.path,t)},e.prototype.get=function(t,e){return this.adapter(t).get(e,t.path)},e.prototype.set=function(t,e,i,n){var r=t?"observe":"unobserve";this.adapter(e)[r](i,e.path,n)},e.prototype.interfaces=function(){var e=Object.keys(this.options.adapters);return Object.keys(t.adapters).forEach((function(t){~e.indexOf(t)||e.push(t)})),e},e.prototype.adapter=function(e){return this.options.adapters[e.i]||t.adapters[e.i]},e.prototype.unobserve=function(){var t;this.tokens.forEach((function(e,i){(t=this.objectPath[i])&&this.set(!1,e,t,this.update)}),this),i(this.target)&&this.set(!1,this.key,this.target,this.callback)},"undefined"!=typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd?define([],(function(){return this.sightglass=t})):this.sightglass=t}).call(this),function(){var t,e,i,n,r=function(t,e){return function(){return t.apply(e,arguments)}},s=[].slice,o={}.hasOwnProperty,u=function(t,e){function i(){this.constructor=t}for(var n in e)o.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},a=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1};t={options:["prefix","templateDelimiters","rootInterface","preloadData","handler"],extensions:["binders","formatters","components","adapters"],public:{binders:{},components:{},formatters:{},adapters:{},prefix:"rv",templateDelimiters:["{","}"],rootInterface:".",preloadData:!0,handler:function(t,e,i){return this.call(t,e,i.view.models)},configure:function(e){var i,n,r,s;for(r in null==e&&(e={}),e)if(s=e[r],"binders"===r||"components"===r||"formatters"===r||"adapters"===r)for(n in s)i=s[n],t[r][n]=i;else t.public[r]=s},bind:function(e,i,n){var r;return null==i&&(i={}),null==n&&(n={}),(r=new t.View(e,i,n)).bind(),r},init:function(e,i,n){var r,s;return null==n&&(n={}),null==i&&(i=document.createElement("div")),e=t.public.components[e],i.innerHTML=e.template.call(this,i),r=e.initialize.call(this,i,n),(s=new t.View(i,r)).bind(),s}}},window.jQuery||window.$?(n="on"in jQuery.prototype?["on","off"]:["bind","unbind"],e=n[0],i=n[1],t.Util={bindEvent:function(t,i,n){return jQuery(t)[e](i,n)},unbindEvent:function(t,e,n){return jQuery(t)[i](e,n)},getInputValue:function(t){var e;return"checkbox"===(e=jQuery(t)).attr("type")?e.is(":checked"):e.val()}}):t.Util={bindEvent:"addEventListener"in window?function(t,e,i){return t.addEventListener(e,i,!1)}:function(t,e,i){return t.attachEvent("on"+e,i)},unbindEvent:"removeEventListener"in window?function(t,e,i){return t.removeEventListener(e,i,!1)}:function(t,e,i){return t.detachEvent("on"+e,i)},getInputValue:function(t){var e,i,n,r;if("checkbox"===t.type)return t.checked;if("select-multiple"===t.type){for(r=[],i=0,n=t.length;n>i;i++)(e=t[i]).selected&&r.push(e.value);return r}return t.value}},t.TypeParser=function(){function t(){}return t.types={primitive:0,keypath:1},t.parse=function(t){return/^'.*'$|^".*"$/.test(t)?{type:this.types.primitive,value:t.slice(1,-1)}:"true"===t?{type:this.types.primitive,value:!0}:"false"===t?{type:this.types.primitive,value:!1}:"null"===t?{type:this.types.primitive,value:null}:"undefined"===t?{type:this.types.primitive,value:void 0}:!1===isNaN(Number(t))?{type:this.types.primitive,value:Number(t)}:{type:this.types.keypath,value:t}},t}(),t.TextTemplateParser=function(){function t(){}return t.types={text:0,binding:1},t.parse=function(t,e){var i,n,r,s,o,u,a;for(u=[],s=t.length,i=0,n=0;s>n;){if(0>(i=t.indexOf(e[0],n))){u.push({type:this.types.text,value:t.slice(n)});break}if(i>0&&i>n&&u.push({type:this.types.text,value:t.slice(n,i)}),n=i+e[0].length,0>(i=t.indexOf(e[1],n))){o=t.slice(n-e[1].length),(null!=(r=u[u.length-1])?r.type:void 0)===this.types.text?r.value+=o:u.push({type:this.types.text,value:o});break}a=t.slice(n,i).trim(),u.push({type:this.types.binding,value:a}),n=i+e[1].length}return u},t}(),t.View=function(){function e(e,i,n){var s,o,u,a,l,h,c,d,p,f,v,y,b;for(this.els=e,this.models=i,null==n&&(n={}),this.update=r(this.update,this),this.publish=r(this.publish,this),this.sync=r(this.sync,this),this.unbind=r(this.unbind,this),this.bind=r(this.bind,this),this.select=r(this.select,this),this.traverse=r(this.traverse,this),this.build=r(this.build,this),this.buildBinding=r(this.buildBinding,this),this.bindingRegExp=r(this.bindingRegExp,this),this.options=r(this.options,this),this.els.jquery||this.els instanceof Array||(this.els=[this.els]),l=0,c=(p=t.extensions).length;c>l;l++){if(this[o=p[l]]={},n[o])for(s in f=n[o])u=f[s],this[o][s]=u;for(s in v=t.public[o])u=v[s],null==(a=this[o])[s]&&(a[s]=u)}for(h=0,d=(y=t.options).length;d>h;h++)this[o=y[h]]=null!=(b=n[o])?b:t.public[o];this.build()}return e.prototype.options=function(){var e,i,n,r,s;for(i={},n=0,r=(s=t.extensions.concat(t.options)).length;r>n;n++)i[e=s[n]]=this[e];return i},e.prototype.bindingRegExp=function(){return new RegExp("^"+this.prefix+"-")},e.prototype.buildBinding=function(e,i,n,r){var s,o,u,a,l,h,c;return l={},c=function(){var t,e,i,n;for(n=[],t=0,e=(i=r.split("|")).length;e>t;t++)h=i[t],n.push(h.trim());return n}(),a=(s=function(){var t,e,i,n;for(n=[],t=0,e=(i=c.shift().split("<")).length;e>t;t++)o=i[t],n.push(o.trim());return n}()).shift(),l.formatters=c,(u=s.shift())&&(l.dependencies=u.split(/\s+/)),this.bindings.push(new t[e](this,i,n,a,l))},e.prototype.build=function(){var e,i,n,r,s;for(this.bindings=[],i=function(e){return function(n){var r,s,o,u,a,l,h,c,d,p,f,v,y,b;if(3===n.nodeType){if(a=t.TextTemplateParser,(o=e.templateDelimiters)&&(c=a.parse(n.data,o)).length&&(1!==c.length||c[0].type!==a.types.text)){for(d=0,f=c.length;f>d;d++)h=c[d],l=document.createTextNode(h.value),n.parentNode.insertBefore(l,n),1===h.type&&e.buildBinding("TextBinding",l,null,h.value);n.parentNode.removeChild(n)}}else 1===n.nodeType&&(r=e.traverse(n));if(!r){for(b=[],p=0,v=(y=function(){var t,e,i,r;for(r=[],t=0,e=(i=n.childNodes).length;e>t;t++)u=i[t],r.push(u);return r}()).length;v>p;p++)s=y[p],b.push(i(s));return b}}}(this),n=0,r=(s=this.els).length;r>n;n++)e=s[n],i(e);this.bindings.sort((function(t,e){var i,n;return((null!=(i=e.binder)?i.priority:void 0)||0)-((null!=(n=t.binder)?n.priority:void 0)||0)}))},e.prototype.traverse=function(e){var i,n,r,s,o,u,a,l,h,c,d,p,f,v,y;for(s=this.bindingRegExp(),o="SCRIPT"===e.nodeName||"STYLE"===e.nodeName,h=0,d=(f=e.attributes).length;d>h;h++)if(i=f[h],s.test(i.name)){if(a=i.name.replace(s,""),!(r=this.binders[a]))for(u in v=this.binders)l=v[u],"*"!==u&&-1!==u.indexOf("*")&&(new RegExp("^"+u.replace(/\*/g,".+")+"$").test(a)&&(r=l));r||(r=this.binders["*"]),r.block&&(o=!0,n=[i])}for(c=0,p=(y=n||e.attributes).length;p>c;c++)i=y[c],s.test(i.name)&&(a=i.name.replace(s,""),this.buildBinding("Binding",e,a,i.value));return o||(a=e.nodeName.toLowerCase(),this.components[a]&&!e._bound&&(this.bindings.push(new t.ComponentBinding(this,e,a)),o=!0)),o},e.prototype.select=function(t){var e,i,n,r,s;for(s=[],i=0,n=(r=this.bindings).length;n>i;i++)t(e=r[i])&&s.push(e);return s},e.prototype.bind=function(){var t,e,i,n,r;for(r=[],e=0,i=(n=this.bindings).length;i>e;e++)t=n[e],r.push(t.bind());return r},e.prototype.unbind=function(){var t,e,i,n,r;for(r=[],e=0,i=(n=this.bindings).length;i>e;e++)t=n[e],r.push(t.unbind());return r},e.prototype.sync=function(){var t,e,i,n,r;for(r=[],e=0,i=(n=this.bindings).length;i>e;e++)t=n[e],r.push("function"==typeof t.sync?t.sync():void 0);return r},e.prototype.publish=function(){var t,e,i,n,r;for(n=this.select((function(t){var e;return null!=(e=t.binder)?e.publishes:void 0})),r=[],e=0,i=n.length;i>e;e++)t=n[e],r.push(t.publish());return r},e.prototype.update=function(t){var e,i,n,r,s,o,u;for(i in null==t&&(t={}),t)n=t[i],this.models[i]=n;for(u=[],r=0,s=(o=this.bindings).length;s>r;r++)e=o[r],u.push("function"==typeof e.update?e.update(t):void 0);return u},e}(),t.Binding=function(){function e(t,e,i,n,s){this.view=t,this.el=e,this.type=i,this.keypath=n,this.options=null!=s?s:{},this.getValue=r(this.getValue,this),this.update=r(this.update,this),this.unbind=r(this.unbind,this),this.bind=r(this.bind,this),this.publish=r(this.publish,this),this.sync=r(this.sync,this),this.set=r(this.set,this),this.eventHandler=r(this.eventHandler,this),this.formattedValue=r(this.formattedValue,this),this.parseTarget=r(this.parseTarget,this),this.observe=r(this.observe,this),this.setBinder=r(this.setBinder,this),this.formatters=this.options.formatters||[],this.dependencies=[],this.formatterObservers={},this.model=void 0,this.setBinder()}return e.prototype.setBinder=function(){var t,e,i;if(!(this.binder=this.view.binders[this.type]))for(t in i=this.view.binders)e=i[t],"*"!==t&&-1!==t.indexOf("*")&&(new RegExp("^"+t.replace(/\*/g,".+")+"$").test(this.type)&&(this.binder=e,this.args=new RegExp("^"+t.replace(/\*/g,"(.+)")+"$").exec(this.type),this.args.shift()));return this.binder||(this.binder=this.view.binders["*"]),this.binder instanceof Function?this.binder={routine:this.binder}:void 0},e.prototype.observe=function(e,i,n){return t.sightglass(e,i,n,{root:this.view.rootInterface,adapters:this.view.adapters})},e.prototype.parseTarget=function(){var e;return 0===(e=t.TypeParser.parse(this.keypath)).type?this.value=e.value:(this.observer=this.observe(this.view.models,this.keypath,this.sync),this.model=this.observer.target)},e.prototype.formattedValue=function(e){var i,n,r,o,u,a,l,h,c,d,p,f,v,y;for(o=d=0,f=(y=this.formatters).length;f>d;o=++d){for(u=y[o],a=(r=u.match(/[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g)).shift(),u=this.view.formatters[a],r=function(){var e,i,s;for(s=[],e=0,i=r.length;i>e;e++)n=r[e],s.push(t.TypeParser.parse(n));return s}(),h=[],i=p=0,v=r.length;v>p;i=++p)n=r[i],h.push(0===n.type?n.value:((c=this.formatterObservers)[o]||(c[o]={}),(l=this.formatterObservers[o][i])||(l=this.observe(this.view.models,n.value,this.sync),this.formatterObservers[o][i]=l),l.value()));(null!=u?u.read:void 0)instanceof Function?e=u.read.apply(u,[e].concat(s.call(h))):u instanceof Function&&(e=u.apply(null,[e].concat(s.call(h))))}return e},e.prototype.eventHandler=function(t){var e,i;return i=(e=this).view.handler,function(n){return i.call(t,this,n,e)}},e.prototype.set=function(t){var e;return t=this.formattedValue(t instanceof Function&&!this.binder.function?t.call(this.model):t),null!=(e=this.binder.routine)?e.call(this,this.el,t):void 0},e.prototype.sync=function(){var t,e;return this.set(function(){var i,n,r,s,o,u,a;if(this.observer){if(this.model!==this.observer.target){for(i=0,r=(o=this.dependencies).length;r>i;i++)(e=o[i]).unobserve();if(this.dependencies=[],null!=(this.model=this.observer.target)&&(null!=(u=this.options.dependencies)?u.length:void 0))for(n=0,s=(a=this.options.dependencies).length;s>n;n++)t=a[n],e=this.observe(this.model,t,this.sync),this.dependencies.push(e)}return this.observer.value()}return this.value}.call(this))},e.prototype.publish=function(){var t,e,i,n,r,o,u,a;if(this.observer){for(i=this.getValue(this.el),n=0,r=(o=this.formatters.slice(0).reverse()).length;r>n;n++)e=(t=o[n].split(/\s+/)).shift(),(null!=(u=this.view.formatters[e])?u.publish:void 0)&&(i=(a=this.view.formatters[e]).publish.apply(a,[i].concat(s.call(t))));return this.observer.setValue(i)}},e.prototype.bind=function(){var t,e,i,n,r,s,o;if(this.parseTarget(),null!=(r=this.binder.bind)&&r.call(this,this.el),null!=this.model&&(null!=(s=this.options.dependencies)?s.length:void 0))for(i=0,n=(o=this.options.dependencies).length;n>i;i++)t=o[i],e=this.observe(this.model,t,this.sync),this.dependencies.push(e);return this.view.preloadData?this.sync():void 0},e.prototype.unbind=function(){var t,e,i,n,r,s,o,u,a;for(null!=(s=this.binder.unbind)&&s.call(this,this.el),null!=(o=this.observer)&&o.unobserve(),n=0,r=(u=this.dependencies).length;r>n;n++)u[n].unobserve();for(i in this.dependencies=[],a=this.formatterObservers)for(t in e=a[i])e[t].unobserve();return this.formatterObservers={}},e.prototype.update=function(t){var e,i;return null==t&&(t={}),this.model=null!=(e=this.observer)?e.target:void 0,null!=(i=this.binder.update)?i.call(this,t):void 0},e.prototype.getValue=function(e){return this.binder&&null!=this.binder.getValue?this.binder.getValue.call(this,e):t.Util.getInputValue(e)},e}(),t.ComponentBinding=function(e){function i(t,e,i){var n,s,o,u,l,h,c;for(this.view=t,this.el=e,this.type=i,this.unbind=r(this.unbind,this),this.bind=r(this.bind,this),this.locals=r(this.locals,this),this.component=this.view.components[this.type],this.static={},this.observers={},this.upstreamObservers={},s=t.bindingRegExp(),u=0,l=(h=this.el.attributes||[]).length;l>u;u++)n=h[u],s.test(n.name)||(o=this.camelCase(n.name),a.call(null!=(c=this.component.static)?c:[],o)>=0?this.static[o]=n.value:this.observers[o]=n.value)}return u(i,e),i.prototype.sync=function(){},i.prototype.update=function(){},i.prototype.publish=function(){},i.prototype.locals=function(){var t,e,i,n,r,s;for(t in i={},r=this.static)n=r[t],i[t]=n;for(t in s=this.observers)e=s[t],i[t]=e.value();return i},i.prototype.camelCase=function(t){return t.replace(/-([a-z])/g,(function(t){return t[1].toUpperCase()}))},i.prototype.bind=function(){var e,i,n,r,s,o,u,a,l,h,c,d,p,f,v,y,b,m,g,w,C;if(!this.bound){for(i in f=this.observers)n=f[i],this.observers[i]=this.observe(this.view.models,n,function(t){return function(e){return function(){return t.componentView.models[e]=t.observers[e].value()}}}(this).call(this,i));this.bound=!0}if(null!=this.componentView)return this.componentView.bind();for(this.el.innerHTML=this.component.template.call(this),u=this.component.initialize.call(this,this.el,this.locals()),this.el._bound=!0,o={},h=0,d=(v=t.extensions).length;d>h;h++){if(o[s=v[h]]={},this.component[s])for(e in y=this.component[s])a=y[e],o[s][e]=a;for(e in b=this.view[s])a=b[e],null==(l=o[s])[e]&&(l[e]=a)}for(c=0,p=(m=t.options).length;p>c;c++)o[s=m[c]]=null!=(g=this.component[s])?g:this.view[s];for(i in this.componentView=new t.View(this.el,u,o),this.componentView.bind(),C=[],w=this.observers)r=w[i],C.push(this.upstreamObservers[i]=this.observe(this.componentView.models,i,function(t){return function(e,i){return function(){return i.setValue(t.componentView.models[e])}}}(this).call(this,i,r)));return C},i.prototype.unbind=function(){var t,e,i,n;for(t in e=this.upstreamObservers)e[t].unobserve();for(t in i=this.observers)i[t].unobserve();return null!=(n=this.componentView)?n.unbind.call(this):void 0},i}(t.Binding),t.TextBinding=function(t){function e(t,e,i,n,s){this.view=t,this.el=e,this.type=i,this.keypath=n,this.options=null!=s?s:{},this.sync=r(this.sync,this),this.formatters=this.options.formatters||[],this.dependencies=[],this.formatterObservers={}}return u(e,t),e.prototype.binder={routine:function(t,e){return t.data=null!=e?e:""}},e.prototype.sync=function(){return e.__super__.sync.apply(this,arguments)},e}(t.Binding),t.public.binders.text=function(t,e){return null!=t.textContent?t.textContent=null!=e?e:"":t.innerText=null!=e?e:""},t.public.binders.html=function(t,e){return t.innerHTML=null!=e?e:""},t.public.binders.show=function(t,e){return t.style.display=e?"":"none"},t.public.binders.hide=function(t,e){return t.style.display=e?"none":""},t.public.binders.enabled=function(t,e){return t.disabled=!e},t.public.binders.disabled=function(t,e){return t.disabled=!!e},t.public.binders.checked={publishes:!0,priority:2e3,bind:function(e){return t.Util.bindEvent(e,"change",this.publish)},unbind:function(e){return t.Util.unbindEvent(e,"change",this.publish)},routine:function(t,e){var i;return t.checked="radio"===t.type?(null!=(i=t.value)?i.toString():void 0)===(null!=e?e.toString():void 0):!!e}},t.public.binders.unchecked={publishes:!0,priority:2e3,bind:function(e){return t.Util.bindEvent(e,"change",this.publish)},unbind:function(e){return t.Util.unbindEvent(e,"change",this.publish)},routine:function(t,e){var i;return t.checked="radio"===t.type?(null!=(i=t.value)?i.toString():void 0)!==(null!=e?e.toString():void 0):!e}},t.public.binders.value={publishes:!0,priority:3e3,bind:function(e){return"INPUT"!==e.tagName||"radio"!==e.type?(this.event="SELECT"===e.tagName?"change":"input",t.Util.bindEvent(e,this.event,this.publish)):void 0},unbind:function(e){return"INPUT"!==e.tagName||"radio"!==e.type?t.Util.unbindEvent(e,this.event,this.publish):void 0},routine:function(t,e){var i,n,r,s,o,u,l;if("INPUT"===t.tagName&&"radio"===t.type)return t.setAttribute("value",e);if(null!=window.jQuery){if(t=jQuery(t),(null!=e?e.toString():void 0)!==(null!=(s=t.val())?s.toString():void 0))return t.val(null!=e?e:"")}else if("select-multiple"===t.type){if(null!=e){for(l=[],n=0,r=t.length;r>n;n++)i=t[n],l.push(i.selected=(o=i.value,a.call(e,o)>=0));return l}}else if((null!=e?e.toString():void 0)!==(null!=(u=t.value)?u.toString():void 0))return t.value=null!=e?e:""}},t.public.binders.if={block:!0,priority:4e3,bind:function(t){var e,i;return null==this.marker?(e=[this.view.prefix,this.type].join("-").replace("--","-"),i=t.getAttribute(e),this.marker=document.createComment(" rivets: "+this.type+" "+i+" "),this.bound=!1,t.removeAttribute(e),t.parentNode.insertBefore(this.marker,t),t.parentNode.removeChild(t)):void 0},unbind:function(){var t;return null!=(t=this.nested)?t.unbind():void 0},routine:function(e,i){var n,r,s,o;if(!!i==!this.bound){if(i){for(n in s={},o=this.view.models)r=o[n],s[n]=r;return(this.nested||(this.nested=new t.View(e,s,this.view.options()))).bind(),this.marker.parentNode.insertBefore(e,this.marker.nextSibling),this.bound=!0}return e.parentNode.removeChild(e),this.nested.unbind(),this.bound=!1}},update:function(t){var e;return null!=(e=this.nested)?e.update(t):void 0}},t.public.binders.unless={block:!0,priority:4e3,bind:function(e){return t.public.binders.if.bind.call(this,e)},unbind:function(){return t.public.binders.if.unbind.call(this)},routine:function(e,i){return t.public.binders.if.routine.call(this,e,!i)},update:function(e){return t.public.binders.if.update.call(this,e)}},t.public.binders["on-*"]={function:!0,priority:1e3,unbind:function(e){return this.handler?t.Util.unbindEvent(e,this.args[0],this.handler):void 0},routine:function(e,i){return this.handler&&t.Util.unbindEvent(e,this.args[0],this.handler),t.Util.bindEvent(e,this.args[0],this.handler=this.eventHandler(i))}},t.public.binders["each-*"]={block:!0,priority:4e3,bind:function(t){var e,i,n,r;if(null==this.marker)e=[this.view.prefix,this.type].join("-").replace("--","-"),this.marker=document.createComment(" rivets: "+this.type+" "),this.iterated=[],t.removeAttribute(e),t.parentNode.insertBefore(this.marker,t),t.parentNode.removeChild(t);else for(i=0,n=(r=this.iterated).length;n>i;i++)r[i].bind()},unbind:function(){var t,e,i,n,r;if(null!=this.iterated){for(r=[],e=0,i=(n=this.iterated).length;i>e;e++)t=n[e],r.push(t.unbind());return r}},routine:function(e,i){var n,r,s,o,u,a,l,h,c,d,p,f,v,y,b,m,g,w,C,k;if(a=this.args[0],i=i||[],this.iterated.length>i.length)for(p=0,y=(g=Array(this.iterated.length-i.length)).length;y>p;p++)g[p],(d=this.iterated.pop()).unbind(),this.marker.parentNode.removeChild(d.els[0]);for(s=f=0,b=i.length;b>f;s=++f)if(u=i[s],(r={index:s})[a]=u,null==this.iterated[s]){for(o in w=this.view.models)u=w[o],null==r[o]&&(r[o]=u);h=this.iterated.length?this.iterated[this.iterated.length-1].els[0]:this.marker,(l=this.view.options()).preloadData=!0,c=e.cloneNode(!0),(d=new t.View(c,r,l)).bind(),this.iterated.push(d),this.marker.parentNode.insertBefore(c,h.nextSibling)}else this.iterated[s].models[a]!==u&&this.iterated[s].update(r);if("OPTION"===e.nodeName){for(k=[],v=0,m=(C=this.view.bindings).length;m>v;v++)n=C[v],k.push(n.el===this.marker.parentNode&&"value"===n.type?n.sync():void 0);return k}},update:function(t){var e,i,n,r,s,o,u,a;for(i in e={},t)n=t[i],i!==this.args[0]&&(e[i]=n);for(a=[],s=0,o=(u=this.iterated).length;o>s;s++)r=u[s],a.push(r.update(e));return a}},t.public.binders["class-*"]=function(t,e){var i;return!e==(-1!==(i=" "+t.className+" ").indexOf(" "+this.args[0]+" "))?t.className=e?t.className+" "+this.args[0]:i.replace(" "+this.args[0]+" "," ").trim():void 0},t.public.binders["*"]=function(t,e){return null!=e?t.setAttribute(this.type,e):t.removeAttribute(this.type)},t.public.adapters["."]={id:"_rv",counter:0,weakmap:{},weakReference:function(t){var e,i,n;return t.hasOwnProperty(this.id)||(e=this.counter++,Object.defineProperty(t,this.id,{value:e})),(i=this.weakmap)[n=t[this.id]]||(i[n]={callbacks:{}})},cleanupWeakReference:function(t,e){return Object.keys(t.callbacks).length||t.pointers&&Object.keys(t.pointers).length?void 0:delete this.weakmap[e]},stubFunction:function(t,e){var i,n,r;return n=t[e],i=this.weakReference(t),r=this.weakmap,t[e]=function(){var e,s,o,u,a,l,h,c,d;for(s in o=n.apply(t,arguments),l=i.pointers)for(e=l[s],u=0,a=(d=null!=(h=null!=(c=r[s])?c.callbacks[e]:void 0)?h:[]).length;a>u;u++)(0,d[u])();return o}},observeMutations:function(t,e,i){var n,r,s,o,u,l;if(Array.isArray(t)){if(null==(s=this.weakReference(t)).pointers)for(s.pointers={},u=0,l=(r=["push","pop","shift","unshift","sort","reverse","splice"]).length;l>u;u++)n=r[u],this.stubFunction(t,n);if(null==(o=s.pointers)[e]&&(o[e]=[]),a.call(s.pointers[e],i)<0)return s.pointers[e].push(i)}},unobserveMutations:function(t,e,i){var n,r,s;return Array.isArray(t)&&null!=t[this.id]&&(r=this.weakmap[t[this.id]])&&(s=r.pointers[e])?((n=s.indexOf(i))>=0&&s.splice(n,1),s.length||delete r.pointers[e],this.cleanupWeakReference(r,t[this.id])):void 0},observe:function(t,e,i){var n,r,s;return null==(n=this.weakReference(t).callbacks)[e]&&(n[e]=[],(null!=(r=Object.getOwnPropertyDescriptor(t,e))?r.get:void 0)||(null!=r?r.set:void 0)||(s=t[e],Object.defineProperty(t,e,{enumerable:!0,get:function(){return s},set:function(r){return function(o){var u,l,h,c;if(o!==s&&(r.unobserveMutations(s,t[r.id],e),s=o,u=r.weakmap[t[r.id]])){if((n=u.callbacks)[e])for(l=0,h=(c=n[e].slice()).length;h>l;l++)i=c[l],a.call(n[e],i)>=0&&i();return r.observeMutations(o,t[r.id],e)}}}(this)}))),a.call(n[e],i)<0&&n[e].push(i),this.observeMutations(t[e],t[this.id],e)},unobserve:function(t,e,i){var n,r,s;return(s=this.weakmap[t[this.id]])&&(n=s.callbacks[e])?((r=n.indexOf(i))>=0&&(n.splice(r,1),n.length||delete s.callbacks[e]),this.unobserveMutations(t[e],t[this.id],e),this.cleanupWeakReference(s,t[this.id])):void 0},get:function(t,e){return t[e]},set:function(t,e,i){return t[e]=i}},t.factory=function(e){return t.sightglass=e,t.public._=t,t.public},"object"==typeof("undefined"!=typeof module&&null!==module?module.exports:void 0)?module.exports=t.factory(require("sightglass")):"function"==typeof define&&define.amd?define(["sightglass"],(function(e){return this.rivets=t.factory(e)})):this.rivets=t.factory(sightglass)}.call(this),function(){var t,e,i,n,r,s,o=function(t,e){return function(){return t.apply(e,arguments)}},u=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1};e=function(){function t(){this.update=o(this.update,this)}return t.prototype.update=function(t){var e,i,r;for(i in t)r=t[i],"items"!==i&&(this[i]=r);return this.items=function(){var i,r,s,o;for(o=[],i=0,r=(s=t.items).length;r>i;i++)e=s[i],o.push(new n(e));return o}()},t}(),n=function(){function t(t){this.propertyArray=o(this.propertyArray,this),this.update=o(this.update,this),this.update(t)}return t.prototype.update=function(t){var e,n;for(e in t)n=t[e],"properties"!==e&&(this[e]=n);return this.properties=i.Utils.extend({},t.properties)},t.prototype.propertyArray=function(){var t,e,i,n;for(t in n=[],i=this.properties)e=i[t],n.push({name:t,value:e});return n},t}(),(i={settings:{debug:!1,dataAPI:!0,requestBodyClass:null,rivetsModels:{},currency:null,moneyFormat:null,moneyWithCurrencyFormat:null,weightUnit:"g",weightPrecision:0},cart:new e}).init=function(t,e){return null==e&&(e={}),i.configure(e),i.Utils.log("Initialising CartJS."),i.cart.update(t),i.settings.dataAPI&&(i.Utils.log('"dataAPI" setting is true, initialising Data API.'),i.Data.init()),i.settings.requestBodyClass&&(i.Utils.log('"requestBodyClass" set, adding event listeners.'),jQuery(document).on("cart.requestStarted",(function(){return jQuery("body").addClass(i.settings.requestBodyClass)})),jQuery(document).on("cart.requestComplete",(function(){return jQuery("body").removeClass(i.settings.requestBodyClass)}))),i.Rivets.init(),jQuery(document).trigger("cart.ready",[i.cart])},i.configure=function(t){return null==t&&(t={}),i.Utils.extend(i.settings,t)},null==window.console&&(window.console={},window.console.log=function(){}),i.Utils={log:function(){return i.Utils.console(console.log,arguments)},warn:function(){return i.Utils.console(console.warn,arguments)},error:function(){return i.Utils.console(console.error,arguments)},console:function(t,e){return i.settings.debug&&"undefined"!=typeof console&&null!==console?((e=Array.prototype.slice.call(e)).unshift("[CartJS]:"),t.apply(console,e)):void 0},wrapKeys:function(t,e,i,n){var r,s,o;for(r in null==e&&(e="properties"),null==n&&(n=[]),o={},t)s=t[r],o[u.call(n,r)>=0?r:e+"["+r+"]"]=null!=i?i:s;return o},unwrapKeys:function(t,e,i){var n,r,s;for(n in null==e&&(e="properties"),r={},t)s=t[n],r[n.replace(e+"[","").replace("]","")]=null!=i?i:s;return r},extend:function(t,e){var i,n;for(i in e)n=e[i],t[i]=n;return t},clone:function(t){var e,i;if(null==t||"object"!=typeof t)return t;for(e in i=new t.constructor,t)i[e]=clone(t[e]);return i},delete:function(t,e){var i;return i=t[e],delete t[e],i},isArray:Array.isArray||function(t){return"[object Array]"==={}.toString.call(t)},ensureArray:function(t){return i.Utils.isArray(t)?t:null!=t?[t]:[]},formatMoney:function(t,e,n,r){var s,o;return null==r&&(r=""),r||(r=i.settings.currency),null!=window.Currency&&r!==i.settings.currency&&(t=Currency.convert(t,i.settings.currency,r),null!=(null!=(s=window.Currency)?s.moneyFormats:void 0)&&r in window.Currency.moneyFormats&&(e=window.Currency.moneyFormats[r][n])),null!=(null!=(o=window.Shopify)?o.formatMoney:void 0)?Shopify.formatMoney(t,e):(i.Utils.warn('A money formatting filter was used, but Shopify.formatMoney is not available. See the note "Dependency when formatting monetary values" on this page: https://cartjs.org/pages/guide#getting-started-setup.'),t)},getSizedImageUrl:function(t,e){var i,n;return null!=(null!=(i=window.Shopify)&&null!=(n=i.Image)?n.getSizedImageUrl:void 0)?t?Shopify.Image.getSizedImageUrl(t,e):Shopify.Image.getSizedImageUrl("https://cdn.shopify.com/s/images/admin/no-image-.gif",e).replace("-_","-"):t||"https://cdn.shopify.com/s/images/admin/no-image-large.gif"}},s=[],r=!1,i.Queue={add:function(t,e,n){var o;return null==n&&(n={}),o={url:t,data:e,type:n.type||"POST",dataType:n.dataType||"json",cache:!!n.cache,success:i.Utils.ensureArray(n.success),error:i.Utils.ensureArray(n.error),complete:i.Utils.ensureArray(n.complete)},n.updateCart&&o.success.push(i.cart.update),s.push(o),r?void 0:(jQuery(document).trigger("cart.requestStarted",[i.cart]),i.Queue.process())},process:function(){var t;return s.length?(r=!0,(t=s.shift()).complete=i.Queue.process,jQuery.ajax(t)):(r=!1,void jQuery(document).trigger("cart.requestComplete",[i.cart]))}},i.Core={getCart:function(t){return null==t&&(t={}),t.type="GET",t.updateCart=!0,i.Queue.add("/cart.js",{v:(new Date).getTime()},t)},addItem:function(t,e,n,r){var s;return null==e&&(e=1),null==n&&(n={}),null==r&&(r={}),(s=i.Utils.wrapKeys(n,null,null,["selling_plan"])).id=t,s.quantity=e,i.Queue.add("/cart/add.js",s,r),i.Core.getCart()},addItems:function(t,e){var n;return null==e&&(e={}),n={items:t},i.Queue.add("/cart/add.js",n,e),i.Core.getCart()},updateItem:function(t,e,n,r){var s;return null==n&&(n={}),null==r&&(r={}),(s=i.Utils.wrapKeys(n,null,null,["selling_plan"])).line=t,null!=e&&(s.quantity=e),r.updateCart=!0,i.Queue.add("/cart/change.js",s,r)},removeItem:function(t,e){return null==e&&(e={}),i.Core.updateItem(t,0,{},e)},updateItemById:function(t,e,n,r){var s;return null==n&&(n={}),null==r&&(r={}),(s=i.Utils.wrapKeys(n,null,null,["selling_plan"])).id=t,null!=e&&(s.quantity=e),r.updateCart=!0,i.Queue.add("/cart/change.js",s,r)},updateItemQuantitiesById:function(t,e){return null==t&&(t={}),null==e&&(e={}),e.updateCart=!0,i.Queue.add("/cart/update.js",{updates:t},e)},removeItemById:function(t,e){var n;return null==e&&(e={}),n={id:t,quantity:0},e.updateCart=!0,i.Queue.add("/cart/change.js",n,e)},clear:function(t){return null==t&&(t={}),t.updateCart=!0,i.Queue.add("/cart/clear.js",{},t)},getAttribute:function(t,e){return t in i.cart.attributes?i.cart.attributes[t]:e},setAttribute:function(t,e,n){var r;return null==n&&(n={}),(r={})[t]=e,i.Core.setAttributes(r,n)},getAttributes:function(){return i.cart.attributes},setAttributes:function(t,e){return null==t&&(t={}),null==e&&(e={}),e.updateCart=!0,i.Queue.add("/cart/update.js",i.Utils.wrapKeys(t,"attributes"),e)},clearAttributes:function(t){return null==t&&(t={}),t.updateCart=!0,i.Queue.add("/cart/update.js",i.Utils.wrapKeys(i.Core.getAttributes(),"attributes",""),t)},getNote:function(){return i.cart.note},setNote:function(t,e){return null==e&&(e={}),e.updateCart=!0,i.Queue.add("/cart/update.js",{note:t},e)}},t=null,i.Data={init:function(){return t=jQuery(document),i.Data.setEventListeners("on"),i.Data.render(null,i.cart)},destroy:function(){return i.Data.setEventListeners("off")},setEventListeners:function(e){return t[e]("click","[data-cart-add]",i.Data.add),t[e]("click","[data-cart-remove]",i.Data.remove),t[e]("click","[data-cart-remove-id]",i.Data.removeById),t[e]("click","[data-cart-update]",i.Data.update),t[e]("click","[data-cart-update-id]",i.Data.updateById),t[e]("click","[data-cart-clear]",i.Data.clear),t[e]("change","[data-cart-toggle]",i.Data.toggle),t[e]("change","[data-cart-toggle-attribute]",i.Data.toggleAttribute),t[e]("submit","[data-cart-submit]",i.Data.submit),t[e]("cart.requestComplete",i.Data.render)},add:function(t){var e,n;return t.preventDefault(),e=jQuery(this),(n={}).selling_plan=e.attr("data-cart-selling-plan"),i.Core.addItem(e.attr("data-cart-add"),e.attr("data-cart-quantity"),n)},remove:function(t){var e;return t.preventDefault(),e=jQuery(this),i.Core.removeItem(e.attr("data-cart-remove"))},removeById:function(t){var e;return t.preventDefault(),e=jQuery(this),
i.Core.removeItemById(e.attr("data-cart-remove-id"))},update:function(t){var e,n;return t.preventDefault(),e=jQuery(this),(n={}).selling_plan=e.attr("data-cart-selling-plan"),i.Core.updateItem(e.attr("data-cart-update"),e.attr("data-cart-quantity"),n)},updateById:function(t){var e,n;return t.preventDefault(),e=jQuery(this),(n={}).selling_plan=e.attr("data-cart-selling-plan"),i.Core.updateItemById(e.attr("data-cart-update-id"),e.attr("data-cart-quantity"),n)},clear:function(t){return t.preventDefault(),i.Core.clear()},toggle:function(){var t,e;return e=(t=jQuery(this)).attr("data-cart-toggle"),t.is(":checked")?i.Core.addItem(e):i.Core.removeItemById(e)},toggleAttribute:function(){var t,e;return e=(t=jQuery(this)).attr("data-cart-toggle-attribute"),i.Core.setAttribute(e,t.is(":checked")?"Yes":"")},submit:function(t){var e,n,r,s;return t.preventDefault(),e=jQuery(this).serializeArray(),n=void 0,s=void 0,r={},jQuery.each(e,(function(t,e){return"id"===e.name?n=e.value:"quantity"===e.name?s=e.value:"selling_plan"===e.name?r.selling_plan=e.value:e.name.match(/^properties\[[\w-_ ]*\]$/)?r[e.name]=e.value:void 0})),i.Core.addItem(n,s,i.Utils.unwrapKeys(r))},render:function(t,e){var n;return n={item_count:e.item_count,total_price:e.total_price,total_price_money:i.Utils.formatMoney(e.total_price,i.settings.moneyFormat,"money_format",null!=("undefined"!=typeof Currency&&null!==Currency?Currency.currentCurrency:void 0)?Currency.currentCurrency:void 0),total_price_money_with_currency:i.Utils.formatMoney(e.total_price,i.settings.moneyWithCurrencyFormat,"money_with_currency_format",null!=("undefined"!=typeof Currency&&null!==Currency?Currency.currentCurrency:void 0)?Currency.currentCurrency:void 0)},jQuery("[data-cart-render]").each((function(){var t;return(t=jQuery(this)).html(n[t.attr("data-cart-render")])}))}},"undefined"!=typeof rivets&&null!==rivets?(i.Rivets={model:null,boundViews:[],init:function(){return i.Rivets.bindViews()},destroy:function(){return i.Rivets.unbindViews()},bindViews:function(){return i.Utils.log("Rivets.js is present, binding views."),i.Rivets.unbindViews(),i.Rivets.model=i.Utils.extend({cart:i.cart},i.settings.rivetsModels),null!=window.Currency&&(i.Rivets.model.Currency=window.Currency),jQuery("[data-cart-view]").each((function(){var t;return t=rivets.bind(jQuery(this),i.Rivets.model),i.Rivets.boundViews.push(t)}))},unbindViews:function(){var t,e,n;for(t=0,e=(n=i.Rivets.boundViews).length;e>t;t++)n[t].unbind();return i.Rivets.boundViews=[]}},rivets.formatters.eq=function(t,e){return t===e},rivets.formatters.includes=function(t,e){return t.indexOf(e)>=0},rivets.formatters.match=function(t,e,i){return t.match(new RegExp(e,i))},rivets.formatters.lt=function(t,e){return e>t},rivets.formatters.gt=function(t,e){return t>e},rivets.formatters.not=function(t){return!t},rivets.formatters.empty=function(t){return!t.length},rivets.formatters.plus=function(t,e){return parseInt(t)+parseInt(e)},rivets.formatters.minus=function(t,e){return parseInt(t)-parseInt(e)},rivets.formatters.times=function(t,e){return t*e},rivets.formatters.divided_by=function(t,e){return t/e},rivets.formatters.modulo=function(t,e){return t%e},rivets.formatters.prepend=function(t,e){return e+t},rivets.formatters.append=function(t,e){return t+e},rivets.formatters.slice=function(t,e,i){return t.slice(e,i)},rivets.formatters.pluralize=function(t,e,n){return null==n&&(n=e+"s"),i.Utils.isArray(t)&&(t=t.length),1===t?e:n},rivets.formatters.array_element=function(t,e){return t[e]},rivets.formatters.array_first=function(t){return t[0]},rivets.formatters.array_last=function(t){return t[t.length-1]},rivets.formatters.money=function(t,e){return i.Utils.formatMoney(t,i.settings.moneyFormat,"money_format",e)},rivets.formatters.money_with_currency=function(t,e){return i.Utils.formatMoney(t,i.settings.moneyWithCurrencyFormat,"money_with_currency_format",e)},rivets.formatters.weight=function(t){switch(i.settings.weightUnit){case"kg":return(t/1e3).toFixed(i.settings.weightPrecision);case"oz":return(.035274*t).toFixed(i.settings.weightPrecision);case"lb":return(.00220462*t).toFixed(i.settings.weightPrecision);default:return t.toFixed(i.settings.weightPrecision)}},rivets.formatters.weight_with_unit=function(t){return rivets.formatters.weight(t)+i.settings.weightUnit},rivets.formatters.product_image_size=function(t,e){return i.Utils.getSizedImageUrl(t,e)},rivets.formatters.moneyWithCurrency=rivets.formatters.money_with_currency,rivets.formatters.weightWithUnit=rivets.formatters.weight_with_unit,rivets.formatters.productImageSize=rivets.formatters.product_image_size):i.Rivets={init:function(){},destroy:function(){}},i.factory=function(t){return t.init=i.init,t.configure=i.configure,t.cart=i.cart,t.settings=i.settings,t.getCart=i.Core.getCart,t.addItem=i.Core.addItem,t.addItems=i.Core.addItems,t.updateItem=i.Core.updateItem,t.updateItemById=i.Core.updateItemById,t.updateItemQuantitiesById=i.Core.updateItemQuantitiesById,t.removeItem=i.Core.removeItem,t.removeItemById=i.Core.removeItemById,t.clear=i.Core.clear,t.getAttribute=i.Core.getAttribute,t.setAttribute=i.Core.setAttribute,t.getAttributes=i.Core.getAttributes,t.setAttributes=i.Core.setAttributes,t.clearAttributes=i.Core.clearAttributes,t.getNote=i.Core.getNote,t.setNote=i.Core.setNote,t.render=i.Data.render},"object"==typeof exports?i.factory(exports):"function"==typeof define&&define.amd?define(["exports"],(function(t){return i.factory(this.CartJS=t),t})):i.factory(this.CartJS={})}.call(this);