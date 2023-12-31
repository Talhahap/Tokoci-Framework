/**
 * This is main script file that contains JS code.
 */

/*============================================================================*/
/* Place any jQuery/helper plugins in here.
/*============================================================================*/
/**
 * The below expression is a jQuery function call:
 * $(...);
 * Which is the "jQuery function". $ is a function, and $(...) is you calling
 * that function. The first parameter we've supplied is the following
 * `function() {}`. The parameter is a function that you specific, and the '$'
 * function will call the supplied method when the DOM finishing loading.
 * $(function() { ... }) is also jQuery short-hand for
 * $(document).ready(function() { ... });
 */
$(function () {

    // Initialize NProgress
    NProgress.configure({ showSpinner: false });
    // Bind Scroll Up plugin to all pages
    $.scrollUp({
        scrollName: 'topScroll',
        scrollText: '<i class="fas fa-long-arrow-alt-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade',
        zIndex: 100,
    });

    // Bind this plugin on Product `Detail` page
    $('#zoom-pro').elevateZoom({
        gallery: 'gallery',
        galleryActiveClass: 'active',
        borderSize: 1,
        zoomWindowWidth: 540,
        zoomWindowHeight: 540,
        zoomWindowOffetx: 10,
        borderColour: '#e9e9e9',
    });

    // For `modals` we don't want to enable `zoom window`.
    $('#zoom-pro-quick-view').elevateZoom({
        gallery: 'gallery-quick-view',
        galleryActiveClass: 'active',
        zoomEnabled: false, // false disables zoomwindow from showing
    });

    // Bind resize select on mid header
    $('#select-category', document).ResizeSelect();
    $('.select-hide').removeClass('select-hide');

    // Bind mega menu plugin
    $('.v-menu', document).MegaMenuDropDowns();

    // Bind Countdown Timer to all sections
    $('.section-timing-wrapper.dynamic', document).CountDown();
});
/*============================================================================*/
/* Global JavaScript functions
/*============================================================================*/
(function ($, window, document) {
    'use strict';
    // ------------- Variables for Reusability and Performance ---------------
    // Performance of jQuery selectors vs local variables
    // https://jsperf.com/caching-jquery-selectors
    let $vMenu = $('.v-menu');
    let mode = '';
    let bigScreenFlag = Number.MAX_VALUE;
    let smallScreenFlag = 1;
    // ------------------------Back Drop Arena ---------------------------
    let listItembackDropFlag = false;
    let $backDrop;
    let $searchFormWrapper;
    let $searchFormElement;
    let $allListItemsForHover = $('.js-backdrop');
    // ------------------------Back Drop Arena End ---------------------------
    // Object Settings
    let settings = {
        bodyBackDropOnScenes: true,
        zIndexNumber: 999998
    };

    /**
     * return the window's width
     * @return {Number|number}
     */
    const windowWidth = function () {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    };

    /**
     * @param {jquery} element  - display back drop
     */
    const showBackDrop = function (element) {
        element.css('display', 'block').on('click', function () {
            $(this).css('display', '');
        });
    };

    /**
     * @param {jquery} element  - remove back drop
     */
    const removeBackDrop = function (element) {
        element.css('display', '');
    };

    /**
     * Attach Click Event on Search Button
     */
    const attachClickOnResponsiveSearchForm = function () {
        $('#responsive-search').on('click', function () {
            $('.responsive-search-wrapper').stop(true, true).fadeIn();
        });

        $('#responsive-search-close-button').on('click', function () {
            $('.responsive-search-wrapper').stop(true, true).fadeOut();
        });
    };

    /**
     * Attach Click Event on Mini Cart Anchor
     */
    const attachClickOnMiniCart = function () {
        //  let $href = $('#mini-cart-trigger'.attr('href');
        //   window.location.href = $href; //causes the browser to refresh and
        // load the requested url
        // $('#mini-cart-trigger').on('click', function () {
        //     $('.mini-cart-wrapper').addClass('mini-cart-open');
        // });

        // $('#mini-cart-close').on('click', function () {
        //     $('.mini-cart-wrapper').removeClass('mini-cart-open');
        // });
    };

    /**
     * Attach Click Event on VMenu
     */
    const attachClickOnVMenu = function () {
        $('.v-title').on('click', function () {
            $vMenu.toggleClass('v-close');
        });
    };

    /**
     * Its a function that is bind to Mega Menu List items with event mouseenter
     */
    const MouseEnterFunctionForMegaMenu = function () {
        // I also Hope elements are appropriate assign
        $vMenu.css({ 'z-index': settings.zIndexNumber });
        // Show Back Drop
        showBackDrop($backDrop);
    };
    /**
     * Its a function that is bind to Mega Menu List items with event mouseleave
     */
    const MouseLeaveFunctionForMegaMenu = function () {
        // I also Hope elements are appropriate assign
        $vMenu.css({ 'z-index': '' });
        // Remove Back Drop
        removeBackDrop($backDrop);
    };

    /**
     * Hover on list items that have class `js-backdrop`
     */
    const hoverOnListItems = function () {
        $allListItemsForHover.on('mouseenter', MouseEnterFunctionForMegaMenu);
        $allListItemsForHover.on('mouseleave', MouseLeaveFunctionForMegaMenu);
    };
    /**
     * Hoveroff on list items that have class `js-backdrop`
     */
    const hoverOffListItems = function () {
        $allListItemsForHover.off('mouseenter');
        $allListItemsForHover.off('mouseleave');
    };

    /**
     * Backdrop only works on landscape mode this function will Check
     * if user wants to show or hide the backdrop
     */
    const mainBackDropManipulator = function () {
        if (settings.bodyBackDropOnScenes) {
            if (mode === 'landscape' && !listItembackDropFlag) {
                // If body has length equal to zero then it means our element is
                // not added, if it did'nt have length equal to zero then it
                // means our element is added.
                if ($('#app').find('.body-backdrop').length === 0) {
                    $('#app').append('<div class="body-backdrop"></div>\n');
                    // Assign Back Drop
                    $backDrop = $('div.body-backdrop');
                    // Input type Text
                    $searchFormElement = $('#search-landscape');
                    $searchFormWrapper = $('.form-searchbox');
                    $searchFormElement.focus(function () {
                        // I Hope elements are appropriate assign
                        $searchFormWrapper.css({ 'position': 'relative', 'z-index': settings.zIndexNumber });
                        // Show Back Drop
                        showBackDrop($backDrop);
                    }).blur(function () {
                        // I Hope elements are appropriate assign
                        $searchFormWrapper.css({ 'position': '', 'z-index': '' });
                        // Remove Back Drop
                        removeBackDrop($backDrop);
                    });
                    // First Time invocation
                    // HoverOn list items that have class `js-backdrop`
                    hoverOnListItems();
                    // Flag is set to true
                    listItembackDropFlag = true;
                }
            }

            if (mode === 'landscape' && listItembackDropFlag) {
                // It means hover is On
                hoverOnListItems();
            } else if (mode === 'portrait' && listItembackDropFlag) {
                // Hover is Off
                hoverOffListItems();
            }
        }

    };
    /**
     * Manually Restart Pace-js when we change any tab.
     */
    const manuallyRestartProgress = function () {
        // Specificity = 2
        $('a[data-toggle="tab"]').on('shown.bs.tab', function () {
            // Shows the progress bar
            NProgress.start();
            // Completes the progress
            NProgress.done();
        });
    };
    /**
     * Attach Click Event on Quantity buttons
     */
    const attachClickQuantityButton = function () {
        let $currentTextField, currentVal;
        $('.plus-a').each(function () {
            $(this).on('click', function () {
                let $currentTextField = $(this).prev();
                let currentVal = parseInt($currentTextField.val());
                /*
                 * Format values
                 * In JS if variable is not converted to number then by default variable is NaN.
                 * We known JS has Truthy & Falsey values.
                 * By default NaN (e.g. the result of 1/0) is false so its convert to true and expression
                 * becomes true.
                 */
                if (!currentVal || currentVal === '' || currentVal === 'NaN' || currentVal === 0) {
                    // if value is NaN
                    $currentTextField.val(1);
                }
                // Compare and add 1 if the condition is satisfy
                else if (currentVal < $(this).data('max')) {
                    $currentTextField.val(currentVal + 1);
                }
            });
        });
        $('.minus-a').each(function () {
            $(this).on('click', function () {
                $currentTextField = $(this).closest('div').find('input');
                currentVal = parseInt($currentTextField.val());
                /*
                 * Format values
                 * In JS if variable is not convert to number then by default variable is NaN.
                 * We known JS has Truthy & Falsey values.
                 * By default NaN (e.g. the result of 1/0) is false so its convert to true and expression
                 * becomes true.
                 */
                if (!currentVal || currentVal === '' || currentVal === 'NaN' || currentVal === 0) {
                    // if value is NaN
                    $currentTextField.val(1);
                }
                // Compare and minus 1 if the condition is satisfy
                else if (currentVal > $(this).data('min')) {
                    $currentTextField.val(currentVal - 1);
                }
            });
        });
    };

    /**
     * Window Resize Breakpoint Function
     */
    const windowResizeBreakpoint = function () {
        if (windowWidth() <= 991 && bigScreenFlag > 991) {
            // Assign on which mode we are
            mode = 'portrait';
            // Backdrop Manipulator on PORTRAIT
            mainBackDropManipulator();
        }

        if (windowWidth() > 991 && smallScreenFlag <= 991) {
            // Assign on which mode we are
            mode = 'landscape';
            // Backdrop Manipulator on LANDSCAPE
            mainBackDropManipulator();
        }
        bigScreenFlag = windowWidth();
        smallScreenFlag = windowWidth();
    };

    /**
     * Resize event
     */
    $(window).resize(function () {
        // Window Resize Breakpoint Function
        windowResizeBreakpoint();
    });


    /**
     * Only One Time Execution Ready event Check DOM elements if all loaded
     */
    $(function () {
        //  Attach Click Event on Search Button
        attachClickOnResponsiveSearchForm();
        //  Attach Click Event on Mini Cart Anchor
        attachClickOnMiniCart();
        // Attach Click Event on VMenu
        attachClickOnVMenu();
        // Manually Restart Pace-js when we change any tab
        manuallyRestartProgress();
        // Attach Click Event on Quantity buttons
        attachClickQuantityButton();
        // Window Resize Breakpoint Function
        windowResizeBreakpoint();
    });
})(jQuery, window, document);

