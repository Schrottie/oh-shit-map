document.addEventListener('DOMContentLoaded', function () {
    var collapseArrow = document.getElementById('collapse-arrow');
    if (collapseArrow) {
        collapseArrow.addEventListener('click', function () {
            var dropdownContent = document.getElementById('dropdown-content');
            if (dropdownContent) {
                if (dropdownContent.style.display === 'none' || dropdownContent.style.display === '') {
                    dropdownContent.style.display = 'block';
                    this.textContent = '▲';
                } else {
                    dropdownContent.style.display = 'none';
                    this.textContent = '▼';
                }
            }
        });
    }
});
