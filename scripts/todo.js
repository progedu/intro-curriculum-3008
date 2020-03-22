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
		msg.send(`${task} を追加しました。`);
	});
	robot.respond(/done (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		todo.done(task);
		msg.send(`${task} を完了にしました。`);
	});
	robot.respond(/del (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		todo.del(task);
		msg.send(`${task} を削除しました。`);
	});
	robot.respond(/list/i, (msg) => {
		const list = todo.list();
		if(list.length === 0) {
			msg.send(`残っている TODO はありません。`);
		} else {
			msg.send(todo.list().join('\n'));
		}
	});
	robot.respond(/donelist/i, (msg) => {
		const donelist = todo.donelist();
		const list = todo.list().join(' と ');
		if (donelist.length === 0) {
			msg.send(`やり終えた TODO はありません。まだ ${list} が残っています。`);
		}else {
			msg.send(todo.donelist().join('\n'));
		}
	});
};