/*============================================================================*/
/* Homepage JavaScript functions
/*============================================================================*/
(function ($, window, document) {
    'use strict';
    /**
     * Shows Newsletter Modal After 5sec = 5000milliseconds
     */
    const showNewsletterModal = function () {
        setTimeout(function () {
            // Manually opens a modal
            $('#newsletter-modal').modal('show');
        }, 5000);
    };
    /**
     * Initialize Main Slider
     */
    const sliderMain = function () {
        let $owl = $('.slider-main');
        $owl.owlCarousel({
            items: 1,
            autoplay: true,
            autoplayTimeout: 8000,
            loop: false,
            dots: false,
            rewind: true, // Go backwards when the boundary has reached
            nav: true,// Show next/prev buttons
            //   navContainerClass: 'owl-nav' by default,
            navElement: 'div',
            navClass: ['main-slider-previous', 'main-slider-next'],// Add these classes on navElement
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'], // by default text prev, next will not show
        });

    };
    /**
     * Initialize owl-carousel for all product-place section on page
     */
    const productSlider = function () {
        // Get Collection of all Product Slider
        let $productsSlider = $('.products-slider');
        $productsSlider.on('initialize.owl.carousel', function () {
            $(this).closest('.slider-fouc').removeAttr('class');
        }).each(function () {
            let thisInstance = $(this);
            let itemPerLine = thisInstance.data('item');
            thisInstance.owlCarousel({
                autoplay: false,
                loop: false,
                dots: false,
                rewind: true,
                nav: true,
                navElement: 'div',
                navClass: ['product-slider-previous', 'product-slider-next'],
                navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
                responsive: {
                    0: {
                        items: 1,
                    },
                    768: {
                        items: itemPerLine - 2,
                    },
                    991: {
                        items: itemPerLine - 1,
                    },
                    1200: {
                        items: itemPerLine,
                    },
                }
            });
        });
    };
    /**
     * Initialize owl-carousel for all Specific Category section on page
     */
    const SpecificCategorySlider = function () {
        // Get Collection of all Product Slider
        let $specificCategorySlider = $('.specific-category-slider');
        $specificCategorySlider.on('initialize.owl.carousel', function () {
            $(this).closest('.slider-fouc').removeAttr('class');
        }).each(function () {
            let thisInstance = $(this);
            let itemPerLine = thisInstance.data('item');
            thisInstance.owlCarousel({
                autoplay: false,
                loop: false,
                dots: false,
                rewind: true,
                nav: true,
                navElement: 'div',
                navClass: ['specific-category-slider-previous', 'specific-category-slider-next'],
                navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
                responsive: {
                    0: {
                        items: 1,
                    },
                    768: {
                        items: 2,
                    },
                    991: {
                        items: itemPerLine - 1,
                    },
                    1200: {
                        items: itemPerLine,
                    },
                }
            });
        });
    };
    /**
     * On Product Slider Tabs: If content is hidden, Owl-carousel refuses to get the dimensions,
     * Sounds like because by default un-active `tab` is set to "display: none"
     * so it can't get the dimensions. Thus we Manually refresh the position on tab change.
     */
    const onTabChangeRefreshPositionOfCarousel = function () {
        // When showing a new tab, the events fire.
        // Specificity = 2
        $('.section-maker [data-toggle="tab"]').on('shown.bs.tab', function (e) {
            // Get the current click id of tab
            let $currentID = $(e.target).attr('href');
            // Trigger refresh `event` to current active `tab`
            $($currentID + '.active').children().trigger('refresh.owl.carousel');
        });

    };
    /**
     * Initialize owl-carousel for brand slider
     */
    const brandSlider = function () {
        let thisInstance = $('.brand-slider-content');
        let itemPerLine = thisInstance.data('item');
        thisInstance.owlCarousel({
            autoplay: true,
            autoplayTimeout: 8000,
            loop: false,
            dots: false,
            rewind: true,
            nav: true,
            navElement: 'div',
            navClass: ['brand-slider-previous', 'brand-slider-next'],
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            responsive: {
                0: {
                    items: 1,
                },
                768: {
                    items: 3,
                },
                991: {
                    items: itemPerLine,
                },
                1200: {
                    items: itemPerLine,
                },
            }
        });
    };



    $(function () {
        sliderMain();
        productSlider();
        SpecificCategorySlider();
        onTabChangeRefreshPositionOfCarousel();
        brandSlider();
    });

    /**
     * Check everything including DOM elements and images loaded
     */
    $(window).on('load', function () {
        showNewsletterModal();
        $('.ph-item').removeClass('ph-item');
    });

})(jQuery, window, document);

