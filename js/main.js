window.addEventListener('DOMContentLoaded', ()=>{
  document.querySelector( '.js-hamburger' ).addEventListener(
    'click',
    () => {
      document.querySelector( 'body' ).classList.toggle( 'is-open' );
      document.querySelector( '.js-hamburger' ).classList.toggle( 'is-open' );
      document.querySelector( '.p-gmenu--inner' ).classList.toggle( 'is-open' );
      document.querySelector( '.p-header__background' ).classList.toggle( 'is-open' );
      document.querySelector( '.c-hamburger' ).classList.toggle( 'is-open' );
    }
  );
});

//jQuery
//アコーディオンをクリックした時の動作
$('.title').on('click', function() {//タイトル要素をクリックしたら
  var findElm = $(this).next(".box");//直後のアコーディオンを行うエリアを取得し
  $(findElm).slideToggle();//アコーディオンの上下動作
    
  if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
    $(this).removeClass('close');//クラス名を除去し
  }else{//それ以外は
    $(this).addClass('close');//クラス名closeを付与
  }
});

//画面幅に合わせて左にスライド

let window_w = window.innerWidth;

jQuery(window).resize(function(){
  $('.p-animation-background__layer').css('margin-left','window_w')
});
