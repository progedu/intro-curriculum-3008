// Description:
//   TODOを管理することができるボットです。
// Commands:
//   ボット名 todo      - TODOを作成
//   ボット名 done      - TODOを完了にする
//   ボット名 del      - TODOを消す
//   ボット名 list      - TODOの一覧表示
//   ボット名 donelist      - 完了したTODOの一覧表示

'use strict';
const todo = require('todo');
module.exports = (robot) => {
  robot.respond(/todo (.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.todo(task);
    msg.send('追加しました: ' + task);
  });
  robot.respond(/done (.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.done(task);
    msg.send('完了にしました: ' + task);
  });
  robot.respond(/del (.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.del(task);
    msg.send('削除しました: ' + task);
  });
  robot.respond(/list/i, (msg) => {
    msg.send(todo.list().join('\n'));
    if(todo.list().join('\n') === ''){
      msg.send('(TODOはありません)');
    };
  });
  robot.respond(/donelist/i, (msg) => {
    msg.send(todo.donelist().join('\n'));
    if(todo.donelist().join('\n') === ''){
      msg.send('(完了したTODOはありません)');
    };
  });
};
