// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 todo     - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示
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
		const list = todo.list(); //一度配列を取得してlistという変数に受け取り、
		if (list.length === 0) { // 0だったら（todoがない場合）
            msg.send('(TODOはありません)'); //todoがないときは左記のように発言
        } else {
            msg.send(list.join('\n')); //それ以外はリストを表示（todoがある場合）
        }
	});
	robot.respond(/donelist/i, (msg) => {
		const donelist = todo.donelist(); 
		if (donelist.length === 0) { 
            msg.send('(完了したTODOはありません)'); 
        } else {
            msg.send(donelist.join('\n'));
        }
	});
};
