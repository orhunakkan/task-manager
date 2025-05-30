import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/') {
        const html = readFileSync('./public/index.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
        return;
    }

    if (req.url === '/script.js') {
        const js = readFileSync('./public/script.js');
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.end(js);
        return;
    }

    if (req.url === '/style.css') {
        const css = readFileSync('./public/style.css');
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(css);
        return;
    }

    if (req.url === '/favicon.ico') {
        try {
            const favicon = readFileSync('./public/favicon.ico');
            res.writeHead(200, { 'Content-Type': 'image/x-icon' });
            res.end(favicon);
        } catch (error) {
            res.writeHead(404);
            res.end();
        }
        return;
    }

    if (req.url === '/tasks' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const newTask = JSON.parse(body);
                newTask.id = Math.random().toString(15);
                newTask.createdAt = new Date().toISOString();

                let tasks = [];
                if (existsSync('tasks.json')) {
                    const fileContent = readFileSync('tasks.json', 'utf8');
                    if (fileContent.trim()) {
                        tasks = JSON.parse(fileContent);
                    }
                }

                tasks.push(newTask);
                writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Task saved', task: newTask }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid task data' }));
            }
        });
        return;
    }

    if (req.url === '/tasks' && req.method === 'GET') {
        try {
            const tasks = existsSync('tasks.json') ? JSON.parse(readFileSync('tasks.json')) : [];
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(tasks));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Server error' }));
        }
        return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
