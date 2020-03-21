// Description:
//   TODOを管理することができるボットです．
//
// Commands:
//   ボット名 todo     - todoを作成
//   ボット名 done     - todoを完了にする
//   ボット名 del      - todoを消す
//   ボット名 list     - todoの一覧表示
//   ボット名 donelist - 完了したtodoの一覧表示
//   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md

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
    if (todo.list.length === 0) {
      msg.send('(TODOはありません)')
    }
    else{
    msg.send(todo.list().join('\n'))};
  });
  robot.respond(/donelist/i, (msg) => {
    if (todo.list.length === 0) {
      msg.send('(完了したTODOはありません)')
    }
    else {
    msg.send(todo.donelist().join('\n'))};
  });
};

