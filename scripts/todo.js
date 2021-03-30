// Description:
//   TODO を管理することができるボットです
// Commands:

//   ボット名 おきてる？　  - bot起動確認
//   ボット名 やること　　　　  - TODO を作成
//   ボット名 おわた　　  - TODO を完了にする
//   ボット名 けす　　　　  - TODO を消す
//   ボット名 リスト　　　  - TODO の一覧表示
//   ボット名 おわたリスト  - 完了した TODO の一覧表示
'use strict';
const todo = require('todo');


module.exports = (robot) => {


  robot.hear(/おきてる？/i, (msg) => {
    msg.send(`　起きてますよ♪　`);
  });

  robot.hear(/やること　(.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.add(task);
    msg.send(`「${task}」を追加したョ♪　`);
  });

  robot.hear(/おわた　(.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.done(task);
    msg.send(`「${task}」完了。了解。`);
  });

  robot.hear(/けす　(.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.del(task);
    msg.send(`「${task}」を削除。了解。`);
  });

  robot.hear(/リスト/i, (msg) => {
    const list = todo.list();
    if(list.length === 0){
      msg.send(`「タスクはないョ♪ 」`);
    }else{
    msg.send(todo.list().join('\n'));
    }
  });

  robot.hear(/おわたリスト/i, (msg) => {
    const done = todo.donelist();
    if(done.length === 0){
      msg.send(`おまえはなにも成し遂げてないぜ。`);
    }else{
    msg.send(todo.donelist().join('\n'));
    }
  });
}; 








/**
 * // Description:
//   TODO を管理できるボットです
// Commands:
//   ボット名 add      - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示
'use strict';
const todo = require('todo');
module.exports = robot => {
  robot.respond(/add (.+)/i, msg => {
    const task = msg.match[1].trim();
    todo.add(task);
    msg.send('追加しました: ' + task);
  });
  robot.respond(/done (.+)/i, msg => {
    const task = msg.match[1].trim();
    todo.done(task);
    msg.send('完了にしました: ' + task);
  });
  robot.respond(/del (.+)/i, msg => {
    const task = msg.match[1].trim();
    todo.del(task);
    msg.send('削除しました: ' + task);
  });
  robot.respond(/list/i, msg => {
    const list = todo.list();
    if (list.length === 0) {
      msg.send('(TODOはありません)');
    } else {
      msg.send(list.join('\n'));
    }
  });
  robot.respond(/donelist/i, msg => {
    const donelist = todo.donelist();
    if (donelist.length === 0) {
      msg.send('(完了したTODOはありません)');
    } else {
      msg.send(donelist.join('\n'));
    }
  });
};
 * 
 * 
 * 
 * 
 * 
 */