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
	
	function sortItems(){
	
	    return sortedItemList;
	}
	
	function renderItems(outerElement){
	    $(outerElement).empty();
		var doneButton = document.createElement('button');
		$(doneButton).text('x');
		$(doneButton).addClass('remove');
		$(doneButton).on("click", function(){
		    console.log('you clicked on');
		    console.log($(this).parent().attr('id'));   // todo call function to remove parent
			removeItem($(this).parent().attr('id'));
		});
	    items.forEach(function(entry, i){
		    var listItem = document.createElement('div');
			$(listItem).text(entry['text']);
			$(listItem).attr('id', entry['id']);
			$(listItem).addClass(LEVEL_CLASSES[entry['level']]);
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

			//var txt = document.createElement('div');
			//txt.innerHTML = txtinput;
			

			//$(txt).addClass(priority);
			

			
			
			
			//$('#messages').append($(txt));
			//console.log($('#messages'));
		
			//var txt2 = $(txt);
			//txt2.css("opacity", 0.0);
			//txt2.animate({
			//	opacity: 1.0
			//}, 1000, function() {});
			
			//event.target.value = "";
			//$("#someitemtext").val('')
			return false;  // needed or else default click behaviour may refresh page
	});
	
	$('.remove').click(function(){
	    console.log('button clicked');
	
	});
	
	//clickabletext.on("click", function() {
		
		//c.increment();
		//console.log("I have been clicked %d times", c.count);
		
		
		
		// $("#messages").html("I have been clicked " + c.count + " times");
		// $("#messages").append("<p>I have been clicked " + c.count + "</p>");
		
	//});
	
});