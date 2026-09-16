import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(project,'_site');
if(path.dirname(output)!==project||path.basename(output)!=='_site')throw Error('输出路径检查失败');
if(fs.existsSync(output)){
 if(fs.lstatSync(output).isSymbolicLink()||fs.realpathSync(output)!==output)throw Error('拒绝清理重定向的输出目录');
 fs.rmSync(output,{recursive:true});
}
