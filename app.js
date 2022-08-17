var fs = require('fs')



const init = async() => {
  const path  = `${__dirname}/word`
  const files = fs.readdirSync(path);
  const ret = []


  await Promise.all(
    files.map(async(f, index) =>{
      if (f==='.DS_Store') return

      let lines = fs.readFileSync(`${path}/${f}`,'utf-8').split('\n')
      let list = []

      lines.map((line,i)=>{
        line = line.replace(/`/g,'|')
        let same = line.split('|').slice(1).join('').replace(/　/g,' ').trim()

        let r = line.split('.')[1]
        let ch,jp,mean

        if (r.includes('【')) {
          ch = r.split('【')[0]
          jp = r.split('【')[1].split('】：')[0]

          mean = r.split('【')[1].split('】：')[1]
          if (mean?.includes('|')) {
            mean = mean.split('|')[0]
          }
        }else{
          ch = 'NULL'
          jp = r.split('：')[0]
          mean = r.split('：')[1]
        }
        
        let p = line.split('`')[1]||''
        list.push({jp, ch, mean, same})
      })

      ret.push({id: f.split('.')[0], list})
    }) 
  )

  fs.writeFileSync(`${__dirname}/word.json`,JSON.stringify(ret, null, 4),'utf-8')


}


init()