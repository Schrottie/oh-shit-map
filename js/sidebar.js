document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar');
    var sidebarToggle = document.getElementById('sidebar-toggle');
    var download = document.getElementById('download-button');

    sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('show');
        sidebarToggle.classList.toggle('show');
        download.classList.toggle('show');
    });
});
