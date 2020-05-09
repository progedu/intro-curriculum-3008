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
console.log(todo.list());
module.exports = (robot) => {
    robot.respond(/todo (.*)/i, (msg) =>{
        const task = msg.match[1].trim();
        todo.todo(task);
        msg.send('んなぁ〜タスクを追加したぞぉ〜: ' + task);
    });
    robot.respond(/done (.*)/i, (msg) =>{
        const task = msg.match[1].trim();
        todo.done(task);
        msg.send('んなぁ〜タスクを完了したぞぉ〜: ' + task);
    })
    robot.respond(/del (.*)/i, (msg) =>{
        const task = msg.match[1].trim();
        todo.del(task);
        msg.send('んなぁ〜タスクを削除したぞぉ〜: ' + task);
    })
    robot.respond(/list/i, (msg) => {
		const result = todo.list().join('\n・');
		if (result){
			msg.send('んなぁ〜未完了タスクの一覧だぞ〜' + '\n' + '=====' +  '\n・'  + result  +  '\n' + '=====');
		}else{
			msg.send('んなぁ〜未完了のタスクはないぞ〜')
		}
    })
    robot.respond(/donelist/i, (msg) => {
		const result = todo.donelist().join('\n・');
		if (result){
			msg.send('んなぁ〜完了済タスクの一覧だぞ〜' +  '\n' + '=====' +  '\n・'  + result +  '\n'  + '=====');
		}else{
			msg.send('んなぁ〜完了済のタスクはないぞ〜')
		}
		
    })

};
