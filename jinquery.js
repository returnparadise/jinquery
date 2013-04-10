///// Extends jQuery methods
(function ($) {
    $.fn.Distinct = function (property) {
        (property == undefined) && (property = function (o) { return o; });
        var distinctFilterValue = [];
        var distinctProperty = [];
        $.map(this, function (i) {
            if (!~$.inArray(property(i), distinctProperty)) {
                distinctFilterValue.push(i);
                distinctProperty.push(property(i));
            }
        });
        return $(distinctFilterValue);
    }
 
    $.fn.ToDictionary = function (options) {// Same as ToDictionary in LINQ
        var args = $.extend({
            key: function (element, index) { return index; },
            value: function (element, index) { return element; }
        }, options);
        var result = {};
        $.each(this, function (index, element) {
            result[args.key(element, index)] = args.value(element, index);
        });
        return result;
    };
 
    $.fn.Where = function (func) { // Same as Where in LINQ
        (func == undefined) && (func = function (element) { return true; });
        return $(this).filter(function () {
            return func(this);
        });
    };
 
    $.fn.Select = function (func) {// Same as Select in LINQ
        (func == undefined) && (func = function (element) { return element; });
        return $(this).map(function (index, element) { return func(element, index); });
    };
 
    $.fn.SelectMany = function (options) {// Same as SelectMany in LINQ
        var args = $.extend({
            collection: function (element) { return []; },
            property: function (element, index) { return element; }
        }, options);
        return $(this).map(function (index, element) {
            return $(args.collection(element)).map(function (innerIndex, innerElement) {
                return args.property(innerElement, innerIndex);
            }).get();
        });
    };
})(jQuery);
