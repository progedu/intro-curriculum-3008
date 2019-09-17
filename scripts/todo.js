// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 おきとる？　  - bot起動確認
//   ボット名 やる　　　　  - TODO を作成
//   ボット名 やった　　　  - TODO を完了にする
//   ボット名 けす　　　　  - TODO を消す
//   ボット名 リスト　　　  - TODO の一覧表示
//   ボット名 やったリスト  - 完了した TODO の一覧表示
'use strict';
const todo = require('todo');

module.exports = (robot) => {

  robot.hear(/おきとる？/i, (msg) => {
    msg.send(`ちゃんと起きてるのだぜ。`);
  });

  robot.hear(/やる　(.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.todo(task);
    msg.send(`「${task}」を追加したのだぜ。`);
  });

  robot.hear(/やった　(.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.done(task);
    msg.send(`「${task}」完了。了解。`);
  });

  robot.hear(/消す　(.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.del(task);
    msg.send(`「${task}」を削除。了解。`);
  });

  robot.hear(/リスト/i, (msg) => {
    const list = todo.list();
    if(list.length === 0){
      msg.send(`「現在、タスクはないのぜ。`);
    }else{
    msg.send(todo.list().join('\n'));
    }
  });

  robot.hear(/やったリスト/i, (msg) => {
    const done = todo.donelist();
    if(done.length === 0){
      msg.send(`おまえはなにも成し遂げてないのぜ。`);
    }else{
    msg.send(todo.donelist().join('\n'));
    }
  });
};