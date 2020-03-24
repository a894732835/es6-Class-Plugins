setInterval(function(){
	$('label[ng-class="{\'disabled\':disabled}"]').eq(0).click();$('button[ng-click="cancelTask()"]').click();
},3000)