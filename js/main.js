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
  
  //前景の山が迫り上がる。
  $(function(){
    $(window).on('scroll load', function(){
      let winHeight = window.pageYOffset;                              //ページ上端からの距離を検知
      let offsetTop = $('.layer-2').get(0).offsetTop;                  //'.layer-2'のY座標における絶対位置
      let offsetElm = offsetTop + 1602;                                //'.layer-2'のY座標の終点 + その時のwindow.pageYoffset
      let offsetMove = --offsetElm;                                    // 'layer-2'のmargin-top を求める条件式
      let min = offsetMove < 2360;                                     //  ???
      let trigger = 1000;                                              // アニメーションが開始する位置(仮)
      let goal = 1992;                                                 // アニメーションが終了する位置
      let IsUpper = winHeight < trigger && winHeight < goal;           // if else文の条件式1
      let IsMiddle = winHeight >= trigger && winHeight < goal;         // if else文の条件式2
      let IsLower = winHeight >= goal;                                 // if else文の条件式3
      
      // console.log(winHeight);
      // console.log(offsetTop);
      // console.log(offsetElm);
      // console.log(offsetMove);
      // console.log( typeof trigger );                                        
      // console.log(offsetElm);
      // console.log(`isUpper = ${IsUpper}`);
      // console.log(`isMiddle = ${IsMiddle}`);
      // console.log(`isLower = ${IsLower}`);

      //アニメーションさせるための条件分岐
      if( IsUpper ) {
        $('.layer-2').addClass('upper').removeClass('up').removeClass('lower').css('margin-top','2701px');
        //アニメーションをする前の状態を表すクラス名'.upper'を付与し、合わせて'layer-2'を下方に待機させる。
      } else if ( IsMiddle ) { 
        $('.layer-2').addClass('up').removeClass('lower').removeClass('upper').css('margin-top','2300px');
        //アニメーションしている状態を示すClass('up')を付与し、margin-topの値にscrollElmを呼び出し。
        if( min ) {}
      } else if ( IsLower) {
        $('.layer-2').addClass('lower').removeClass('up').removeClass('upper').css('margin-top','2360px');
        //指定の位置に達したらアニメーション完了後を示すクラス('lower')を付与。
      } else {
        return false;
      }
    });
  });

//ブール値 true or foals //データ型 ○ ストリング(文字列)　イント(数字) //リスト型○ //タイプスプリクト //視認性が悪い ○ //条件式 //イベントトリガー
//`hoge = ${scroll < trigger && scroll < goal
//リスト型

  //数値
  //移動前の位置 layer-2(margin-top: 2692px;) window(.scrollTop(): 1270px;) -1422px
  //移動後の位置 layer-2(margin-top: 2360px;) window(.scrollTop(): 1602px;) -758px
  //                                 -332px                        +332px   -664

  // window.addEventListener('scroll', function(event) {
  //   console.log(window.pageYOffset);  // 縦方向のスクロール量
  //   console.log(window.pageXOffset);  // 横方向のスクロール量
  // });