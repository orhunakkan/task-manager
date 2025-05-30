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

    // API endpoint for creating tasks - FIXED URL PATH
    if (req.url === '/tasks' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });

        req.on('end', () => {
            console.log('Received body:', body); // Log received data for debugging

            try {
                const newTask = JSON.parse(body);
                console.log('Parsed task:', newTask);

                newTask.id = Math.random().toString(15);
                newTask.createdAt = new Date().toISOString();

                let tasks = [];
                try {
                    if (existsSync('tasks.json')) {
                        const fileContent = readFileSync('tasks.json', 'utf8');
                        if (fileContent.trim()) {
                            tasks = JSON.parse(fileContent);
                        }
                    }
                } catch (fileError) {
                    console.error('Error reading tasks file:', fileError);
                    // Continue with empty tasks array
                }

                tasks.push(newTask);
                writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Task saved', task: newTask }));
            } catch (error) {
                console.error('Error processing task:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid task data: ' + error.message }));
            }
        });

        req.on('error', (err) => {
            console.error('Request error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Server error processing request' }));
        });

        return;
    }

    // GET tasks endpoint
    if (req.url === '/tasks' && req.method === 'GET') {
        try {
            const tasks = existsSync('tasks.json') ? JSON.parse(readFileSync('tasks.json')) : [];
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(tasks));
        } catch (error) {
            console.error('Error retrieving tasks:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Server error' }));
        }
        return;
    }

    // Handle 404 for everything else
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
