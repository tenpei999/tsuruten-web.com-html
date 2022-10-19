window.addEventListener('DOMContentLoaded', ()=>{
  document.querySelector( '.js-hamburger' ).addEventListener(
    'click',
    () => {
      document.querySelector( 'body' ).classList.toggle( 'is-open' );
      document.querySelector( '.js-hamburger' ).classList.toggle( 'is-open' );
      document.querySelector( '.p-gmenu__list' ).classList.toggle( 'is-open' );
      document.querySelector( '.p-header__background' ).classList.toggle( 'is-open' );
      document.querySelector( '.c-hamburger' ).classList.toggle( 'is-open' );
    }
  );
});