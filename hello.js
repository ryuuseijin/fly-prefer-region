const dropdown = document.getElementById('myDropdown');

dropdown.addEventListener('change', function (event) {
    const selectedValue = event.target.value;
    console.log('selected:', selectedValue);
    if (selectedValue) {
        chrome.runtime.sendMessage({ type: 'fly-prefer-region', region: selectedValue });
    }
});
