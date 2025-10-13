const fs = require('fs')
const path = require('path')

const datasetRoot = path.join(__dirname, '..', 'public', 'dataset')
const outFile = path.join(__dirname, '..', 'public', 'dataset_manifest.json')

function isImage(name){
  return /\.(png|jpg|jpeg|gif|bmp|tiff)$/i.test(name)
}

function walk(dir, relative = ''){
  const entries = fs.readdirSync(dir, {withFileTypes:true})
  let results = []
  for(const e of entries){
    const full = path.join(dir, e.name)
    const rel = path.join(relative, e.name)
    if(e.isDirectory()){
      results = results.concat(walk(full, rel))
    } else if(e.isFile() && isImage(e.name)){
      results.push({full, rel, name: e.name})
    }
  }
  return results
}

if(!fs.existsSync(datasetRoot)){
  console.error('Dataset folder not found at', datasetRoot)
  process.exit(1)
}

const files = walk(datasetRoot)

const manifest = {byFilename:{}, byPath:{}}

files.forEach(f=>{
  // try to infer class label from path segments (handle common variations / misspellings)
  const parts = f.rel.split(path.sep)
  function clean(s){
    return (s||'').toString().toLowerCase().replace(/[^a-z]/g,'')
  }
  function inferFromSegment(seg){
    const c = clean(seg)
    if(!c) return null
    // ischemic variations
    if(c.includes('ischem') || c.includes('isch') || c.includes('ischm') || c.includes('ischem')) return 'Ischemic'
    // haemorrhagic / hemorrhagic variations
    if(c.includes('haemorrh') || c.includes('hemorrh') || c.includes('haemor') || c.includes('hemor')) return 'Haemorrhagic'
    // normal
    if(c.includes('normal')) return 'Normal'
    return null
  }

  let normalized = null
  for(const p of parts){
    const got = inferFromSegment(p)
    if(got){ normalized = got; break }
  }
  if(!normalized){
    // fallback to top-level direction or unknown
    normalized = inferFromSegment(parts[0]) || 'unknown'
  }

  // map by filename
  if(!manifest.byFilename[f.name]) manifest.byFilename[f.name] = []
  if(!manifest.byFilename[f.name].includes(normalized)) manifest.byFilename[f.name].push(normalized)

  // map by relative path
  manifest.byPath[f.rel.replace(/\\/g, '/')]=normalized
})

fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2))
console.log('Wrote manifest with', files.length, 'images to', outFile)
