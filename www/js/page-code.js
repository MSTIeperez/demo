 setTimeout(function() {
$( document ).ready(function() {
    
    // Global variables
    var step = 1;
    var num=0;
    // Notificación
    function notification() {
        setTimeout(function() {
            if($('.notification > i > span').length == 0) {
				if(num>0)
					$('.notification > i').append('<span class="not-count">'+num+'</span>');
            }
        }, 1000);
    }
    notification();
    $(document).on('click', function() {
        notification(); 
    });
    
    // Mostrar grupo
    $('body').on('click', '#show-all', function() {
        $('.image-list').toggleClass('active');
        if($('.image-list').hasClass('active') != true) {
            $(this).html('Ver todos');
        } else {
            $(this).html('Ver menos');
        }
    });
       
	// Botón visto 
    $('body').on('click', 'a.read', function(){
        $(this).children('i').toggleClass('ion-ios-eye-outline');
        $(this).children('i').toggleClass('ion-ios-eye');
    });
	
    // input comentar
    $('body').on('click', '.icon-message', function() {
         $(this).parent().toggleClass('active');
        $(this).parent().parent().parent().children('.input-comment').toggleClass('active');
    });
    
    // button seen menu: active para botones de no leido & leido
    $( 'body' ).on( 'click', '.seen-menu a', function() {
        $( '.seen-menu a' ).removeClass( 'active' );
        $( this ).addClass( 'active' );
		if($(this).hasClass('active')){
					$('.feeds').hide();
					$('.'+$(this).data('class')).removeClass('ng-hide');
					$('.'+$(this).data('class')).show();
				}
    });
    
    // button search: activa lighbox de busqueda
    $( 'body' ).on( 'click', '.ion-search, .btn-cancel', function() {
        $( '.lightbox-search' ).toggleClass( 'active' );
    });

    // button share: activa lighbox de compartir
    $( 'body' ).on( 'click', '.show-share', function() {
        $( '.share' ).addClass( 'active' );
        return false;
    });
    
    // button share email: activa lighbox de compartir por email
     $( 'body' ).on( 'click', '.show-lightbox-share', function() {
        $( '.share' ).removeClass( 'active' );
        $( '.lightbox-share' ).addClass( 'active' );
        return false;
    });
     // button edit folder: activa lighbox de edicion folder favorito
     $( 'body' ).on( 'click', '.show-lightbox-folder', function(e) {
        e.preventDefault();
		var folder_id=$(this).parent().data('id');
		var folder_name=$(this).parent('li').find('h2').html();
		console.log(folder_name)
		$("#folder_id").attr("ng-value",folder_id);
		$(".folder_title").attr("placeholder",folder_name);
		$( '.lightbox-add' ).toggleClass( 'active' );
      });
    // oculta los lightbox's
    $( 'body' ).on( 'click', '.close-lightbox', function() {
        $( '.share, .lightbox' ).removeClass( 'active' );
        return false;
    });

    // button comments: activa & oculta comentarios
    $( 'body' ).on( 'click', '.show-comments', function() {
        $( this ).parent( '.item-comments' ).toggleClass( 'active' );
		var num= $(this).find('span.comments-count').html();
        if( $( '.item-comments' ).hasClass( 'active') ) {
            $( this ).html( 'Ocultar <span class="comments-count">'+num+'</span> comentarios previos' );
        } else {
            $( this ).html( 'Mostrar <span class="comments-count">'+num+'</span> comentarios previos' );
        }

        return false;
    });
    
    // button favorite
    $( 'body' ).on( 'click', '.btn-favorite', function() {
        if( $( this ).children( 'i' ).hasClass( 'active' ) == false ) {
            $( '.lightbox-favorited' ).addClass( 'active' );
            $( this ).children( 'i' ).toggleClass( 'active' );
        } else {
            $( '.warning-remove' ).addClass( 'active' );
        }
        
        return false;
    });
    
    // button add: agreca folder a favoritos
    $( 'body' ).on( 'click', '.btn-add', function() {
        $( this ).text( function( i, text ) {
             return text === "Agregar archivero favorito" ? "Guardar" : "Agregar archivero favorito";
        });
        $( '.lightbox-favorited-content .btn-invisible' ).parent().removeClass( 'selected' );
        $( '.btn-delete' ).toggleClass( 'show' );
    });

    // list expand toggle: despliega las listas
    $( 'body' ).on( 'click', '.list-expand', function() {
        $( this ).parent().parent().children( '.list-content' ).toggleClass( 'active' );
        $( this ).children( 'i' ).toggleClass( 'ion-arrow-down-b ion-arrow-up-b' );
        return false;
    });
     
     // button selected: seleccion de carpeta favorito donde se guardara el feed
     $( 'body' ).on( 'click', '.lightbox-favorited-content .btn-invisible', function() {
         $( this ).parent().toggleClass( 'selected' );
         return false;
     });
     
     // button active tutorial
    $( 'body' ).on( 'click', '.show-tutorial, .hide-tutorial, .btn-skip', function(e) {
		e.preventDefault();
        if( ($( this ).attr( 'href' ) != '') && ($( this ).attr( 'href' ) != ' ') && ($( this ).attr( 'href' ) != '#') ) {
            var tutorial = $( this ).attr( 'href' );
            $( tutorial ).toggleClass( 'active' );
        } else {
            var what_tutorial = $( '.tutorial.active' ).attr( 'id' );
            
            $( '#' + what_tutorial ).toggleClass( 'active' );
            
            if( $( this ).hasClass( 'btn-skip' )) {
                setTimeout( function(){
                    $( '.next-tutorial' ).removeClass( 'btn-skip' );
                    $( '.next-tutorial' ).html( 'Siguiente' );
                    $( '.step' ).removeClass( 'active' );
                    $( '.step-1' ).addClass( 'active' );
                    
                    step = 1;
                }, 500);
            }
            
        }
        return false;
    });
     
    $( 'body' ).on( 'click', '.show-warning', function() {
        $( '.warning' ).addClass( 'active' );
        return false;
    });

	 // button hide warning
    $( 'body' ).on( 'click', '.hide-warning', function() {
        $( '.warning' ).removeClass( 'active' );
        return false;
    });

    // center element
    $( '.center' ).each(function() {
        var element_height = $(this).innerHeight();
            element_height = parseInt(element_height);

        var margin_top = - element_height / 2;

        $(this).css('margin-top', margin_top);
     });

    // tutorial: seleccion de temas

    $( 'body' ).on( 'click', '.next-tutorial', function() {
        step = step + 1;
        
        if( $( this ).parent().parent().attr('id') != 'temas') {
            if( step == 1 ) {
                $( '.step' ).removeClass( 'active' );
                $( '.step-1' ).addClass( 'active' );
            } else if( step == 2 ) {
                $( '.step' ).removeClass( 'active' );
                $( '.step-2' ).addClass( 'active' );
                $( '.next-tutorial' ).addClass( 'btn-skip' );
                $( '.next-tutorial' ).html( 'Finalizar' );
            } else {
                step = 1;
            }
        } else {

            step1 = "Selecciona el origen para mostrar sus temas";
            step2 = "Elige un tema seleccionando su casilla";
            step3 = "Despliega seleccionando el icono para ver el contenido de cada tema";

            if(step == 1) {
                $( '.step-header span' ).html( step );
                $( '.step-header p' ).html( step1 );
                $( '.point-1' ).addClass( 'active' );
                $( '.point-3' ).removeClass( 'active' );
            }
            else if(step == 2) {
                $( '.example .li-master' ).children( '.list-content' ).addClass( 'active' );
                $( '.step-header span' ).html( step );
                $( '.step-header p' ).html( step2 );
                $( '.point-2' ).addClass( 'active' );
                $( '.point-1' ).removeClass( 'active' );
            }
            else if(step == 3) {
                //step = 1;
                $( '.example .li-parent' ).children( '.list-content' ).addClass( 'active' );
                $( '.step-header span' ).html( step );
                $( '.step-header p' ).html( step3 );
                $( '.next-tutorial' ).html( 'Finalizar' );
                $( '.next-tutorial' ).addClass( 'btn-skip' );
                $( '.point-3' ).addClass( 'active' );
                $( '.point-2' ).removeClass( 'active' );
            } else {
                step = 1;
                $( '.next-tutorial' ).removeClass( 'btn-skip' );

                if( $( '.tutorial' ).hasClass( 'active' ) != true ) {
                    setTimeout(function(){
                        $( '.step-header span' ).html( step );
                        $( '.step-header p' ).html( step1 );
                        $( '.next-tutorial' ).html( 'Siguiente' )
                        $( '.example .list-content' ).removeClass( 'active' );
                        $( '.point-1' ).addClass( 'active' );
                        $( '.point-3' ).removeClass( 'active' );
                    }, 500);
                }

            }
        }

        $( this ).children( 'i' ).toggleClass( 'ion-arrow-down-b ion-arrow-up-b' );
        return false;
    });
});
 }, 1000);