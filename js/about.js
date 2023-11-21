var sidebar = document.getElementById('sidebar');
var sidebarToggle = document.getElementById('sidebarToggle');

sidebarToggle.addEventListener('click', function () {
    var isOpen = sidebar.style.right === '0px';
    sidebar.style.right = isOpen ? '-300px' : '0px';
    sidebarToggle.style.right = isOpen ? '0px' : '300px';
});