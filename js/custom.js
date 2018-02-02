function validate(){
	var errorCnt = 0;
	$('select').each(function(index) {
		if ($(this).val() == "") {
			$(this).parent().addClass('error');
			$(this).parent().parent().parent().children().not('.span3').css('color', '#B94A48');
			errorCnt = errorCnt + 1;
		}
		else {
			$(this).parent().removeClass('error');
			$(this).parent().parent().parent().children().not('.span3').css('color', '#333');
		}
	});
	if (errorCnt == 0) {
		submitTest();
	}
	else {
		$('#errors').modal();
	}
}

function submitTest() {
	var a = 0,b = 0,c = 0,d = 0,e = 0,f = 0,g = 0,h = 0,i = 0,j = 0,k = 0,l = 0,m = 0,n = 0,o = 0,p = 0,q = 0,r = 0,s = 0;
	
	a = parseInt($('#opt1').val()) + parseInt($('#opt20').val()) + parseInt($('#opt39').val()) + parseInt($('#opt58').val()) + parseInt($('#opt77').val()) + parseInt($('#opt96').val()) + parseInt($('#opt115').val());
	
	b = parseInt($('#opt2').val()) + parseInt($('#opt21').val()) + parseInt($('#opt40').val()) + parseInt($('#opt59').val()) + parseInt($('#opt78').val()) + parseInt($('#opt97').val()) + parseInt($('#opt116').val());
	
	c = parseInt($('#opt3').val()) + parseInt($('#opt22').val()) + parseInt($('#opt41').val()) + parseInt($('#opt60').val()) + parseInt($('#opt79').val()) + parseInt($('#opt98').val()) + parseInt($('#opt117').val());
	
	d = parseInt($('#opt4').val()) + parseInt($('#opt23').val()) + parseInt($('#opt42').val()) + parseInt($('#opt61').val()) + parseInt($('#opt80').val()) + parseInt($('#opt99').val()) + parseInt($('#opt118').val());
	
	e = parseInt($('#opt5').val()) + parseInt($('#opt24').val()) + parseInt($('#opt43').val()) + parseInt($('#opt62').val()) + parseInt($('#opt81').val()) + parseInt($('#opt100').val()) + parseInt($('#opt119').val());
	
	f = parseInt($('#opt6').val()) + parseInt($('#opt25').val()) + parseInt($('#opt44').val()) + parseInt($('#opt63').val()) + parseInt($('#opt82').val()) + parseInt($('#opt101').val()) + parseInt($('#opt120').val());
	
	g = parseInt($('#opt7').val()) + parseInt($('#opt26').val()) + parseInt($('#opt45').val()) + parseInt($('#opt64').val()) + parseInt($('#opt83').val()) + parseInt($('#opt102').val()) + parseInt($('#opt121').val());
	
	h = parseInt($('#opt8').val()) + parseInt($('#opt27').val()) + parseInt($('#opt46').val()) + parseInt($('#opt65').val()) + parseInt($('#opt84').val()) + parseInt($('#opt103').val()) + parseInt($('#opt122').val());
	
	i = parseInt($('#opt9').val()) + parseInt($('#opt28').val()) + parseInt($('#opt47').val()) + parseInt($('#opt66').val()) + parseInt($('#opt85').val()) + parseInt($('#opt104').val()) + parseInt($('#opt123').val());
	
	j = parseInt($('#opt10').val()) + parseInt($('#opt29').val()) + parseInt($('#opt48').val()) + parseInt($('#opt67').val()) + parseInt($('#opt86').val()) + parseInt($('#opt105').val()) + parseInt($('#opt124').val());
	
	k = parseInt($('#opt11').val()) + parseInt($('#opt30').val()) + parseInt($('#opt49').val()) + parseInt($('#opt68').val()) + parseInt($('#opt87').val()) + parseInt($('#opt106').val()) + parseInt($('#opt125').val());
	
	l = parseInt($('#opt12').val()) + parseInt($('#opt31').val()) + parseInt($('#opt50').val()) + parseInt($('#opt69').val()) + parseInt($('#opt88').val()) + parseInt($('#opt107').val()) + parseInt($('#opt126').val());
	
	m = parseInt($('#opt13').val()) + parseInt($('#opt32').val()) + parseInt($('#opt51').val()) + parseInt($('#opt70').val()) + parseInt($('#opt89').val()) + parseInt($('#opt108').val()) + parseInt($('#opt127').val());
	
	n = parseInt($('#opt14').val()) + parseInt($('#opt33').val()) + parseInt($('#opt52').val()) + parseInt($('#opt71').val()) + parseInt($('#opt90').val()) + parseInt($('#opt109').val()) + parseInt($('#opt128').val());
	
	o = parseInt($('#opt15').val()) + parseInt($('#opt34').val()) + parseInt($('#opt53').val()) + parseInt($('#opt72').val()) + parseInt($('#opt91').val()) + parseInt($('#opt110').val()) + parseInt($('#opt129').val());
	
	p = parseInt($('#opt16').val()) + parseInt($('#opt35').val()) + parseInt($('#opt54').val()) + parseInt($('#opt73').val()) + parseInt($('#opt92').val()) + parseInt($('#opt111').val()) + parseInt($('#opt130').val());
	
	q = parseInt($('#opt17').val()) + parseInt($('#opt36').val()) + parseInt($('#opt55').val()) + parseInt($('#opt74').val()) + parseInt($('#opt93').val()) + parseInt($('#opt112').val()) + parseInt($('#opt131').val());
	
	r = parseInt($('#opt18').val()) + parseInt($('#opt37').val()) + parseInt($('#opt56').val()) + parseInt($('#opt75').val()) + parseInt($('#opt94').val()) + parseInt($('#opt113').val()) + parseInt($('#opt132').val());
	
	s = parseInt($('#opt19').val()) + parseInt($('#opt38').val()) + parseInt($('#opt57').val()) + parseInt($('#opt76').val()) + parseInt($('#opt95').val()) + parseInt($('#opt114').val()) + parseInt($('#opt133').val());
	
	var url = "results.htm?a=" + a + "&b=" + b + "&c=" + c + "&d=" + d + "&e=" + e + "&f=" + f + "&g=" + g + "&h=" + h + "&i=" + i + "&j=" + j + "&k=" + k + "&l=" + l + "&m=" + m + "&n=" + n + "&o=" + o + "&p=" + p + "&q=" + q + "&r=" + r + "&s=" + s;
	window.location = url;
}

