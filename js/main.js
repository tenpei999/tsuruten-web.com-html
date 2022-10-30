//ハンバーガー
window.addEventListener('DOMContentLoaded', ()=>{
  document.querySelector( '.js-hamburger' ).addEventListener(
    'click',
    () => {
      document.querySelector( 'body' ).classList.toggle( 'is-open' );
      document.querySelector( '.js-hamburger' ).classList.toggle( 'is-open' );
      document.querySelector( '.p-gmenu--inner' ).classList.toggle( 'is-open' );
      // document.querySelector( '.p-header__background' ).classList.toggle( 'is-open' );
      document.querySelector( '.c-hamburger' ).classList.toggle( 'is-open' );
    }
  );
});

media();
$(window).on("resize", function(){ media(); });

// メディアクエリ
function media() {
  // 横幅を取得
  let width = $(window).width();
  if(width > 1200) {
    // 画面幅が1200pxより上の時
    
    //pcドロワー
    $(function(){
      $(".p-gmenu__list .item").hover(function(){
        $(this).children(".middle").stop().slideToggle();
      });
    });

  } else if(width <= 1200) {
  // 画面幅が1200px以下での時

    //アコーディオンメニュー
    $(function(){
      //クリックで動く
      $('.item3').click(function(){
        $(this).toggleClass('active');
        $(this).next('nav').slideToggle();
        $(this).children(".middle").stop().slideToggle();
      });
    });
  }
}


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

  //視線に追従する雲
  $(window).on('scroll', function(){

    let scrollTop = $(window).scrollTop();
    let Position = scrollTop / 1.9; //スクロール後のポジションを指定（値を大きくすると移動距離が小さくなる）
    let Position2 = scrollTop / 1.5;
  
    if(Position){
      $('.layer-10').css('margin-top', Position + 'px');
      $('.layer-11').css('margin-top', Position2 + 'px');
    }
  });
  
  $(window).on('scroll load', function(){
    let scrollTop = $(window).scrollTop();
    let winH = $(window).height();
    let background_front_pos = $('.layer-2').offset();
   // 公式
    let background_front_now = (1 - (background_front_pos - scrollTop) / winH) * 2 * 100; 
  
    $('.layer-2').css('top', background_front_now + 'rem');
});

//

// $(window).on('scroll load', function(){
//   let scrollTop = $(window).scrollTop();
//   let winH = $(window).height();
//   let section_bar_pos = $('.section_bar').offset().top;
//  // 公式
//   let section_bar_now = (1 - (section_bar_pos - scrollTop) / winH) * 5 * 100;

//   $('.section_bar').css('width', section_bar_now + 'rem');
// });



//ブール値 true or foals //データ型 ○ ストリング(文字列)　イント(数字) //リスト型○ //タイプスプリクト //視認性が悪い ○ //条件式 //イベントトリガー
//`hoge = ${scroll < trigger && scroll < goal
//リスト型

  //数値
  //移動前の位置 layer-2(top: 2337.76px;) window(.scrollTop(): 1270px;) -1422px
  //移動後の位置 layer-2(top: 2337.76px;) window(.scrollTop(): 1602px;) -758px
  //                                 -332px                        +332px   -664

  // window.addEventListener('scroll', function(event) {
  //   console.log(window.pageYOffset);  // 縦方向のスクロール量
  //   console.log(window.pageXOffset);  // 横方向のスクロール量
  // });

//   $(window).on('scroll load', function(){
//     let scrollTop = $(window).scrollTop();
//     let winH = $('p-animation-background').height();
//     console.log(winH);
//     let background_front_pos = $('.layer-2').offset().top;
//    // 公式
//     let background_front_now = (1 - (background_front_pos - scrollTop) / winH); 

//     // 76(%) = (1 - (background_front_pos{変数} - scrollTop{変数}) / winH(3076px))
//     // scrollTop = 0 
//     //76(%) : 2.21056(%) = 34.3798064 : 1
//     //
//     //background_front_pos 2337.76px 146.11rem|| scrollTop 0 ~ 1602px || winH 3076px || background_front_now = (1 - (background_front_pos - scrollTop) / winH); = 0.9860869565217392 ~ 2.2105512360446573 → (76 + X)% ~ 76%
    
//     //146.11rem(2337.76px) = (1 - (146.11rem - scrollTop(1830px) / 3076px)
//     //146.11rem(2337.76px) = scrollTop(1830px) * 1.27746448 =X
//     //X = scrollTop(0) * 1600
//     //100rem(1600px) = scrollTop(0) * 1600
//     //scrollTop(1830px)  
//     //winH(3076px)
//     //scrollTop(0) * 1600 * 0.00079842 = 146.11rem
  
//     $('.layer-2').css('top', background_front_now + 'rem');
//     console.log(background_front_pos);
//     console.log(background_front_now);
//     console.log(scrollTop);
// });
