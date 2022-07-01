function ProductSubscription(t,i){this.$element=$(i),this.index=t,this.selectors={purchaseOptions:"input[ name='purchase_option' ]",sellingPlans:"input[ name='selling_plan' ]",subGroup:".sub-group"},this.initialize()}function QuantitySelector(t,i){this.$element=$(i),this.index=t,this.selectors={input:".quantity-selector__input",plus:".quantity-selector__plus",minus:".quantity-selector__minus",count:".quantity-selector__count",unit:".quantity-selector__unit"},this.initialize()}ProductSubscription.prototype=Object.assign({},ProductSubscription.prototype,{initialize:function(){this.$purchaseOptions=this.$element.find(this.selectors.purchaseOptions),this.$sellingPlans=this.$element.find(this.selectors.sellingPlans),this.$subGroup=this.$element.find(this.selectors.subGroup),this.$purchaseOptions.on("change",this._handlePurchaseOptionsChange.bind(this))},_handlePurchaseOptionsChange:function(t){const i=t.target.value,e=!Boolean(i);console.log(this.$subGroup),this.$subGroup.toggleClass("is-selected"),this.$sellingPlans.prop("disabled",e)}}),$(".subscription").each((function(t,i){new ProductSubscription(t,i)})),QuantitySelector.prototype=Object.assign({},QuantitySelector.prototype,{initialize:function(){const t=this.$element.data("min");this.min=""!=t?parseInt(t):1,this.$input=this.$element.find(this.selectors.input),this.$plus=this.$element.find(this.selectors.plus),this.$minus=this.$element.find(this.selectors.minus),this.$count=this.$element.find(this.selectors.count),this.$unit=this.$element.find(this.selectors.unit),this.$plus.on("click",this._handlePlus.bind(this)),this.$minus.on("click",this._handleMinus.bind(this))},_updateQuantifier:function(t){const i=this.$unit.data("single"),e=this.$unit.data("plural");let s=i||this.$unit.text();t>1&&(s=e||`${i}s`),this.$unit.text(s)},_updateQuantity:function(t){this.$input.val(t),this.$count.text(t),this._updateQuantifier(t)},_handlePlus:function(t){const i=parseInt(this.$input.val());this._updateQuantity(i+1)},_handleMinus:function(t){const i=parseInt(this.$input.val());i>this.min&&this._updateQuantity(i-1)}}),$(".quantity-selector").each((function(t,i){new QuantitySelector(t,i)}));class ProductForm extends HTMLElement{constructor(){super(),this.form=this.querySelector("form"),this.form.addEventListener("submit",this.onSubmitHandler.bind(this)),this.cartNotification=document.querySelector("cart-notification")}onSubmitHandler(t){t.preventDefault(),this.cartNotification.setActiveElement(document.activeElement);const i=this.querySelector('[type="submit"]');i.setAttribute("disabled",!0),i.classList.add("loading");const e=JSON.stringify({...JSON.parse(serializeForm(this.form)),sections:this.cartNotification.getSectionsToRender().map((t=>t.id)),sections_url:window.location.pathname});fetch(`${routes.cart_add_url}`,{...fetchConfig("javascript"),body:e}).then((t=>t.json())).then((t=>{this.cartNotification.renderContents(t)})).catch((t=>{console.error(t)})).finally((()=>{i.classList.remove("loading"),i.removeAttribute("disabled")}))}}customElements.define("product-form",ProductForm);