function processResults() {
	var a = 0,b = 0,c = 0,d = 0,e = 0,f = 0,g = 0,h = 0,i = 0,j = 0,k = 0,l = 0,m = 0,n = 0,o = 0,p = 0,q = 0,r = 0,s = 0;
	a = $.getUrlVar('a');
	b = $.getUrlVar('b');
	c = $.getUrlVar('c');
	d = $.getUrlVar('d');
	e = $.getUrlVar('e');
	f = $.getUrlVar('f');
	g = $.getUrlVar('g');
	h = $.getUrlVar('h');
	i = $.getUrlVar('i');
	j = $.getUrlVar('j');
	k = $.getUrlVar('k');
	l = $.getUrlVar('l');
	m = $.getUrlVar('m');
	n = $.getUrlVar('n');
	o = $.getUrlVar('o');
	p = $.getUrlVar('p');
	q = $.getUrlVar('q');
	r = $.getUrlVar('r');
	s = $.getUrlVar('s');
	
	$('#aBar').css('width', a * 4.7619 + '%');
	$('#aNo').text(a);
	$('#bBar').css('width', b * 4.7619 + '%');
	$('#bNo').text(b);
	$('#cBar').css('width', c * 4.7619 + '%');
	$('#cNo').text(c);
	$('#dBar').css('width', d * 4.7619 + '%');
	$('#dNo').text(d);
	$('#eBar').css('width', e * 4.7619 + '%');
	$('#eNo').text(e);
	$('#fBar').css('width', f * 4.7619 + '%');
	$('#fNo').text(f);
	$('#gBar').css('width', g * 4.7619 + '%');
	$('#gNo').text(g);
	$('#hBar').css('width', h * 4.7619 + '%');
	$('#hNo').text(h);
	$('#iBar').css('width', i * 4.7619 + '%');
	$('#iNo').text(i);
	$('#jBar').css('width', j * 4.7619 + '%');
	$('#jNo').text(j);
	$('#kBar').css('width', k * 4.7619 + '%');
	$('#kNo').text(k);
	$('#lBar').css('width', l * 4.7619 + '%');
	$('#lNo').text(l);
	$('#mBar').css('width', m * 4.7619 + '%');
	$('#mNo').text(m);
	$('#nBar').css('width', n * 4.7619 + '%');
	$('#nNo').text(n);
	$('#oBar').css('width', o * 4.7619 + '%');
	$('#oNo').text(o);
	$('#pBar').css('width', p * 4.7619 + '%');
	$('#pNo').text(p);
	$('#qBar').css('width', q * 4.7619 + '%');
	$('#qNo').text(q);
	$('#rBar').css('width', r * 4.7619 + '%');
	$('#rNo').text(r);
	$('#sBar').css('width', s * 4.7619 + '%');
	$('#sNo').text(s);
	
	var high = 0;
	var last = 0;
	var verylast = 0;
	var first = 0, second = 0 , third = 0;
	
	$('.label').each(function(i) {
		if (parseInt($(this).text()) > first) {
			third = second;
			second = first;
			first = parseInt($(this).text());
		}
		else if (parseInt($(this).text()) > second && parseInt($(this).text()) != first) {
			third = second;
			second = parseInt($(this).text());
		}
		else if (parseInt($(this).text()) > third && parseInt($(this).text()) != first && parseInt($(this).text()) != second) {
			third = parseInt($(this).text());
		}
	});
	$('.label').each(function(i) {
		if (parseInt($(this).text()) == first) {
			$('#' + $(this).attr('id').substr(0, 1) + 'Bar').parent().addClass('progress-success');
			$(this).addClass('label-success');
		}
		else if (parseInt($(this).text()) == second) {
			$('#' + $(this).attr('id').substr(0, 1) + 'Bar').parent().addClass('progress-warning');
			$(this).addClass('label-warning');
		}
		else if (parseInt($(this).text()) == third) {
			$('#' + $(this).attr('id').substr(0, 1) + 'Bar').parent().addClass('progress-danger');
			$(this).addClass('label-important');
		}
	});
	
	
//	$('.label').each(function(i) {
//		if (parseInt($(this).text()) > high) {
//			low = high;
//			high = parseInt($(this).text());
//			third = second;
//			second = first;
//			first = $(this).attr('id');
//		}
//		else if (parseInt($(this).text()) > last) {
//			verylast = last;
//			last = parseInt($(this).text());
//			third = second;
//			second = $(this).attr('id');
//		}
//		else if (parseInt($(this).text()) > verylast) {
//			verylast = parseInt($(this).text());
//			third = $(this).attr('id');
//		}
//	});
	
//	$('#' + first.substr(0, 1) + 'Bar').parent().addClass('progress-success');
//	$('#' + second.substr(0, 1) + 'Bar').parent().addClass('progress-warning');
//	$('#' + third.substr(0, 1) + 'Bar').parent().addClass('progress-info');
	
//	$('.bar').each(function(i){
//		id = $(this).attr('id');
//		bar = id.substr(0, 1);
//		if ($.getUrlVar(bar) > 18) {
//			$('#' + id).parent().addClass('progress-success');
//		}
//		else if ($.getUrlVar(bar) > 14){
//			$('#' + id).parent().addClass('progress-warning');
//		}
//	});
}

function getLink() {
	var base = "https://api-ssl.bitly.com/v3/shorten?login=vmitchell85&apiKey=R_d7db4ae42b966b11c23f7297fcb51c8a&callback=setUrl&longUrl=";
	cUrl = document.URL.replace(/&/g, '%26');
	base = base + cUrl;
	$.getScript(base);
}

function setUrl(response) {
	$('#bitLink').text(" " + response.data.url);
}

/*---------------------------------------------------------------------------*/
$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});