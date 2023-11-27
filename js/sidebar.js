document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar');
    var sidebarToggle = document.getElementById('sidebar-toggle');
    var downloadbar = document.getElementById('downloadbar');
    var downloadbarToggle = document.getElementById('downloadbar-toggle');

    sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('show');
        sidebarToggle.classList.toggle('show');
        downloadbarToggle.classList.toggle('hidden');
    });

    downloadbarToggle.addEventListener('click', function () {
        downloadbar.classList.toggle('show');
        sidebarToggle.classList.toggle('hidden');
        downloadbarToggle.classList.toggle('show');
    });
});
