// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 todo     - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示
'use strict';
const todo =require('todo');
module.exports = robot => {
  robot.hear(/todo (.+)/i, msg => {
    const task = msg.match[1].trim();
    todo.todo(task);
    msg.send('追加しました:'+ task);
  });
  robot.hear(/done (.+)/i, msg => {
    const task = msg.match[1].trim();
    todo.done(task);
    msg.send('完了にしました: ' + task);
  });
  robot.hear(/del (.+)/i, msg => {
    const task = msg.match[1].trim();
    todo.del(task);
    msg.send('削除しました: ' + task);
  });

  robot.respond(/list/i, (msg) => {
		if(msg === true){
      msg.send(todo.list().join('\n'));
      return
		}
			msg.send('TODOはありません！');
	});
	
	robot.respond(/donelist/i, (msg) => {
		if(msg === true){
      msg.send(todo.donelist().join('\n'));
      return
		}
			msg.send('完了したTODOはありません！');
	});
};
