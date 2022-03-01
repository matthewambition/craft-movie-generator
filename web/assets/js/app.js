/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

// Initialise Bootstrap Scripts
// ******************************************************************************
// Form validation
(function () {
  'use strict';

  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation'); // Loop over them and prevent submission

    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})(); // Toot tips


$(function () {
  $('.help-tooltip').tooltip();
}); // Movie Generator
// ******************************************************************************
// Variable for all details

var details = $('.date, .genre, .seasons, .score, .platform'); // When a different generator is clicked, a different source (data-type) is used

var source = $('.nav-item.active').data('source');
var load = 0;
var animComplete = 0;
var alertShown = 0; // Cleanup Function

function clear() {
  setTimeout(function () {
    $(details).empty();
    $('.star').removeClass('checked');
  }, 500);
} // If nothing is found, run this error function


function error() {
  clear();
  setTimeout(function () {
    $('.resultTitle').html('Uh oh... Nothing was found.');
  }, 500);
} // Random Movie Functions


function loadData(source) {
  $.ajax({
    type: 'GET',
    url: '../../uploads/api/' + source + '.json',
    // Prepend '/movie-generator' for web-ready version
    dataType: 'json',
    success: function success(data) {
      if (load == 0) {
        createFilters(data);
        load = 1;
      } else {
        randomiser(data);
      }
    }
  });
}

function createFilters(data) {
  // Clear filters
  $('#genreFilter, #dateFilter').empty(); // Create array of genres

  var genreArray = data.map(function (item) {
    return item.genre;
  }); // Filter genre array to only 1 of each genre

  var uniqueGenre = genreArray.filter(function (item, index) {
    return genreArray.indexOf(item) >= index;
  }); // Create array of dates

  var dateArray = data.map(function (item) {
    return item.decade;
  }); // Filter date array to only 1 of each date

  var uniqueDate = dateArray.filter(function (item, index) {
    return dateArray.indexOf(item) >= index;
  });
  var genreOption = '<option value="Any" selected>Any</option>';
  var dateOption = '<option value="Any" selected>Any</option>'; // Put each genre into a unique option element

  for (var i = 0; i < uniqueGenre.length; i++) {
    genreOption += '<option value="' + uniqueGenre[i] + '">' + uniqueGenre[i] + '</option>';
  } // Put each date into a unique option element


  for (var i = 0; i < uniqueDate.length; i++) {
    dateOption += '<option value="' + uniqueDate[i] + '">' + uniqueDate[i] + '</option>';
  } // Append all options to its corresponding dropdown


  $('#genreFilter').append(genreOption);
  $('#dateFilter').append(dateOption); // Make sure all selects are set to 'Any'

  $('.form-control option[value="Any"]').prop('selected', true);
} // Randomiser Function


