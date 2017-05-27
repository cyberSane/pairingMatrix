$(document).ready(function() {

	$('#visualizeButton').click(function() {
		$.get('commits', function(res) {
			console.log(res);
		})
	})	
})

