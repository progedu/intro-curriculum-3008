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
	// todoコマンドを実装
	robot.respond(/todo (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		todo.todo(task);
		msg.send('追加しました: ' + task);
	});

	// doneコマンドを実装
	robot.respond(/done (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		todo.done(task);
		msg.send('完了にしました: ' + task);
	});

	// delコマンドを実装
	robot.respond(/del (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		todo.del(task);
		msg.send('削除しました: ' + task);
	});

	// listコマンドを実装
	robot.respond(/list/i, (msg) => {
		if (todo.list().length) {
			msg.send(todo.list().join('\n'));
		} else {
			msg.send('(TODOはありません)');
		}
	});

	// donelistコマンドを実装
	robot.respond(/donelist/i, (msg) => {
		if (todo.donelist().length) {
			msg.send(todo.donelist().join('\n'));
		} else {
			msg.send('(完了したTODOはありません)')
		}
	});
};