function randomiser(movies) {
  // --- START FILTERS --- //
  // Variable for selected Genre
  var selectedGenre = $('#genreFilter').children('option:selected').val(); // Variable for selected Date

  var selectedDate = $('#dateFilter').children('option:selected').val(); // Variable for selected Season

  var selectedSeason = $('#seasonFilter').children('option:selected').val(); // Variable for selected Platform

  var selectedPlatform = $('#platformFilter').children('option:selected').val(); // Get a random movie from the main array

  var randomMovie = Math.floor(Math.random() * movies.length);
  var movie = movies[randomMovie]; // -- SINGULAR FILTERS -- //
  // Filters: Genres

  var filterByGenre = movies.filter(function (genres) {
    return genres.genre === selectedGenre;
  });
  var randomGenre = Math.floor(Math.random() * filterByGenre.length);
  var movieGenre = filterByGenre[randomGenre]; // Filters: Dates

  var filterByDate = movies.filter(function (dates) {
    return dates.decade == selectedDate;
  });
  var randomDate = Math.floor(Math.random() * filterByDate.length);
  var movieDate = filterByDate[randomDate]; // Filters: Seasons

  var filterBySeason = movies.filter(function (seasons) {
    return seasons.seasonSpan == selectedSeason;
  });
  var randomSeason = Math.floor(Math.random() * filterBySeason.length);
  var movieSeason = filterBySeason[randomSeason]; // Filters: Platforms

  var filterByPlatform = movies.filter(function (platforms) {
    return platforms.mainConsole === selectedPlatform;
  });
  var randomPlatform = Math.floor(Math.random() * filterByPlatform.length);
  var moviePlatform = filterByPlatform[randomPlatform]; // -- MULTIPLE FILTERS -- //
  // Filters: Genres + Dates

  var filterByGenreAndDate = filterByGenre.filter(function (genresAndDates) {
    return genresAndDates.decade == selectedDate;
  });
  var randomGenreAndDate = Math.floor(Math.random() * filterByGenreAndDate.length);
  var movieGenreAndDate = filterByGenreAndDate[randomGenreAndDate]; // Filters: Genres + Seasons

  var filterByGenreAndSeason = filterByGenre.filter(function (genresAndSeasons) {
    return genresAndSeasons.seasonSpan == selectedSeason;
  });
  var randomGenreAndSeason = Math.floor(Math.random() * filterByGenreAndSeason.length);
  var movieGenreAndSeason = filterByGenreAndSeason[randomGenreAndSeason]; // Filters: Dates + Seasons

  var filterByDateAndSeason = filterByDate.filter(function (datesAndSeasons) {
    return datesAndSeasons.seasonSpan == selectedSeason;
  });
  var randomDateAndSeason = Math.floor(Math.random() * filterByDateAndSeason.length);
  var movieDateAndSeason = filterByDateAndSeason[randomDateAndSeason]; // Filters: Genres + Dates + Seasons

  var filterByGenreDateAndSeason = filterByGenreAndDate.filter(function (genresDatesAndSeasons) {
    return genresDatesAndSeasons.seasonSpan == selectedSeason;
  });
  var randomGenreDateAndSeason = Math.floor(Math.random() * filterByGenreDateAndSeason.length);
  var movieGenreDateAndSeason = filterByGenreDateAndSeason[randomGenreDateAndSeason]; // Filters: Genres + Platforms

  var filterByGenreAndPlatform = filterByGenre.filter(function (genresAndPlatforms) {
    return genresAndPlatforms.mainConsole === selectedPlatform;
  });
  var randomGenreAndPlatform = Math.floor(Math.random() * filterByGenreAndPlatform.length);
  var movieGenreAndPlatform = filterByGenreAndPlatform[randomGenreAndPlatform]; // Filters: Dates + Platforms

  var filterByDateAndPlatform = filterByDate.filter(function (datesAndPlatforms) {
    return datesAndPlatforms.mainConsole === selectedPlatform;
  });
  var randomDateAndPlatform = Math.floor(Math.random() * filterByDateAndPlatform.length);
  var movieDateAndPlatform = filterByDateAndPlatform[randomDateAndPlatform]; // Filters: Genres + Dates + Platforms

  var filterByGenreDateAndPlatform = filterByGenreAndDate.filter(function (genresDatesAndPlatforms) {
    return genresDatesAndPlatforms.mainConsole === selectedPlatform;
  });
  var randomGenreDateAndPlatform = Math.floor(Math.random() * filterByGenreDateAndPlatform.length);
  var movieGenreDateAndPlatform = filterByGenreDateAndPlatform[randomGenreDateAndPlatform]; // Remove Disabled classes

  $('.trailer, .date, .genre, .seasons, .platform').removeClass('disabled'); // Change value of movie depending on what filters are selected

  if (selectedGenre != "Any" && selectedDate != "Any" && selectedSeason != "Any") {
    // Genres + Dates + Seasons
    var movie = movieGenreDateAndSeason; // Only show alert message once

    if (alertShown == 0) {
      alert('Using 3 filters? This kind of clarity is likely to return no results. Proceed at your own disappointment...');
      alertShown = 1;
    }

    setTimeout(function () {
      $('.resultAmount span').html(filterByGenreDateAndSeason.length);
    }, 500);
  } else if (selectedGenre != "Any" && selectedDate != "Any" && selectedPlatform != "Any") {
    // Genres + Dates + Platform
    var movie = movieGenreDateAndPlatform; // Only show alert message once

    if (alertShown == 0) {
      alert('Using 3 filters? This kind of clarity is likely to return no results. Proceed at your own disappointment...');
      alertShown = 1;
    }

    setTimeout(function () {
      $('.resultAmount span').html(filterByGenreDateAndPlatform.length);
    }, 500);
  } else if (selectedGenre != "Any" && selectedPlatform != "Any") {
    // Genres + Platforms
    var movie = movieGenreAndPlatform;
    setTimeout(function () {
      $('.resultAmount span').html(filterByGenreAndPlatform.length);
    }, 500);
  } else if (selectedDate != "Any" && selectedPlatform != "Any") {
    // Dates + Platforms
    var movie = movieDateAndPlatform;
    setTimeout(function () {
      $('.resultAmount span').html(filterByDateAndPlatform.length);
    }, 500);
  } else if (selectedGenre != "Any" && selectedDate != "Any") {
    // Genres + Dates
    var movie = movieGenreAndDate;
    setTimeout(function () {
      $('.resultAmount span').html(filterByGenreAndDate.length);
    }, 500);
  } else if (selectedGenre != "Any" && selectedSeason != "Any") {
    // Genres + Seasons
    var movie = movieGenreAndSeason;
    setTimeout(function () {
      $('.resultAmount span').html(filterByGenreAndSeason.length);
    }, 500);
  } else if (selectedDate != "Any" && selectedSeason != "Any") {
    // Dates + Seasons
    var movie = movieDateAndSeason;
    setTimeout(function () {
      $('.resultAmount span').html(filterByDateAndSeason.length);
    }, 500);
  } else if (selectedPlatform != "Any") {
    // Platforms
    var movie = moviePlatform;
    setTimeout(function () {
      $('.resultAmount span').html(filterByPlatform.length);
    }, 500);
  } else if (selectedSeason != "Any") {
    // Seasons
    var movie = movieSeason;
    setTimeout(function () {
      $('.resultAmount span').html(filterBySeason.length);
    }, 500);
  } else if (selectedGenre != "Any") {
    // Genres
    var movie = movieGenre;
    setTimeout(function () {
      $('.resultAmount span').html(filterByGenre.length);
    }, 500);
  } else if (selectedDate != "Any") {
    // Dates
    var movie = movieDate;
    setTimeout(function () {
      $('.resultAmount span').html(filterByDate.length);
    }, 500);
  } else {
    // Any
    var movie = movie;
    setTimeout(function () {
      $('.resultAmount span').html(movies.length);
    }, 500);
  } // Error Message Conditionals


  if (!filterByGenreAndDate.length || !filterByGenreAndSeason.length || !filterByDateAndSeason.length || !filterByGenreDateAndSeason.length || !filterByDateAndPlatform.length || !filterByGenreAndPlatform.length || !filterByGenreDateAndPlatform.length) {
    error();
  } // --- END FILTERS --- //
  // Return the data into the DOM


  setTimeout(function () {
    $('.resultTitle').html(movie.title);
    $('.date').html(movie.year);
    $('.genre').html(movie.genre);
    $('.seasons').html(movie.seasons);
    $('.platform').html(movie.mainConsole);
    $('.score').html(movie.IMDBrating); // Variable for trailer URL + presets

    var url = 'https://www.youtube.com/embed/' + movie.trailer + '?autoplay=0&loop=0&rel=0&has_verified=1'; // Return URL value as the source of the iframe

    $('#trailerModal iframe').attr('src', url); // Round the rating to a whole number

    var roundedScore = Math.round(movie.IMDBrating); // Add class of 'checked' to stars up to its corresponding rating

    $('.star').slice(0, roundedScore).addClass('checked'); // Add genre onto bodyas class to change theme colors

    $('body').removeClass();
    var genreClass = movie.genre.replace(/\s+/g, '-').toLowerCase();
    var decadeClass = movie.decade;
    $('body').addClass([genreClass, decadeClass]);
  }, 500);
} // Other Important Functions and Variables


