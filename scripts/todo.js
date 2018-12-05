// Description:
//   ToDo を管理することができるボットです
// Commands:
//   ボット名 todo     - ToDo を作成
//   ボット名 done     - ToDo を完了にする
//   ボット名 del      - ToDo を消す
//   ボット名 list     - ToDo の一覧表示
//   ボット名 donelist - 完了した ToDo の一覧表示
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
		let list = todo.list();
		if (list.length === 0) {
			msg.send('ToDo はありません');
		} else {
			msg.send(todo.list().join('\n'));
		}
	});
	robot.respond(/donelist/i, (msg) => {
		let donelist = todo.donelist();
		if (donelist.length === 0) {
			msg.send('完了した ToDo はありません');
		} else {
		msg.send(todo.donelist().join('\n'));
		}
	});
};
