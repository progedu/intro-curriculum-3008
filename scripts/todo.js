// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 予定；    - TODO を作成
//   ボット名 終了；    - TODO を完了にする
//   ボット名 取消；    - TODO を消す
//   ボット名 未消化；  - TODO の一覧表示
//   ボット名 済； 	- 完了した TODO の一覧表示

'use strict';

const fnList = require('tdtest');

module.exports = (robot) => {
	robot.respond(/予定；(.+)/i, (msg) => {
		const task = msg.match[1].trim();
		fnList.todo(task);
		msg.send('追加しました: ' + task);
	});
	robot.respond(/終了；(.+)/i, (msg) => {
		const task = msg.match[1].trim();
		fnList.done(task);
		msg.send('完了にしました: ' + task);
	});
	robot.respond(/取消；(.+)/i, (msg) => {
		const task = msg.match[1].trim();
		fnList.del(task);
		msg.send('削除しました: ' + task);
	});
	robot.respond(/未消化；/i, (msg) => {
		const tdList = fnList.list();
		if (tdList.length === 0){
			msg.send('予定はありません');
		} else {
			msg.send(tdList.join('\n'));
		}
	});
	robot.respond(/済；/i, (msg) => {
		const tddoneList = fnList.donelist();
		if (tddoneList.length === 0){
			msg.send('終了した予定はありません');
		} else {
		msg.send(tddoneList.join('\n'));
		}
	});
};
