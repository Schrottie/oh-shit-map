document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar');
    var sidebarToggle = document.getElementById('sidebar-toggle');

    sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('show');
        sidebarToggle.classList.toggle('show');
    });
});
