const { src, dest, watch } = require( "gulp" );
const sass = require( "gulp-sass" )( require( "sass" ) );
const cleanCSS = require( "gulp-clean-css" );
const rename = require( "gulp-rename" );


/**
 * Compiles sass files based on the given file pattern.
 * @param {string} filePattern - The file pattern that will be used for the blob.
 * @returns {Object}
 */
function compileSass( filePatterns ) {
    return src( filePatterns )
        .pipe( sass().on( "error", sass.logError ) )
        .pipe( cleanCSS() )
        .pipe( dest( "./assets" ) );
}

function transformSassToLiquidSnippet( filePatterns ) {
    return src( filePatterns )
        .pipe( sass().on( "error", sass.logError ) )
        .pipe( cleanCSS() )
        .pipe( rename( path => {
            // Change extension to liquid.
            path.extname = ".liquid";
        }) )
        .pipe( dest( "./snippets" ) );
}

// Create a function 
const compileThemeStyles = compileSass.bind( this, [
    "./styles/theme.scss",
    "./styles/header.scss",
    "./styles/footer.scss"
] );

const compileAndTransformQuickload = 
    transformSassToLiquidSnippet.bind( this, "./styles/quickload-css.scss" );


/**
 * Watches changes inside the styles folder.
 */
function watchStyles() {
    // Watch all files inside the styles folder (except for exclusions) and rebuild theme.css.
    watch( [ 
        "./styles/**/*.scss", 
        "!./styles/(quickload-css|footer|header).scss" 
    ], compileSass.bind( this, "./styles/theme.scss" ) );

    // Watch these files separately and only update what is necessary.
    watch( "./styles/footer.scss", compileSass.bind( this, "./styles/footer.scss" ) );
    watch( "./styles/header.scss", compileSass.bind( this, "./styles/header.scss" ) );
    watch( "./styles/quickload-css.scss", compileAndTransformQuickload );
}


exports.sass = compileThemeStyles;
exports.quickload = compileAndTransformQuickload;
exports.default = watchStyles;