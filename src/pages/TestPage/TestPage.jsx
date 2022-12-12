import TestPage_ls from './TestPage.less'
import { Scene, LineLayer, PointLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import mapjson from './mapjson.json'
export default function TestPage() {
  let aaa = [
    {
      lng: 100.992541,
      lat: 15.870032,
    },
    
  ];
  let fromtodata = [
    {
      from: "104.195397, 35.86166",
      to: "100.992541, 15.870032"
    },
  
  ]
    const scene = new Scene({
        id: 'map',
        map: new GaodeMap({
          pitch: 40,
          center: [ 40, 40.16797 ],
          zoom: 2.5,
          style: 'dark',
          token: 'e00bfb2fbdcfc81541c479269ebf53ec'
        })
      })
      scene.addImage(
        'plane',
        'https://gw.alipayobjects.com/zos/bmw-prod/0ca1668e-38c2-4010-8568-b57cb33839b9.svg'
      );
      scene.on('loaded', () => {
        Promise.all([
          mapjson,
          aaa,
          fromtodata
        ]).then(function onLoad([ world, aaa, flyline ]) {
          const dotData = eval(aaa);
          // @ts-ignore
          const flydata = eval(flyline).map(item => {
            // @ts-ignore
            const latlng1 = item.from.split(',').map(e => {
              return e * 1;
            });
            // @ts-ignore
            const latlng2 = item.to.split(',').map(e => {
              return e * 1;
            });
            return { coord: [ latlng1, latlng2 ] };
          });
      
          const worldLine = new LineLayer()
            .source(world)
            .color('#FFBD5E')
            .size(0.5)
            .style({
              opacity: 0.4
            });
          const dotPoint = new PointLayer()
            .source(dotData, {
              parser: {
                type: 'json',
                x: 'lng',
                y: 'lat'
              }
            })
            .shape('circle')
            .color('#ffed11')
            .animate(true)
            .size(40);
          const flyLine = new LineLayer({ blend: 'normal' })
            .source(flydata, {
              parser: {
                type: 'json',
                coordinates: 'coord'
              }
            })
            .color('#ff6b34')
            .texture('plane')
            .shape('arc')
            .size(15)
            .animate({
              duration: 1,
              interval: 0.2,
              trailLength: 0.05
            })
            .style({
              textureBlend: 'replace',
              lineTexture: true, // 开启线的贴图功能
              iconStep: 10, // 设置贴图纹理的间距
            });
      
          const flyLine2 = new LineLayer()
            .source(flydata, {
              parser: {
                type: 'json',
                coordinates: 'coord'
              }
            })
            .color('#ff6b34')
            .shape('arc')
            .size(1)
            .style({
              lineType: 'dash',
              dashArray: [ 5, 5 ],
              opacity: 0.5
            });
          scene.addLayer(worldLine);
          scene.addLayer(dotPoint);
          scene.addLayer(flyLine2);
          scene.addLayer(flyLine);
        });
      });
    return (
        <>
            <div className={TestPage_ls.TestPagebox} id='map'>

            </div>
        </>
    )
}