/*============================================================================*/
/* Contact-page JavaScript functions
/*============================================================================*/
(function ($, window, document) {
    'use strict';
    /**
     * GoogleMap Init
     */
    const googleinitMap = function () {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        let mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 11,
            scrollwheel: false,
            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(37.393322, -122.023780),
        };
        // Get the HTML DOM element that will contain your map
        // We are using a div with id="map" seen below in the <body>
        let mapElement = document.getElementById('map');
        // Create the Google Map using our element and options defined above
        let map = new google.maps.Map(mapElement, mapOptions);
        // Let's also add a marker while we're at it
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(37.393322, -122.023780),
            map: map,
        });
    };


    $(function () {
        // GoogleMap Init
        if ($('#map').length !== 0) {
            try {
                google.maps.event.addDomListener(window, 'load', googleinitMap);
            } catch (e) {
                console.log('"Google Maps" refused to connect!');
            }
        }
    });

})(jQuery, window, document);


/*============================================================================*/
/* Product-Detail-page JavaScript functions
/*============================================================================*/
(function ($, window, document) {
    'use strict';
    //  Variables
    let $ratingField = $('#your-rating-value');
    let $starWidth = $('#your-stars');
    let $starComment = $('#star-comment');



    /**
     * Rating Stars Control
     */
    const ratingStarsControl = function () {
        let oneStarWidth = 15; // 15 * 5 = 75
        let newStarWidth;
        let ratingthresholdNumber = 5;
        let comment;
        let currentVal;
        // On Every key type
        $ratingField.on('keyup', function () {
            // Reset Star Width
            $starWidth.css('width', 0);
            // Reset Comment
            $starComment.text('');
            // Always remember when when you enter any number and immediately enter some strings then parseFloat
            // function will truncate those strings and just only parse number so that's why i'm using this
            // check isNumeric
            if ($.isNumeric($ratingField.val())) {
                currentVal = parseFloat($ratingField.val());
            } else {
                currentVal = NaN;
            }
            /*
             * Format values
             * In JS if variable is not convert to number then by default variable is NaN.
             * We known JS has Truthy & Falsey values.
             * By default NaN (e.g. the result of 1/0) is false so its convert to true and expression
             * becomes true.
             */
            if (!currentVal || currentVal === '' || currentVal === 'NaN' || currentVal === 0) {
                // if value is NaN
                currentVal = 0;
                $starWidth.css('width', 0);
                $starComment.text('');
            } else {
                if ((currentVal >= 1) && (currentVal <= ratingthresholdNumber)) {

                    if (currentVal === 1) {
                        comment = 'I hate it.';
                    }
                    else if (currentVal === 2) {
                        comment = "I don't like it.";
                    }
                    else if (currentVal === 3) {
                        comment = "It's OK.";
                    }
                    else if (currentVal === 4) {
                        comment = "I like it.";
                    }
                    else if (currentVal === 5) {
                        comment = "It's Perfect.";
                    }
                    // Precise Float value to only one decimal. example: 2.454544 to 2.5
                    currentVal = currentVal.toFixed(1);
                    // Manipulate Stars Width
                    newStarWidth = oneStarWidth * currentVal;
                    // Remove decimals from a variable, Convert float value to downward
                    newStarWidth = Math.floor(newStarWidth);
                    // Update Star Width
                    $starWidth.css('width', newStarWidth);
                    // Add Comment
                    $starComment.text(comment);
                }
            }
        });

    };



    $(function () {
        // Rating Stars Control
        ratingStarsControl();
    });

})(jQuery, window, document);

