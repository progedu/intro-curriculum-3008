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
		const task = msg.match[1].trim();
		const tasks = todo.list();{
		if(tasks.indexOf(task) !== -1){
			msg.send('そのタスクは既に登録されています');
		} else {
			todo.add(task);
			msg.send('追加しました: ' + task);
		}
	});
	robot.respond(/done (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		const tasks = todo.list();
		if(tasks.indexOf(task) === -1){
			msg.send('そのタスクは登録されていません');
		} else {
			todo.done(task);
			msg.send('完了にしました: ' + task);
		}
	});
	robot.respond(/del (.+)/i, (msg) => {
		const task = msg.match[1].trim();
		const tasks = todo.list();
		if(tasks.indexOf(task) === -1){
			msg.send('そのタスクは登録されていません');
		} else {
			todo.del(task);
			msg.send('削除しました: ' + task);
		}
	});
	robot.respond(/list/i, (msg) => {
		const list = todo.list();
		if (list.length === 0) {
			msg.send('タスクは１つもありません ^_^')
		} else {
			msg.send(('登録されたタスク一覧: ') + todo.list().join('\n'));
		}
	});
	robot.respond(/donelist/i, (msg) => {
		const donelist = todo.donelist();
		if (donelist.length === 0) {
			msg.send('まだ完了したタスクはありません T_T')
		} else {
			msg.send(('完了したタスク一覧: ') + todo.donelist().join('\n'));
		}
	});
};
