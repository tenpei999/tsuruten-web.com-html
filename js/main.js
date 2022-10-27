$(function(){
  $(".p-gmenu__list .item").hover(function(){
    $(this).children(".middle").stop().slideToggle();
  });
});


//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
  let scroll = $(window).scrollTop();
  if (scroll >= 100){//上から100pxスクロールしたら
    $('.p-page-top').removeClass('DownMove');//#page-topについているDownMoveというクラス名を除く
    $('.p-page-top').addClass('UpMove');//#page-topについているUpMoveというクラス名を付与
  }else{
    if($('.p-page-top').hasClass('UpMove')){//すでに#page-topにUpMoveというクラス名がついていたら
      $('.p-page-top').removeClass('UpMove');//UpMoveというクラス名を除き
      $('.p-page-top').addClass('DownMove');//DownMoveというクラス名を#page-topに付与
    }
  }
};

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// .p-page-topをクリックした際の設定
  $(function () {
    $(".p-page-top").on("click", function () {
      let scroll = $(window).scrollTop(); 
        //スクロール値を取得
        if(scroll > 0){
          $(this).addClass('floatAnime'); 
          //クリックしたらfloatAnimeというクラス名が付与
              $('body,html').animate({scrollTop: 0}, 3000, 'swing',function(){
                //スクロールの速さ。数字が大きくなるほど遅くなる
                  $('.p-page-top').removeClass('floatAnime');//上までスクロールしたらfloatAnimeというクラス名を除く
              }); 
        }
          return false;//リンク自体の無効化
    });
  });

  $(window).on('scroll', function(){

    let scrollTop = $(window).scrollTop();
    let Position = scrollTop / 1.9; //スクロール後のポジションを指定（値を大きくすると移動距離が小さくなる）
    let Position2 = scrollTop / 4; //スクロール後のポジションを指定（値を大きくすると移動距離が小さくなる）
  
    if(Position){
      $('.layer-10').css('margin-top', Position + 'px');
      $('.layer-11').css('margin-top', Position2 + 'px');
    }
  });
