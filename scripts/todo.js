// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 add      - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示
'use strict';
const todo = require('todo');
module.exports = (robot) => {
	robot.respond(/add (.+)/i, (msg) => {
		console.log(msg);
		const task = msg.match[1].trim();
		todo.add(task);
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
		const todoList = todo.list();
		if (todoList.length) {
			msg.send(todoList.join('\n'));
		} else {
			msg.send('(TODOはありません)');
		}
	});
	robot.respond(/donelist/i, (msg) => {
		const doneList = todo.donelist();
		if (doneList.length) {
			msg.send(doneList.join('\n'));
		} else {
			msg.send('(完了したTODOはありません)');
		}
	});
};
