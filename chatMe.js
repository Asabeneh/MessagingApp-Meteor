Messages = new Mongo.Collection('messages');

if(Meteor.isClient){
  Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});
Template.messages.helpers({
  messages(){
    return Messages.find();
  }
});
Template.messages.events({
  'keypress textarea':function(e,instance){
    if(e.keyCode ==13){
      e.preventDefault();
    var value = instance.find('textarea').value;
    instance.find('textarea').value = '';
    if(Meteor.user()){
      user = Meteor.user().username;
    }
    else{
      user = "Annonymous"
    }
  if(value){
    Messages.insert({
      message:value,
      timestamp:new Date(),
      user:user,
      createdBy:Meteor.userId()

    });
  }
  }
},
'click .fa-trash-o':function(event){
  createdBy = this.createdBy;
  var id = this._id;
  if(Meteor.userId()===createdBy){
      $("#"+id).hide('slow',function(){
             Messages.remove({_id:id});
          });
     }
}
});
Template.message.helpers({
time:function(){
  return moment(this.timestamp).format('h:mm A');
},
showDelete:function(){
			if(Meteor.user()){
				if(Meteor.userId()=== this.createdBy){
					return true;
				}
			}
		}
});
}
if(Meteor.isServer){

}
