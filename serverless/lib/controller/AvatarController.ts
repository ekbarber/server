import { Avatar } from "../model/Avatar";
import { createImageData, createCanvas } from "canvas";

import Debug from 'debug';

const debug = Debug('nextcloud:AvatarController');

class AvatarController {
    generateAvatar(text:string, size=1024){
        const canvas = createCanvas(size, size);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'green'
        ctx.fillRect(0, 0, size, size)

        //ctx.putImageData(createImageData(size, size), 0, 0);
        ctx.fillStyle = 'white'
        ctx.font = `${size * 0.4}px Impact`;
        const textMetrics = ctx.measureText(text);
        debug({
            textMetrics
        })
        ctx.fillText(text, (size / 2) - (textMetrics.width / 2), (size /2) + (textMetrics.actualBoundingBoxAscent / 2))
        
        
        return canvas.createPNGStream()

    }
}

export default new AvatarController();