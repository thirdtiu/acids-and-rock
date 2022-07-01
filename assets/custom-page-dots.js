function pageDotsSize(element, showOnly = false) {
  var scaleBase = 1.5;
  var selected = $(element).find(".flickity-page-dots").find('.is-selected');
  var loopCount = Math.ceil(selected.siblings().length);
  var showOnly = (!showOnly) ? loopCount : Math.floor(showOnly / 2);
  var selectedBefore = selected.prev();
  var selectedAfter = selected.next();
  var otherDots = $(element).find(".flickity-page-dots").find(".dot:not(.is-selected)");
  otherDots.attr("class", "dot");
  /* 
  var selectedDot = $(`<?xml version="1.0" encoding="UTF-8"?>
  <svg width="20px" height="21px" viewBox="0 0 20 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>Path 2 Copy 2</title>
      <g id="-" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Home" transform="translate(-711.000000, -1662.000000)" fill="#000000">
              <path d="M716.724816,1663.03502 C718.248588,1662.66813 722.319411,1661.41632 724.240911,1662.32304 C726.162412,1663.22975 727.815962,1663.03502 729.725554,1666.02607 C731.635146,1669.01711 730.832639,1670.80066 730.832639,1672.96247 C730.832639,1675.12428 729.039931,1679.6764 727.264307,1680.99974 C725.488682,1682.32309 724.588886,1682.68247 721.468271,1682.95319 C718.347656,1683.2239 715.778837,1682.32871 713.675082,1680.05242 C711.571327,1677.77612 710.129743,1673.61697 711.598967,1670.4295 C713.068191,1667.24203 715.201044,1663.40192 716.724816,1663.03502 Z" id="Path-2-Copy-2" transform="translate(721.000000, 1672.500000) scale(1, -1) translate(-721.000000, -1672.500000) "></path>
          </g>
      </g>
  </svg>`);
  
  var secondDot = $(`<?xml version="1.0" encoding="UTF-8"?>
  <svg width="17px" height="17px" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>Path 2 Copy</title>
      <g id="-" stroke="none" stroke-width="1" fill="#000000" fill-rule="evenodd">
          <g id="Home" transform="translate(-683.000000, -1664.000000)" stroke="#000000" stroke-width="4">
              <path d="M688.72113,1666.64073 C689.711582,1666.4136 692.357617,1665.63867 693.606592,1666.19997 C694.855568,1666.76128 695.930375,1666.64073 697.17161,1668.49233 C698.412845,1670.34393 697.891216,1671.44803 697.891216,1672.78629 C697.891216,1674.12456 696.725955,1676.94253 695.571799,1677.76175 C694.417643,1678.58096 693.832776,1678.80343 691.804376,1678.97102 C689.775976,1679.13861 688.106244,1678.58444 686.738803,1677.17531 C685.371363,1675.76617 684.434333,1673.19146 685.389329,1671.21826 C686.344324,1669.24507 687.730678,1666.86785 688.72113,1666.64073 Z" id="Path-2-Copy" transform="translate(691.500000, 1672.500000) scale(1, -1) translate(-691.500000, -1672.500000) "></path>
          </g>
      </g>
  </svg>`);
  
  var lastDot = $(`<?xml version="1.0" encoding="UTF-8"?>
  <svg width="12px" height="13px" viewBox="0 0 12 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>Path 2</title>
      <g id="-" stroke="none" stroke-width="1" fill="#000000" fill-rule="evenodd">
          <g id="Home" transform="translate(-661.000000, -1666.000000)" stroke="#000000" stroke-width="4">
              <path d="M665.289926,1668.44358 C665.899435,1668.28634 667.527764,1667.74985 668.296365,1668.13844 C669.064965,1668.52704 669.726385,1668.44358 670.490222,1669.72546 C671.254059,1671.00733 670.933056,1671.77171 670.933056,1672.6982 C670.933056,1673.62469 670.215973,1675.5756 669.505723,1676.14275 C668.795473,1676.7099 668.435554,1676.86392 667.187308,1676.97994 C665.939062,1677.09596 664.911535,1676.71231 664.070033,1675.73675 C663.228531,1674.7612 662.651897,1672.9787 663.239587,1671.61264 C663.827276,1670.24659 664.680417,1668.60082 665.289926,1668.44358 Z" id="Path-2" transform="translate(667.000000, 1672.500000) scale(1, -1) translate(-667.000000, -1672.500000) "></path>
          </g>
      </g>
  </svg>`); */

  // selected.html(selectedDot);

  for (let i = 1; i <= loopCount; i++) {
    const scale = scaleBase - ((scaleBase / loopCount) * i) + .4;
    const opacity = 1 - (i / 10);

    if (selectedBefore != 'no-before') {
      if (i == 1) selectedBefore.attr("class", "dot").addClass("previous-first");
      else if (i == 2) selectedBefore.attr("class", "dot").addClass("previous-second");
      else if (i == 3) selectedBefore.attr("class", "dot").addClass("previous-third");
      else if (i == 4) selectedBefore.attr("class", "dot").addClass("previous-fourth");

      // if( i == 1 ) {
      //     selectedBefore.html(secondDot.clone());
      // }

      // if( i == 2 ) {
      //     selectedBefore.html(lastDot.clone());
      // }

      // if( i > showOnly ) {
      //     selectedBefore.html("");
      // }

      selectedBefore = (selectedBefore.prev().length) ? selectedBefore.prev() : "no-before";
    }

    if (selectedAfter != 'no-after') {

      if (i == 1) selectedAfter.attr("class", "dot").addClass("next-first");
      else if (i == 2) selectedAfter.attr("class", "dot").addClass("next-second");
      else if (i == 3) selectedAfter.attr("class", "dot").addClass("next-third");
      else if (i == 4) selectedAfter.attr("class", "dot").addClass("next-fourth");

      // if( i == 1 ) {
      //     selectedAfter.html(secondDot.clone());
      // }

      // if( i == 2 ) {
      //     selectedAfter.html(lastDot.clone());
      // }

      // if( i > showOnly ) {
      //     selectedAfter.html("");
      // }

      selectedAfter = (selectedAfter.next().length) ? selectedAfter.next() : "no-after";
    }
  }
}