/*============================================================================*/
/* Shop-page JavaScript functions
/*============================================================================*/
(function ($, window, document, undefined) {
    'use strict';
    //  Variables
    let $shopProductContainer = $('.product-container');
    let $searchFetchAllbtn = $('.fetch-categories ul > li > button');


    /**
     * Price Range Slider
     */
    const priceRangeSlider = function () {
        $('.price-slider-range').each(function () {
            // Get original minimum data value
            let queryMin = parseFloat($(this).data('min'));
            // Get original maximum data value
            let queryMax = parseFloat($(this).data('max'));
            // Get currency unit
            let currecyUnit = $(this).data('currency');
            // Get default minimum data value
            let defaultLow = parseFloat($(this).data('default-low'));
            // Get default maximum data value
            let defaultHigh = parseFloat($(this).data('default-high'));
            // Taking this
            let $instance = $(this);
            // Plugin invocation
            $('.price-filter').slider({
                range: true,
                min: queryMin,
                max: queryMax,
                values: [defaultLow, defaultHigh],
                slide: function (event, ui) {
                    let result = '<div class="price-from">' + currecyUnit + ui.values[0] + '</div>\n<div class="price-to">' + currecyUnit + ui.values[1] + '</div>\n';
                    $instance.parent().find('.amount-result').html(result);
                }
            });


        });
    };
    /**
     * Attach Click event to Grid & List
     */
    const attachClickGridAndList = function () {
        $('#list-anchor').on('click', function () {
            $(this).addClass('active');
            $(this).next().removeClass('active');
            $shopProductContainer.removeClass('grid-style');
            $shopProductContainer.addClass('list-style');
        });
        $('#grid-anchor').on('click', function () {
            $(this).addClass('active');
            $(this).prev().removeClass('active');
            $shopProductContainer.removeClass('list-style');
            $shopProductContainer.addClass('grid-style');
        });
    };
    /**
     * All Categories Functionality
     */
    const searchFetchAllCategoriesFunctionality = function () {
        $searchFetchAllbtn.on('click', function () {
            $(this).toggleClass('js-open');
            $(this).next('ul').stop(true, true).slideToggle();
        });
    };
    /**
     * Bind Slim Scroll Plugin to Associates Filters
     */
    const bindScrollWithAssociateFilters = function () {
        $('.associate-wrapper').each(function () {
            $(this).slimScroll({
                height: 'auto',
                railClass: 'grooverScrollRail',// default CSS class of the slimscroll rail
                barClass: 'grooverScrollBar',// default CSS class of the slimscroll bar
                wrapperClass: 'grooverScrollDiv',// default CSS class of the slimscroll wrapper
            });
        });
    };

    $(function () {
        // Price Range Slider
        priceRangeSlider();
        // Attach Click event to Grid & List
        attachClickGridAndList();
        // Bind Slim Scroll Plugin to Associates Filters
        bindScrollWithAssociateFilters();
        // All Categories Functionality
        searchFetchAllCategoriesFunctionality();
    });

})(jQuery, window, document);