function marginResize() {
  var titleHeight = $('.title').height() - 30;

  if ($(window).width() < 768) {
    $('.results-wrapper').css('margin-top', 40 + titleHeight);
  } else {
    $('.results-wrapper').css('margin-top', -70);
  }
}

function resultAnim() {
  $('.results-inner .animate').not('.pre-result').removeClass('open');
  setTimeout(function () {
    $('.results-inner .animate').not('.pre-result').addClass('open');
  }, 500);
}

function clearAnim() {
  $('#extraFilters').addClass('reverse');
  setTimeout(function () {
    $('#extraFilters').removeClass('slideVertical slideHorizontal reverse');
  }, 500);
}

function filterWrapperAnim() {
  setTimeout(function () {
    if ($('#nav-series .btn, #nav-games .btn').hasClass('active') && $(window).width() > 767) {
      $('#extraFilters').removeClass('slideHorizontal').addClass('animate open slideVertical');
    } else if ($('#nav-series .btn, #nav-games .btn').hasClass('active') && $(window).width() <= 767) {
      $('#extraFilters').removeClass('animate open slideVertical').addClass('slideHorizontal');
    } else {
      clearAnim();
    }
  }, 500);

  if ($('#nav-series .btn').hasClass('active') && $(window).width() > 767) {
    // When Series is active, desktop
    $('#seasonFilterWrapper, #platformFilterWrapper').removeClass('w-0 h-0');

    if (animComplete == 0) {
      $('#extraFilters').removeClass('open');
      setTimeout(function () {
        $('#seasonFilterWrapper').show();
        $('#platformFilterWrapper').hide();
        $('#extraFilters').addClass('open');
      }, 500);
      animComplete = 1;
    }
  } else if ($('#nav-series .btn').hasClass('active') && $(window).width() <= 767) {
    // When Series is active, mobile/tablet
    $('#seasonFilterWrapper, #platformFilterWrapper').show();
    $('#seasonFilterWrapper').removeClass('w-0 h-0').removeClass('absolute').css('opacity', 1);
    $('#platformFilterWrapper').addClass('w-0 h-0 absolute').css('opacity', 0);
  } else if ($('#nav-games .btn').hasClass('active') && $(window).width() > 767) {
    // When Game is active, desktop
    $('#platformFilterWrapper, #seasonFilterWrapper').removeClass('w-0 h-0').css('opacity', 1);

    if (animComplete == 0) {
      $('#extraFilters').removeClass('open');
      setTimeout(function () {
        $('#platformFilterWrapper').show();
        $('#seasonFilterWrapper').hide();
        $('#extraFilters').addClass('open');
      }, 500);
      animComplete = 1;
    }
  } else if ($('#nav-games .btn').hasClass('active') && $(window).width() <= 767) {
    // When Game is active, mobile/tablet
    $('#seasonFilterWrapper, #platformFilterWrapper').show();
    $('#platformFilterWrapper').removeClass('w-0 h-0').removeClass('absolute').css('opacity', 1);
    $('#seasonFilterWrapper').addClass('w-0 h-0 absolute').css('opacity', 0);
  } else {
    clearAnim();
  }
} // Document-Ready Functions


