jQuery(document).ready(function($){

	// Send email preview
	$('#wppe_send_preview').on('click', this, function(e) {
		e.preventDefault();
		var email = $('#wppe_email_preview_field').val(), message = $('#wppe_preview_message'), loading = $('#wppe_ajax_loading');
		$.ajax({
			type: 'post',
			url: wppe_ajax_vars.url,
			data: {
				action: wppe_ajax_vars.action,
				preview_email: email,
				_ajax_nonce: wppe_ajax_vars.nonce
			},
			beforeSend: function() {
				loading.css('visibility', 'visible');
			},
			complete: function() {
				loading.css('visibility', 'hidden');
			},
			success: function(data) {
				message.append(data);
			}
		});
	});

	// Trigger help
	$('.wppe_help').on('click', this, function(e){
		e.preventDefault();
		$('a#contextual-help-link').trigger('click');
	});

	// Thickbox preview
	$('#wppe_preview_template').on('click', this, function(e) {
		e.preventDefault();

		var $this = $(this),
			title = $this.attr('title'),
			href = $this.attr('href');

		// Open TB
		tb_show(title, href);
		var $previewIframe = $('#TB_iframeContent');

		if( !$previewIframe.length )
			return;

		var template;
		if (typeof(tinyMCE) != 'undefined') {
			if( tinyMCE.activeEditor && !tinyMCE.activeEditor.isHidden() )
				template = tinyMCE.activeEditor.getContent();
			else
				template = $('.wppe_template').val();
		}

		$previewIframe = $previewIframe[$previewIframe.length - 1].contentWindow || frame[$previewIframe.length - 1];
		$previewIframe.document.open();
		$previewIframe.document.write( template );
		$previewIframe.document.close();
	});

});
