async function fetchNodes() {
    const githubUrl = 'https://raw.githubusercontent.com/ZentCashFoundation/zentcash-nodes-json/refs/heads/master/zentcash-nodes.json';
    const localFile = '/assets/js/zentcash-nodes.json';

    try {
        const response = await fetch(githubUrl);
        if (!response.ok) throw new Error('GitHub unavailable');
        const data = await response.json();
        return data.nodes;
    } catch (error) {
        console.warn('Failed to upload from GitHub, trying from local file...');
        try {
            const responseLocal = await fetch(localFile);
            if (!responseLocal.ok) throw new Error('Local file unavailable');
            const dataLocal = await responseLocal.json();
            return dataLocal.nodes;
        } catch (localError) {
            console.error('The node list could not be loaded from any source.');
            return [];
        }
    }
}

function fetchWithTimeout(url, options = {}, timeout = 5000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), timeout)
        )
    ]);
}

async function fetchNodeInfo(node) {
   /**
     if (node.ssl === false) {
        return {
            name: node.name,
            url: node.url,
            port: node.port,
            height: 'N/A',
            status: 'ssl false / no HTTPS'
        };
    }

    **/

     if (node.ssl === false) {
        return null; 
    }

    try {
        const url = `http://${node.url}:${node.port}/info`;
        const response = await fetchWithTimeout(url, {}, 5000);
        const info = await response.json();
        console.log(response);
        return {
            name: node.name,
            url: node.url,
            port: node.port,
            height: info.height,
            status: 'online'
        };
    } catch (error) {
        return {
            name: node.name,
            url: node.url,
            port: node.port,
            height: 'N/A',
            status: 'offline'
        };
    }
}

async function populateTable() {
    const nodes = await fetchNodes();
    const tableBody = document.getElementById('node-table-body');
    const fragment = document.createDocumentFragment();

    const nodesInfo = (await Promise.all(nodes.map(fetchNodeInfo))).filter(node => node !== null);

    nodesInfo.forEach(node => {
        const row = document.createElement('tr');

        if (node.status === 'online') {
            row.style.backgroundColor = '#323232';
            row.style.color = '#bebebe';
        }

        if (node.status === 'ssl false / no HTTPS') {
            row.style.backgroundColor = '#cf9846';
            row.style.color = '#fcead6';
        } 

        if (node.status === 'offline') {
            row.style.backgroundColor = '#ec5353';
            row.style.color = '#f8ab8d';
        } 

        ['name','url','port','height','status'].forEach(field => {
            const cell = document.createElement('td');
            cell.textContent = node[field];
            if (field === 'status') {
                if (node.status === 'online') cell.style.color = 'green';
                else if (node.status === 'offline') cell.style.color = '#f8ab8d';
                else cell.style.color = '#fcead6'; // ssl false
            }
            row.appendChild(cell);
        });

        fragment.appendChild(row);
    });

    tableBody.appendChild(fragment);

}

document.addEventListener('DOMContentLoaded', populateTable);