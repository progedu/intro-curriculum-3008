// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 todo     - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示
'use strict';
const request = require('request');
const todo = require('todo');

/*	引数の値が整数かどうかを判定する関数
*	@param {number} x
*	@return {boolean} 整数かどうか
*/
function isInteger(x) {
	return x % 1 === 0;
}

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
		const todo_list = todo.list()[0];
		if (todo_list)
			msg.send(todo.list().join('\n'));
		else 
			msg.send('(TODO はありません)');
	});
	robot.respond(/donelist/i, (msg) => {
		const todo_donelist = todo.donelist()[0];
		if (todo_donelist)
			msg.send(todo.donelist().join('\n'));
		else 
			msg.send('(完了した TODO はありません)');
	});
	robot.respond(/nicorank( +.*)?/i, (msg) => {
		let rank = msg.match[1];
		if (rank !== undefined) rank = rank.trim();
		let title_list, ranking_list = [];
		request('http://www.nicovideo.jp/ranking/fav/hourly/all?rss=2.0&lang=ja-jp', (error, response, body) => {
			if (!error && response.statusCode === 200) {
				title_list = body.match(/<title>.+<\/title>/g);
				if (isInteger(rank) && 0 < rank && 100 >= rank) {
					for (let i = 0; i <= rank; i = i + 1)
						ranking_list[i] = title_list[i].replace(/<title>(.+)<\/title>/, '$1');		
				} else {
					ranking_list = title_list.map((title) =>
						title.replace(/<title>(.+)<\/title>/, '$1')
					);
					msg.send('※ 引数を 1 ~ 100 の間で付けるとランキングを自由に絞り込めます。');
				}
				msg.send(ranking_list.join('\n'));
			} else {
				msg.send('error: ' + response.statusCode);	
			}
		});
	});
};
