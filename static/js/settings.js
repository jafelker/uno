$(document).ready(function() {
    $('#settingsModal').on('show.bs.modal', function () {
           $(this).find('.modal-dialog').css({
                  width:'80%', //probably not needed
                  'max-height':'100%'
           });
           // console.log("settingsModal has been shown");

           $(".errorText").hide();
    });

    pointSystem = true;
    pointSystemValue = 500;
    pointSystemCustom = null;
    tallySystem = false;
    tallySystemValue = 1;
    tallySystemCustom = null;
    playerName = "No Name";

	$("#tallySystemInner").hide();
	$("#pointSystemRadio").prop("checked", true);
	$("#pointSystemDefault").prop("checked", true);
	$("#tallySystemDefault").prop("checked", true);

	$("#pointSystemRadio").click(function() {
		$("#tallySystemInner").slideUp();
		$("#pointSystemInner").slideDown();
		$("#tallySystemDefault").prop("checked", true);
		$("#tallySystemCustomInput").val("");
		$("#tallySystemCustomInput").css("border", "");
		$(".errorText").hide();
        pointSystem = true;
        tallySystem = false;
	});

	$("#tallySystemRadio").click(function() {
		$("#tallySystemInner").slideDown();
		$("#pointSystemInner").slideUp();
		$("#pointSystemDefault").prop("checked", true);
		$("#pointSystemCustomInput").val("");
		$("#pointSystemCustomInput").css("border", "");
		$(".errorText").hide();
        tallySystem = true;
        pointSystem = false;
	});

	$("#tallySystemCustom").click(function() {
		$("#tallySystemCustomInput").focus();
	});

	$("#tallySystemCustomInput").focusin(function() {
		console.log("here");
		$("#tallySystemCustom").prop("checked", true);
	});

	$("#pointSystemCustom").click(function() {
		$("#pointSystemCustomInput").focus();
	});

	$("#pointSystemCustomInput").focusin(function() {
		$("#pointSystemCustom").prop("checked", true);
	});

	$(".innerRadio").click(function() {
		if(!$("#tallySystemCustom").is(":checked")) {
			$("#tallySystemCustomInput").val("");
			$("#tallySystemCustomInput").css("border", "");
			$(".errorText").hide();
		}
		if(!$("#pointSystemCustom").is(":checked")) {
			$("#pointSystemCustomInput").val("");
			$("#pointSystemCustomInput").css("border", "");
			$(".errorText").hide();
		}
		
        if($("#pointSystemRadio").is(":checked")) {
            pointSystemValue = $(this).val();
            console.log(pointSystemValue);
        }
        else {
            tallySystemValue = $(this).val();
            console.log(tallySystemValue);
        }
	});
});
