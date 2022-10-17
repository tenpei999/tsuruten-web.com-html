window.addEventListener('DOMContentLoaded', ()=>{
  document.querySelector( '.js-hamburger' ).addEventListener(
    'click',
    () => {
      document.querySelector( '.js-hamburger' ).classList.toggle( 'is-open' );
      document.querySelector( '.p-hamburger__list' ).classList.toggle( 'is-open' );
      document.querySelector( 'body' ).classList.toggle( 'is-open' );
    }
  );
});