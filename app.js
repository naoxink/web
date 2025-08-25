document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
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
                    a.textContent = '[link]';
                    a.target = '_blank';
                    li.appendChild(a);
                    ul.appendChild(li);
                });
                container.appendChild(ul);
            });
        });
});