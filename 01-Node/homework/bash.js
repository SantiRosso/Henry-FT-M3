const commands = require('./commands');

const print = (input) => {
  process.stdout.write(input);
  process.stdout.write('\nprompt > ');
}

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  let args = data.toString().trim().split(' '); // remueve la nueva línea
  let cmd = args.shift();
  // process.stdout.write('You typed: ' + cmd + ' ');
  // if(cmd === 'date') {
  //       process.stdout.write(Date());  
  //     }
  //     if(cmd === 'pwd') {
  //       process.stdout.write();
  //     }
  commands[cmd] ? commands[cmd](args, print) : print('command not found');
});

// console.log(process)