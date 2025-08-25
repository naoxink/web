document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(res => {
            // Obtener la fecha de modificación del archivo
            const lastModified = res.headers.get('Last-Modified');
            res.json().then(data => {
                const container = document.getElementById('listados');
                data.forEach(listado => {
                    const title = document.createElement('h2');
                    title.textContent = listado.title;
                    container.appendChild(title);

                    const ul = document.createElement('ul');
                    listado.items.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = '· ' + item.label + ' ';
                        const a = document.createElement('a');
                        a.href = item.url;
                        a.textContent = '[>]';
                        a.target = '_blank';
                        li.appendChild(a);
                        ul.appendChild(li);
                    });
                    container.appendChild(ul);
                });

                // Mostrar la fecha de última modificación
                if (lastModified) {
                    const footer = document.createElement('footer');
                    footer.id = 'modificacion';
                    footer.textContent = `Última modificación de datos: ${new Date(lastModified).toLocaleString().split(', ').shift()}`;
                    document.body.appendChild(footer);
                }
            });
        });
});