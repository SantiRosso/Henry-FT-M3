const fs = require('fs');
const request = require('request');

const echo = (args, print) => {
    print(args.join(' '));
}

const pwd = (args, print) => {
    print(__dirname.split('\\').at(-1) /* process.env.pwd */);   
}

const date = (args, print) => {
    print(Date());
}

const ls = (args, print) => {
    fs.readdir('.', (err, files)=>{
        if(err) throw err;
        print(files.join('\n'))
        // files.forEach(file => process.stdout.write(file + '\n'));
    })
}

const cat = (args, print) => {
    fs.readFile(args.at(0), 'utf-8', (err, data) => {
        if(err) throw err;
        print(data);
    })
}

const head = (args, print) => {
    fs.readFile(args.at(0), 'utf-8', (err, data) => {
        if(err) throw err;
        print(data.split('\n').splice(0, 5).join('\n'));
    })
}

const tail = (args, print) => {
    fs.readFile(args.at(0), 'utf-8', (err, data) => {
        if(err) throw err;
        print(data.split('\n').splice(-5).join('\n'));
    })
}

const curl = (args, print) => {
    request(args[0], (err, data) => {
        if(err) throw err;
        print(data.body)
    })
}

const wc = (args, print) => {
    fs.readFile(args.at(0), 'utf-8', (err, data) => {
        if(err) throw err;
        print(`${data.split('\n').length}`)
        // print(data.toString().split('\n').length.toString());
        
    })
}

const sort = (args,print) => {
    
}

const uniq = (args,print) => {

}

module.exports = {
    pwd,
    date,
    ls,
    echo,
    cat,
    head,
    tail,
    curl,
    sort,
    wc,
    uniq
}