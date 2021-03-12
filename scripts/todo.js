// Description :
//  TODOを管理できるボットです
// Commands :
//      ボット名 add        - TODOを作成
//      ボット名 done       - TODOを完了にする
//      ボット名 del        - TODOを消す
//      ボット名 list       - TODOの一覧表示
//      ボット名 doneList   -　完了したTODOの一覧表示
'use strict';
const todo = require('todo');
module.exports = robot => {
    robot.respond(/add (.+)/i, msg => {
        const task = msg.match[1].trim();
        todo.add(task);
        msg.send('追加しました： ' + task);
    });
    robot.respond(/done (.+)/i, msg => {
        const task = msg.match[1].trim();
        todo.done(task);
        msg.send('完了にしました： ' + task);
    });
    robot.respond(/del (.+)/i, msg => {
        const task = msg.match[1].trim();
        todo.del(task);
        msg.send('削除しました： ' + task);
    });
    robot.respond(/list/i, msg => {
        const list = todo.list();
        if (list.length === 0) {
            msg.send('(TODOはありません)');
        } else {
            msg.send(todo.list().join('\n'));
        }
    });
    robot.respond(/donelist/i, msg => {
        const donelist = todo.doneList();
        if (donelist.length === 0) {
            msg.send('(完了したTODOはありません)');
        } else {
            msg.send(todo.doneList().join('\n'));
        }
    });
};