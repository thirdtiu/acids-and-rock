/**
 * The VariantSelector component is used to set variants
 * @param {number} index 
 * @param {HTMLElement} element 
 */
function VariantSelector( index, element ) {
  this.$element = $( element );
  this.index = index;

  this.selectors = {
    variantOptions : "input[ name='id' ]",
    optionsContainer : ".product__radio",
    subPurchaseClass : ".subscription-purchase",
    oneTimePurchaseClass : ".one-time-purchase",
    subGroupPrice : ".sub-group__price",
    formContainer: ".product__form",
    selectedSubGroup: ".sub-group.is-selected",
    quantityCount : ".quantity-selector__input",
    buttonPrice: ".price-item"

  }

  this.initialize();
}

VariantSelector.prototype = Object.assign({}, VariantSelector.prototype, {

  initialize : function() {
    this.$variantOptions = this.$element.find( this.selectors.variantOptions );
    this.$optionsContainer = this.$element.find( this.selectors.optionsContainer );
    this.$subPurchase = this.$element
      .closest( this.selectors.formContainer )
      .find( this.selectors.subPurchaseClass );
    this.$oneTimePurchase = this.$element
      .closest( this.selectors.formContainer )
      .find( this.selectors.oneTimePurchaseClass );
    
    this.$variantOptions.on( "change", this._handleVariantChange.bind( this ) );
  },

  _handleVariantChange : function ( event ) {
    const subscriptionPrice = $( event.target ).data( "sub-price" );
    const oneTimePrice = $( event.target ).data( "price" );

    this._setDataValues( subscriptionPrice.replace( "$", "" ), oneTimePrice.replace( "$", "" ) );
    this._setTextValues( subscriptionPrice, oneTimePrice );
    this._setPrice( event );
  },

  _setDataValues : function ( subPurchasePrice, oneTimePurchasePrice, selectedPrice ) {
    const selectedSubGroup = this.$element
      .closest( this.selectors.formContainer )
      .find( this.selectors.selectedSubGroup );

    // set data values
    this.$subPurchase.data( "price", subPurchasePrice);
    this.$oneTimePurchase.data( "price", oneTimePurchasePrice);
    this.$element
      .closest( this.selectors.formContainer )
      .find( "form" )
      .data( "selected-price", selectedSubGroup.data( "price" ) );
  },

  _setTextValues : function( subscriptionPrice, oneTimePrice ) {
    // set text values
    this.$subPurchase.find( this.selectors.subGroupPrice ).text( subscriptionPrice );
    this.$oneTimePurchase.find( this.selectors.subGroupPrice ).text( oneTimePrice );
  },

  _setPrice : function ( event ) {
    const selectedSubGroup = this.$element
      .closest( this.selectors.formContainer )
      .find( this.selectors.selectedSubGroup );
    const currentQuantity = this.$element
      .closest( this.selectors.formContainer )
      .find( this.selectors.quantityCount )
      .val();
    const selectedPrice = selectedSubGroup.data( "price" );
    const newPrice = selectedPrice * currentQuantity;

    this.$element
      .closest( this.selectors.formContainer )
      .find( this.selectors.buttonPrice )
      .text( "$" + newPrice.toFixed( 2 ) );
    
  }
});

$(".product__variant-wrapper").each(function (index, element) {
  const variantSelector = new VariantSelector(index, element);
});

/**
 * The ProductSubscription component is used to set selling plans.
 * @param {number} index 
 * @param {HTMLElement} element 
 */
function ProductSubscription(index, element) {
  this.$element = $(element);
  this.index = index;

  this.selectors = {
    purchaseOptions: "input[ name='purchase_option' ]",
    sellingPlans: "input[ name='selling_plan' ]",
    subGroup: ".sub-group",
    selectedSubGroup: ".sub-group.is-selected",
    formContainer: ".product__form",
    buttonPrice: ".price-item"
  }

  this.initialize();
}

ProductSubscription.prototype = Object.assign({}, ProductSubscription.prototype, {
  initialize: function () {
    this.$purchaseOptions = this.$element.find(this.selectors.purchaseOptions);
    this.$sellingPlans = this.$element.find(this.selectors.sellingPlans);
    this.$subGroup = this.$element.find(this.selectors.subGroup);
    this.$selectedSubGroup = this.$element.find( this.selectors.selectedSubGroup );

    this.$element
      .closest( this.selectors.formContainer )
      .find( "form" )
      .data( "selected-price", this.$element.find( this.selectors.selectedSubGroup ).data( "price" ) );
    this.$element
      .closest( this.selectors.formContainer )
      .find( this.selectors.buttonPrice ).text( "$" + this.$selectedSubGroup.data( "price" ) );

    this.$purchaseOptions.on("change", this._handlePurchaseOptionsChange.bind(this));
  },

  _handlePurchaseOptionsChange: function (event) {
    const value = event.target.value;
    // Purchase is one time if value is empty.
    const isOneTime = !Boolean(value);
    const basePrice = $( event.target ).closest( this.selectors.subGroup ).data( "price" );
    const currentQuantity = this.$element
      .closest( this.selectors.formContainer )
      .find( "form" )
      .data( "current-quantity" );
    const newPrice = basePrice * currentQuantity;

    this.$subGroup.toggleClass('is-selected');
    // Disable selling plan inputs if one time.
    this.$sellingPlans.prop("disabled", isOneTime);
    this.$element
      .closest( this.selectors.formContainer )
      .find( "form" )
      .data( "selected-price", basePrice );
    this.$element
      .closest( this.selectors.formContainer )
      .find( this.selectors.buttonPrice ).text("$" + newPrice.toFixed( 2 ) );
  }
});

