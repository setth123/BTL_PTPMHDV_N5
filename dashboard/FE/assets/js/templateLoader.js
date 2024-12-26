function loadTemplate(templateId) {
    const template = document.getElementById(templateId);
    const content = document.getElementById('content');
    content.innerHTML = template.innerHTML;
}