////////////////////////////////////////////////////////////////////////////
// knockout-jquery-ui-widget.js
// Copyright (c) 2011, Planapple, Inc.
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

// Modified by: NineCollective 2012/ Jesse Harlin
//
// Knockout binding for jQuery UI widgets
//
// Examples:
// <input type="submit" value="OK" data-bind='jqueryui: "button"' />
//
// Attaches a jQuery UI button widget to this button, with default options.
//
// <input id='search'
// data-bind='jqueryui: { widget: "autocomplete",
// options: { source: searchCompletions(),
// delay: 500 } },
// value: searchString' />
//
// Attaches an autocomplete behavior to this search input box,
// binding in the contents of your viewModel.searchCompletions
// as the autocomplete possibilities and setting the autocomplete
// delay to 1/2 second. As viewModel.searchCompletions changes,
// the completions (autocomplete 'source') will automatically update.
//
// Also attaches the value of the <input> field to your
// viewModel.searchString, using Knockout's built-in 'value' binding.
//
// Note: the sequence }} confuses jQuery.template unless it's the end
// of an actual template tag, so be sure to put a space between }'s
// as shown above at the end of the options declaration.
//
// Do not declare templates inline, rather use a ko.computed to return the proper object.

(function ($) {
    ko.bindingHandlers['jqueryui'] = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {

            var widgetBindings = _getWidgetBindings(element, valueAccessor, allBindingsAccessor, viewModel);

            while (typeof widgetBindings.widgetOptions === 'function') {
                widgetBindings.widgetOptions = widgetBindings.widgetOptions();
            }

            var preWidgetType = $(element).data('widget-type');

            if (typeof preWidgetType !== 'undefined' && preWidgetType != widgetBindings.widgetName) {
                // You are swapping out a widget!
                $(element)[preWidgetType]('destroy');

            }

            //define type
            $(element).data('widget-type', widgetBindings.widgetName);

            //create widget
            $(element)[widgetBindings.widgetName](widgetBindings.widgetOptions);


        }
    };

    function _getWidgetBindings(element, valueAccessor, allBindingsAccessor, viewModel) {

        // Extract widgetName and widgetOptions from the data binding, with some sanity checking and error reporting.
        // Returns dict: widgetName, widgetOptions.

        var value = valueAccessor(),
            myBinding = ko.utils.unwrapObservable(value),
            allBindings = allBindingsAccessor();


        if (typeof (myBinding) === 'string') {
            // Short-form data-bind='jqueryui: "widget_name"' with no additional options
            myBinding = { 'widget': myBinding };
        }

        var widgetName = myBinding.widget,
            widgetOptions = myBinding.options; // ok if undefined


        // Sanity check: can't directly check that it's truly a _widget_, but can at least verify that it's a defined function on jQuery:
        if (typeof $.fn[widgetName] !== 'function') {
            throw new Error("jqueryui binding doesn't recognize '" + widgetName + "' as jQuery UI widget");
        }

        // Sanity check: don't confuse KO's 'options' binding with jqueryui binding's 'options' property
        if (allBindings.options && !widgetOptions && element.tagName !== 'SELECT') {
            throw new Error("jqueryui binding options should be specified like this:\n" + " data-bind='jqueryui: {widget:\"" + widgetName + "\", options:{...} }'");
        }

        return {
            widgetName: widgetName,
            widgetOptions: widgetOptions
        };
    }

})(jQuery);






//////////////////////////////////////////////////////////////////
//// JS RENDER INTEGRATION
//// Author: RP Niemeyer
//// Experimental.
    


(function (ko, jsviews, $) {
    
    "use strict";

    if (jsviews || $.views) {
        ko.jsRenderEngine = function () {
            //if no jQuery, then need to use jsviews
            var compiler = jsviews ? jsviews.templates : $.templates,
                views = jsviews ? jsviews : $.views;

            //save off the compiled template and render
            this.renderTemplateSource = function (templateSource, bindingContext) {

                var compiled = templateSource.data("compiled");
                if (!compiled) {
                    compiled = compiler(templateSource.text() || "");
                    templateSource.data("compiled", compiled);
                }

                return ko.utils.parseHtmlFragment(compiled.render(bindingContext.$data, { koBindingContext: bindingContext }));
            };

            //ko adds code to hook up bindings after rendering
            this.createJavaScriptEvaluatorBlock = function (script) {
                return "{{:~ko_with(\"" + script + "\") }}";
            };

            //ko expects to be able to find the variables directly            
            views.helpers({
                ko_with: function (script) {
                    var wrapped = "with(context) { with(data) { return " + script + "} }";
                    return (new Function("context", "data", wrapped))(this.ctx.koBindingContext, this.data);
                }
            });
        };

        ko.jsRenderEngine.prototype = new ko.templateEngine();

        //set the default engine to be the jsRender engine
        //this shoudl be explicitly included per page necessary
        //ko.setTemplateEngine(new ko.jsRenderEngine());
    }
})(ko, this.jsviews, jQuery);


(function (ko) {
    
    "use strict";

    //define a template source that simply treats the template name as its content
    ko.templateSources.stringTemplateRegistry = function(templateName, templateRegistry) {
        return {
            data: function(key, value) {
                templateRegistry._data = templateRegistry._data || {};
                templateRegistry._data[templateName] = templateRegistry._data[templateName] || {};
                if (!value) {
                    return templateRegistry._data[templateName][key];
                }
                templateRegistry._data[templateName][key] = value;

            },
            text: function(value) {

                if (!value) {
                    return templateRegistry[templateName];
                }
                templateRegistry[templateName] = value;
            }
        };
    };

    //I need a place to put all my string templates, regardless of the plentitude of viewModels
    ko.templateSources._stringtemplateRegistry = ko.templateSources._stringtemplateRegistry || {};

    // This takes the renderengine of your choice
    // eg. new ko.jsRenderEngine, and your vieWModel.
    ko.utils.createStringTemplateEngine = function (renderEngine, viewModel) {

        // single tempalte registry is shared across all viewModels.
        // I honestly wish it were not this way, but it is
        // ko.setTemplate Engine is a GLOBAL function to the entirety of knockout.

        if (!viewModel.templates) {
            viewModel.templates = {};
            console.log("your viewModel, "+viewModel+" had no templates");
        }

        ko.templateSources._stringtemplateRegistry = ko.utils.extend(ko.templateSources._stringtemplateRegistry, (viewModel.templates));

        renderEngine.makeTemplateSource = function (templateName) {
            return ko.templateSources.stringTemplateRegistry(templateName, ko.templateSources._stringtemplateRegistry);
        };
        
        ko.setTemplateEngine(renderEngine);
    };
    

    
    
})(ko);