$(".subscription").each(function (index, element) {
  const subscription = new ProductSubscription(index, element);
});



/**
 * The QuantitySelector component is used to quantify a product via single decrements and increments.
 * @param {number} index 
 * @param {HTMLElement} element 
 */
function QuantitySelector(index, element) {
  this.$element = $(element);
  this.index = index;

  this.selectors = {
    input: ".quantity-selector__input",
    plus: ".quantity-selector__plus",
    minus: ".quantity-selector__minus",
    count: ".quantity-selector__count",
    unit: ".quantity-selector__unit",
    formContainer: ".product__form",
    buttonPrice: ".price-item"
  }

  this.initialize();
}

QuantitySelector.prototype = Object.assign({}, QuantitySelector.prototype, {
  initialize: function () {
    const min = this.$element.data("min");

    // If a min is provieded, use it.
    this.min = min != '' ? parseInt(min) : 1;

    this.$input = this.$element.find(this.selectors.input);
    this.$plus = this.$element.find(this.selectors.plus);
    this.$minus = this.$element.find(this.selectors.minus);
    this.$count = this.$element.find(this.selectors.count);
    this.$unit = this.$element.find(this.selectors.unit);

    this.$element
      .closest( this.selectors.formContainer )
      .find( "form" )
      .data( "current-quantity", 1 );

    this.$plus.on("click", this._handlePlus.bind(this));
    this.$minus.on("click", this._handleMinus.bind(this));
  },

  _updateQuantifier: function (value) {
    const singular = this.$unit.data("single");
    const plural = this.$unit.data("plural");
    // If there's no set singular text, use current text.
    let quantifier = singular ? singular : this.$unit.text();
    // If no plural text is provided, add an 's' by default.
    let pluralText = plural ? plural : `${singular}s`;

    // If there's more than 1, set quantifier to plural.
    if (value > 1) quantifier = pluralText;

    this.$unit.text(quantifier);
  },

  _updateQuantity: function (value) {
    // Update the input value.
    this.$input.val(value);

    // Update the visual count.
    this.$count.text(value);

    // Update the quantifier.
    this._updateQuantifier(value);
    
    // Update price on add to cart button
    this._updatePrice( value );
  },

  _updatePrice: function (value) {
    const basePrice = this.$element
      .closest( this.selectors.formContainer )
      .find( "form" )
      .data( "selected-price" );
    const newPrice = basePrice * value;

    this.$element
      .closest( this.selectors.formContainer )
      .find( "form" )
      .data( "current-quantity", value );
    
    this.$element
      .closest( this.selectors.formContainer )
      .find( this.selectors.buttonPrice ).text("$" + newPrice.toFixed( 2 ) );
    
  },

  _handlePlus: function (event) {
    const currentCount = parseInt(this.$input.val());

    this._updateQuantity(currentCount + 1);
  },

  _handleMinus: function (event) {
    const currentCount = parseInt(this.$input.val());

    // Only decrease count when it's greater than the minimum.
    if (currentCount > this.min)
      this._updateQuantity(currentCount - 1);
  }
});

$(".quantity-selector").each(function (index, element) {
  const quantitySelector = new QuantitySelector(index, element);
});



class ProductForm extends HTMLElement {
  constructor() {
    super();

    this.form = this.querySelector('form');
    this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
    this.cartNotification = document.querySelector('cart-notification');
  }

  onSubmitHandler(evt) {
    evt.preventDefault();
    this.cartNotification.setActiveElement(document.activeElement);

    const submitButton = this.querySelector('[type="submit"]');

    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('loading');

    const body = JSON.stringify({
      ...JSON.parse(serializeForm(this.form)),
      sections: this.cartNotification.getSectionsToRender().map((section) => section.id),
      sections_url: window.location.pathname
    });

    fetch(`${routes.cart_add_url}`, { ...fetchConfig('javascript'), body })
      .then((response) => response.json())
      .then((parsedState) => {
        this.cartNotification.renderContents(parsedState);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        submitButton.classList.remove('loading');
        submitButton.removeAttribute('disabled');
      });
  }
}

customElements.define('product-form', ProductForm);
