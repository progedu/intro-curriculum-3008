// Description:
//  this is a bot to manage your TODO list
// Commands:
//  {botname} todo - generate new TODO
//  {botname} done - make undone TODO done
//  {botname} del - delete TODO
//  {botname} list - show a list of undone TODO
//  {botname} doneList - show a list of done TODO

'use strict';
const todo = require('todo');;
module.exports = (robot) => {
  robot.respond(/todo (.+)/i, (msg) => {
    const task = msg.match[1].trim(); // msg.matchの0番目には、マッチした文字列全体が、1番目には最初の()で括った文字列が入る。
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
    msg.send('削除しました:' + task);
    });
  robot.respond(/list/i, (msg) => {
    if (!todo.list()) {
      msg.send('(TODOはありません');
    } else {
      msg.send(todo.list().join('\n'));
      }
  });
  robot.respond(/donelist/i, (msg) => {
    if (!todo.doneList()()) {
      msg.send('(完了したTODOはありません');
    } else {
      msg.send(todo.doneList().join('\n'));
    }
  });
};
