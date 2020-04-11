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
// const list = todo.list() として、何度もtodo.list()という関数を
// 呼び出さない方がよい(処理が重くなる可能性)
	robot.respond(/list/i, (msg) => {
		if (todo.list().length !== 0) {
			msg.send(todo.list().join('\n'));
		} else {
			msg.send('TODOはありません');
		}
	});
// const donelist = todo.donelist() として、何度もtodo.donelist()という関数を
// 呼び出さない方がよい(処理が重くなる可能性)
	robot.respond(/donelist/i, (msg) => {
		if (todo.donelist().length !== 0) {
			msg.send(todo.donelist().join('\n'));
		} else {
			msg.send('完了したTODOはありません');
		}
	});
};
