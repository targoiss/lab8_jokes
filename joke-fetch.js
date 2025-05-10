const readline = require('readline');
const https = require('https');

const allowedCategories = [
    'animal',
    'career',
    'celebrity',
    'dev',
    'explicit',
    'fashion',
    'food',
    'history',
    'money',
    'movie',
    'music',
    'political',
    'religion',
    'science',
    'sport',
    'travel'
];


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введіть категорію жарту (допомога: help): ', (input) => {
    if (input === 'help') {
        console.log('\nДоступні категорії:\n' + allowedCategories.join(', '));
        rl.close();
        return;
    }

    const category = input.toLowerCase();

    if (!allowedCategories.includes(category)) {
        console.error('❌ Невірна категорія. Запустіть ще раз і введіть допустиму.');
        rl.close();
        return;
    }

    const url = `https://api.chucknorris.io/jokes/random?category=${category}`;

    https
        .get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    console.log('\n📦 Результати:');
                    console.log('📂 Категорія:', category);
                    console.log('📅 Дата створення:', json.created_at);
                    console.log('😂 Анекдот:', json.value);
                } catch (e) {
                    console.error('❌ Помилка парсингу JSON:', e.message);
                }
                rl.close();
            });
        })
        .on('error', (err) => {
            console.error('❌ Помилка запиту:', err.message);
            rl.close();
        });
});
