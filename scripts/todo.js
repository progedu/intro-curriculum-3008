// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 todo       - TODO を作成
//   ボット名 done       - TODO を完了する
//   ボット名 del        - TODO を消す
//   ボット名 list       - TODO の一覧表示
//   ボット名 donelist   - 完了した TODO の一覧表示

'use strict';
const todo = require('todo');
module.exports = (robot) => {
    robot.respond(/todo (.+)/i, (msg) => {          // respond 関数は、botの名前が一緒に呼び出された時のみ反応する関数
        const task = msg.match[1].trim();           // 正規表現 /todo (.+)/i のマッチ例　：　todo 鉛筆を買う
        todo.todo(task);                            // match[1] で、１番目の（）でマッチした文字列（鉛筆を買う）を取得
        msg.send('追加しました:　' + task);           // trim() は文字列の両端の空白を取り除いた文字列を取得する関数
    });
    robot.respond(/done (.+)/i, (msg) => {
        const task = msg.match[1].trim();
        todo.done(task);
        msg.send('完了にしました:　' + task);
    })
    robot.respond(/del (.+)/i, (msg) => {
        const task = msg.match[1].trim();
        todo.del(task);
        msg.send('削除しました:　' + task);
    })
    robot.respond(/list/i, (msg) => {
        if (todo.list().length === 0) {
            msg.send('TODOはありません');
        } else {
            msg.send(todo.list().join('\n'));
        }
    });
    robot.respond(/donelist/i, (msg) => {
        if (todo.donelist().length === 0){
            msg.send('完了したTODOはありません');
        } else {
            msg.send(todo.donelist().join('\n'));
        }        
    });
};
