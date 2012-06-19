(function($){
var contacts = [
{ name : "Prajna", age: 21  },
{ name : "Sreechand", age : 25 },
{ name : "Harsha", age : 20}
];

var Contact = Backbone.Model.extend({
defaults : {
Company : 'Artoo'
}
});

var List = Backbone.Collection.extend({
model : Contact
});

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
