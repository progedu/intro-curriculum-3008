// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 todo     - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示
'use strict';

// todoモジュールの呼び出し
const todo = require('todo');

module.exports = (robot) => {
  // todo
  robot.respond(/todo (.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.todo(task);
    msg.send('追加しました: ' + task);
  });
  // done
  robot.respond(/done (.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.done(task);
    msg.send('完了にしました: ' + task);
  });
  // del
  robot.respond(/del (.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.del(task);
    msg.send('削除しました: ' + task);
  });
  // list
  robot.respond(/list/i, (msg) => {
    // \はoptionキーを押しながら¥
  //   if ( todo.list() ) {
  //     msg.send(todo.list().join('\n'));
  //   } else {
  //     msg.send( 'TODOはありません' );
  //   }
  // });
  // listは重い処理だから変数に代入しておく
  const list = todo.list();
    if ( list.length === 0 ) {
      msg.send( 'TODOはありません' );
    } else {
      msg.send(list.join('\n'));
    }
  });
  // donelist
  robot.respond(/donelist/i, (msg) => {
    // \はoptionキーを押しながら¥
   const list = todo.donelist();
      if ( list.length === 0 ) {
        msg.send( '完了したTODOはありません' );
      } else {
        msg.send(list.join('\n'));
      }
  });

};
