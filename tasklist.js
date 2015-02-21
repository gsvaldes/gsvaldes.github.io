function MyLibrary () {

    var items = [];
	var LEVEL_CLASSES = {1: 'high', 2: 'medium', 3: 'low'};
	
	function addItem(content, priority){
	    var item = {};
		item['text'] = content;
		item['level'] = priority;
		items.push(item);
		items.sort(function(a, b){
		    return a.level-b.level;  
        });	
        items.forEach(function(item, i){
            item['id'] = 'item' + i;	
        });			
		console.log(items);	    	    	
	}
	
	function renderItems(outerElement){
	    $(outerElement).empty();
		var doneButton = document.createElement('button');
		$(doneButton).text('x');
		$(doneButton).addClass('remove');
		$(doneButton).addClass('btn btn-default');
	    items.forEach(function(entry, i){
		    var listItem = document.createElement('li');
			$(listItem).text(entry['text']);
			$(listItem).wrapInner("<span class='label label-default " + LEVEL_CLASSES[entry['level']] + " '></span>");
			//$(listItem).attr('class', "well well-sm");    //todo consider removing
			$(listItem).attr('id', entry['id']);
			$(listItem).addClass("list-group-item");
			$(listItem).append($(doneButton).clone(true));
			console.log(listItem);
		    $(outerElement).append(listItem);
			console.log($(outerElement));		
		});
	    
	
	}
	
	function removeItem(id){
	    items = items.filter(function(item){
		    return item.id !== id;
			});
	}
	

	return {
		addItem: addItem,
		renderItems: renderItems,
		removeItem: removeItem
	};
}


$(document).ready(function() {
	
	var myLib = MyLibrary();
	//var c = new mylib.Counter();
	
	var clickabletext = $("#clickabletext");
	
	$("#add").click( function() {
	    var txtinput = $("#someitemtext").val();
		var priority = $("#priority").val();
		myLib.addItem(txtinput, priority);
		myLib.renderItems('#messages');
		$("#someitemtext").val('');
		
		return false;  // needed or else default click behaviour may refresh page
	});
		
	$('#messages').on('click', '.remove', function(){
	    console.log('button clicked');
        console.log($(this).parent().attr('id'));
		myLib.removeItem($(this).parent().attr('id'));
		myLib.renderItems('#messages');

		return false;
	
	});
	
});