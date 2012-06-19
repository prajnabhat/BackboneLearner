(function($){
var contacts = [
{ name : "Prajna", age: 21  },
{ name : "Sreechand", age : 23 },
{ name : "Harsha", age : 20}
];

//Creating a model "Contact" with a default value for Company
var Contact = Backbone.Model.extend({
defaults : {
Company : 'Artoo'
}
});

//Creating a list of "Contacts"
var List = Backbone.Collection.extend({
model : Contact
});

// A view to display a single 
var ContactView = Backbone.View.extend({
//tagname : "article",
//className : "contact-container",
template : $("#contactTemplate").html(),

render : function(){
	var tmpl = _.template(this.template);
	this.$el.html(tmpl(this.model.toJSON()));
	return this;
}
});
// A view for displaying all contacts
var ListView = Backbone.View.extend({
el : $("#contacts"),
initialize : function(){
	this.collection = new List(contacts);
	this.render();
},
render: function () {
        var that = this;
        _.each(this.collection.models, function (item) {
            that.renderContact(item);
        }, this);
    },

renderContact : function(item) {
	var contactView = new ContactView({
	model : item });
	this.$el.append(contactView.render().el);
}

});
var list = new ListView();
}(jQuery));
