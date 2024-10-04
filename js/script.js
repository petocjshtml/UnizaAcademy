//pri rozbalenom navbare pri malom rozlíšení rozbalené menu opäť zavrie
function closeMenu() {
    if (window.matchMedia("(max-width: 991.98px)").matches) {
      var navbarCollapse = document.getElementById('navbarNavAltMarkup');
      var bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }
}