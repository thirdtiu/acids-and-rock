function BlogGrid( index, element ) {
    this.$element = $( element );
    this.index = index;

    this.selectors = {
      filters: '.blog-grid__filters',
      categories: ".blog-grid__categories input[name='categories[]']",
      tags: ".blog-grid__tags input[name='tags[]']",
      list: '.blog-grid__items.iso-grid',
      items: '.blog-grid__item',
    }

    this.initialize();
}

BlogGrid.prototype = Object.assign( {}, BlogGrid.prototype, {
    initialize: function() {
        this.$filters = this.$element.find( this.selectors.filters );
        this.$categories = this.$element.find( this.selectors.categories );
        this.$tags = this.$element.find( this.selectors.tags );
        this.$list = this.$element.find( this.selectors.list );

        this.$list.isotope({
            itemSelector: this.selectors.items,
            layoutMode: "fitRows"
        });

        this.$tags.on( "change", this._handleTagsChange.bind( this ) );
        this.$categories.on( "change", this._handleCategoriesChange.bind( this ) );
        this.$filters.on( "submit", this._handleFiltering.bind( this ) );

        // Check URL search params initially.
        this._checkURLSearchParams();
    },

    _setValues: function( $items, values ) {
        // Build the query for categories.
        const query = values.map( function( value ) {
            return `input[value="${ value }"]`;
        } ).join( ',' );

        const $matchedItems = $items.filter( query );

        // If a matching categories are found, set them as active.
        if( $matchedItems.length ) {
            // Remove checked status of the current categories.
            $items.prop( "checked", false );

            $matchedItems.prop( "checked", true );
        }
    },

    _setCategories: function( categories ) {
        this._setValues( this.$categories, categories );
    },

    _setTags: function( tags ) {
        this._setValues( this.$tags, tags );
    },

    _checkURLSearchParams: function() {
        const url = new URL( window.location.href );

        const categories = url.searchParams.get( "categories" );
        const tags = url.searchParams.get( "tags" );

        if( categories && categories.length ) this._setCategories( categories.split( ',' ) );
        if( tags && tags.length ) this._setTags( tags.split( ',' ) );

        if( categories || tags ) 
            this._filterItems( categories.split( ',' ), tags.split( ',' ) );
    },

    _updateURLSearchParams: function( categories, tags ) {
        const url = new URL( window.location.href );

        // Set category query parameter.
        if( categories.length ) {
            url.searchParams.set( "categories", categories.join( ',' ) );
        } else {
            url.searchParams.delete( "categories" );
        }

        // Set tags query parameter.
        if( tags.length ) {
            url.searchParams.set( "tags", tags.join( ',' ) );
        } else {
            url.searchParams.delete( "tags" );
        }

        // Update current history.
        history.replaceState( {}, document.title, url.toString() );
    },

    _filterItems: function( categories, tags ) {
        let queries = [];

        // Build categories and tags query.
        if( categories.length ) {
            queries = categories.map( function( category ) {
                let selector = `.category-${ category }`;
                let query = selector;

                if( tags.length ) {
                    query = tags.map( function( tag ) {
                        return `${ selector }.tag-${ tag }`;
                    }).join( ',' );
                }

                return query;
            } );
        } else {
            if( tags.length ) {
                queries = tags.map( function( tag ) {
                    return `.tag-${ tag }`;
                } );
            }
        }

        // If there are queries, use it to filter Isotope items.
        // Else, show all.
        this.$list.isotope({ 
            filter: queries.length ? queries.join( ',' ) : '*'
        });
    },

    _handleFiltering: function( event ) {
        const data = new FormData( event.target );
        const categories = data.getAll( "categories[]" );
        const tags = data.getAll( "tags[]" );

        // Prevent form submit.
        event.preventDefault();

        this._filterItems( categories, tags );

        // Update URL search params on every update.
        this._updateURLSearchParams( categories, tags );
    },

    _handleTagsChange: function( event ) {
        // Trigger filters form submit.
        this.$filters.submit();
    },

    _handleCategoriesChange: function( event ) {
        // Trigger filters form submit.
        this.$filters.submit();
    }
} );


$( document ).ready( function() {
    $( ".blog-grid" ).each( function( index, element ) {
        const blogGrid = new BlogGrid( index, element );
    } );
} )