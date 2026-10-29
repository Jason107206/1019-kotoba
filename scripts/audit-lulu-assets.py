# Read-only alpha/bounds inspection of committed generated artwork.
from PIL import Image
import json
registry=json.load(open('reports/lulu-atlas-registry.json'))['assets']
files={}
for name in registry:
 data=registry[name]
 cells=data.get('rects') or [[i%data['columns']*data['cell'],i//data['columns']*data['cell'],data['cell'],data['cell']] for i in range(data['columns']*(data['height']//data['cell']))]
 files[name]=('dist/'+data['src'],cells)
report={}
for name,(path,cells) in files.items():
 im=Image.open(path);assert im.mode=='RGBA';out=[]
 for x,y,w,h in cells:
  a=im.getchannel('A').crop((x,y,x+w,y+h));box=a.point(lambda v:255 if v>32 else 0).getbbox();assert box and box[0]>0 and box[1]>0 and box[2]<w and box[3]<h,(name,box)
  out.append({'rect':[x,y,w,h],'opaqueBounds':list(box),'padding':[box[0],box[1],w-box[2],h-box[3]],'transparentCornerAlpha':a.getpixel((0,0))})
 report[name]={'file':path,'size':im.size,'cells':out}
json.dump(report,open('reports/lulu-asset-bounds.json','w'),indent=2)
print('PASS: every registered Lulu cutout has transparent corners and no clipped opaque pixels at crop edges.')
