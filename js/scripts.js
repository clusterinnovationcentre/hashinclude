// #include

/*
console.log('               ////         ////       ');
console.log('              ////         ////        ');
console.log('    ===============================    ');
console.log('   ===============================     ');
console.log('           ////         ////           ');
console.log('          ////         ////            ');
console.log(' ===============================       ');
console.log('===============================        ');
console.log('       ////         ////               ');
console.log('      ////         ////                ');
*/



// Re-enable the below code for typind animation.

$( document ).ready(function()
{
	$("#typed-title").typed(
	{
		strings: ["hash", "^1000#^1000include"],
		typeSpeed: 0,
		startDelay: 1000,
		backSpeed: 0,
		backDelay: 2000
	});
});

// Code for pulling down elements. Not needed now. Not working anyway.

/*!function ($) { //ensure $ always references jQuery
	$(function () { //when dom has finished loading
		//make top text appear aligned to bottom: http://stackoverflow.com/questions/13841387/how-do-i-bottom-align-grid-elements-in-bootstrap-fluid-layout
		function fixHeader() {
			//for each element that is classed as 'pull-down'
			//reset margin-top for all pull down items
			$('.pull-down').each(function () {
				$(this).css('margin-top', 0);
			});

			//set its margin-top to the difference between its own height and the height of its parent
			$('.pull-down').each(function () {
				if ($(window).innerWidth() >= 768) {
					$(this).css('margin-top', $(this).parent().height() - $(this).height());
				}
			});
		}

		$(window).resize(function () {
			fixHeader();
		});

		fixHeader();
	});
}(window.jQuery);
*/

// Code to disable auth providers link.
$(function() {
	jQuery.fn.extend({
		disable: function(state) {
			return this.each(function() {
				var $this = $(this);
				$this.toggleClass('disabled', state);
			});
		}
	});
	
	$('body').on('click', 'a.disabled', function(event) {
		event.preventDefault();
	});
});

$('courseForm').submit(function() {
	return false;
});

localStorage.clear();
sessionStorage.clear();
hello.init({
	facebook: '1634502443492240',
	google: '615042929237-ephb8jem6h6q8vf83e6d0db50qi2dmrs.apps.googleusercontent.com',
	github: 'cdbd672cb7a4de29c76b',
	windows: '000000004C168A78',
	twitter: 'Cz52zaO5jDkurNmZmSNxjQ5u2'
});

hello.logout();

function login(network) {
	$('a').disable(true);
	if ($('#course').val() === 'default' || $('#year').val() === 'default') {
		alert('Please select course and year to continue !!!');
		$('a').disable(false);
	}
	else{
		hello(network).login({scope: 'email'});
	}
}

hello.on('auth.login', function(auth) {

	
	// Call user information, for the given network
	hello(auth.network).api('/me').then(function(r) {
		
		// Authenticated succesfully.
		
		console.log("Network: " + auth.network + ", " + "User: " + r.name + ", " + "E-Mail: " + r.email + ", " + "Response dump: " + JSON.stringify(r) );

		// Posting to the sheetsu API.
		$.get("https://sheetsu.com/apis/ba75adb2",
			function( data ){
				if(data.status === 200 && data.success === true)
				{
					console.log(data.result);
					if(($.grep(data.result, function(e){ return e.email === r.email })).length === 0)
					{
						$.ajax({
							url: 'https://sheetsu.com/apis/ba75adb2',
							type: 'post',
							data: {
								name: r.name,
								network: auth.network,
								email: r.email,
								course: $('#course').val(),
								year: $('#course').val(),
								phone: $('#phone').val(),
								extra: $('#extra').val(),
								response_dump: JSON.stringify(r)
							},
							dataType: 'json',
							success: function(response) {
								console.log(data);
								alert("Registered Successfully!");
								$('a').disable(false);
							}

						});
					}
					else
					{
						console.log("User already registered.");
						alert("Already registered!");
						$('a').disable(false);
						// TODO - Implement showing previous registration.
					}
				}
				else
				{
					alert("Unknown error occurred!");
					$('a').disable(false);
					console.log(data);
					// TODO - Implement error showing while connecting to the API.
				}
			});
});

}, function(e) {
	alert('Unknown error occurred!!!');
	console.log(e);
	$('a').disable(true);
});

