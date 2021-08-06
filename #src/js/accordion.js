function accordions() {
  const accordion = document.querySelectorAll('.accordion__wrapper');

  accordion.forEach(element => {
    element.addEventListener('click', () => {

      if (element.classList.contains('active')) {
        element.classList.remove('active')
      } else {
        element.classList.add('active')
      }
    });
  });
}
export default accordions;