// KERANJANG
$(document).ready(function () {

    // Deklarasi
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const removeButtons = document.querySelectorAll('.btn-remove-from-cart');
    var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1700,
        timerProgressBar: true,
    })
    // End Deklarasi

    // Fungsi untuk menambahkan produk ke keranjang
    function addToCart(productId) {
        $.ajax({
            url: "/add-to-cart",
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken
            },
            data: { productId: productId },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    updateCartItemCount(response.cartItemCount);
                    Toast.fire({
                        icon: 'success',
                        title: 'Dimasukkan ke Keranjang'
                    });
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Error!'
                    })
                }
            }
        });
    }

    // Fungsi untuk menghapus produk dari keranjang
    function removeFromCart(productId) {
        Swal.fire({
            title: 'Yakin ingin menghapus?',

            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Batal',
            confirmButtonText: 'Ya Hapus'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/remove-from-cart",
                    type: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': csrfToken
                    },
                    data: { productId: productId },
                    dataType: 'json',
                    success: function (response) {
                        if (response.success) {
                            updateCartItemCount(response.cartItemCount);
                            removeCartItem(productId);
                            if (response.cartItemCount === 0) {
                                var tbody = document.getElementById('tbodyId');
                                var row = '<tr class="text-center">';
                                row += '<td colspan="5">Tidak Ada Data</td>';
                                row += '</tr>';
                                tbody.innerHTML += row;
                                $('.coupon-continue-checkout').empty();
                            }
                        } else {
                            Toast.fire({
                                icon: 'error',
                                title: 'Error!'
                            })
                        }
                    }
                });
            }
        })

    }

    // Fungsi untuk mengupdate produk dari keranjang
    function updateCartItemCount(count) {
        const cartItemCountElement = document.getElementById('cart-item-count');

        if (cartItemCountElement) {
            cartItemCountElement.innerText = count;
        } else {
            const newElement = document.createElement('span');
            newElement.id = 'cart-item-count';
            newElement.innerText = count;

            const parentElement = document.querySelector('p');
            parentElement.appendChild(newElement);
        }
    }

    // Button klik hapus
    function removeCartItem(productId) {
        const cartItemElement = document.querySelector(`tr[data-product-id="${productId}"]`);
        if (cartItemElement) {
            cartItemElement.remove();
        }
    }

    // Update Cart
    function updateCartQuantity(productId, quantity) {
        $.ajax({
            url: "/decrease-quantity",
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken
            },
            data: { productId: productId, quantity: quantity },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    updateCartItemCount(response.cartItemCount);
                } else {
                    alert('Gagal memperbarui jumlah barang.');
                }
            },
            error: function () {
                alert('Terjadi kesalahan.');
            }
        });
    }

    function increaseQuantity(productId) {
        $.ajax({
            url: "/add-to-cart",
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken
            },
            data: { productId: productId },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    updateCartItemCount(response.cartItemCount);
                    const quantityElement = document.getElementById('qty2_' + productId);
                    const quantityElement2 = document.getElementById('qty_' + productId);
                    let quantity = parseInt(quantityElement.value);
                    quantity++;
                    quantityElement.value = quantity;
                    quantityElement2.value = quantity;
                    updateSubtotal(productId);
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Error!'
                    })
                }
            }
        });
    }

    function decreaseQuantity(productId) {
        const quantityElement = document.getElementById('qty2_' + productId);
        const quantityElement2 = document.getElementById('qty_' + productId);
        let quantity = parseInt(quantityElement.value);
        quantity--;
        if (quantity >= 1) {
            quantityElement.value = quantity;
            quantityElement2.value = quantity;
            updateSubtotal(productId);
            updateCartQuantity(productId, quantity);
        } else {
            removeFromCart(productId);
        }
    }

    function updateSubtotal(productId) {
        const productPrice = parseInt(document.getElementById('cart-price_' + productId).value);
        const quantity = parseInt(document.getElementById('qty2_' + productId).value);
        const subtotal = productPrice * quantity;
        const viewSubtotal = document.getElementById('viewsubtotal_' + productId);
        viewSubtotal.innerHTML = subtotal.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    if (window.location.pathname === '/cart') {
        const myElement = $("#cart-items").get(0);

        myElement.addEventListener("click", function (event) {
            const target = event.target;
            const productId = $(target).closest("tr").attr("data-product-id");

            if ($(target).hasClass("btn-increase-quantity")) {
                increaseQuantity(productId);
            } else if ($(target).hasClass("btn-decrease-quantity")) {
                decreaseQuantity(productId);
            }
        });
    }

    addToCartButtons.forEach(button => {
        const productId = button.getAttribute('data-product-id');
        button.addEventListener('click', () => addToCart(productId));
    });

    // Menambahkan event listener ke setiap tombol "Hapus"
    removeButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Mencegah tindakan default formulir

            const productId = button.getAttribute('data-product-id');
            removeFromCart(productId);
        });
    });


    // Cek uuid
    function isUUID(uuid) {
        var pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return pattern.test(uuid);
    }
    // Add to cart Rakit PC
    $('#btn-addtocart-rakit').on("click", function () {
        var mobo = document.getElementById('selMobo').value;
        var processor = document.getElementById('selProce').value;
        var ram = document.getElementById('selRam').value;
        var ssd = document.getElementById('selSsd').value;
        var hardisk = document.getElementById('selHdd').value;
        var casing = document.getElementById('selCase').value;
        var cooler = document.getElementById('selCooler').value;
        var vga = document.getElementById('selVga').value;
        var psu = document.getElementById('selPsu').value;

        var listData = [mobo, processor, ram, ssd, hardisk, casing, cooler, vga, psu];
        var dataArray = [];
        for (let index = 0; index < listData.length; index++) {
            if (isUUID(listData[index])) {
                dataArray.push(listData[index]);
            }
        }
        $.ajax({
            url: "/add-to-cart-rakit",
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken
            },
            data: { dataArray: dataArray },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    updateCartItemCount(response.cartItemCount);
                    Toast.fire({
                        icon: 'success',
                        title: 'Dimasukkan ke Keranjang'
                    });
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Error!'
                    })
                }
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText); // Menampilkan pesan kesalahan ke konsol
            }
        });

    });

});