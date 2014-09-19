(function($, block) {

// a simple wordcloud example
block.fn.wordcloud = function(config) {
    var options = $.extend({
        word_options : {
		series: {	
			pie: {
                		show: true
        		}
    		}
    }}, config);

    // create empty wordcloud with parameter options
    var wordcloud_el = $(this.$element).jQCloud([{text: "TEXT", weight: 1}]);

    // dict containing the labels and values
    var worddata_dict = {};

    var addword = function(label, value) {
	if (worddata_dict.hasOwnProperty(label))
		worddata_dict[label] = (worddata_dict[label] + value);
	else
		worddata_dict[label] = value;
	redraw();
    }

    var setword = function(label, value) {
	worddata_dict[label] = value;
	redraw();
    }

    var redraw = function() {
        var result = [];
	for(var k in worddata_dict) {
	    if (worddata_dict.hasOwnProperty(k)) {
 		result.push({text:k,weight:worddata_dict[k]});
	    }
	}
	// console.log(result);
	$(this.$element).empty(); // jQuery clear children
        wordcloud_el = $(this.$element).jQCloud(result);
    }

    var reset = function() {
	worddata_dict = {};
    }

    this.actions({
        'set': function(e, message) {
	    setword(message.value[0],message.value[1]);
        },
        'add': function(e, message) {
	    addword(message.value[0],message.value[1]);
        },
        'reset': function(e, message) {
	    reset();
	}
    });
    // return element to allow further work
    return this.$element;
}

})(jQuery, block);