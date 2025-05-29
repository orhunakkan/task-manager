import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const server = createServer((req, res) => {

    if (req.url === '/tasks' && req.method === 'POST') {

        let body = '';
        req.on('data', chunk => { body = body + chunk });
        req.on('end', () => {

            const newTask = JSON.parse(body);
            newTask.id = Math.random().toString(15);
            let tasks = [];

            if (existsSync('tasks.json')) {
                tasks = JSON.parse(readFileSync('tasks.json', 'utf-8'));
            }

            tasks.push(newTask);
            writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Task saved successfully' }));
        });

        return;
    }

    res.writeHead(404);
    res.end('Not Found');
});

server.listen(3000, () => {console.log('Server running on http://localhost:3000')});