$(document).ready(function () {
  loadData(source); // Randomiser Functions

  $('#generate').click(function () {
    // On click of the generate button, remove any classes of checked and run Randomiser
    clear();
    $('.fa-dice').hide();
    $(this).prop('disabled', true);
    setTimeout(function () {
      $('#generate').prop('disabled', false);
    }, 1000);
    setTimeout(function () {
      $('.resultAmount.animate').addClass('open');
    }, 500);
    resultAnim();
    loadData(source);
  });
  $('.form-control').on('change', function () {
    $('.resultAmount.animate').removeClass('open');
    $('#generate')[0].click();
    setTimeout(function () {
      $('.resultAmount.animate').addClass('open');
    }, 501);
  });
  $('.trailer').click(function () {
    $('#trailerModal').modal('show');
  }); // Stop playing trailer when modal is hidden

  $('#trailerModal').on('hidden.bs.modal', function () {
    $("#trailerModal iframe").attr("src", $("#trailerModal iframe").attr("src"));
  }); // Nav Functions

  $('.nav-item').click(function () {
    // Disable Nav items so user doesn't interfere with functions
    // Reset all details on the generator switch
    clear();
    resultAnim();
    $('.resultAmount.animate, .pre-result.animate').removeClass('open');
    $('body').removeClass(); // $('.btn, .overlay').css('background-color', '')

    $('.fa-dice').show();
    $('.resultsLength').empty(); // Add Disabled classes

    $('.trailer, .date, .genre, .seasons, .platform').addClass('disabled');
    var type = $(this).data('type');
    var activity = $(this).data('activity'); // Reset HTML to defaults

    setTimeout(function () {
      $('.resultTitle').html('Press generate to roll the&nbsp;dice.');
      $('.date').html('Year');
      $('.genre').html('Genre');
      $('.pre-result.animate').addClass('open');
    }, 501); // Change intro text based on what generator user is on

    $('.generatorType').html(type);
    $('.generatorActivity').not('.pre-result .generatorActivity').html(activity);
    setTimeout(function () {
      $('.pre-result .generatorActivity').html(activity);
    }, 501); // The selected generator will gain the class active, and removing it from any other option

    $('.nav-item').removeClass('active');
    $(this).addClass('active'); // Disable nav-items whilst transitions are happening

    $('.nav-item').prop('disabled', true);
    $('.nav-item').not('.nav-item.active').addClass('disabled-hover');
    setTimeout(function () {
      $('.nav-item').prop('disabled', false).removeClass('disabled-hover');
    }, 750);
    setTimeout(function () {
      if ($('#nav-series .btn').hasClass('active')) {
        $('.seasons').show().html('Seasons');
      } else {
        $('.seasons').hide();
      }
    }, 501);
    setTimeout(function () {
      if ($('#nav-games .btn').hasClass('active')) {
        $('.platform').show().html('Platform');
      } else {
        $('.platform').hide();
      }
    }, 501);
    animComplete = 0;
    filterWrapperAnim();
    marginResize();
    source = $(this).data('source');
    load = 0;
    alertShown = 0;
    loadData(source);
  });
  marginResize();
  $(window).resize(function () {
    filterWrapperAnim();
    animComplete = 1;
    marginResize();
  });
});

/***/ }),

/***/ "./src/sass/app.scss":
/*!***************************!*\
  !*** ./src/sass/app.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi ./src/js/app.js ./src/sass/app.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/matthewcrane/Sites/craft-movie-generator/src/js/app.js */"./src/js/app.js");
module.exports = __webpack_require__(/*! /Users/matthewcrane/Sites/craft-movie-generator/src/sass/app.scss */"./src/sass/app.scss");


/***/ })

/******/ });