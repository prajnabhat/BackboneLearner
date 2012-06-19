
(function($) {
// array of objects where each object represents a contact
var contacts = [
{ name : "Prajna", address : "1, a street, a town, a city, AB12 3CD",tel: "0123456789", email: "anemail@me.com", type: "friend" },
{ name : "Sreechand", address : "1, a street, a town, a city, AB12 3CD",tel: "0123456789", email: "anemail@me.com", type: "family" },
{ name : "Uttam", address : "1, a street, a town, a city, AB12 3CD",tel: "0123456789", email: "anemail@me.com", type: "family" },
{ name : "Sameer", address : "1, a street, a town, a city, AB12 3CD",tel: "0123456789", email: "anemail@me.com", type: "family" },
{ name : "Gokul", address : "1, a street, a town, a city, AB12 3CD",tel: "0123456789", email: "anemail@me.com", type: "friend" },
{ name : "Indus", address : "1, a street, a town, a city, AB12 3CD",tel: "0123456789", email: "anemail@me.com", type: "family" },
{ name : "Soumen", address : "1, a street, a town, a city, AB12 3CD",tel: "0123456789", email: "anemail@me.com", type: "family" },
{ name : "Hari", address : "1, a street, a town, a city, AB12 3CD",tel: "0123456789", email: "anemail@me.com", type: "family" }
];


// create a model, model represents individual contact.

var Contact = Backbone.Model.extend({
defaults : {
photo : "img/placeholder.png"
}
});

var Directory = Backbone.Collection.extend({
model : Contact
});

//displaying an individual contact
var ContactView = Backbone.View.extend({


tagname : "article",
className : "contact-container",
template : $("#contactTemplate").html(),

render : function(){
// store a reference to the underscore's template() method
var tmpl = _.template(this.template);

this.$el.html(tmpl(this.model.toJSON()));
return this;
}
});
// view for the entire collection of contacts
var DirectoryView = Backbone.View.extend({
el : $("#contacts"),
// creates an instance of our collection class

initialize : function(){
this.collection = new Directory(contacts);
this.render(); // calls its own render method, making this view self rendering
this.$el.find("#filter").append(this.createSelect());
this.on("change:filterType", this.filterByType, this);
this.collection.on("reset", this.render, this);
this.collection.on("remove", this.removeContact, this);
},

render: function () {
        var that = this;
        _.each(this.collection.models, function (item) {
            that.renderContact(item);
        }, this);
    },

renderContact : function(item) {
// creating new instance of contactview class
var contactView = new ContactView({
model : item });
this.$el.append(contactView.render().el);// append item to el
},
// select

getTypes: function () {
// returns array using uniq
    return _.uniq(this.collection.pluck("type"), false, function (type) {
        return type.toLowerCase();
    });
},
 

createSelect : function() {
var filter = this.$el.find("#filter"),
select = $("<select/>",{
html : "<option>All<option>"
});




// to iterate over each value in the array returned by the getTypes
_.each(this.getTypes(), function(item){
var option = $("<option/>",{
value : item.toLowerCase(),
text : item.toLowerCase()
}).appendTo(select);
});
return select;
},

events: {
    "change #filter select": "setFilter"
},

setFilter: function (e) {
    this.filterType = e.currentTarget.value;
    this.trigger("change:filterType");
},

filterByType: function () {
    if (this.filterType === "all") {
        this.collection.reset(contacts);
    } else {
        this.collection.reset(contacts,{ silent: true });
 
        var filterType = this.filterType,
            filtered = _.filter(this.collection.models, function (item) {
            return item.get("type").toLowerCase() === filterType;
        });
 
        this.collection.reset(filtered);
    }
},

 removeContact: function (removedModel) {
            var removed = removedModel.attributes;

            //if model acquired default photo property, remove it
            if (removed.photo === "/img/placeholder.png") {
                delete removed.photo;
            }

            //remove from contacts array
            _.each(contacts, function (contact) {
                if (_.isEqual(contact, removed)) {
                    contacts.splice(_.indexOf(contacts, contact), 1);
                }

});
var ContactsRouter = Backbone.Router.extend({
    routes: {
        "filter/:type": "urlFilter"
    },
 
    urlFilter: function (type) {
        directory.filterType = type;
        directory.trigger("change:filterType");
    }
});
var directory = new DirectoryView();
var contactsRouter = new ContactsRouter();
}(jQuery));
