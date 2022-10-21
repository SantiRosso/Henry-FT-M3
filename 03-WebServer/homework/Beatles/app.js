var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer((req, res) => {

  if(req.url === '/') {
    const index = fs.readFileSync('./index.html', 'utf-8');
    res.writeHead(200, {'Content-type': 'text/html'}).end(index)
  }

  const miUrl = req.url.split('/');
  if(miUrl.length < 3) {
    const beatleName = miUrl[1].replace('%20', ' ');
    const beatle = beatles.filter((elem) => elem.name === beatleName)[0];
    let template = fs.readFileSync('./beatle.html', 'utf-8');

    template = template.replace('{name}', beatle.name);
    template = template.replace('{birthdate}', beatle.birthdate);
    template = template.replace('{image}', beatle.profilePic);
    res.writeHead(200, {'Content-type': 'text/html'}).end(template);
  }

  if(req.url === '/api') {
    return res
      .writeHead(200, {'Content-type': 'application/json'})
      .end(JSON.stringify(beatles))
  }

  const beatleName = req.url.split('/').pop().replace('%20', ' ');
  console.log(beatleName)

  if(req.url.includes('/api') && beatleName) {
    const beatle = beatles.filter((elem) => elem.name === beatleName)
    if(!beatle.length) return res.writeHead(404).end('Beatle not found')
    return res
      .writeHead(200, {'Content-type': 'application/json'})
      .end(JSON.stringify(beatle))
    }

}).listen(3001, 'localhost')